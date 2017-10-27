(function(){
	
	
	GAS.MainFrameUI = {
		LoginOut      : ctx + "/logout?dc="+ new Date().getTime(),
		loginPage     : ctx + "/login?dc="+ new Date().getTime(),
		//获取卖家的税点
	    initBoot:function(){
	    	
	    	 this.initTips();
	    	 
	    	 this.initStartPage(); //启动的第一个页面
	    	 
	    	 var me = this;
	         $(".submenu li").click(function(){
	             	var dataModuleId   = $(this).attr("dataModuleId");
	             	var dataModuleUrl  = $(this).attr("dataModuleUrl");
	             	var dataModuleName = $(this).attr("dataModuleName");
	             	me.openNewMod(dataModuleUrl,dataModuleName);
	         });
	         //退出系统
	         $("#userQuit").click(function(){
	         		me.quitSystem();
	         });
	       
	         //修改密码
	         $("#updateUserPass").click(function(){
	             	me.updateuserPass();
	         });
	    },
	    initScrollBar:function(){
	    	
	    	$("#mainWrapper").slimScroll({
	            width: 'auto', //可滚动区域宽度
	            height: '100%', //可滚动区域高度
	            alwaysVisible: true //是否 始终显示组件
	        });
	    	
	    },
	    initStartPage: function(){
	    	var url = ctx + "/fileMgr",name="在线文件管理";
	    	this.openNewMod(url,name);
	    },
	    initTips:function(){
	    	var list = $("[data-toggle=tooltip]");
	    	if(list && list.length> 0){
	    	     $(list).tooltip({ placement:"top" });
	    	}
	    },
	    //修改密码
	    updateuserPass:function(){
	    	require(['mainFrame/updatePass'], function(mod){
				mod.init();
			});
	    },
	     //退出
	    quitSystem:function(){
	    	var me = this;
	        $.msgBoxDiy.confirm({
			    msgText : "你确定退出该系统吗?",
			    scope: this,
			    okHandler :function(res){
			         $.getJSON(me.LoginOut,function(res){
			             if(res["success"]){
			             	 window.location.href = me.loginPage;
			             }else{
			             	$.msgBoxDiy.alert({msgText:"退出失败"});
			             }
			         });
			    }
		    });
	    },
	    //直接打开，不需要验证的
	    openMenuWithOutPermission :function(url,name){
	    	 var me = this;
	    	 $("#rigthContent").empty();
	    	 //如果传递了值需要在后面追加面包屑
	    	 var me = this;
	         $.get(url,function(data){
				 $("#rightConent").html(data);
			 });
	    },
	    //打开新的模块
	    openNewMod: function(url,name){ //isTab 表示是否添加第三级面包屑
    	 	 this.openMenuWithOutPermission(url,name);
	    } 
	}
	
	
})();

$(document).ready(function(){
	GAS.MainFrameUI.initBoot();
});
