(function(){
	
	  /**
	   * author zhengang.he@
	   * $("按钮ID").click(function(){
	  		$.ajaxFileUpload({});
	  	});
	   *  api 用法
	   *  $.ajaxFileUpload({  
             url: "upload/xml",//上传的文件的URL //必须
             filedName:"file", //用于后台接收的字段名称  //默认字段名称为 file        
             dataType:'json', //数据格式化类型    //必须
             accept:"", //过滤文件类型 例如image image/* 
             beforeCheck ： function(fileBtn,fileName,fileType){ //用户上传文件的判断，原始上传按钮，文件名称文件类型 返回true or false 
             	 // true 上传 false 不执行上传action;
             	 return false; 
             },
             success: function (data, status){ //成功之后的处理
             	 
             },  
             error: function (data, status, e) { //失败的处理
            	 throw new Error("error")
             }  
           }  
        );  
	   */
	  var Upload = {
			createAjaxUploadForm : function(option) {
				var formId= 'jUploadForm'+new Date().getTime(),url = option["url"],frameId ="IFrame_"+formId ;
				var data= option["data"];
				var fileName= option["fileName"]; //上传后台需要用到的字段名称
				var uploadForm = $('<form  enctype="multipart/form-data" method="POST" target="'+frameId+'" class="uploadForm" name="'+formId+'" id="'+formId+'" enctype="multipart/form-data"></form>');
			    var uploadBtn  = $("<input type='file'  name='file' style='display:none' dataType='FileUplod' value='' class='uploadFile'/>");
				$(uploadForm).append(uploadBtn);
				if (data) {   
			        for (var i in data) {   
			            var input = $('<input type="hidden" name="' + i + '" value="' + data[i] + '" />');
			            $(form).append(input);
			        }   
			    }
				$(uploadForm).css('position', 'absolute');
				$(uploadForm).css('top', '-1200px');
				$(uploadForm).css('left', '-1200px');
				$(uploadForm).css('display', 'none');
				$(uploadForm).attr('action', url);
				//配置上传文件的接收文件格式 ，如果是image 
				if(option["accept"]){
				   $(uploadBtn).attr('accept', option["accept"]);
				}
				uploadBtn.attr("name",fileName);
				var iframeIo= $('<iframe id="' + frameId+ '" name="'+ frameId+ '" class="uploadIframe" style="position:absolute; top:-9999px; left:-9999px;display: none;" />') ;
				$("body").append(iframeIo);
				$("body").append(uploadForm);
				return {
					uploadForm : uploadForm,
					iframeTarget:iframeIo
				};
			},
			getIframeDoc:function(frame) {
				var doc = null;
				if (frame.contentWindow) {
					doc = frame.contentWindow.document;
					return doc;
				}
				try { 
					doc = frame.contentDocument ? frame.contentDocument : frame.document;
				} catch (err) {
					doc = frame.document;
				}
				return doc;
			},
			ajaxFileUpload : function(option) {
				var deOption = {
					url: "",
				    fileName : "file",
				    dataType : "json",
				    data : {},
				    beforeCheck:function(){},
				    onSuccess : function(){},
				    onError : function(){}
				};
				option = $.extend({}, deOption, option);
				var formData = Upload.createAjaxUploadForm(option);
				var uploadForm = formData["uploadForm"], iframeTarget= formData["iframeTarget"];
				//查询上传按钮
				var uploadBtn = $("input.uploadFile",uploadForm);
				$(uploadBtn).trigger('click'); //弹出上传的对话框
				
				//提交返回参数
				var uploadCallback = function(){
					console.log("uploadCallback");
					var doc = $(this).contents().find("body").html();
					console.log(this,doc);
				}
				
				//错误处理
				var errorHandler = function(option, res, status, e ){
					if(option.error){
					   option.error(res, status, e);
					}
				}
				//上传
				$(uploadBtn).change(function(){
					 var flag = true;
					 //上传之前格式等验证
					 if(option["beforeCheck"]){
					    flag = option["beforeCheck"].apply(this,[]); 
					 }
					 if(flag){
					 	 $(uploadForm).submit();
					 	 $(iframeTarget).load(uploadCallback);
					 }
				});
			}
	};
    $.ajaxFileUpload = Upload.ajaxFileUpload;
})();
