(function(){
	
	
	var combotree = {
		init: function(target,option){
			this.target = target;
			this.options = $.extend({},$.fn.ComboTree.default, option);
			
			
			$(target).hide();
			var arrayIcon = "position:absolute;left:50%; top:50%;margin-top:-2px;margin-left:-4px;height:4;width:4;border:4px solid;border-color:#777 transparent transparent transparent;";
			

			
			var genHtml = [];
			genHtml.push('<div class="commboTree treeWidget" style="position: relative;">');
			
			genHtml.push('	<div class="commboTree treeInput" style="width:100%;"></span>');
			genHtml.push('		<input class="commboTree treeText"  readonly="true" style="width:100%;padding:0px;margin:0px;border:1px solid #d0d0d0;" />');
			genHtml.push('		<div class="commboTree arrayDiv">');
			genHtml.push('			<div class="commboTree arrayIcon" style="'+arrayIcon+'"></div>');
			genHtml.push('		</div>');
			genHtml.push('	</div>');
			
			genHtml.push('	<div class="commboTree warpdown" style="left:0px;top:0px;z-index:10000;width:100%;display:none;">');
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
				var treeView =$("ul.treeUI",dropdownWrapper);
				//三角DIV
				var arrayDiv = $("div.arrayDiv",dropdownWrapper);
				//输入框
				var inputText = $("input.treeText",dropdownWrapper);
				//下拉树形的div
				var warpdownPanel = $("div.warpdown",dropdownWrapper); 
				
				$(this.target).data("combotree",{
					target  : target,
					options : this.options,
					treeWidget : dropdownWrapper,
					warpdownPanel : warpdownPanel,
					inputText: inputText,
					arrayDiv : arrayDiv,
					treeView: treeView
				});
				this.initTreeStyle(target);
				this.initTreeView(target);
		    }
	  },
	  initTreeStyle:function(target){
	  	    //初始化位置
	  	    var me = this,opt = $(target).data("combotree").options;
	  	    var arrayDiv = $(target).data("combotree").arrayDiv;
	  	    var inputText = $(target).data("combotree").inputText;
	  	    var treeWidget = $(target).data("combotree").treeWidget;
	  	    var warpdownPanel = $(target).data("combotree").warpdownPanel;
	  	    
			var offset = $(target).offset(), width = $(target).width(), height = $(target).height();
			var arrayIcon = $(arrayDiv).find("div.arrayIcon");
			//控制三角DIV的位置
			arrayDiv.css({height : height,lineHeight: height,cursor:"pointer",width  : opt["arrayIconWidth"],position:"absolute",right:-1, bottom:0, top:1,backgroundColor:opt["arrayColor"]});
			//控制输入框的大小
			inputText.css({height:height,lineHeight: height,borderColor:opt["borderColor"]});
			treeWidget.css({ left : offset.left,width : width});
			warpdownPanel.css({borderWidth:1,borderStyle:"solid",borderColor:opt["borderColor"]});
			 //滑动效果
	         $(arrayDiv).hover(function(){
	         	$(this).css("color","white");
	         }, function(){
	         	$(this).css("color","");  
	         });
	         //点击效果
	         $(arrayDiv).click(function(){
	          	  var isValible = $(warpdownPanel).is(':hidden');　
	          	  if(isValible){
	          	   	  me.showPanel(target);
	          	  }else{
	          	   	  me.hidePanel(target);
	          	  }
	         });
	         //点击区域的在点击区域外的隐藏
	         $(document).click(function (e) { 
				var isPanel = $(e.target).is(".commboTree");
				if(!isPanel){
					me.hidePanel(target);
				}
			});
	  },
	  showPanel : function(target){
	  	  var warpdownPanel = $(target).data("combotree").warpdownPanel;
	  	  if(warpdownPanel){
	  	  	 $(warpdownPanel).show();
	  	  }
	  },
	  hidePanel : function(target){
	  	  var warpdownPanel = $(target).data("combotree").warpdownPanel;
	  	  if(warpdownPanel){
	  	  	$(warpdownPanel).hide();
	  	  }
	  },
	  _loadTree:function(target,data){
	  		var me = this;
	  	    var option   = $(target).data("combotree").options;
	  	    var treeView = $(target).data("combotree").treeView;
	  	    var inputText = $(target).data("combotree").inputText;
	  	    
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
					console.log(node);
					setNodeValue(target,node);
					me.hidePanel(target);
					option.onSelect.apply(this, arguments);
				},
				onCheck: function() {
				   option.onCheck.apply(this, arguments);
				}
		  	});
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
		  		 	 if(option["formatData"]){
		  		 	 	data = option.formatData.call(this, data); //返回新的数组
		  		 	 }
		  		 	 me._loadTree(target,data);
		  		 },
		  		 complete:function(xhr,textStatus){   
		  		 	 option.complete.apply(this, arguments);
		  		 },
		  		 error:function(){
		  		 	option.error.apply(this, arguments);
		  		 }
	  		});
	  	}
	  },
	  //单个设值
	 getValue: function(target){
		return $(target).val();
	 },
	 //设置数值
	 setValue: function(target,value){
	 	value = value ? value + "": "";
		var  treeView = $(target).data("combotree").treeView;
		var  options  = $(target).data("combotree").options;
		debugger;
		var valueList = value.split(options["separator"]);
		if(valueList && valueList.length >1){
			
			
		}else{
			var treeNode = $(treeView).tree("findNodeById",value);
			if(treeNode){
				//选中
				$(treeView).tree("selectNode",treeNode.target);
			}
		}
	 },
	 //清除
	 clear : function(target){
		var inputText = $(target).data("combotree").inputText;
		var  treeView = $(target).data("combotree").treeView;
		$(target).val("");
		$(inputText).val("");
		$(treeView).tree("unSelectNode")
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
	    separator: ",",
	    borderColor: "#4395FF",
	    arrayColor: "#4395FF",
		formatData:function(){},
		beforeSend:function(){},
		success:function(){},
		formatData: function(){},
		onCheck :function(){},
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
		expandAll:function(){
			
		},
		toggleAll:function(){
			
		},
		destroy:function(){
			
		},
		clear:function(){
			return target.each(function(){
				combotree.clear(this);
			});
		}
	}
	
})();