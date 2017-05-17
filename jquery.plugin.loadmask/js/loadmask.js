(function($){
	
   /*
    * eg :open  $("#id或者class").showLoadMask(); 或者 $("#id或者class").showLoadMask() ps [msg 可以为空,默认 数据加载中] 
    * eg :close $("#id或者class").closeLoadMask(); ps [msg]
    * 全局遮盖 open  loading(msg); 或者 loading() ps [msg 可以为空,默认 数据加载中] 
    * 全局遮盖  close closeLoading();
    */
	
	$.fn.showLoadMask = function(option){
		option = option || {};
		var def = {
			imagePath : "img/loadMsg.gif",
			zIndex : 999999,
			opacity: 0.7,
			bgColor: "#EEEEEE",
			timeOut : 10 * 1000,
			autoClose : false,
			msgSize: [40,40]
		};
		option = $.extend({},def, option);
		$(this).each(function() {
			return createLoadMask($(this),option);
		});
	};
	$.fn.closeLoadMask = function(){
		$(this).each(function() {
			closeLoadMask($(this));
		});
	};

	var createLoadMask = function(element,option){
		var loadMaskId = new Date().getTime();
		var imagePath  = option["imagePath"] ,zIndex= option["zIndex"],bgColor= option["bgColor"],opacity=option["opacity"],msgWidth = option["msgSize"][0],msgHeight = option["msgSize"][1];
		var isMasked = $(element).data("data.mask");
		if(isMasked) {
			console.log("isMasked",isMasked);
			closeLoadMask(element);
		}
		element.css({"position":"relative"});
		var maskDiv = $('<div class="loadmaskDiv" id="loadmaskDiv_'+loadMaskId+'"></div>');
		maskDiv.css({zIndex:zIndex,position:"absolute",opacity:opacity,backgroundColor:bgColor,width:"100%",height:"100%",top:0,left:0});
		
		//消息对话框
		var maskMsgDiv = $('<div class="loadmaskDiv-msg" id="loadmaskDiv_Msg_'+loadMaskId+'"></div>');
		maskMsgDiv.css({zIndex:zIndex+100,position:"absolute",background: "#fff url('"+imagePath+"') no-repeat center center",border:"border:1px solid #999999",padding:"2px",width:msgWidth,height:msgHeight});
		element.append(maskDiv);
		element.append(maskMsgDiv);
		var midWidth  = parseInt($(element).width() - $(maskMsgDiv).width())/2;
		var midHeight = parseInt($(element).height()- $(maskMsgDiv).height())/2;
		maskMsgDiv.css("left", midWidth  +  "px");
		maskMsgDiv.css("top",  midHeight + "px");
		//如果配置自动关闭的
		if(option["autoClose"]){
			window.setTimeout(function(){
				closeLoadMask(element);
			},option["timeOut"]);
		}
		var config = {loadMask: maskDiv , maskMsg: maskMsgDiv};
		$(element).data("data.mask",config);
	};
	var closeLoadMask = function(element){
		var cacheData = $(element).data("data.mask");
		var loadMask = cacheData["loadMask"];
		var maskMsg  = cacheData["maskMsg"];
		$(loadMask).remove();
		$(maskMsg).remove();
		$(element).data("data.mask","");
		$(element).css({"position":""});
	}
	
	var resetBodyDiv = function(mask){
		var cacheData = $("body").data("data.mask");
		var msgDiv    = cacheData["maskMsg"];
		var loadMask  = cacheData["loadMask"];
		var scroll = function(){
			 //浏览器可视区域的高度
			 var browserHeight = $(window).height();
			 var browserWidth = $(window).width();
			 var scrollTop = $(window).scrollTop();
			 var scrollLeft = $(window).scrollLeft();
			 var msgWidth  = $(msgDiv).width();
      		 var posTop  = browserHeight/2 + scrollTop;
      		 var posLeft = (browserWidth-msgWidth)/2 + scrollLeft;
             $(msgDiv).css({top : posTop,left: posLeft});
		}
	    $(window).scroll(scroll);
	    $(window).resize(scroll);
	    if(loadMask){
	        loadMask.css("height",$(document).height());
//			loadMask.css("position","fixed");
	    }
	    scroll();
	}
	//
	$.showLoadMask= function(option){
		$("body").showLoadMask(option);
		resetBodyDiv();
	}
    $.closeLoadMask= function(label){
		$("body").closeLoadMask();
	}

})(jQuery);







