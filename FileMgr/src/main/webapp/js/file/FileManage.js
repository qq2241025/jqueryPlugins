define(["js/file/uploadFile.js"],function(upload) {
	
	var option={savePath:"HJfSON1XOsXbBNHlRMDXT2qtBZ0kDJC"};
	upload.openUploadWindow(option);
	
	$.fn.bigPartData= function(option){
		option = option || {};
		var pageNo   = option["pageNo"] || 1;
		var limit    = option["limit"] || 50;
        var bigData  = option["list"] || [];
        var scope    = option["scope"] || this;
        var total    = bigData.length;
        var totalPage = parseInt(total/limit)+1;
        var pageChange = option["pageChange"];
        
        var getRenderData =function(){
    	    var start = (pageNo - 1) * limit;
    	    var end = start + limit;
    	    end = end >= total ? total:end;
    	    var renderData = bigData.slice(start,end) || [];
    	    if(pageChange && $.isFunction(pageChange)){
               pageChange.apply(scope || this,[renderData,pageNo]);
            }
    	};
        
    	var options = {
            currentPage: pageNo, 
            visiblePages: 10, //每页页数
            totalPages: totalPage, 
            //点击事件
            onPageChange: function (num, type) {
                pageNo = num;
                getRenderData();
            }
        };
        $(this).jqPaginator(options);
        getRenderData();
	}
	
	var virthPath = "http://portal.wujiemed.com/sos";
    var fileMgr = {
    	viewType:"thumb",  //thumb缩略图 list列表
    	getVirthFileUrl:function(){
    		return virthPath;
    	},
    	getDownloadFileUrl : function(){
    		return ctx + "/fileMgr/download?dc=" + new Date().getTime();
    	},
    	getListDiskUrl : function(){
    		return ctx + "/fileMgr/listFile?dc=" + new Date().getTime();
    	},
    	isImageFile : function(fileType){
    	   var format ={};
    	   format["JPEG"] = true;
    	   format["JPG"] = true;
    	   format["PNG"] = true;
    	   format["GIF"] = true;
    	   format["BMP"] = true;
    	   return format[fileType] ||false;
    	},
    	getMapFormatType:function(){
    		if(!this.formatType){
    			var typeStr = "3GPP|AC3|ASP|AVI|BAT|BMP|CHM|CLASS|CMD|CSS|DLL|DMG|DOC|DOCX|EMAIL|EXCEL" +
    			"|EXE|F4V|F4V|FILE|FLA|FLV|GIF|HTM|HTML|IE|IMAGE|INI|ISO|JAVA|JPEG|JPG|" +
    			"JS|MKV|MOV|MP3|MPA|MPG|OCX|OGG|PDF|PHP|PNG|PPT|PSD|RAR|RTF|SQL|SWF|SYS|TAR" +
    			"|TIFF|TXT|WAV|WMV|XHTML|XLS|XLXS|XML|ZIP|GZ";
    			var typeList = typeStr.split("\|");
        		this.formatType = {};
        		if(typeList && typeList.length>0){
        			for (var i = 0; i < typeList.length; i++) {
    					var key = typeList[i];
    					if(key){
    						this.formatType[key] = true;
    					}
    				}
        		}
    		}
    		return this.formatType;
    	},
    	init:function(){
    		this.initPage();
    		this.getDiskFileList("");
    	},
    	getCurrentFileDirPath:function(){
    		return this.filePath || "";
    	},
    	getParentFileDirPath:function(){
    		return this.parentDir || "";
    	},
    	initPage:function(){
    		var me= this;
    		//回到根目录
    		$("#rootBtn").click(function(){
    			var rootPath = "";
    			me.filePath = rootPath;
    			me.getDiskFileList(rootPath);
    		});	
    		
    		//返回上一级
    		$("#updirBtn").click(function(){
    			var path = me.getParentFileDirPath();
    			me.getDiskFileList(path);
    		});
			//刷新
			$("#refreshBtn").click(function(){
				var path = me.getCurrentFileDirPath();
				me.getDiskFileList(path);
			});
			//启动真实图像
			$("#realImageBtn").click(function(){
				var imageList = $("img.imageType");
				if(imageList && imageList.length >0){
				    imageList.each(function(){
						var dataSrc = $(this).attr("dataImage");
						if(dataSrc){
							$(this).attr("src",dataSrc);
						}
					});
				}
			});
			//上传
			$("#uploadBtn").click(function(){
				 var path = me.getCurrentFileDirPath();
				 var option={savePath:path};
				 upload.openUploadWindow(option);
			});
			//列表试图
			$("#listBtn").click(function(){
				me.viewType = "list";
				$("button[dataType=view]").removeClass("checkedView");
				$(this).addClass("checkedView");
				var data = me.getDataList();
				me.renderFileList(data);
			});
			//拼图试图
			$("#pingpuBtn").click(function(){
				me.viewType = "thumb";
				$("button[dataType=view]").removeClass("checkedView");
				$(this).addClass("checkedView");
				var data = me.getDataList();
				me.renderFileList(data);
			});
    	},
    	getViewType:function(){
    		 return this.viewType;
    	},
    	getDataList:function(){
    	   return this.dataList || [];
    	},
    	//初始化 
    	getDiskFileList:function(path){
    		var me = this;
    		$.showLoadMask();
    		$.post(this.getListDiskUrl(),{filePath : path},function(res){
    			$.closeLoadMask();
    			res = res || {};
    			me.parentDir = res["parentPath"] || "";
    			var list= res["list"] || [];
    			me.initPartPage(list);
    		},"json");
    	},
    	initPartPage:function(list){
			$("#pageBar").bigPartData({
				list : list,
				scope: this,
				pageChange : function(data,page){
					this.dataList = data;
				    this.renderFileList(data)
				}
			});
    	},
    	//渲染文件
    	renderFileList: function(data){
    		$("#fileContiner").empty();
    		if(data && data.length >0){
	    			var htmlcode = [];
	    			//如果是列表就有表头
	    			if(this.getViewType() =="list"){
	    				htmlcode.push("<div class='listFileContainer'>");
	    				htmlcode.push("<div class='listHeader'>" +
	    						"<div class='listFileNum'>序号</div>" +
	    						"<div class='listFileName'>文件名</div>" +
	    						"<div class='listFileType'>类型</div>" +
	    						"<div class='listFileSize'>大小</div>" +
	    						"<div class='listFileTime'>修改时间</div>" +
	    				"</div>");
	    				htmlcode.push("<div class='listBody'>");
	    				var html = [];
	    				for (var i = 0; i < data.length; i++) {
							var fileRecord = data[i];
							var index = i + 1;
							var table = this.getListTable(index,fileRecord);
							html.push(table);
						}
	    				html.push("</div>");
	    				htmlcode.push(html.join(""));
	    				htmlcode.push("</div>")
	    			}else{
	    				for (var i = 0; i < data.length; i++) {
							var fileRecord = data[i];
							var html =  this.getFileDiv(fileRecord);
							htmlcode.push(html);
						}
	    			}
	    			$("#fileContiner").append(htmlcode.join(""));
	    			this.bindTargetEvent();
    		}else{
    			this.renderEmptyData();
    		}
    	},
    	zoomImage:function(){
    	
    	    $(".listFileIcon , .fileIcon").viewer({
				fullscreen:false,
				url : "dataImage",
				navbar: true
			});
    		
    	},
    	//绑定事件
    	bindTargetEvent:function(){
    		var me = this;
    		//列表
			$("div[dataClass=dataList]").click(function(){
    			var filePath = $(this).attr("filePath");
    			var type     = $(this).attr("dataType");
    			if(type=="disk" || type=="folder"){
    				me.gotoFileDir(filePath) ;
    			}else if("image"!= type ){
    			   var url = me.getDownloadFileUrl()+"&url="+filePath;
    			   $.downloadFile(url);
    			}
    		});
    		this.zoomImage();
    	},
    	renderEmptyData:function(){
    		$("#fileContiner").empty();
    		var emptyData = '<div class="emptyData" style="height:220px"></div>';
    		$("#fileContiner").append(emptyData);
    	},
    	//打开当前的文件夹
    	gotoFileDir:function(filePath){
    		if(filePath){
    			this.filePath = filePath;
        		this.getDiskFileList(filePath);
    		}
    	},
    	getFileDiv:function(fileRecord){
    		var formatType = this.getMapFormatType(); //图标支持格式类型
    		var fileName = fileRecord["name"] || "" , type = fileRecord["type"] || "",filePath = fileRecord["url"] || "",virthPath = fileRecord["virthPath"] || "";
    		var html = [],fileIconStr= "";
    		
    		//磁盘
    		if(type=="disk"){
    			fileIconStr = '<div class="fileIcon"><i class="x-item-file x-disk middle"></i></div>';
    		} else if(type=="folder"){
    			fileIconStr = '<div class="fileIcon"><i class="x-item-file x-folder middle"></i></div>';
    		}else {
    			//图片的支持
    			var formatSupport = "";
				var imageType = type.toUpperCase();
    			//如果是图片
    			if(this.isImageFile(imageType)){
    				type = "image";
    				var imgUrl = this.getVirthFileUrl()+virthPath;
    				var pngSrc = ctx + "/images/support/IMAGE.png";
    			    formatSupport = '<img src="'+pngSrc+'" style="width:64px;height:64px;" class="imageType" dataImage="'+imgUrl+'"/>';
    			}else if(formatType[imageType]){//文件图标支持
    				type = "file";
    			    var imagePath = ctx + "/images/support/" + imageType+".png";
    				formatSupport = '<i class="x-item-file x-file middle"  style="background-image:url('+imagePath+');"></i>';
    			}else{
    				type = "file";
    				formatSupport = '<i class="x-item-file x-file middle"></i>';
    			}
    			fileIconStr = '<div class="fileIcon">'+formatSupport+'</div>';
    		}
    		html.push('<div  class="fileBox" dataType="'+type+'" filePath="'+filePath+'" dataClass="dataList">');
    		html.push(fileIconStr);
    		html.push('<div class="fileName"><span class="title" >'+fileName+'</span></div>');
    		html.push('</div>');
    		var htmlstr= html.join("");	  
            return htmlstr;		
    	},
    	//
    	getListTable:function(index,fileRecord){
    		var fileName = fileRecord["name"] || "" , type = fileRecord["type"] || "",per = fileRecord["modfiyTime"],virthPath = fileRecord["virthPath"] || "",
    		filePath = fileRecord["url"] || "", size = fileRecord["size"] || "",modfiyTime = fileRecord["modfiyTime"];
    		var typeText= type == "disk"?"磁盘" : type == "folder"?"文件夹": type+"文件";
    		var formatType = this.getMapFormatType(); //图标支持格式类型
    		var fileNameText = "",fileType="";
    		if(type=="disk"){
    			var used = fileRecord["used"] || 0,total = fileRecord["total"] || 1;
    			var per = Math.floor((used/total)*100);
				fileNameText += '<div class="listFileIcon"><i class="x-item-file x-disk small"></i></div> ';
				fileNameText += '<span class="listFileText">'+fileName+'</span>';
				fileNameText += '<span class="processBar" title="'+per+'%"><div class="space_process"><div style="width:'+per+'%" class="space_process_use "></div></div></span>';
    		} else if(type=="folder"){
				fileNameText += '<div class="listFileIcon"><i class="x-item-file x-folder small"></i></div> ';
				fileNameText += '<span class="listFileText">'+fileName+'</span> ';
    		}else {
    			//图片的支持
    			var formatSupport = "";
				var imageType = type.toUpperCase();
				//如果是图片
    			if(this.isImageFile(imageType)){
    				type = "image";
    				var imgUrl = this.getVirthFileUrl()+virthPath;
    				var pngSrc = ctx + "/images/support/IMAGE.png";
    			    formatSupport = '<img src="'+pngSrc+'" style="width:24px;height:24px;" class="imageType" dataImage="'+imgUrl+'"/>';
    			}else if(formatType[imageType]){//文件图标支持
    				type = "file";
    			    var imagePath = ctx + "/images/support/" + imageType+".png";
    				formatSupport = '<i class="x-item-file x-file small"  style="background-image:url('+imagePath+');"></i>';
    			}else{
    				type = "file";
    				formatSupport = '<i class="x-item-file x-file small"></i>';
    			}
    			fileNameText += '<div class="listFileIcon">'+formatSupport+'</div> ';
				fileNameText += '<span class="listFileText">'+fileName+'</span> ';
    		}
    		
    		var html = [];
    		html.push('<div  class="listBox" dataType="'+type+'" filePath="'+filePath+'"  dataClass="dataList">');
    		html.push('		<div class="listFileNum">'+index+'</div>'); //序号
    		html.push('		<div class="listFileName">'+fileNameText+'</div>'); //文件名称
    		html.push('		<div class="listFileType">'+typeText+'</div>'); //类型
    		html.push('		<div class="listFileSize">'+size+'</div>'); //大小
    		html.push('		<div class="listFileTime">'+modfiyTime+'</div>'); //修改时间
    		html.push('</div>');
    		var htmlstr= html.join("");	  
            return htmlstr;
    	}
    };
    return fileMgr;
});
