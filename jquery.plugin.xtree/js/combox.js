(function(){
	
	
	var combox = {
		init: function(target,option){
			this.target = target;
			this.options = $.extend({},$.fn.listBox.defaults, option);
			$(target).css({visibility:"hidden"});
			var arrayIcon = "position:absolute;left:50%; top:50%;margin-top:-2px;margin-left:-4px;height:4;width:4;border:4px solid;border-color:#fff transparent transparent transparent;";
			var genHtml = [];
			genHtml.push('<div class="listBox" style="position: absolute;background-color:white;">');
			
			genHtml.push('	<div class="listBox boxInput" style="width:100%;"></span>');
			genHtml.push('		<input class="listBox boxText"  readonly="true" style="width:100%;padding:0px;margin:0px;border:1px solid #d0d0d0;" />');
			genHtml.push('		<div class="listBox arrayDiv">');
			genHtml.push('			<div class="listBox arrayIcon" style="'+arrayIcon+'"></div>');
			genHtml.push('		</div>');
			genHtml.push('	</div>');
			
			genHtml.push('	<div class="listBox boxWarpdown" style="left:0px;top:0px;z-index:10000;width:100%;display:none;font-size:12px;background-color:white;min-height:10px;">');
			genHtml.push('		 <ul class="listBoxOption"></ul>');
			genHtml.push('	</div>');
			
			genHtml.push('<style>');
			genHtml.push('	.boxWarpdown ul{width: 100%; list-style: none;background: #fff;padding:0px;margin:0px; }');
			genHtml.push('	.boxWarpdown ul li{height: 24px; line-height: 24px;color: #666666; cursor: pointer;padding: 2px 0 2px 12px} ');
			genHtml.push('	.boxWarpdown ul li.selected{ background: yellowgreen;color: #FFFFFF;  }');
			genHtml.push('	.boxWarpdown ul li:hover{background: #D0D0D0; }');
			genHtml.push('<style>');
			genHtml.push('</div>');
			var tree = $(target).data("listBox");
			if(!tree){
				var selectBox = $(genHtml.join(""));
				$(target).after(selectBox);
				$(target).data("listBox",{
					target  : target,
					options : this.options,
					selectBox : selectBox
				});
				this.initBoxStyle(target);
				this.initBoxEventHandler(target);
				this.initBoxView(target);
		    }
	  },
	  initBoxStyle:function(target){
	  	    //初始化位置
	  	    var me = this,opt = $(target).data("listBox").options;
	  	    var selectBox = $(target).data("listBox").selectBox;
	  	    var arrayDiv  = $("div.arrayDiv",selectBox);
	  	    var inputText = $("input.boxText",selectBox);
	  	    var warpdown  = $("div.boxWarpdown",selectBox);
			var offset = $(target).offset(), width = $(target).width();
			var arrayIcon = $(arrayDiv).find("div.arrayIcon");
			//控制三角DIV的位置
			arrayDiv.css({height:opt["height"],cursor:"pointer",width:opt["arrayIconWidth"],position:"absolute",right:-1, bottom:0, top:1,backgroundColor:opt["arrayColor"]});
			//控制输入框的大小
			inputText.css({height:opt["height"],borderColor:opt["borderColor"]});
			//控件样式
			warpdown.css("border","1px solid "+opt["borderColor"]);
			//控件位置
			selectBox.css({cursor:"pointer",width:width,left:offset["left"],top:offset["top"]});
	  },
	  initBoxEventHandler:function(target){
	  	    var me = this,dataObj =$(target).data("listBox"), opt = dataObj.options,selectBox = dataObj.selectBox;
	  	    var arrayDiv  = $("div.arrayDiv",selectBox);
	  	    var inputText = $("input.boxText",selectBox);
	  	    var warpdown  = $("div.boxWarpdown",selectBox);
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
				var isPanel = $(e.target).is(".listBox");
				if(!isPanel){
					me.hidePanel(target);
				}
			});
	  },
	  showPanel : function(target){
	  	  var selectBox = $(target).data("listBox").selectBox;
	  	  $("div.boxWarpdown",selectBox).show();
	  },
	  hideAllPanel:function(){
	  	 $("div.boxWarpdown").hide();
	  },
	  hidePanel : function(target){
	  	  var selectBox = $(target).data("listBox").selectBox;
	  	  $("div.boxWarpdown",selectBox).hide();
	  },
	  //下拉点击事件
	  doDataEventHander:function(target){
	  		var me = this,listBox = $(target).data("listBox").selectBox;
	  		var warpdown  = $("div.boxWarpdown",listBox);
	  	    var listOption= $("li.boxOption",listBox);
			console.log(listOption);
			$(listOption).click(function(){
				console.log(this);
			})
	  },
	  _loadData:function(target,data){
	  		var me = this,listBox = $(target).data("listBox");
	  	    var option    = listBox.options;
	  	    var textField = option["textField"],valueField= option["valueField"];
	  	    var boxOptUl  = $(listBox.selectBox).find("ul");
	  	    if(!data){ return ; }
	  	    for(var i =0;i<data.length; i++){
	  	    	var record = data[i];
	  	    	var text = record[textField],value = record[valueField]
	  	    	$(boxOptUl).append("<li value='"+value+"' class='boxOption'>"+text+"</li>");
	  	    }
	  	    this.doDataEventHander(target);
		  	var val = $(target).val();
		  	if(val){
		  		this.setValue(target,val);
		  	}
	  },
	  initBoxView : function(target){
	  	var option = $(target).data("listBox").options,me= this;
	  	//加载本地数据
	  	if(option["data"] && option["data"].length > 0){
	  		me._loadData(target,option["data"]);
	  	}else if(!option["url"]){ //本地化
	  		 var loadData = [],listO = $(target).find("option");
	  		 listO.each(function(index,target){
	  		 	  var value = $(target).attr("value");
	  		 	  var text  = $(target).text();
	  		 	  loadData.push({
	  		 	  	  id : value,
	  		 	  	  text : text
	  		 	  });
	  		 });
	  		 me._loadData(target,loadData);
	  	}else{//远程请求的URL
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
		  		 	 me._loadData(target,newData);
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
	 setValue: function(target,ids){},
	 //清除
	 clear : function(target){
		 
	 }
	}
	$.fn.listBox = function(options, param){
		if (typeof options == 'string'){
			var methodFn = $.fn.listBox.method;
			if(methodFn[options] && $.isFunction(methodFn[options])){
				return methodFn[options](this, param);
			}else{
				throw options + " method is not find";
			}
			return null;
		}
		return this.each(function(){
			combox.init($(this), options);
		});
	};
	
	$.fn.listBox.defaults = {
	    method: "POST",
	    params:[],
	    height: 24,
	    arrayIconWidth: 20,
	    zIndex : 1000,
	    textField: "text",
	    valueField : "id",
	    separator: ",",
	    borderColor: "#4395FF",
	    arrayColor: "#4395FF",
		formatData:function(){},
		beforeSend:function(){},
		success:function(){},
		formatData: function(){},
		onError :function(){},
		onComplete:function(){},
		onSelect:function(){}
	}
	$.fn.listBox.method = {
		setValue: function(target, data){
			return target.each(function(){
				combox.setValue(this,data);
			});
		},
		getValue:function(target){
			return combox.getValue(target);
		},
		destroy:function(){
			
		},
		clear:function(target){
			return target.each(function(){
				combox.clear(this);
			});
		}
	}
	
})();