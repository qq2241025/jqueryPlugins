(function($){
    /**
	 * hzg 
	 */
	var setContent = function(target,text){
		var dataToolTip = $(target).data("plugin.tooltip");
		if(dataToolTip && dataToolTip["toolTips"]){
		   var toolTips = dataToolTip["toolTips"];
		   var content = toolTips.find('.toolTip-Text');
	       content.html(text);
	       updatePostion(target,toolTips);
		}
	}
	var showTip= function(target,toolTips){
        target.show();
        $(target).after(toolTips);
	    updatePostion(target,toolTips);
	}
	var destroy = function(target){
		var dataToolTip = $(target).data("plugin.tooltip");
		if(dataToolTip && dataToolTip["toolTips"]){
			dataToolTip["toolTips"].remove();
			$(target).removeData("plugin.tooltip");
		}
	}
	var hide = function(target){
		var dataToolTip = $(target).data("plugin.tooltip");
		if(dataToolTip && dataToolTip["toolTips"]){
			$(dataToolTip["toolTips"]).hide();
		}
	}
	var show = function(target){
		var dataToolTip = $(target).data("plugin.tooltip");
		if(dataToolTip && dataToolTip["toolTips"]){
			$(dataToolTip["toolTips"]).show();
		}
	}
	var updatePostion= function(target,toolTips){
		  toolTips = $(toolTips),target = $(target);
		  var opts = $(target).data("plugin.tooltip").options;
		  var TipWidth  = toolTips[0].offsetWidth,TipHeight = toolTips[0].offsetHeight; 
	      var elementWidth = target[0].offsetWidth,elementHeight = target[0].offsetHeight;
	      var elementOffset = target.offset();
	      var innerDiv = toolTips.find('.toolTip-innerDiv'); 
	      var offsetSize = opts["offsetSize"],iconSize= opts["iconSize"]; //三角大小
	      switch(opts["align"]){
	        case 'left':
	          //三角
	          var innerTop  = parseInt((TipHeight - iconSize * 2 )/2 ); //ok 
	          var innerleft = -iconSize * 2 ;
	          innerDiv.css({right:innerleft, top: innerTop,borderLeftColor: opts["bgColor"]});
	          //div位置
	          var divTop  = parseInt(elementOffset.top +  (elementHeight - TipHeight)/2);
	          var divLeft = parseInt(elementOffset.left - TipWidth - iconSize- offsetSize);
	          toolTips.css({left: divLeft, top: divTop});
	          return ;
	        case 'right':
	          //三角
	          var innerTop = parseInt((TipHeight - iconSize*2 )/2 );
	          var innerleft = -iconSize * 2 ;
	          innerDiv.css({left:innerleft, top: innerTop,borderRightColor: opts["bgColor"]});
	          //div位置
	          var divTop  = parseInt(elementOffset.top +  (elementHeight - TipHeight)/2);
	          var divLeft = parseInt(elementOffset.left +  elementWidth + iconSize+ offsetSize) ;
	          toolTips.css({left: divLeft, top: divTop});
	          return ;
	        case 'bottom':
	          //三角
	          var innerLeft = parseInt((TipWidth - iconSize*2 )/2 );
	          var innerTop = -iconSize * 2 ;
	          innerDiv.css({left:innerLeft, top: innerTop,borderBottomColor: opts["bgColor"]});
	          //div位置
	          var divLeft = parseInt(elementOffset.left +  (elementWidth - TipWidth) / 2);
	          var divTop = elementOffset.top + elementHeight +  iconSize + offsetSize ;
	          toolTips.css({left: divLeft, top: divTop});
	          return ;
	        case 'top':
	        default:
	          //三角
	          var innerLeft = parseInt((TipWidth - iconSize*2 )/2 );
	          var innerTop =  -iconSize*2 ;
	          innerDiv.css({left:innerLeft, bottom: innerTop,borderTopColor: opts["bgColor"]});
	          //div位置
	          var divLeft = parseInt(elementOffset.left +  (elementWidth - TipWidth) / 2);
	          var divTop = elementOffset.top - TipHeight - iconSize - offsetSize;
	          toolTips.css({left: divLeft, top: divTop});
	          return ;
	      }
    };
	var initToolTip= function(target, opt){
		  var opts = $.extend({},$.fn.toolTips.default, opt);
		  var textContent = $(target).attr("title") || $(target).attr("dataTitle");
		  if(!textContent){
		  	  textContent = $(target).attr("msg") || opts["content"];
		  }else{
		  	 $(target).attr("dataTitle",textContent);
		  	 $(target).attr("title","");
		  }
		  var htmlcode = '<div class="toolTip"  name="toolTip"><div class="toolTip-innerDiv"></div><div class="toolTip-Text" >'+textContent+'</div></div>';
	      var toolTips = $(htmlcode);
	      toolTips.css({position:"absolute",opacity:opts["opacity"],background:opts["bgColor"],maxWidth:opts["maxWidth"],padding:opts["padding"],borderRadius:opts["radius"]});
	      toolTips.find("div.toolTip-innerDiv").css({position:"absolute",border:"solid transparent " + opts["iconSize"] +"px",width:"0px",height:"0px"});
	      toolTips.find("div.toolTip-Text").css({color:opts["textColor"],fontSize:"12px",background:"transparent"});
	      var data = $.data(target, 'plugin.tooltip');
	      if(!data){
	      	  opts["target"] = toolTips;
			  $(target).data("plugin.tooltip",{
			  		options : opts,
					toolTips : toolTips
			  })
		      showTip(target,toolTips);
	      }
	};
	$.fn.toolTips = function(options, param){
		if (typeof options == 'string'){
			var methodFn = $.fn.toolTips.method;
			if(methodFn[options] && $.isFunction(methodFn[options])){
				return methodFn[options](this, param);
			}else{
				throw options + " method is not find";
			}
			return null;
		}
		options = options || {};
		return this.each(function(){
      		initToolTip($(this), options);
		});
	};
	$.fn.toolTips.default = {
		name: 'toolTip', 
	    align: 'right', 
	    padding: 4,
	    radius: 2, 
	    opacity: 0.8, 
	    iconSize : 6,
	    maxWidth: 222,
	    textColor:"#fff",
	    content : "tip提示",
	    offsetSize: 3,
	    bgColor: '#000'
	}
	$.fn.toolTips.method = {
		 setContent:function(target,param){
		 	return target.each(function(){
		 		setContent(this,param);
		 	});
		 },
		 show:function(){
		 	return target.each(function(){
		 		show(this);
		 	});
		 },
		 hide: function(){
		 	return target.each(function(){
		 		hide(this);
		 	});
		 },
		 destroy:function(target){
		 	return target.each(function(){
		 		destroy(this);
		 	});
		 }
	}

})(jQuery);


