 define(["js/lib/webUploader/webuploader.min.js"],function(WebUploader) {
	
	
	var rootPath = ctx;
	var flashUpload={
		uploadBackImg: ctx +"/images/upload.png",
		getFileUploadUrl : function(){
		    return rootPath +"/fileMgr/upload?dc="+ new Date().getTime();
		},
		openUploadWindow:function(option){
			option = option || {};
			if(!option["savePath"]){
			   throw  "savePath param is not null";
			   return ;
			}
            this.initOpenWindow(option);//弹框
            this.initUpload(option); //初始化swf控件
		},
		initUpload:function(option){
			var me = this;
			var savePath = option["savePath"];
			this.webUploader = new WebUploader.Uploader({
			 	 auto:false,
			 	 swf: rootPath + "/js/lib/webUploader/Uploader.swf",
			     pick:{
					id:"#"+this.getAddFileBtnId(),
					label:"添加文件"
				},
				formData:{
					path : savePath
				},
				server:this.getFileUploadUrl(),
				fileNumLimit:10,
				fileSizeLimit:20 * 1024 * 1024
			 });
			 //上传文件队列
			 this.webUploader.on('filesQueued',function(file, res){
				 me.onFileQueuedHandler.apply(me,arguments);	 
			 });
		     //上传进度条
			 this.webUploader.on('uploadProgress',function( file, res ){
				me.onUploadProcessHandler.apply(me,arguments);	 
			 });
		     //上传成功后触发;
			 this.webUploader.on('uploadSuccess',function( file, res ){
				me.onUploadSuccessHandler.apply(me,arguments);	 
			 });
			  //全部上传完毕触发;
			 this.webUploader.on('uploadFinished',function( file, res ){
				me.onUploadFinished.apply(me,arguments);	 
			 });
			 this.disableUploadBtn(); //禁用上传的按钮
			 //全部上传文件
			 this.getAllUploadBtn().click(function(){
			 	me.uploadAllFile();
			 });
		},
		//将文件移除队列
		removeQueuedFile:function(fileId){
			if(this.webUploader){
		       this.webUploader.removeFile(fileId);
		    }
		},
		//获取上传按钮
		getAllUploadBtn : function(){
		   return this.getUploadBody().find("div.allUpload");
		},
		//禁用上传按钮
		enableUploadBtn:function(){
			 this.getAllUploadBtn().css({background:"#00b7ee"});
		},
		//启用上传按钮
		disableUploadBtn:function(){
			this.getAllUploadBtn().css({background:"#d9d9d9"});
		},
		//检查上传按钮是否可用
		checkUploadIsClick:function(){
		   var fileList= this.getUploadBody().find("div.uploadFileItem");
		   var queuedMsg = this.getUploadBody().find("div.queuedmsg");
		   if(fileList!=null && fileList.length >0){
		   	   var totalSize= 0,totalFile = fileList.length;;
		   	   fileList.each(function(index,target){
		   	   	   var fileSize = parseInt($(target).attr("fileSize")) || 0;
		   	   	   totalSize += fileSize;
		   	   });
		   	   var fileMsg = "选中"+totalFile+"个文件，共" + this.getFileSizeText(totalSize);
		   	   queuedMsg.html(fileMsg);
		   	   this.enableUploadBtn();
		   }else{
		   	  queuedMsg.html("");
		   	  this.disableUploadBtn();
		   }
		},
		getFileSizeText: function(size){
	  		// 转化为kb和MB格式。文件的名字、大小、类型都是可以现实出来。
			if (size > 1024 * 1024) {                    
				size = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';                
			} else {                    
				size = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';                
			}  
			return size;
		},
		//文件队列
		onFileQueuedHandler:function(list){
			var me = this;
			//绑定事件
			var bindEvent = function(target){
		       var removeBtn = $(target).find("div.uploadFileRemove");
		       removeBtn.click(function(){
		       	 	var fileId = $(target).attr("fileId");
		      	 	$(target).remove();
		      	 	me.removeQueuedFile(fileId);
		      	 	me.checkUploadIsClick(); //控制上传的
		       });
			};
			if(list!=null && list.length >0){
				var totalFile = list.length;
				var fileListContainer = this.getUploadBody().find("div.fileList");
			    for (var i = 0; i < totalFile; i++) {
			    	var file =  list[i],fileName = file["name"],ext = file["ext"],fileId=file["id"],size =file["size"] ;
			    	var htmlstr = 
					'<div class="uploadFileItem" id="'+fileId+'" fileId="'+fileId+'" fileSize="'+size+'">' +
			  		    '<div class="uploadFileRemove">×</div>' +
						'<div class="uploadFileIcon"></div>' +
						'<div class="uploadFileMsg">等待上传</div>'+
						'<div class="uploadProccessBar"><div style="width:0%;" class="uploadProccessPer"></div></div>' +
			  		'</div>';
			    	var fileTarget = $(htmlstr);
			    	fileListContainer.append(fileTarget);
			   		bindEvent(fileTarget);
			    }
			    this.checkUploadIsClick();
			}
		},
		//文件上传成功
		onUploadSuccessHandler:function(file,percentage){
			var fileId= file["id"];
			var uploadFileItem = $("div[fileId="+fileId+"]");
			$(uploadFileItem).find("div.uploadFileMsg").html("文件上传成功");
		},
		//文件上传进度
		onUploadProcessHandler:function(file,percentage){
			var fileId= file["id"];
			var perStr = Math.round(percentage * 100) + "%";
			var uploadFileItem = $("div[fileId="+fileId+"]");
			$(uploadFileItem).find("div.uploadFileMsg").html(perStr);
			var uploadProccessBar = $(uploadFileItem).find("div.uploadProccessBar");
			$(uploadProccessBar).find("div.uploadProccessPer").css({width:perStr})
		},
		//全部上传完毕触发
		onUploadFinished:function(file, res){
		    console.log("onUploadFinished",file, res);
		},
		//上传全部文件
		uploadAllFile:function(){
			var isClick= this.getUploadBody().find("div.uploadFileItem").length >0 || false;
		    if(this.webUploader && isClick){
		       this.webUploader.upload();
		    }
		},
		closeUploadWindow:function(){
			$(".loadMsgMask").remove();
		    $(".loadMsgMaskContent").remove();
		},
		initDiagEvent:function(){
			var me = this;
		    //关闭
	   	    $("[operType=msgBoxClose]").click(function(){
	   		   me.closeUploadWindow();
	   	    });
	   	    var uploadBody = this.getUploadBody();
	   	    var maxLeft  = $(document).width()  - $(uploadBody).width();
			var maxTop   = $(document).height() - $(uploadBody).height();
	   	    var dragHeader = $(uploadBody).find("div.maskHeader");
	   	    //拖拽
	   	    dragHeader.mousedown(function(e) {
				var imove = true;
				var iX = e.clientX - this.offsetParent.offsetLeft;
				var iY = e.clientY - this.offsetParent.offsetTop;
				$(document).mousemove(function(ex) {
					if (imove) {
						var padding = 10;
						 var oX = ex.pageX - iX;
						 var oY = ex.pageY - iY;
						 var left = oX<0?padding:oX + padding;
						 var top  = oY<0?padding:oY + padding;
						 top  = top  >= maxTop  ? (maxTop-padding)  : top;
						 left = left >= maxLeft ? (maxLeft-padding) : left;
						 $(uploadBody).css({left:left, top:top});
					}
				}).mouseup(function(e) {
					imove = false;
					e.cancelBubble = true; 
				});
			});
		},
		getUploadBody:function(){
			return this.uploadBody;
		},
		getAddFileBtnId: function(){
			return this.btnAddFileId;
		},
		initOpenWindow:function(option){
			  this.btnAddFileId = "addFile_"+new Date().getTime();
			  this.closeUploadWindow(); //清除弹框的DOM
			  option = option || {};
			  var bg = this.uploadBackImg,diagWidth = option["width"] || 660,diagHeight=option["height"] || 390;
			  var maskDiv = $('<div class="loadMsgMask"  style="z-index:100000;position:absolute;opacity:0.4;background-color:#000;top:0px;left:0px;"></div>');
			  var html=[];
			  html.push('<div class="animated zoomIn loadMsgMaskContent "  style="background: #fff;border:1px solid #e3e3e3;border-radius:6px;box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);"> ');
			  html.push('    <div class="maskHeader" style="border-bottom:1px solid #d5d5d5;text-align:left;height:40px;line-height:40px;padding:0px 5px;cursor: move;">');
			  html.push('         <i class="modClose" operType="msgBoxClose" title="关闭"  style="width:16px;height:40px;cursor:pointer;position:absolute;color:#999;right:10px;font-size:22px;">×</i>');
			  html.push('         <span style="font-size:14px;margin-left: 10px;color:#777777;width:32px;height:32px;line-height:32px">文件上传</span>');
			  html.push('    </div>');
			  html.push('    <div  class="maskBody" style="color:#333333; font-size: 16px;width:100%;position:absolute;bottom:44px;top:40px;font-size:12px;" >');
			  html.push('    	<div  class="uploadBar" style="width:100%;position:absolute;height:25px;padding-left:10px;line-height:25px;height:25px;">允许用户同时上传10附件,单张图片容量不超过10MB</div>');
			  html.push('    	<div  class="uploadListFile" style="width:100%;position:absolute;top:25px;bottom:0px;padding:4px 10px;">');
			  html.push('			<div class="fileList" style="border:1px solid #e0e0e0;width:100%;height:100%;box-shadow: 0 0 5px #e0e0e0;padding:15px 10px"></div>');
			  html.push('    	</div>');
			  html.push('    </div>');
			  html.push('    <div  class="maskBottom" style="width:100%;height:44px;line-height:44px;font-size:12px;position:absolute;bottom:0px;padding:4px 10px;">');
			  html.push('       <div style="width:100%;height:24px;line-height:24px;">');
			  html.push('     		<div  class="addFile" id="'+this.btnAddFileId+'" style="line-height: 24px;width:70px;"></div> ');
			  html.push('     		<div  class="allUpload"  style="background:#00b7ee;border-radius:3px;cursor:pointer;color: #fff;margin-left:10px;line-height: 24px;position:absolute;top:4px;left:80px;padding:2px 10px;">全部上传</div>');
			  html.push('     		<div  class="queuedmsg"  style="line-height: 24px;position: absolute; right: 20px; top: 4px;"> </div> ');
			  html.push('       </div>');
			  html.push('    </div>');
			  html.push('<style type="text/css">');
			  html.push('.swfupload{vertical-align: top;}');
			  html.push('.modClose{transition:All 0.4s ease-in-out; -webkit-transition:All 0.4s ease-in-out;-moz-transition:All 0.4s ease-in-out; -o-transition:All 0.4s ease-in-out;}');
			  html.push('.modClose:hover {transform:rotate(360deg); -webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);}');
		   	  
		   	  html.push('.uploadFileItem{cursor: pointer;display: inline-block;margin:5px 10px;width: 100px;position:relative;font-size:10px;}');
			  html.push('.uploadFileIcon{width:100%;height:100px; border: 1px solid #d5d5d5;background-color:#fff;background:url("'+bg+'") no-repeat center 15px;}');
			  html.push('.uploadFileRemove{height:18px;position:absolute;top:-10px;right:-10px;width:18px;z-index:9999;font-size: 22px;line-height: 18px;background: #00b7ee;color:#fff;text-align:center;border-radius:11px;}');
			  html.push('.uploadProccessBar{height:20px;position:absolute;bottom:0px;background-color:#E0E0E0;width: 100%;}');
			  html.push('.uploadProccessPer{height:100%;width:0%;background-color:#00b7ee;}');
			  html.push('.uploadFileMsg{height:20px;width:100%;position:absolute;bottom:0px;text-align:center;z-index:100;line-height:20px;color:#fff;}');
			  
			  html.push('.uploadFileItem:hover{background: #EEEEEE none repeat scroll 0 0;}');
			  
			  html.push('.webuploader-container {position: relative;}');
			  html.push('.webuploader-element-invisible { position: absolute !important; clip: rect(1px 1px 1px 1px);}');
			  html.push('.webuploader-pick {position: relative;display: inline-block;cursor: pointer;background: #00b7ee;padding: 2px 10px;color: #fff;text-align: center;border-radius: 3px;overflow: hidden;}');
			  html.push('.webuploader-pick-hover {background: #00a2d4;}');
			  html.push('.webuploader-pick-disable {opacity:0.6;}');
			  html.push('</style>');
			  html.push('</div>');
			  var maskMsgDiv = $(html.join(""));
			  var eleWidth = $(document).width(),eleHeight = $(document).height();
			  $("body").append(maskDiv);
			  $("body").append(maskMsgDiv);
			  maskDiv.css({width:eleWidth,height:eleHeight});
			  maskMsgDiv.css({zIndex:120000,position:"absolute",border:"border:1px solid #999999",width:diagWidth,height:diagHeight});
			  var midWidth  = parseInt(eleWidth - $(maskMsgDiv).width())/2;
			  var midHeight = parseInt(eleHeight- $(maskMsgDiv).height())/2;
			  maskMsgDiv.css("left",midWidth +"px");
			  maskMsgDiv.css("top",midHeight +"px");
			  this.uploadBody = maskMsgDiv;
			  this.initDiagEvent();
		}
	};
	return flashUpload;
});