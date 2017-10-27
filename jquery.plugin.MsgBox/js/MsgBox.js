$(function(){
	
	$.fn.showMsgBox = function(option){
		 var defaultCfg= {
		 	msgText:"信息提示",
		 	msgTitle:"信息提示",
		 	buttonText:"确定",
		 	cancleText:"取消",
		 	scope: this,
		 	isBody : false,
		 	okHandler:function(){},
		 	cancleHandler:function(){},
		 	closeHander:function(){}
		  };
		  option = $.extend({}, defaultCfg, option);
		  var element = $(this);
		  $(element).hideMsgBox(); //清除提示框
		  
		  var isBody = option["isBody"],loadMaskId = new Date().getTime();
		  var eleWidth = isBody?$(window).width():$(element).width(),eleHeight = isBody?$(window).height():$(element).height();
		  
		  $(element).css({position:"relative"});
		  
		  var maskDiv = $('<div class="loadMsgMask" id="loadMsgMask_'+loadMaskId+'"></div>');
		  maskDiv.css({zIndex: 1000,position:"absolute",opacity:0.4,backgroundColor:"#000",width:eleWidth,height:eleHeight,top:0,left:0});
		  var  msgTitle  = option["msgTitle"],msgText = option["msgText"],buttonText = option["buttonText"],cancleText=option["cancleText"],scope = option["scope"];
	   	  
		  //消息对话框
		  var html=[];
		  html.push('<div class="animated zoomIn loadMsgMaskContent" id="loadMsgMaskContent_'+loadMaskId+'" > ');
		  html.push('    <div  class="msgBoxHeader">');
		  html.push('         <i operType="msgBoxClose" title="关闭" class="msgBoxClose" style="width:18px;height:40px;cursor:pointer;position:absolute;color:#999;right:10px;font-size:22px; font-style:normal">×</i>');
		  html.push('         <span class="msgBoxTitle">'+msgTitle+'</span>');
		  html.push('    </div>');
		  html.push('    <div  class="msgBoxBody">'+msgText+'</div>');
		  html.push('    <div  class="msgBoxBottom">');
		  html.push('     <div buttonId="sureBtn" class="msgBoxSureBtn"  >'+buttonText+'</div>');
		  if(option["type"]==1){
		  		html.push('   <div buttonId="cancleBtn"   class="msgBoxcancleBtn">'+cancleText+'</div>');
		  }
		  
		  html.push('  </div>');
		  
		  var cssText = [];
		  cssText.push(" <style type='text/css'>");
		  cssText.push(".animated {animation-duration: 0.5s;animation-fill-mode: both;} ");
		  cssText.push(".zoomIn {animation-name: zoomIn;} ");
		  cssText.push("@keyframes zoomIn {0%{opacity: 0;transform: scale3d(0.3, 0.3, 0.3);}50%{opacity: 1;}} ");
		  cssText.push(".loadMsgMaskContent{background: #fff;border:1px solid #e3e3e3;border-radius:4px;box-shadow: 0 0 10px #666;}");
		  cssText.push(".msgBoxHeader{border-bottom:1px solid #d5d5d5;text-align:left;background:#F5F5F5;padding: 6px 4px; }");
//		  cssText.push(".msgBoxClose{transition:All 0.4s ease-in-out; -webkit-transition:All 0.4s ease-in-out;-moz-transition:All 0.4s ease-in-out; -o-transition:All 0.4s ease-in-out;}");
//		  cssText.push('.msgBoxClose:hover {transform:rotate(360deg); -webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);}');
		  cssText.push(".msgBoxTitle{font-size:14px;margin-left: 10px;color:#777777;width:32px;height:32px;line-height:32px}");
		  cssText.push(".msgBoxBody{color:#333333; font-size: 16px;padding:40px 0px; text-align: center;width:100%;}");
		  cssText.push(".msgBoxBottom{width:100%;text-align: center;height:52px;line-height:52px;padding:3px 8px;font-size:14px;}");
		  cssText.push(".msgBoxSureBtn{display: inline-block;cursor:pointer;background:#5A73AD;border:none;border-radius: 4px;color:#ffffff;line-height:32px;width:120px;padding: 5px 3px;}");
		  cssText.push(".msgBoxcancleBtn{display: inline-block;cursor:pointer;background:#FF8000;border:none;border-radius: 4px;color:#ffffff;line-height:32px;width:120px;padding: 5px 3px;margin-left:10px;}");
		  cssText.push("</style>");
		  html.push(cssText.join(" "));
		  
		  html.push('</div>');
		  
	      
		  var maskMsgDiv = $(html.join(""));
		  maskMsgDiv.css({zIndex:1100,position:"absolute",border:"border:1px solid #999999",width:350});
		  element.append(maskDiv);
		  element.append(maskMsgDiv);
		  var midWidth  = parseInt(eleWidth - $(maskMsgDiv).width())/2;
		  var midHeight = parseInt(eleHeight- $(maskMsgDiv).height())/2;
		  maskMsgDiv.css("left",midWidth +"px");
		  maskMsgDiv.css("top",midHeight +"px");
	   	  //关闭
	   	  $("[operType=msgBoxClose]").click(function(){
	   	       $(element).hideMsgBox();
	   	       option["closeHander"].apply(scope || this,[arguments]);
	   	  });
	   	  //确认
	   	  var sureBtn = $("div[buttonId=sureBtn]");
	   	  sureBtn.click(function(){
	   	      $(element).hideMsgBox();
	   	      option["okHandler"].apply(scope || this,[arguments]);
	   	  });
	   	  //取消
	   	  var cancleBtn = $("div[buttonId=cancleBtn]");
	   	  if(cancleBtn.length> 0){
	   	  	  cancleBtn.click(function(){
		   	      $(element).hideMsgBox();
		   	      option["cancleHandler"].apply(scope || this,[arguments]);
		   	  });
	   	  }
	}
	
	$.fn.hideMsgBox = function(){
	   $(this).css({position:""});
	   var windowmask = $(this).find("div.loadMsgMask")
   	   var windowprop = $(this).find("div.loadMsgMaskContent");
   	   if(windowmask.length >0 && windowprop.length >0){
   	   	  windowmask.remove();
   	   	  windowprop.remove();
   	   }
	}
	
	$.MsgBox = {
		alert: function(option){
			option = option || {};
			option["isBody"] = true;
			$("body").showMsgBox(option);
		},
		closeAlert:function(){
			$("body").hideMsgBox();
		},
		confirm:function(option){
			option = option || {};
			option["type"] = 1;
			option["isBody"] = true;
			$("body").showMsgBox(option);
		}
	}
});