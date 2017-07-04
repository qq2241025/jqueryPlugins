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
		  html.push('<div class="loadMsgMaskContent" id="loadMsgMaskContent_'+loadMaskId+'" style="background: #fff;border:1px solid #e3e3e3;border-radius:4px;"> ');
		  html.push('    <div  style="border-bottom:1px solid #d5d5d5;text-align:left;background:#F5F5F5;height:40px;line-height:40px;padding:0px 5px;">');
		  html.push('         <a operType="msgBoxClose" title="关闭"  style="width:16px;height:40px;cursor:pointer;position:absolute;color:#999;right:5px;line-height:40px;font-size:22px;text-decoration: none;text-shadow:0 1px 0 #ddd">×</a>');
		  html.push('         <span style="font-size:14px;margin-left: 10px;color:#777777;width:32px;height:32px;line-height:32px">'+msgTitle+'</span>');
		  html.push('    </div>');
		  html.push('    <div  style="color:#333333; font-size: 16px;padding:30px 0px; text-align: center;width:100%;">'+msgText+'</div>');
		  html.push('    <div  style="width:100%;text-align: center;height:44px;line-height:44px;padding:3px 0px;font-size:14px;">');
		  html.push('     <div buttonId="sureBtn"   style="display: inline-block;cursor:pointer;background:#66be8c;border:none;border-radius: 4px;color:#ffffff;height:32px;line-height:32px;width:90px;margin:5px 10px;">'+buttonText+'</div>');
		  if(option["type"]==1){
		  		html.push('   <div buttonId="cancleBtn"   style="display: inline-block;cursor:pointer;background:#ddd;border:none;border-radius: 4px;color:#ffffff;height:32px;line-height:32px;width:90px;margin:5px 10px;">'+cancleText+'</div>');
		  }
		  html.push('    </div>');
		  html.push('   </div>');
		  var maskMsgDiv = $(html.join(""));
		  
		  maskMsgDiv.css({zIndex:1100,position:"absolute",border:"border:1px solid #999999",width:300});
		  element.append(maskDiv);
		  element.append(maskMsgDiv);
		  var midWidth  = parseInt(eleWidth - $(maskMsgDiv).width())/2;
		  var midHeight = parseInt(eleHeight- $(maskMsgDiv).height())/2;
		  maskMsgDiv.css("left",midWidth +"px");
		  maskMsgDiv.css("top",midHeight +"px");
	   	  //关闭
	   	  $("a[operType=msgBoxClose]").click(function(){
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