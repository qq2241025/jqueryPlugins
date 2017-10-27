(function($){
	var userAgent = navigator.userAgent.toLowerCase(); 
    $.browser = { 
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1], 
		safari: /webkit/.test( userAgent ), 
		opera: /opera/.test( userAgent ), 
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ), 
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) 
   }; 
	// 文字太多显示折叠
	$.fn.moreText = function(options){
		var defaults = {
			maxLength:50,
			openBtn:'显示全部',
			hiddenCollpse: false, //是否隐藏...
			closeBtn:'收起'
		}
		return this.each(function() {
			var opts = $.extend({},defaults,options);
			var maxLength = opts.maxLength;
			var TextBox  = $(this);
			var openBtn  = opts.openBtn;
			var closeBtn = opts.closeBtn;
			
			var countText = TextBox.html();
			countText = countText.replace(/<[^>]+>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/&nbsp;/ig, "");
			var newHtml = '';
			if(countText.length > maxLength){
				if(opts["hiddenCollpse"]){
					newHtml = countText.substring(0,maxLength)+"...";
				}else{
					newHtml = countText.substring(0,maxLength)+'...<a class="moreBtnLink" style="font-size:12px;color:blue;cursor:pointer;margin-left:3px">'+openBtn+'</a>';
				}
			}else{
				newHtml = countText;
			}
			TextBox.html(newHtml);
			TextBox.on("click",".moreBtnLink",function(){
				if($(this).text()== openBtn){
					TextBox.html(countText+'<a class="moreBtnLink" style="font-size:12px;color:blue;cursor:pointer;margin-left:3px">'+closeBtn+'</a>');
				}else{
					TextBox.html(newHtml);
				}
			})
		})
	}
	// 转换json/array为字符串
	$.extend({
		namespace: function() {
			var G = arguments.length, H = 0, E, F, e, J, I, K;
			for (; H < G; ++H) {
				e = arguments[H];
				J = arguments[H].split(".");
				K = window[J[0]];
				if (K === undefined) {
					K = window[J[0]] = {};
				}
				I = J.slice(1);
				E = I.length;
				for (F = 0; F < E; ++F) {
					K = K[I[F]] = K[I[F]] || {};
				}
			}
			return K;
		},
		downloadFile:function(url,params){
		    var removeCallBack = function(){
				$("#downloadIframe").remove();
				$("#iframeForm").remove();
			}
			removeCallBack();
	    	var iframe = $('<iframe id="downloadIframe" name="postIFrame" style="display:none;"></iframe>');
	    	var htmlcode  =[];
	    	htmlcode.push('<form id="iframeForm" method="post" style="display:none;height:0px;width:0px;" target="postIFrame">')
		    if(params){
		    	for (var key in params) {    
	                var input = '<input type="text" name="'+key+'" value="'+params[key]+'" />';  
	                htmlcode.push(input);
	            }
		    }
		    htmlcode.push('</form>');
		    download = $(htmlcode.join(""));
		    $("body").append(iframe);
	        $("body").append(download);
		    download.attr("action",url).submit();
		    window.setTimeout(function(){
		    	removeCallBack();
		    }, 5 * 1000);
		},
		toString:function(o) {
			var self = arguments.callee;
			var arr = [];
			var fmt = function(s) {
				if (typeof s == 'object' && s != null)
					return self(s);
				return /^(string|number)$/.test(typeof s) ? '"' + s + '"' : s;
			};
			if ($.isArray(o)) {
				for (var i = 0; i < o.length; i++) {
					arr.push(fmt(o[i]));
				}
				return '[' + arr.join(',') + ']';
			} else {
				for (var i in o) {
					arr.push('"' + i + '":' + fmt(o[i]));
				}
				return '{' + arr.join(',') + '}';
			}
		},
		getTextWidthHeight : function(text,fontSize){
			fontSize = fontSize || 12;
		    var span = $("<span style='visibility:hidden;fontSize:"+fontSize+"px;whiteSpace:nowrap;'>"+text+"</span>")
		    $("body").append(span);
		    var width  = span.get(0).offsetWidth;
		    var height = span.get(0).offsetHeight;
		    $(span).remove();
		    return {width:width,height:height};
		},
		GUID : function(){
		    function S4() { return (((1+Math.random())*0x10000)|0).toString(16).substring(1).toLowerCase(); }    
			return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());   
		},
		setCookie:function(key,val,day){
	        var date=new Date(); 
	        day =day || 10;
	        date.setTime(date.getTime()+day*24*3600*1000); //格式化为cookie识别的时间
			document.cookie=key+"="+val+"; expires="+date.toGMTString();
	    },
	    getCookie:function(key){
	        var cookies = document.cookie.replace(/[ ]/g,"");   
	        var arrCookie = cookies.split(";")   
	        var mapCahe = {}
	        for(var i=0;i<arrCookie.length;i++){    
	            var cookie= arrCookie[i].split("="); 
	            if(cookie){
	            	var cookieName = cookie[0];
	            	var cookieValue = cookie[1] || "";
	            	mapCahe[cookieName]=cookieValue;
	            }
	        }
	        return mapCahe[key] || "";
	     },
	     deleteCookie:function(key){
	         var date = new Date(); //获取当前时间
	         date.setTime(date.getTime()-10000); //将date设置为过去的时间
	         document.cookie = key+"=v; expires =" +date.toGMTString();//设置cookie
	    },
		asyncEach:function (list,fn,num,scope,interval,pushsize){
			if(!list || list.lengh == 0 || !fn ){
				return;
			}
			var len = list.length, num = num || 5, scope = scope || this, interval = interval || 1, start = pushsize || 0, pushsize = pushsize || 1, end = len > num ? start + num : len,
			process = function (l,s,e){
				for(var i = s;i < e;i++){
					if(fn.call(scope,list[i],i)===false){
						return;
					}
				}
				if(e == len) return;
				setTimeout(function(){
					process(l,e,len - e > num ? e+num : len);
				},interval);
			};
			process(list,start,end);
		},
		formatDate: function(date, fmt)
        {
            date = !date ? new Date() : date;
            date = typeof date == 'number' ? new Date(date) : date;
            fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
            var obj ={
                'y': date.getFullYear(), // 年份，注意必须用getFullYear
                'M': date.getMonth() + 1, // 月份，注意是从0-11
                'd': date.getDate(), // 日期
                'q': Math.floor((date.getMonth() + 3) / 3), // 季度
                'w': date.getDay(), // 星期，注意是0-6
                'H': date.getHours(), // 24小时制
                'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
                'm': date.getMinutes(), // 分钟
                's': date.getSeconds(), // 秒
                'S': date.getMilliseconds() // 毫秒
            };
            var week = ['天', '一', '二', '三', '四', '五', '六'];
            for(var i in obj)
            {
                fmt = fmt.replace(new RegExp(i+'+', 'g'), function(m)
                {
                    var val = obj[i] + '';
                    if(i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
                    for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
                    return m.length == 1 ? val : val.substring(val.length - m.length);
                });
            }
            return fmt;
        },
        /**
         * 将字符串解析成日期
         * @param str 输入的日期字符串，如'2014-09-13'
         * @param fmt 字符串格式，默认'yyyy-MM-dd'，支持如下：y、M、d、H、m、s、S，不支持w和q
         * @returns 解析后的Date类型日期
         */
        parseDate: function(str, fmt){
            fmt = fmt || 'yyyy-MM-dd';
            var obj = {y: 0, M: 1, d: 0, H: 0, h: 0, m: 0, s: 0, S: 0};
            fmt.replace(/([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g, function(m, $1, $2, $3, $4, idx, old)
            {
                str = str.replace(new RegExp($1+'(\\d{'+$2.length+'})'+$4), function(_m, _$1){
                    obj[$3] = parseInt(_$1);
                    return '';
                });
                return '';
            });
            obj.M--; // 月份是从0开始的，所以要减去1
            var date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s);
            if(obj.S !== 0) date.setMilliseconds(obj.S); // 如果设置了毫秒
            return date;
        },
        // 将一段时长转换成友好格式，如：147->“2分27秒” 1581->“26分21秒” 15818->“4小时24分”
        formatDurationToFriendly: function(second){
            if(second < 60) return second + '秒';
            else if(second < 60*60) return (second-second%60)/60+'分'+second%60+'秒';
            else if(second < 60*60*24) return (second-second%3600)/60/60+'小时'+Math.round(second%3600/60)+'分';
            return (second/60/60/24).toFixed(1)+'天';
        },
        //将时间转换成MM:SS形式 
        formatTimeToFriendly: function(second)
        {
            var m = Math.floor(second / 60);
            m = m < 10 ? ( '0' + m ) : m;
            var s = second % 60;
            s = s < 10 ? ( '0' + s ) : s;
            return m + ':' + s;
        }
    });
	
    

})(jQuery);

