$.extend({
		createAjaxUploadForm : function(option) {
			var id = option["id"],data= option["data"];
			var fileName = option["fileName"]; //上传后台需要用到的字段名称
			var formId = 'jUploadForm' + id,fileId = 'jUploadFile' + id;
			var form = $('<form  action="" method="POST" class="uploadForm" name="'+formId+'" id="'+formId+'" enctype="multipart/form-data"></form>');
			this.uploadBtn = $("<input type='file'  name='file' style='display:none' dataType='FileUplod' value='' />");
			$(form).append(this.uploadBtn);
			if (data) {   
		        for (var i in data) {   
		            var input = $('<input type="hidden" name="' + i + '" value="' + data[i] + '" />');
		            $(form).append(input);
		        }   
		    }
			$(form).css('position', 'absolute');
			$(form).css('top', '-1200px');
			$(form).css('left', '-1200px');
			$(form).css('display', 'none');
			//配置上传文件的接收文件格式 ，如果是image 
			if(option["accept"]){
			   $(this.uploadBtn).attr('accept', option["accept"]);
			}
			this.uploadBtn.attr("name",fileName);
			return form;
		},
		getUploadBtn:function(){
			return this.uploadBtn;
		},
		ajaxFileUpload : function(option) {
			//创建先移除
			var deOption = {
			    fileName : "file",
			    dataType : "json",
			    success : function(){},
			    error : function(){}
			};
			var id = new Date().getTime(),me = this;
			option = $.extend({}, deOption, option);
			option["id"] = id;
			var frameId = 'jUploadFrame' + id,url = option["url"],dataType = option["dataType"];;
			var form = this.createAjaxUploadForm(option);
			var iframeIo= $('<iframe id="' + frameId+ '" name="'+ frameId+ '" class="uploadIframe" style="position:absolute; top:-9999px; left:-9999px;display: none;" />') ;
			$("body").append(iframeIo);
			$("body").append(form);
			
			
			var uploadBtn = this.getUploadBtn();
			$(uploadBtn).trigger('click'); //弹出上传的对话框
			
			var  requestDone  =false;
			//错误处理
			var errorHandler = function(option, res, status, e ){
				if(option.error){
				   option.error(res, status, e);
				}
			}
			//删除dom
			var removeUploadHander = function(){
				setTimeout(function() {
					$(form).remove();
					$(iframeIo).remove();
			    }, 100);
			}
			//回调函数
			var uploadCallback = function(isTimeout) {
				var response= {},resultData = "";
				try {
					var status = isTimeout != "timeout" ? "success": "error";
					if(isTimeout!= "timeout"){
						var io = document.getElementById(frameId);
						var responseText = "";
						var responseXML = ""
						if (io.contentWindow) {
							 responseText = io.contentWindow.document.body ? $(io.contentWindow.document.body).html(): null;
							 responseXML  = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument: io.contentWindow.document;
						} else if (io.contentDocument) {
							responseText = io.contentDocument.document.body ? $(io.contentDocument.document.body).html(): null;
							responseXML  = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument: io.contentDocument.document;
						}
						response.responseText= responseText || "";
						response.responseXML = responseXML || "";
						requestDone = true;
						console.log(response, dataType);
						resultData = me.getUploadHttpData(response, dataType);
					}
					if (option["success"]){
						option["success"](resultData, status);
					}
					removeUploadHander();
					
				} catch (e) {
					errorHandler(option, response, null, e);
				}
			}
			//form提交
			var doUploadSubmit = function(){
				var timeout = option["timeout"];
				if (timeout > 0) {
					setTimeout(function() {
						if (!requestDone){
							uploadCallback("timeout");
						}
					}, timeout);
				}
				try {
					$(form).attr('action', url);
					$(form).attr('method', 'POST');
					$(form).attr('target', frameId);
					if (form.encoding) {
						$(form).attr('encoding', 'multipart/form-data');
					} else {
						$(form).attr('enctype', 'multipart/form-data');
					}
					$(form).submit();
				} catch (e) {
					$.handleError(option, xml, null, e);
					removeUploadHander();
				}
				
				$(iframeIo).load(uploadCallback);
				
			}
			//文件类型,获取文件名
			var getFileInfo = function(){
				 var filePath = $(uploadBtn).val();
			     var extStart = filePath.lastIndexOf("."); 
			     var type = filePath.substring(extStart, filePath.length).toLowerCase(); 
			     var fileName  = filePath.split("\\").pop();
			     var fileName  = fileName.substring(0, extStart); 
			     return {fileBtn:$(uploadBtn),fileName:fileName,fileType:type};
			};
			//上传
			$(uploadBtn).change(function(){
				 var flag = true;
				 //上传之前格式等验证
				 if(option["beforeCheck"] && $.isFunction(option["beforeCheck"])){
				 	var file = getFileInfo();
				    flag = option["beforeCheck"].apply(this,[file]); 
				 }
				 if(flag){
				 	doUploadSubmit();
				 }
			});
		},
		getUploadHttpData : function(res, type) {
			var data = type == "xml"? res.responseXML : res.responseText;
			if (type == "script"){
				$.globalEval(data);
			}else if (type == "json"){
				 //去掉pre代码
				 var start = data.indexOf(">");  
	             if(start != -1) {  
	               var end = data.indexOf("<", start + 1);  
	               if(end != -1) {  
	                  data = data.substring(start + 1, end);  
	                }  
	             } 
				 eval("data = " + data);
			}else if (type == "html"){
				$("<div>").html(data).evalScripts();
			}
			return data;
		}
	})