$(function(){
	//定义一个验证器
	$.Validator={
		match:function(params) {
			//定义默认的验证规则
			var rule = params["rule"].toUpperCase(),value = params["value"];
			var defaultVal = {
				NUMBER : "^[0-9]*$",
				TEL : "^0(10|2[0-5789]|\\d{3})-\\d{7,8}$",
				IP : "^((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])$",
				MOBILE : "^1(3[0-9]|5[0-35-9]|8[0235-9])\\d{8}$",
				EMAIL : "^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$",
				MAIL  : "^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$",
				IDENTITY : "((11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91)\\d{4})((((19|20)(([02468][048])|([13579][26]))0229))|((20[0-9][0-9])|(19[0-9][0-9]))((((0[1-9])|(1[0-2]))((0[1-9])|(1\\d)|(2[0-8])))|((((0[1,3-9])|(1[0-2]))(29|30))|(((0[13578])|(1[02]))31))))((\\d{3}(x|X))|(\\d{4}))",
				CHINESE : "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]*$",
				URL : "^http[s]?://[\\w\\.\\-]+$"
			};
			if(!value){
			     return false;
			}
			var flag=false,ruleText = defaultVal[rule];
			if(rule =='OTHER') {//自定义的验证规则匹配
				var regString = params["regString"];
				flag=new RegExp(regString).test(value);
			}else if(ruleText){
			    var reg=new RegExp(ruleText);
				flag =reg.test(value);
			}
			return flag;
		},
		getTextWidth:function(str,fontSize) {
			  var fontSize = fontSize || 12;
			  var textDom = $('<span stlye="display:none;" id="getTextWidth" style="font-Size:'+fontSize+'px;white-space: nowrap;">'+text+'</span>');
			  $('body').append(textDom); 
			  var width = textDom[0].offsetWidth;
			  textDom.remove();
		      return width;
		},
		//显示错误的tip样式
		invalidFormErrorTip:function(target){
			$(target).css({backgroundColor:"#ffe7e7",border:"1px solid #a5aeb6"});
		},
		//清除TIP样式
		clearFormtErrorTip:function(target){
			$(target).css({backgroundColor:"",border:""});
		},
		//绑定form样式
		bindItemFormEvent:function(target){
		     var me= this;
		     if(target && target.length >0){
		     	var tagType = $(target).prop("tagName");
		     	var eventType = "SELECT" != tagType ? "input propertychange":"change";
		     	$(target).unbind(eventType).bind(eventType, function(){
		           me.invalFormItem($(this));
		     	});
		     }
		},
		//验证
		checkValidItem:function(target){
		    var flag = false;
			var inValue = $(target).val() || "";
			if(inValue){
				 //自定义正则表达式
				var valTypeRule = $(target).attr('valType');
				if(valTypeRule == 'other') { 
					var regString = $(target).attr('regString');
					flag = $.Validator.match({rule:"other",value:inValue,regString:regString}); //
				}else if(valTypeRule == 'required'){ //正则表达式验证
				    flag = true;
				}else{
				    flag =  $.Validator.match({rule:valTypeRule,value:inValue});
				}
			}
		    return flag;
		},
		//验证无效的表单
		invalFormItem:function(target){
			this.clearFormtErrorTip(target); //清除错误的样式
		    $(target).toolTips("destroy");
		 	var option = {
		 	    align: $(target).attr("placement") || 'right',
		    	bgColor: $(target).attr("tipColor") || "#000"
		 	};
		 	var flag= this.checkValidItem(target); //控件的验证方法
	    	if(!flag){
		        this.invalidFormErrorTip(target); //显示错误的样式
	            $(target).toolTips(option);
		    }
		    return flag;
		},
		//验证From
		validateForm:function(list) {
			 var me = this,falg = true;
			 if(list && list.length == 0 ){
			 	return false;
			 }
			 list.each(function(index,target) {
			 	target = $(target);
		        falg = me.invalFormItem(target);
		        me.bindItemFormEvent(target);
			 });
			 return falg;
		},
		//tip滑动提示
		hideTip:function(target){
			$(target).toolTips("destroy");
		}
	}
	//为jquery扩展一个doValidate方法，对所有带有valType的元素进行表单验证，可用于ajax提交前自动对表单进行验证
	$.extend({
		doValidate: function() {
			var list  = $("[valType]");
			return $.Validator.validateForm(list);
		},
		closeAllToolTip:function(){
			$.Validator.closeAllTipDom();
		}
	});
});
