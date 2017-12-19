(function(){
	
	
	var combotree = {
		init: function(target,option){
			this.target = target;
			this.options = $.extend({},$.fn.ComboTree.default, option);
			$(target).css({visibility:"hidden"});
			var arrayIcon = "position:absolute;left:50%; top:50%;margin-top:-2px;margin-left:-4px;height:4;width:4;border:4px solid;border-color:#fff transparent transparent transparent;";
			var genHtml = [];
			genHtml.push('<div class="commboTree treeWidget" style="position: absolute;background-color:white;">');
			
			genHtml.push('	<div class="commboTree treeInput" style="width:100%;"></span>');
			genHtml.push('		<input class="commboTree treeText"  readonly="true" style="width:100%;padding:0px;margin:0px;border:1px solid #d0d0d0;" />');
			genHtml.push('		<div class="commboTree arrayDiv">');
			genHtml.push('			<div class="commboTree arrayIcon" style="'+arrayIcon+'"></div>');
			genHtml.push('		</div>');
			genHtml.push('	</div>');
			
			genHtml.push('	<div class="commboTree treeWarpdown" style="left:0px;top:0px;z-index:10000;width:100%;display:none;">');
			genHtml.push('		<div class="commboTree combotree-wrapper" >');
			genHtml.push('			<ul class="commboTree treeUI"></ul>');
			genHtml.push('		</div>');
			genHtml.push('	</div>');
			genHtml.push('</div>');
			var tree = $(target).data("combotree");
			if(!tree){
				var dropdownWrapper = $(genHtml.join(""));
				$(target).after(dropdownWrapper);
				//树形UI
				$(target).data("combotree",{
					target  : target,
					options : this.options,
					treeWidget : dropdownWrapper
				});
				this.initTreeStyle(target);
				this.initTreeEventHandler(target);
				this.initTreeView(target);
		    }
	  },
	  initTreeStyle:function(target){
	  	    //初始化位置
	  	    var me = this,opt = $(target).data("combotree").options;
	  	    var treeWidget = $(target).data("combotree").treeWidget;
	  	    var arrayDiv = $("div.arrayDiv",treeWidget);
	  	    var inputText = $("input.treeText",treeWidget);
	  	    var warpdown = $("div.treeWarpdown",treeWidget);
			var offset = $(target).offset(), width = $(target).width(), height = $(target).height();
			var arrayIcon = $(arrayDiv).find("div.arrayIcon");
			//控制三角DIV的位置
			arrayDiv.css({height:height,cursor:"pointer",width:opt["arrayIconWidth"],position:"absolute",right:-1, bottom:0, top:1,backgroundColor:opt["arrayColor"]});
			//控制输入框的大小
			inputText.css({height:height,borderColor:opt["borderColor"]});
			
			treeWidget.css({left:offset["left"],top:offset["top"],width : width,zIndex : opt["zIndex"],cursor:"pointer"});
			
			warpdown.css("border","1px solid "+opt["borderColor"]);
	  },
	  initTreeEventHandler:function(target){
	  	     var me = this,opt = $(target).data("combotree").options;
	  	     var treeWidget = $(target).data("combotree").treeWidget;
	  	     var arrayDiv = $("div.arrayDiv",treeWidget);
	  	     var inputText = $("input.treeText",treeWidget);
	  	     var warpdown = $("div.treeWarpdown",treeWidget);
	  	  	 //点击效果
	         $(arrayDiv).click(function(){
	          	  var isValible = $(warpdown).is(':hidden'),inputTextDis = $(inputText).prop("disabled");
	          	  if(inputTextDis){ return ; }
	          	  if(isValible){
	          	  	 me.hideAllPanel();
	          	  	 me.showPanel(target);
	          	  }else{
	          	  	 me.hidePanel(target);
	          	  }
	         });
	         //点击区域的在点击区域外的隐藏
	         $(document).bind("click",function (e) { 
				var isPanel = $(e.target).is(".commboTree");
				if(!isPanel){
					me.hidePanel(target);
				}
			});
	  },
	  showPanel : function(target){
	  	  var treeWidget = $(target).data("combotree").treeWidget;
	  	  var warpdown = $("div.treeWarpdown",treeWidget);
	  	  $(warpdown).show();
	  },
	  hideAllPanel:function(){
	  	 $("div.treeWarpdown").hide();
	  },
	  hidePanel : function(target){
	  	  var treeWidget = $(target).data("combotree").treeWidget;
	  	  var warpdown = $("div.treeWarpdown",treeWidget);
	  	  $(warpdown).hide();
	  },
	  _loadTree:function(target,data){
	  		var me = this,option= $(target).data("combotree").options;
	  	    var treeWidget = $(target).data("combotree").treeWidget;
	  	    var inputText = $("input.treeText",treeWidget);
	  	    var treeView = $("ul.treeUI",treeWidget);
	  	    var setNodeValue =  function(target,node){
  	    		var nodeId = node["id"];
				var text = node["text"];
				$(target).val(nodeId);
				$(inputText).val(text);
	  	    }
	  		$(treeView).tree({
	  			data  : data,
	  			checkbox : false,
				onSelect: function(node) {
					setNodeValue(target,node);
					me.hidePanel(target);
					option.onSelect.apply(this, arguments);
				},
				onCheck: function() {
				   option.onCheck.apply(this, arguments);
				}
		  	});
		  	var val = $(target).val();
		  	if(val){
		  		this.setValue(target,val);
		  	}
	  },
	  initTreeView : function(target){
	  	var option = $(target).data("combotree").options,me= this;
	  	//加载本地数据
	  	if(option["data"] && option["data"].length > 0){
	  		me._loadTree(target,option["data"]);
	  	}else{
	  		$.ajax({
		  		 type: option["method"] || "post",
		  		 url : option["url"] || "",
		  		 contentType : option["contentType"] || "json",
		  		 data : option["params"] || {},
		  		 beforeSend:function(xhr){  
		  		 	option.beforeSend.apply(this, arguments);
		  		 },
		  		 success:function(data){
		  		 	 data = data || [];
		  		 	 //ajax 自定义重组数据
		  		 	 var newData = option.formatData.call(this, data) || data; //返回新的数组
		  		 	 me._loadTree(target,newData);
		  		 },
		  		 complete:function(xhr,textStatus){   
		  		 	 option.onComplete.apply(this, arguments);
		  		 },
		  		 error:function(){
		  		 	option.onError.apply(this, arguments);
		  		 }
	  		});
	  	}
	  },
	  //单个设值
	 getValue: function(target){
		return $(target).val();
	 },
	 //设置数值
	 setValue: function(target,ids){
	 	ids = ids ? ids + "": "";
	 	var options    = $(target).data("combotree").options;
	 	var treeWidget = $(target).data("combotree").treeWidget;
	 	var treeView = $("ul.treeUI",treeWidget);
	  	var inputText = $("input.treeText",treeWidget);
	 	var idList = ids.split(options["separator"]);
		$(treeView).tree("setSelectNodes",idList);
		//选中
		var selectList = $(treeView).tree("getSelected");
		var itemText = [];
		if(selectList && selectList.length > 0){
			$.each(selectList,function(index,record){
				var text = record["text"];
				itemText.push(text);
			});
		}
		var itemStr = itemText.join(options["separator"]);
		$(target).attr("value",ids);
		$(target).val(ids);
		$(inputText).val(itemStr);
	 },
	 //清除
	 clear : function(target){
		var treeWidget = $(target).data("combotree").treeWidget;
	 	var treeView = $("ul.treeUI",treeWidget);
	  	var inputText = $("input.treeText",treeWidget);
		$(target).val("");
		$(target).attr("value","");
		$(inputText).val("");
		$(treeView).tree("unSelectAll");
	 },
	 disabled:function(target){
	 	var treeWidget = $(target).data("combotree").treeWidget;
	  	var inputText = $("input.treeText",treeWidget);
	 	$(treeWidget).attr("disabled", true);
	 	$(inputText).attr("disabled", true);
	 },
	 enable:function(target){
	 	var treeWidget = $(target).data("combotree").treeWidget;
	  	var inputText = $("input.treeText",treeWidget);
	 	$(treeWidget).attr("disabled", false);
	 	$(inputText).attr("disabled", false);
	 }
	}
	
	$.fn.ComboTree = function(options, param){
		if (typeof options == 'string'){
			var methodFn = $.fn.ComboTree.method;
			if(methodFn[options] && $.isFunction(methodFn[options])){
				return methodFn[options](this, param);
			}else{
				throw options + " method is not find";
			}
			return null;
		}
		return this.each(function(){
			combotree.init($(this), options);
		});
	};
	
	$.fn.ComboTree.default = {
	    method: "POST",
	    line : false,
	    params:[],
	    arrayIconWidth: 20,
	    zIndex : 1000,
	    separator: ",",
	    borderColor: "#4395FF",
	    arrayColor: "#4395FF",
		formatData:function(){},
		beforeSend:function(){},
		success:function(){},
		formatData: function(){},
		onCheck :function(){},
		onError :function(){},
		onComplete:function(){},
		onSelect:function(){}
	}
	$.fn.ComboTree.method = {
		setValue: function(target, data){
			return target.each(function(){
				combotree.setValue(this,data);
			});
		},
		getValue:function(target){
			return combotree.getValue(target);
		},
		disabled: function(target){
			return target.each(function(){
				combotree.disabled(this);
			});
		},
		enable: function(target){
			return target.each(function(){
				combotree.enable(this);
			});
		},
		destroy:function(){
			
		},
		clear:function(target){
			return target.each(function(){
				combotree.clear(this);
			});
		}
	}
	
})();