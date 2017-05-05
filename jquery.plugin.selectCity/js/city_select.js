(function(){
	
		//默认配置
	var defaultOpt = {
	 	method : "get",
	 	dataUrl : "data/data{t}.json",
	 	dataParams: 0,
	 	showCity: true,
	 	offsetTop : 10,
	 	wrapWidth: 450,
	 	resultObj :"data",
	 	idField : "id",
	 	textField:"name",
	 	splitChar : "--",
	 	showDistrict:true
	};
	
	
	var citySelect= function(element, options){
		options = options || {};
		this.inputElement = $(element);
		this.options = $.extend({}, defaultOpt, options);
		this.rendered = true;
		this.provinceDataType = "province";
		this.cityDataType = "city";
		this.districtDataType = "district";
		this.noSelectCityTip = "请选择省份";
		this.noSelectDistrictTip = "请选择城市";
		this.cacheData={}; //缓存数据
		this.bugEnable =false;
		this.selectProvince = {};
		this.selectCity={};
		this.selectDistrict={};
		this.placeholder=  this.options["showDistrict"] ? '请选择省/市/区' :  '请选择省/市';
 		this.elementId= this.getUUId();
		this.initDistruct(); 
	}
	citySelect.prototype ={
		initDistruct:function(){
			var placeholder = $(this.inputElement).attr("placeholder");
			if(!placeholder){
				$(this.inputElement).attr("placeholder",this.placeholder);
			}
			this.initCompanet();
		},
		getElementId:function(){
			return this.elementId;
		},
		getCompantPanel :function(){
			 var option = this.options;
			 var htmlcode = [];
			 htmlcode.push('<div class="city-select-warpdown" style="left:0px;top:0px;" id="'+this.getElementId()+'">');
			 htmlcode.push('<div class="city-select-wrapper">');
			 
			 htmlcode.push('<div class="city-select-tab">');
			 htmlcode.push('<a class="active" distTab="province" eleType="tab" distCode="">省份</a>');
			 if(option["showCity"]){
			 	htmlcode.push('<a  distTab="city" distCode="" eleType="tab">城市</a>');
			 }
			 if(option["showDistrict"]){
			 	htmlcode.push('<a  distTab="district" distCode="" eleType="tab">区县</a>');
			 }
			 htmlcode.push('</div>');
			 
			 htmlcode.push('<span title="关闭" dataType="close" class="city-select-close">×</span>');
			 
			 htmlcode.push('<div class="city-select-content">');
			 htmlcode.push('<div class="city-select province" dataType="provincePanel" ></div>');
			 
			 if(option["showCity"]){
			 	htmlcode.push('<div class="city-select city" dataType="cityPanel" dataValue="1" style="display:none;"></div>');
			 }
			 if(option["showDistrict"]){
			 	htmlcode.push('<div class="city-select district" dataType="districtPanel" dataValue="2" style="display:none;"></div>');
			 }
			 htmlcode.push('</div>');
			 htmlcode.push('</div>');
			 return htmlcode.join("");
		},
		getWrapperDom:function(){
			return $("#"+this.getElementId());
		},
		initCompanet:function(){
			var me = this;
			//初始化dom元素
			var  htmlcode = this.getCompantPanel();
			this.dropdownWrapper = $(htmlcode);
			$("body").append(this.dropdownWrapper);
			$(this.inputElement).attr("inputDataClass","inputDataClass");
			//初始化位置
			var offset = $(this.inputElement).offset(), inputSize = this.getInputSize();
			var option = this.options;
			var topPix = offset.top + inputSize["height"] + option["offsetTop"];
			var leftPix = offset.left;
			var wrapWidth = option["wrapWidth"];
			this.dropdownWrapper.css({
				 left : leftPix,
				 top  : topPix,
				 width : wrapWidth
			});
			//初始化数据节点
			this.initProvince();
			//初始化事件绑定
			this.initEvent();
		},
		initProvince:function(){
			var provincePanel = this.getProvincePanel();
			var dataType = this.provinceDataType;
			//ajax请求
			this.ajaxHandler(provincePanel,function(data){
				var cfgPanel= {
					panel:provincePanel,
					list : data,
					dataType:dataType
				};
				this.renderData(cfgPanel);
			},this);
		},
		//加载数据
		showLoadMask:function(element,content){
			this.hideLoadMask(element);
			content  = content || "数据加载中...";
			$(element).css("cssText","position:relative !important");
			var maskDiv = $("<div dataClass='loadMaskProp'></div>");
			maskDiv.css("cssText","background-color:#e0e0e0; height: 100%;  left: 0; opacity: 0.2; overflow: hidden !important; position: absolute; top: 0; width: 100%; z-index: 9900;");
		    $(element).append(maskDiv);
		    var msgdiv = $('<div dataClass="loadMaskDig"></div>');
			msgdiv.css("cssText","z-index: 20001; position: absolute; top: 0; left: 0; border:1px solid #999999;  background: #EEEEEE; padding:2px;");
		    var labelDiv = $("<div >" + content + "</div>");
			labelDiv.css("cssText","padding:2px 10px;background: #fbfbfb none no-repeat scroll 5px 5px; line-height: 16px; border:1px solid #999999;color:#222; font:normal 11px tahoma, arial, helvetica, sans-serif;cursor:wait;");
		    msgdiv.append(labelDiv);
		    $(element).append(msgdiv);
		    var left = ($(element).width() - $(msgdiv).width())/2 ;
		    var top  = ($(element).height() - $(msgdiv).height())/2 ;
		    msgdiv.css("top",  parseInt(top) + 2);
			msgdiv.css("left", parseInt(left)+ 2);
		},
		hideLoadMask:function(element){
			var loadMaskProp = $(element).find("div[dataClass=loadMaskProp]");
			var loadmaskDig  = $(element).find("div[dataClass=loadMaskDig]");
		 	loadMaskProp.remove();
		 	loadmaskDig.remove();
		},
		//渲染省的数据
		renderData : function(option){
			var panel = option["panel"];
			var data  = option["list"];
			var dataType = option["dataType"];
			if(data && data.length >0 ){
			    var htmldom=[];
			    for (var i = 0; i < data.length; i++) {
		    	 	var record = data[i];
		    	 	var dataId= record["id"];
		    	 	var dataName = record["name"];
		    	 	var html = ['<a dataId="{dataId}" dataClass="dataSelect" dataType="{dataType}" dataName="{dataName}">{dataName}</a>'];
		    	 	html = html.join("").replace(/{dataId}/g,dataId).replace(/{dataName}/g,dataName).replace(/{dataType}/g,dataType);
		         	htmldom.push(html);
			    }
			    var htmlstr= htmldom.join("");
			    $(panel).append(htmlstr);
			    this.bindDataEvent(); //绑定事件
			}
		},
		getUUId : function(){
		    function S4() { return (((1+Math.random())*0x10000)|0).toString(16).substring(1).toUpperCase(); }    
			return (S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4());   
		},
		getInputSize : function(){
			return {
				width:$(this.inputElement).outerWidth() || 0,
				height: $(this.inputElement).height() || 0
			};
		},
		//
		isRenderDiv: function(){
			return $(this.getWrapperDom()).is(":hidden")?true:false;
		},
		//获取省的面板
		getProvincePanel:function(){
			return $(this.getWrapperDom()).find("div[dataType=provincePanel]");
		},
		//获取城市的面板
		getCityPanel:function(){
			return $(this.getWrapperDom()).find("div[dataType=cityPanel]");
		},
		//获取区县
		getDistrictPanel:function(){
			return $(this.getWrapperDom()).find("div[dataType=districtPanel]");
		},
		//获取当前激活的panel
		getActivePanel:function(){
			return this.activePanel;
		},
		ajaxHandler:function(panel,callback,scope){
		    var me= this;
		    var option =  this.options;
			var dataValue = $(panel).attr("dataValue") || "";
			var url= option["dataUrl"].replace("{t}",dataValue);
			$.getJSON(url,function(res){
				me.hideLoadMask(panel);
				var data = res[option["resultObj"]];
				if(callback){
					callback.apply(scope || this,[data,res]);
				}
			});
		},
		//清空panel数据 
		emptyPanelData:function(type){
			var tabCity = $(this.getWrapperDom()).find("a[distTab="+this.cityDataType+"]");
			var distTab = $(this.getWrapperDom()).find("a[distTab="+this.districtDataType+"]");
			if(type == 1){
				tabCity.attr("distcode",""); //城市的tab
				this.getCityPanel().empty(); //清除城市
			}else if(type == 2){
				distTab.attr("distcode",""); //乡镇的
				this.getDistrictPanel().empty();//清空区县的;
			}else{
				tabCity.attr("distcode",""); //城市的tab
				distTab.attr("distcode",""); //乡镇的
				this.getCityPanel().empty();
				this.getDistrictPanel().empty();
			}
		},
		//没有选中省获或者城市提示
		showNoSelectDataTip:function(type){
			var targetPanel = (type == this.cityDataType) ? this.getCityPanel(): (type == this.districtDataType) ? this.getDistrictPanel() : this.getProvincePanel();
			var msg = (type == this.districtDataType) ? this.noSelectDistrictTip : this.noSelectCityTip;
			var htmlStr = $("<div style='text-align:center;height:100%;width:100%;'>"+msg+"</div>");
			targetPanel.html(htmlStr);
		},
		isPanelHasData:function(tabPanel){
			var list = $(tabPanel).find("a[dataClass=dataSelect]");
			return (list && list.length> 0 ) ? true : false;
		},
		//tab切换
		activeTabPanel:function(type){
			//获取tab
		    this.tabTitle = this.getTabDom(type);
		    var distCode = this.tabTitle.attr("distcode"); //赋值
			$(this.tabTitle).addClass("active").siblings().removeClass("active");
			$(this.getWrapperDom()).find(".city-select").hide();
			//显示tab
			var targetPanel = (type == this.cityDataType) ? this.getCityPanel(): (type == this.districtDataType) ? this.getDistrictPanel() : this.getProvincePanel();
			targetPanel.show();
			//切换tab
			var dataType = (type == this.cityDataType) ? this.cityDataType: (type == this.districtDataType) ? this.districtDataType : this.provinceDataType;
			//省或者城市的时候才请求
			if(type == this.cityDataType || type == this.districtDataType ){
				//缓存
				if(!distCode){
					this.showNoSelectDataTip(type);
					return ;
				}
				var cfgPanel= {
					panel:targetPanel,
					dataType:dataType
				};
				//缓存判断
				if(this.cacheData[distCode]){
					var list = this.cacheData[distCode];
					cfgPanel["list"] = list;
					if(!this.isPanelHasData(targetPanel)){
					    this.renderData(cfgPanel);
					}
				}else{
					//渲染dom
					this.ajaxHandler(targetPanel,function(data){
						 this.cacheData[distCode] = data; //存放缓存数据
						 this.showLogs("把数据缓存起来............",this.cacheData);
						 cfgPanel["list"] = data;
						 this.renderData(cfgPanel);
					},this);
				}
			}
		},
		getCacheData :function(){
			return this.cacheData;
		},
		getActiveTab:function(){
			return this.tabTitle;
		},
		initEvent: function(){
			var me = this;
			//初始化绑定事件
			$(".city-select-warpdown").hide();
			$(this.inputElement).on("focus",function(e){
				$(".city-select-warpdown").hide();
				if(me.isRenderDiv()){
				   me.showPicker();
				}
			}).on("blur",function(){
				if(me.isRenderDiv()){
					me.hidePicker();
				}
			});
			//tab 事件
			$(this.getWrapperDom()).find(".city-select-tab a[eleType=tab]").click(function(){
				var targetPanel = $(this).attr("distTab");
				me.activeTabPanel(targetPanel);
			});
			
			$(document).unbind("click");
			$(document).click(function (e) { 
				var $target = $(e.target);
				var isPanel = $target.is(".city-select-warpdown,div.city-select-tab,div.city-select,a.active");
				var isInput = $target.attr("inputDataClass");
				console.log(isPanel,isInput);
				if(!isInput && !isPanel){
					console.log("click hide");
					me.hidePicker();
				}
			});
			//关闭
			$(this.getWrapperDom()).find("span[dataType=close]").click(function(){
				me.hidePicker();
			});
		},
		//
		getSelectProvince:function(){
			return this.selectProvince;
		},
		getSelectCityValue:function(){
			return this.selectCity;
		},
		getSelectDistrictValue:function(){
			return this.selectDistrict;
		},
		//调试的时候打印日志
		showLogs:function(){
			var argu = arguments;
			if(this.bugEnable){
				console.warn(argu[0],argu[1]);
			}
		},
		getTabDom:function(type){
			return $(this.getWrapperDom()).find("a[distTab="+type+"]");
		},
		//城市
		selectCityHandler:function(datacodeId){
			this.emptyPanelData(); //全部清空数据
			var tab = this.getTabDom(this.cityDataType); //城市的tab
			$(tab).attr("distcode",datacodeId); //赋值
		 	var targetTab = $(tab).attr("distTab");
		 	this.activeTabPanel(targetTab,true);
		},
		//区县
		selectDistrictHandler:function(datacodeId){
			this.emptyPanelData(2); //清空数据
			var tab = this.getTabDom(this.districtDataType); //城市的tab
		 	$(tab).attr("distcode",datacodeId); //赋值
		 	var targetTab = $(tab).attr("distTab");
		 	this.activeTabPanel(targetTab);
		},
		//显示选中
		showInputValue:function(){
			var prov= this.getSelectProvince();
			var city= this.getSelectCityValue();
			var dist = this.getSelectDistrictValue();
			var option =  this.options;
			var splitChar = option["splitChar"];
			$(this.inputElement).val('');
			var dataCode=[],dataText=[];
			dataText.push(prov["distName"]);
			dataCode.push(prov["distCode"]);
			//城市
		    if(option["showCity"] && city["distCode"]){
	    		dataText.push(splitChar);
	    		dataText.push(city["distName"]);
	    		dataCode.push(splitChar);
	    		dataCode.push(city["distCode"]);
		    }
		    //区县
		    if(option["showDistrict"] && dist["distCode"]){
	    		dataText.push(splitChar);
	    		dataText.push(dist["distName"]);
	    		dataCode.push(splitChar);
	    		dataCode.push(dist["distCode"]);
		    }
		    var textValue = dataText.join("");
		    var dataCodeValue = dataCode.join("");
		    $(this.inputElement).val(textValue);
		    $(this.inputElement).attr("readValue",dataCodeValue);
		    $(this.inputElement).attr("readText",textValue);
		},
		//暴露函数
		getValue:function(){
			var valData = {};
			var option =  this.options;
			valData["prov"] = this.getSelectProvince();
			if(option["showCity"]){
		    	valData["city"] = this.getSelectCityValue();
		    }
		    if(option["showDistrict"]){
		    	valData["dist"] = this.getSelectDistrictValue();
		    }
		    return valData;
		},
		setValue:function(config){
			console.log(config);
		},
		reset:function(){
            $(this.inputElement).val("").trigger('change');
		},
		destroy:function(){
			$(this.getWrapperDom()).remove();
		},
		showPicker:function(){
			$(this.getWrapperDom()).show();
			this.activeTabPanel(this.provinceDataType);
		},
		hidePicker:function(){
			console.log("hidePicker",$(this.getWrapperDom()));
			$(this.getWrapperDom()).hide();
		},
		//绑定选中的事件
		bindDataEvent:function(){
			var me = this;
			var option =  this.options;
			$(this.getWrapperDom()).find("a[dataClass=dataSelect]").unbind("click"); //取消
			$(this.getWrapperDom()).find("a[dataClass=dataSelect]").click(function(){
				 var target = $(this);
				 var datacodeId= target.attr("dataId") ;
				 var dataName  = target.attr("dataName");
				 var dataType = target.attr("dataType");
				 $(target).addClass("active").siblings().removeClass("active");
				 var selectData= {distCode:datacodeId,distName:dataName};
				 //打印日志
				 me.showLogs(selectData);
				 //如果选中的是省
				 if(dataType == me.provinceDataType){
				 	me.selectProvince = selectData;
				 	me.selectCity = {};
				 	me.selectDistrict ={};
				    if(option["showCity"]){
				 	    me.selectCityHandler(datacodeId);
				    }else{
				    	me.hidePicker();
				    }
				 }else if(dataType == me.cityDataType){ //如果选中的是城市
				 	me.selectCity = selectData;
				 	me.selectDistrict ={};
				 	if(option["showDistrict"]){
				 	    me.selectDistrictHandler(datacodeId);
				    }else{
				    	me.hidePicker();
				    }
				 }else{ //选中的
				 	 me.selectDistrict = selectData; //乡镇
				 	 me.hidePicker();
				 }
				 me.showInputValue(); //
			});
		}
	}
	
	Array.prototype.contains = function(item){
    	return RegExp(item).test(this);
	};
	
	$.fn.selectCity = function(option){
		 var supprtMethod=["setValue","getValue","destroy",'hidePicker','showPicker','reset'];
		 $(this).each(function (index,target) {
			var data  = $(target).data('plugin.selectCity');
			var options= typeof option == 'object' ? option:{};
      		if (!data){
      			data  = new citySelect($(target),options);
      			$(target).data('plugin.selectCity', data);
      		} 
		});
		if($(this).length==1){
			var data  = $(this).data('plugin.selectCity');
			if (typeof option == 'string' && data[option] && supprtMethod.contains(option)){
      			 return data[option].apply(data, Array.prototype.slice.call(arguments, 1));
      		} 
		}
	}
})()


