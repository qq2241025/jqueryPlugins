(function($){
	/**
	 * author hzg
	 * @param {Object} target
	 * @param {Object} option
	 */
	var processSlider = function (target,option){
		 var defaultOpt = {
		     width : 300,
		     offsetLeft:-4,
		     minValue : 1,
		     maxVale : 100,
		     lineHeight : 8,
		     lineColor: "#ff4400", //#00AB65
		     barColor: "#ccc",
		     btnColor: "#00AB65",
		     btnHeight : 12,
		     onDrag : function(){}
		 };
		 this.renderTar = $(target);
		 this.option = $.extend({},defaultOpt, option);
		 var width = this.option["width"],
		 offsetLeft = this.option["offsetLeft"],
		 height = this.option["lineHeight"],
		 btnHeight = this.option["btnHeight"],
		 top = (height - btnHeight)/2;
		 
		 var barColor = this.option["barColor"],lineColor = this.option["lineColor"],btnColor = this.option["btnColor"];
		 this.procceeBar =  $('<div class="process_bar" style="background-color:'+barColor+';width:'+width+'px; height: '+height+'px; position: relative;border-radius: 8px; "></div>');
		 this.procceeline = $('<div class="process_line" style="background-color:'+lineColor+'; width: 0px; position: absolute;width: 0; left: 0; bottom: 0;height:'+height+'px;z-index:100;border-radius: 8px;"></div>');
		 this.procceeBtn =  $('<div class="process_btn" style="box-shadow: 0 0 5px #ccc;width:'+btnHeight+'px;height:'+btnHeight+'px;position:absolute;cursor:pointer;border-radius:'+btnHeight+'px;background-color:'+btnColor+';top:'+top+'px;left:'+offsetLeft+'px;z-index:200;"></div>');
		 this.procceeBar.append(this.procceeBtn);
		 this.procceeBar.append(this.procceeline);
		 
		 this.renderTar.append(this.procceeBar);
		 this.init.apply(this,arguments);
	};
	processSlider.prototype={
		init:function (){
			this.prc  = 0 ;
			this.currentValue =0 ;
			this.minValue = this.getOptions()["minValue"];
			this.maxValue = this.getOptions()["maxVale"];
			this.initWarpper();
		},
		getOptions:function(){
		   return this.option;
		},
		initWarpper:function(){
			var positionX = 0,pageAx = 0,me = this,offleft = this.option["offsetLeft"];
			var barWidth = $(this.procceeBar).width()-$(this.procceeBtn).width() - offleft
			$(this.procceeBtn).mousedown(function(e){
				 pageAx = e.pageX;
				 positionX = $(this).position().left;
				 $(document).mousemove(function(e){
				 	  moveX = positionX + e.pageX- pageAx;
				 	  moveX = moveX <=0 ? 0 : moveX;
				 	  moveX = moveX >=barWidth ? barWidth : moveX;
				 	  
				 	  var prc = moveX / barWidth ;
				 	  var maxValue = me.getMaxValue();
				 	  me.procceeBtn.css("left",moveX+offleft);
				 	  me.prc = Math.round(Math.max(0,prc * 100));
				 	  me.procceeline.css("width",me.prc+"%");
				 	  
				 	  me.currentValue = Math.round(prc * maxValue);
				 	  me.ondrag(e,me.currentValue,maxValue);
				});
				$(document).mouseup(function(){
					$(document).unbind("mousemove");
				});
			})
		},
		getPrc:function(){
		   return this.prc;
		},
		getMaxValue : function(){
			return this.maxValue;
		},
		getMinValue : function(){
			return this.minValue;
		},
		setMinValue : function(val){
		    this.minValue = val;
		},
		setMaxValue:function(val){
		    this.maxValue = val;
		},
		getValue : function(){
			return this.currentValue;
		},
		setValue : function(val){
			var offleft = this.option["offsetLeft"];
		    var maxVal = this.getMaxValue();
		    var minVal = this.getMinValue();
		    val = val >= maxVal ? maxVal : val;
		    val = val <= minVal ? minVal : val;
		    this.currentValue= val;
		    this.prc =  val / maxVal;
		    var barWidth = $(this.procceeBar).width();
		    this.procceeline.css("width",Math.round(Math.max(0,this.prc * 100))+"%");
		    var width = Math.round(barWidth*this.prc)+offleft;
		    this.procceeBtn.css("left",width);
		},
		ondrag:function (value,prc){
			var option = this.getOptions();
			var ondrag = option["ondrag"];
			if(ondrag && $.isFunction(ondrag)){
				ondrag.apply(this,arguments);
			}
		}
	}
	
	$.fn.processSlider = function(option){
		var argu = Array.prototype.slice.call(arguments, 1);
		var returns=null;
		this.each(function () {
			var data    = $(this).data('jquery.processSlider');
			var options = typeof option == 'object' ? option:{};
      		if (!data){
      			data = new processSlider($(this), options);
      			$(this).data('jquery.processSlider', data);
      		} 
      		if (typeof option == 'string' && data[option] && $.isFunction(data[option]) ){
      			 returns = data[option].apply(data, argu);
      			 console.info(returns);
      		} 
		});
		return returns || this;
	}
	
})(jQuery);

