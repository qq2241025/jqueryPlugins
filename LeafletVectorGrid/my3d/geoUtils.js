var geoMap =  function(center,zoom){
	this.init.apply(this,arguments);
}
geoMap.prototype = {
	center : {
		 lng: 116.213461,
		 lat: 36.89214
	},
	toFixedNum : 8,
	zoom   : 4,
	mapSize : [0,0],
	init:function(config){
		config = config || {};
		var zoom    = config["zoom"] || this.zoom;
		var center  = config["center"] || {};
		var mapSize = config["mapSize"] || this.mapSize;
		if(!center["lat"] || !center["lat"]){
			return new error("invalid params");
		}
		this.mapSize = mapSize;
		this.zoom    = zoom;
		this.center  = center  || this.center;
		
		this.mercatorPix = this.lnglat2Pixel(this.center,zoom);
		this.origin = {
        x: this.mercatorPix["x"] - Math.round(mapSize[0] / 2),
        y: this.mercatorPix["y"] - Math.round(mapSize[1] / 2)
    };
	},
	getSize : function(){
		return this.mapSize;
	},
	getOriginXY:function(){
		 return this.origin;
	},
	getZoom : function(){
		return this.zoom;
	},
	setZoom : function(zoom){
		this.zoom = zoom;
	},
	getCenter :function(){
		return this.center;
	},
	setCenter :function(center){
		this.center = center;
	},
	lnglat2Pixel:function(lnglat,level){
		if(!lnglat||!level) return new Error("invalid params");
		var sinL = Math.sin(lnglat.lat * Math.PI/180);
		var pixelX = ((lnglat.lng + 180) / 360) * 256 * Math.pow(2,level);
		var pixelY = (0.5-Math.log((1+sinL)/(1-sinL)) / (4 * Math.PI)) * 256 * Math.pow(2,level);
		pixelX = new Number(pixelX).toFixed(this.toFixedNum);
		pixelY = new Number(pixelY).toFixed(this.toFixedNum);
		return {
				x: Math.round(pixelX),
				y: Math.round(pixelY),
				_type:"pixel"
			}
	},
	pixel2lnglat:function(pixel,level){
		if(!pixel||!level) return new Error("invalid params");
		var exp0 = Math.exp(4*Math.PI*(0.5-pixel.y/256/Math.pow(2,level)));
		var lng = pixel.x/256/Math.pow(2,level)*360 - 180;
		var lat = Math.asin((exp0-1)/(exp0+1))/Math.PI*180;
		lng = new Number(lng).toFixed(this.toFixedNum);
		lat = new Number(lat).toFixed(this.toFixedNum);
		return {
				lat:parseFloat(lat),
				lng:parseFloat(lng),
				_type:"lnglat"
		}
	},
	lngLatToContainer:function(lnglat,level){
		 if(!lnglat||!level) return new Error("invalid params");
		 var size  = this.getSize();
		 var width = size[0],height = size[1];
		 var mectorPix = this.lnglat2Pixel(lnglat,level);
		 var pointX = mectorPix["x"] - this.origin["x"] ;
		 var pointY = mectorPix["y"] - this.origin["y"] ;
		 var newXY = {
		 	  x : parseFloat(pointX),
		 	  y : parseFloat(pointY),
		 	  type : "containerPix"
		 }
		 return newXY;
	},
	containerXYTolngLat:function(pix,level){
		 if(!pixel||!level) return new Error("invalid params");
		 var newXY= {
		 	  x: this.origin["x"] + Math.round(pix["x"]) ,
		 	  y: this.origin["y"] + Math.round(pix["y"])
		 }
		 return this.pixel2lnglat(newXY,level);
	},
}