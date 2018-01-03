(function($){
	
    /**
	 * hzg 
	 */
	var setContent = function(target,text){
	    var dataToolTip = $(target).data("plugin.formTooltip");
		if(dataToolTip && dataToolTip["toolTips"]){
		   var toolTips = dataToolTip["toolTips"];
		   var content = toolTips.find('.formToolTip-Text');
	       content.html(text);
	       updatePostion(target,toolTips);
		}
	}
	var showToolTips= function(target,opts){
		var toolTips = opts["target"];
        $(target).show();
        $(target).append(toolTips);
	    updatePostion(target,toolTips);
	}
	var destroy = function(target){
		var dataToolTip = $(target).data("plugin.formTooltip");
		if(dataToolTip && dataToolTip["toolTips"]){
			dataToolTip["toolTips"].remove();
			$(target).removeData("plugin.formTooltip");
		}
	}
	var hide = function(target){
		var dataToolTip = $(target).data("plugin.formTooltip");
		if(dataToolTip && dataToolTip["toolTips"]){
			$(dataToolTip["toolTips"]).hide();
		}
	}
	var show = function(target){
		var dataToolTip = $(target).data("plugin.formTooltip");
		if(dataToolTip && dataToolTip["toolTips"]){
			$(dataToolTip["toolTips"]).show();
		}
	}
	var updatePostion= function(target,toolTips){
		  toolTips = $(toolTips),target = $(target);
		  var opts = $(target).data("plugin.formTooltip").options;
		  var TipWidth  = toolTips[0].offsetWidth,TipHeight = toolTips[0].offsetHeight; 
	      var elementWidth = target[0].offsetWidth,elementHeight = target[0].offsetHeight;
	      var elementOffset = target.offset();
	      var innerDiv = toolTips.find('.formToolTip-innerDiv'); 
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
		  var htmlcode = '<div class="formToolTip"  name="formToolTip"><div class="formToolTip-innerDiv"></div><div class="formToolTip-Text" >'+textContent+'</div></div>';
	      var toolTips = $(htmlcode);
	      toolTips.css({position:"absolute",opacity:opts["opacity"],background:opts["bgColor"],maxWidth:opts["maxWidth"],padding:opts["padding"],borderRadius:opts["radius"]});
	      toolTips.find("div.formToolTip-innerDiv").css({position:"absolute",border:"solid transparent " + opts["iconSize"] +"px",width:"0px",height:"0px"});
	      toolTips.find("div.formToolTip-Text").css({color:opts["textColor"],fontSize:"12px",background:"transparent"});
	      var data = $.data(target, 'plugin.formTooltip');
	      if(!data){
	      	  opts["target"] = toolTips;
			  $(target).data("plugin.formTooltip",{
			  		options : opts,
					toolTips : toolTips
			  })
		      showToolTips(target,opts);
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
		name: 'formToolTip', 
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
