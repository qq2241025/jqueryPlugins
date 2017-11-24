(function() {
    var e = void 0,
    o = null;
    function s() {
        return function() {}
    }
    function v(a) {
        return function() {
            return this[a]
        }
    }
    var w = {
        Conf: {
            _version: "3.1.2-1212",
            _verify: !0,
            crs: "EPSG:3857",
            _server: "http://118.190.15.143:8081/",
            _client: "http://118.190.15.143:8082/jsmap/",
            _plugin: "http://118.190.15.143:8081/webapi/plugin",
            center: {
                lng: 116.400339,
                lat: 39.906473,
                _type: "lnglat"
            },
            level: 13,
            zooms: [3, 18],
            limit: {},
            mapUrl: "http://gis.fujianlbs.com:8082/maptile/maptile?x=[x]&y=[y]&z=[z]",
            satelliteUrl: "http://si.mapabc.com/appmaptile?x=[x]&y=[y]&z=[z]&lang=zh_cn&size=1&scale=1&style=6",
            tmcUrl: "http://tm.mapabc.com/trafficengine/mapabc/traffictile?v=1.0&t=1&zoom=[z]&x=[x]&y=[y]",
            dragEnable: !0,
            zoomEnable: !0,
            keyboardEnable: !0,
            jogEnable: !0,
            doubleClickZoom: !0,
            continuousZoomEnable: !0,
            frameZoomEnable: !0,
            scrollWheel: !0,
            autoPanby: !1,
            isDragging: !1,
            _copyright: 'JavaScript API &copy; <a href="http://www.amap.com" target="_blank">\u9ad8\u5fb7\u8f6f\u4ef6</a>  \u5ba1\u56fe\u53f7GS\uff082012\uff096034'
        }
    };
    function z() {
        function a() {
            arguments && arguments[0] != z.Ac && this.initialize.apply(this, arguments)
        }
        for (var b = {},
        c, d = 0,
        f = arguments.length; d < f; ++d) {
            if (typeof arguments[d] == "function") {
                if (d == 0 && f > 1) c = arguments[d].prototype.initialize,
                arguments[d].prototype.initialize = s(),
                b = new arguments[d],
                c === e ? delete arguments[d].prototype.initialize: arguments[d].prototype.initialize = c;
                c = arguments[d].prototype
            } else c = arguments[d];
            B(b, c)
        }
        a.prototype = b;
        return a
    }
    z.Ac = s();
    function B(a) {
        for (var b = Array.prototype.slice.call(arguments, 1), c = 0, d = b.length, f; c < d; c++) {
            f = b[c] || {};
            for (var g in f) f.hasOwnProperty(g) && (a[g] = f[g])
        }
        return a
    }
    w.LatSegment = z({
        _type: "LatSegment",
        min: 0,
        max: 0,
        initialize: function(a, b) {
            if (a > b) var c = a,
            a = b,
            b = c;
            this.min = a;
            this.max = b
        },
        contains: function(a) {
            return a >= this.min && a <= this.max
        },
        isEmpty: function() {
            return this.min > this.max
        },
        extend: function(a) {
            if (this.isEmpty()) this.max = this.min = a;
            else if (a < this.min) this.min = a;
            else if (a > this.max) this.max = a
        }
    });
    w.LngSegment = z({
        _type: "LngSegment",
        min: 0,
        max: 0,
        initialize: function(a, b) {
            if (a == -Math.PI && b != Math.PI) a = Math.PI;
            if (b == -Math.PI && a != Math.PI) b = Math.PI;
            if (a > b) var c = a,
            a = b,
            b = c;
            this.min = a;
            this.max = b
        },
        isEmpty: function() {
            return this.min - this.max == 2 * Math.PI
        },
        Ec: function() {
            return this.min > this.max
        },
        contains: function(a) {
            if (a == -Math.PI) a = Math.PI;
            return this.Ec() ? (a >= this.min || a <= this.max) && !this.isEmpty() : a >= this.min && a <= this.max
        },
        extend: function(a) {
            if (!this.contains(a)) this.isEmpty() ? this.min = this.max = a: this.Pb(a, this.min) < this.Pb(this.max, a) ? this.min = a: this.max = a
        },
        Pb: function(a, b) {
            var c = b - a;
            return c >= 0 ? c: b + Math.PI - (a - Math.PI)
        }
    });
    w.Bounds = z({
        _type: "bounds",
        southwest: {},
        northeast: {},
        Ha: {},
        wa: {},
        initialize: function(a, b) {
            if (! (a instanceof w.LngLat)) throw Error("MMap.Bounds<sw>\u53c2\u6570\u65e0\u6548");
            if (! (b instanceof w.LngLat)) throw Error("MMap.Bounds<ne>\u53c2\u6570\u65e0\u6548");
            if (a != o) {
                this.Ha = new w.LatSegment(w.Util.ia(a.lat * (Math.PI / 180), -Math.PI / 2, Math.PI / 2), w.Util.ia(b.lat * (Math.PI / 180), -Math.PI / 2, Math.PI / 2));
                var c = a.lng * (Math.PI / 180),
                d = b.lng * (Math.PI / 180);
                d - c >= Math.PI * 2 ? this.wa = new w.LngSegment( - Math.PI, Math.PI) : (c = w.Util.Sb(c, -Math.PI, Math.PI), d = w.Util.Sb(d, -Math.PI, Math.PI), this.wa = new w.LngSegment(c, d))
            } else this.Ha = new w.LatSegment(1, -1),
            this.wa = new w.LngSegment(Math.PI, -Math.PI);
            this.southwest = a;
            this.northeast = b
        },
        intersects: function(a, b) {
            b == o && (b = !0);
            var c = !1,
            d = this.southwest,
            f = this.northeast,
            g = a.southwest,
            j = a.northeast,
            h = d.lng == j.lng || f.lng == g.lng || f.lat == g.lat || d.lat == j.lat;
            if (b || !h) var c = j.lat >= d.lat && j.lat <= f.lat || f.lat > g.lat && f.lat < j.lat,
            h = g.lng >= d.lng && g.lng <= f.lng || d.lng >= g.lng && d.lng <= j.lng,
            k = j.lng >= d.lng && j.lng <= f.lng || f.lng >= g.lng && f.lng <= j.lng,
            c = (g.lat >= d.lat && g.lat <= f.lat || d.lat >= g.lat && d.lat <= j.lat || c) && (h || k);
            return c
        },
        inBounds: function(a) {
            return this.Ha.contains(a.lat * (Math.PI / 180)) && this.wa.contains(a.lng * (Math.PI / 180))
        },
        getCenter: function() {
            return new w.LngLat((this.southwest.lng + this.northeast.lng) / 2, (this.southwest.lat + this.northeast.lat) / 2)
        },
        extend: function(a) {
            this.Ha.extend(a.lat * (Math.PI / 180));
            this.wa.extend(a.lng * (Math.PI / 180));
            this.southwest = new w.LngLat(this.kb(this.wa.min), this.kb(this.Ha.min));
            this.northeast = new w.LngLat(this.kb(this.wa.max), this.kb(this.Ha.max))
        },
        kb: function(a) {
            return a / (Math.PI / 180)
        }
    });
    w.Bounds.prototype.toString = function() {
        return this.southwest.toString() + ";" + this.northeast.toString()
    };
    w.LngLat = z({
        _type: "lnglat",
        lng: 0,
        lat: 0,
        initialize: function(a, b) {
            if (isNaN(a)) throw Error("MMap.LngLat<lng>\u53c2\u6570\u65e0\u6548:" + a + "\r");
            if (isNaN(b)) throw Error("MMap.LngLat<lat>\u53c2\u6570\u65e0\u6548:" + b + "\r");
            this.lng = Number(Number(a).toFixed(8));
            this.lat = Number(Number(b).toFixed(8))
        }
    });
    w.LngLat.prototype.toString = function() {
        return this.lng + "," + this.lat
    };
    w.Pixel = z({
        _type: "pixel",
        x: 0,
        y: 0,
        initialize: function(a, b) {
            if (isNaN(a)) throw Error("MMap.Pixel<x>\u53c2\u6570\u65e0\u6548:" + a + "\n");
            if (isNaN(b)) throw Error("MMap.Pixel<y>\u53c2\u6570\u65e0\u6548:" + b + "\n");
            this.x = parseInt(Number(a)) ;
            this.y = parseInt(Number(b)) ;
        }
    });
    w.Pixel.prototype.toString = function() {
        return this.x + "," + this.y
    };
    w.Size = z({
        _type: "size",
        width: 0,
        height: 0,
        initialize: function(a, b) {
            if (isNaN(a)) throw Error("MMap.Size<width>\u53c2\u6570\u65e0\u6548\n" + a);
            if (isNaN(b)) throw Error("MMap.Size<height>\u53c2\u6570\u65e0\u6548\n" + b);
            this.width = Number(a);
            this.height = Number(b)
        }
    });
    w.TileLayer = z(w.Conf, {
        _type: "tilelayer",
        initialize: function(a) {
            this.id = "t" + w.Util.guid();
            this.tileSize = 256;
            this.tileUrl = "";
            this.errorUrl = (w.Conf._client || this._client) + "Images/blank.gif";
            this.opacity = this.zIndex = 1;
            this.refresh = 0;
            this.alphaHack = !1;
            this.q = {};
            this.Ta = o;
            this.Fb = !!window.ActiveXObject && !window.XMLHttpRequest;
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            a = document.createElement("div");
            a.id = this.id;
            a.style.cssText = "position:absolute;left:0px;top:0px;z-index:" + this.zIndex;
            this.s = a;
            return this
        },
        getTileSize: v("tileSize"),
        getTileUrl: function(a, b, c) {
            var d = this.tileUrl || w.Conf.mapUrl;
            this.refresh && (d = d + "&timestamp=" + (new Date).valueOf());
            var f = d.match(/\{.*\}/);
            if (f) var g = f.toString().replace("{", "").replace("}", ""),
            g = g.split(","),
            g = g[Math.floor(Math.random() * g.length)],
            d = d.replace(f, g);
            return d.replace("[x]", a).replace("[y]", b).replace("[z]", c)
        },
        Ca: function(a, b, c, d, f) {
            function g() {
                if (l.q && l.q[j]) {
                    h.src = k.src;
                    window.clearTimeout(m.v.Ga);
                    var a = function() {
                        m.contains.cac.style.visibility = "hidden";
                        a = m = l = o
                    };
                    m.v.Ga = setTimeout(a, 600);
                    m.c(l, "complete", l)
                }
                k.onload = o;
                g = k.onerror = o
            }
            var j = a + "." + b,
            d = (this.tileSize * d - this.H.h.x).toFixed(1),
            f = (this.tileSize * f - this.H.h.y).toFixed(1),
            h = document.createElement("img"),
            k = document.createElement("img");
            h.className = "css-3d-bug-fix-hack";
            h.style.cssText = "width:" + this.tileSize + "px;height:" + this.tileSize + "px;position:absolute;";
            h.style.left = d + "px";
            h.style.top = f + "px";
            if (this.opacity != 1) this.H.isIE ? h.style.filter = "alpha(opacity=" + this.opacity * 100 + ")": h.style.opacity = this.opacity;
            this.Fb && h.setAttribute("galleryimg", "no");
            h.src = this.errorUrl;
            k.src = this.getTileUrl(a, b, c);
            w.Util.userSelect(h);
            this.q[j] = {
                x: a,
                y: b,
                left: d,
                top: f,
                T: h
            };
            this.s.appendChild(h);
            var l = this,
            m = this.H;
            if (this.alphaHack && this.Fb) h.onload = function() {
                l.tile_fixPNG(this);
                h.onload = o
            };
            k.complete ? g() : k.onload = g;
            k.onerror = function() {
                k.src = l.errorUrl;
                k.onload = k.onerror = o
            }
        },
        tile_fixPNG: function(a) {
            var b = parseFloat(navigator.appVersion.split("MSIE")[1]);
            if (b >= 5.5 && b < 7) a.outerHTML = "<span " + (a.id ? "id='" + a.id + "' ": "") + (a.className ? "class='" + a.className + "' ": "") + (a.title ? "title='" + a.title + "' ": "title='" + a.alt + "' ") + ' style="width:' + a.width + "px; height:" + a.height + "px;" + ("display:inline-block;" + a.style.cssText) + ";filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a.src + "', sizingMethod='scale');\"></span>"
        },
        cb: function(a) {
            if (this.q) {
                if (this.q[a] && this.q[a].T.parentNode) this.q[a].T.parentNode.removeChild(this.q[a].T),
                this.q[a].T = o;
                this.q[a] = o;
                delete this.q[a]
            }
        },
        ab: function() {
            this.H.contains.lay.removeChild(this.s);
            this.q = o;
            window.clearInterval(this.Ta);
            delete this.q
        },
        hide: function() {
            this.s.style.visibility = "hidden"
        },
        show: function() {
            this.s.style.visibility = "visible"
        },
        setzIndex: function(a) {
            this.zIndex = a;
            this.s.style.zIndex = a
        },
        setOpacity: function(a) {
            this.opacity = a;
            for (var b in this.q) {
                var c = this.q[b].T;
                this.H.isIE ? c.style.filter = "alpha(opacity=" + a * 100 + ")": c.style.opacity = a
            }
        },
        getTiles: function() {
            var a = [],
            b;
            for (b in this.q) a.push(b);
            return a
        }
    });
    w.TileLayer.Satellite = z(w.Conf, w.TileLayer, {
        _type: "tilelayer.satellite",
        initialize: function(a) {
            this.id = "t" + w.Util.guid();
            this.tileSize = 256;
            this.tileUrl = w.Conf.satelliteUrl || this.satelliteUrl;
            this.errorUrl = (w.Conf._client || this._client) + "Images/blank.gif";
            this.opacity = this.zIndex = 1;
            this.ub = this.vb = this.refresh = 0;
            this.q = {};
            this.Ta = o;
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            a = document.createElement("div");
            a.id = this.id;
            a.style.cssText = "position:absolute;left:0px;top:0px;z-index:" + this.zIndex;
            this.s = a;
            return this
        }
    });
    w.TileLayer.Tmc = z(w.Conf, {
        _type: "tilelayer.tmc",
        initialize: function(a) {
            this.id = "t" + w.Util.guid();
            this.tileSize = 256;
            this.tileUrl = w.Conf.tmcUrl;
            this.errorUrl = (w.Conf._client || this._client) + "Images/blank.gif";
            this.opacity = this.zIndex = 1;
            this.refresh = a.refresh || 3E4;
            this.ub = this.vb = 0;
            this.q = {};
            this.Ta = o;
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            a = document.createElement("div");
            a.id = this.id;
            a.style.cssText = "position:absolute;left:0px;top:0px;z-index:" + this.zIndex;
            this.s = a;
            return this
        },
        getTileSize: v("tileSize"),
        getTileUrl: function(a, b, c) {
            var d = this.tileUrl || w.Conf.mapUrl;
            this.refresh && (d = d + "&timestamp=" + (new Date).valueOf());
            var f = d.match(/\{.*\}/);
            if (f) var g = f.toString().replace("{", "").replace("}", ""),
            g = g.split(","),
            g = g[Math.floor(Math.random() * g.length)],
            d = d.replace(f, g);
            return d.replace("[x]", a).replace("[y]", b).replace("[z]", 17 - c)
        },
        Ca: function(a, b, c, d, f) {
            function g() {
                if (l.q && l.q[j]) l.vb++,
                h.src = k.src,
                window.clearTimeout(m.v.Ga),
                m.v.Ga = setTimeout(function() {
                    m.contains.cac.style.visibility = "hidden"
                },
                600),
                m.c(l, "complete", l)
            }
            var j = a + "." + b,
            d = (this.tileSize * d - this.H.h.x).toFixed(1),
            f = (this.tileSize * f - this.H.h.y).toFixed(1),
            h = document.createElement("img"),
            k = document.createElement("img");
            h.className = "css-3d-bug-fix-hack";
            h.style.cssText = "width:" + this.tileSize + "px;height:" + this.tileSize + "px;position:absolute;";
            h.style.left = d + "px";
            h.style.top = f + "px";
            if (this.opacity != 1) this.H.isIE ? h.style.filter = "alpha(opacity=" + this.opacity * 100 + ")": h.style.opacity = this.opacity;
            h.src = this.errorUrl;
            k.src = this.getTileUrl(a, b, c);
            w.Util.userSelect(h);
            this.q[j] = {
                x: a,
                y: b,
                left: d,
                top: f,
                T: h
            };
            this.ub++;
            var l = this,
            m = this.H;
            k.complete ? g() : k.onload = g;
            k.onerror = function() {
                k.src = l.errorUrl
            };
            this.s.appendChild(h);
            g = o
        },
        cb: function(a) {
            this.q[a] && this.q[a].T.parentNode && (this.q[a].T.parentNode.removeChild(this.q[a].T), this.vb--);
            this.q[a] = o;
            delete this.q[a];
            this.ub--
        },
        ab: function() {
            this.H.contains.lay.removeChild(this.s);
            this.q = o;
            window.clearInterval(this.Ta);
            delete this.q
        },
        hide: function() {
            this.s.style.visibility = "hidden"
        },
        show: function() {
            this.s.style.visibility = "visible"
        },
        setzIndex: function(a) {
            this.zIndex = a;
            this.s.style.zIndex = a
        },
        setOpacity: function(a) {
            this.opacity = a;
            for (var b in this.q) {
                var c = this.q[b].T;
                this.H.isIE ? c.style.filter = "alpha(opacity=" + a * 100 + ")": c.style.opacity = a
            }
        },
        getTiles: function() {
            var a = [],
            b;
            for (b in this.q) a.push(b);
            return a
        }
    });
    w.WMSLayer = z(w.Conf, {
        _type: "wmslayer",
        initialize: function(a) {
            this.id = "t" + w.Util.guid();
            this.errorUrl = (w.Conf._client || this._client) + "Images/blank.gif";
            this.opacity = this.zIndex = 1;
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            a = document.createElement("div");
            a.id = this.id;
            a.style.cssText = "position:absolute;left:0px;top:0px;z-index:" + this.zIndex;
            this.s = a;
            return this
        },
        getTileUrl: function(a) {
            var b = this.H;
            return "http://vmap0.tiles.osgeo.org/wms/vmap0?LAYERS=basic&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&FORMAT=image%2Fjpeg&SRS=EPSG%3A4326&BBOX=" + [a.Ic.Cc, a.Ic.Bc, a.Dc.Cc, a.Dc.Bc].join(",") + "&WIDTH=" + b.width + "&HEIGHT=" + b.height
        },
        Ca: function() {
            function a() {
                setTimeout(function() {
                    f.style.visibility = "visible"
                },
                300);
                window.clearTimeout(d.v.Ga);
                d.v.Ga = setTimeout(function() {
                    d.contains.cac.style.visibility = "hidden";
                    f.style.visibility = "visible"
                },
                500);
                d.c(c, "complete", c)
            }
            var b = this.s,
            c = this,
            d = this.H,
            f;
            b.hasChildNodes() ? (f = b.children[0], f.style.visibility = "hidden", f.src = "") : (f = document.createElement("img"), f.style.cssText = "width:" + d.width + "px;height:" + d.height + "px;position:absolute;visibility:hidden;", w.Util.userSelect(f), this.H.isIE ? f.style.filter = "alpha(opacity=" + this.opacity * 100 + ")": f.style.opacity = this.opacity);
            f.style.left = -d.A.x + "px";
            f.style.top = -d.A.y + "px";
            var g = d.getBounds();
            f.src = this.getTileUrl(g);
            b.appendChild(f);
            f.complete ? a() : f.onload = a;
            f.onerror = s();
            this.s.appendChild(f)
        },
        ab: function() {
            this.H.contains.lay.removeChild(this.s);
            this.H.unbind(this.H, "dragend", this.m)
        },
        hide: function() {
            this.s.style.display = "none"
        },
        show: function() {
            this.s.style.display = "block"
        },
        setzIndex: function(a) {
            this.zIndex = a;
            this.s.style.zIndex = a
        },
        setOpacity: function(a) {
            this.opacity = a;
            this.H.isIE ? this.s.children[0].style.filter = "alpha(opacity=" + a * 100 + ")": this.s.children[0].style.opacity = a
        }
    });
    w.Util = {
        isIE: /msie/i.test(navigator.userAgent),
        isIE9: /msie 9.0/i.test(navigator.userAgent),
        userSelect: function(a) {
            "WebkitUserSelect" in document.documentElement.style ? a.style.WebkitUserSelect = "none": "MozUserSelect" in document.documentElement.style ? a.style.MozUserSelect = "none": "OUserSelect" in document.documentElement.style ? a.style.Lc = "none": "msUserSelect" in document.documentElement.style ? a.style.ad = "none": a.unselectable = "on"
        },
        wc: function(a) {
            return document.getElementById(a)
        },
        arraySearch: function(a, b) {
            for (var c = 0; c < b.length; c++) if (a == b[c]) return c;
            return ! 1
        },
        fixPng: function(a) {
            if (a.width != 0) a.outerHTML = '<div style="filter:progid:DXImageTransform.Microsoft.Matrix(sizingmethod=\'auto expand\')"><span style="width:' + a.width + "px;height:" + a.height + "px;display:inline-block;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a.src + "',sizingMethod='scale');\"></span></div>";
            else {
                var b = new Image;
                b.src = a.src;
                a.outerHTML = '<div style="filter:progid:DXImageTransform.Microsoft.Matrix(sizingmethod=\'auto expand\')"><span style="width:' + b.width + "px;height:" + b.height + "px;display:inline-block;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a.src + "',sizingMethod='scale');\"></span></div>"
            }
        },
        pageSize: function(a) {
            return new w.Size(a.clientWidth || document.body.clientWidth, a.clientHeight || (this.isIE ? document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight: document.body.clientHeight: self.innerHeight))
        },
        guid: function() {
            return Math.round(Math.random() * 1E5)
        },
        mb: function(a) {
            for (var b in a) return ! 0;
            return ! 1
        },
        cookieEnabled: function() {
            return navigator.cookieEnabled && w.Conf._cookie
        },
        interpolate: function(a, b, c) {
            c = Math.max(0, Math.min(1, c));
            if (c <= 0) return b;
            else if (c >= 1) return a;
            return {
                x: parseInt(b.x - c * (b.x - a.x)),
                y: parseInt(b.y - c * (b.y - a.y))
            }
        },
        transform: function() {
            for (var a = ["WebkitTransform", "MozTransform", "OTransform", "msTransform"], b = 0; b < a.length; b++) if (a[b] in document.documentElement.style) return a[b];
            return ! 1
        },
        ia: function(a, b, c) {
            b != 0 && (a = Math.max(a, b));
            c != 0 && (a = Math.min(a, c));
            return a
        },
        Sb: function(a, b, c) {
            for (; a > c;) a -= c - b;
            for (; a < b;) a += c - b;
            return a
        },
        Nb: function() {
            w.Util.isIE && CollectGarbage()
        },
        Y: function(a, b) {
            return function() {
                b.apply(a, arguments)
            }
        },
        getDrawPoint: function(a, b) {
            var a = a || window.event,
            c = a.pageX || a.clientX,
            d = a.pageY || a.clientY,
            b = this.getOffset(b);
            c -= b.left;
            d -= b.top;
            return {
                x: c,
                y: d,
                offsetX: c,
                offsetY: d
            }
        },
        getOwnerDocument: function(a) {
            return a.nodeType == 9 ? a: a.ownerDocument || a.document
        },
        getOffset: function(a) {
            var b = this.getOwnerDocument(a),
            c = {
                left: 0,
                top: 0
            };
            if (a.getBoundingClientRect) a = a.getBoundingClientRect(),
            c.left = a.left + Math.max(b.documentElement.scrollLeft, b.body.scrollLeft),
            c.top = a.top + Math.max(b.documentElement.scrollTop, b.body.scrollTop),
            c.left -= b.documentElement.clientLeft,
            c.top -= b.documentElement.clientTop,
            c.left -= 2,
            c.top -= 2;
            c.offsetX = c.left;
            c.offsetY = c.top;
            return c
        }
    };
    w.$ = w.Util.wc;
    var Event = {
        isIE: /msie/i.test(navigator.userAgent),
        isIE6: /msie 6.0/i.test(navigator.userAgent),
        isIE8: /msie 8.0/i.test(navigator.userAgent),
        isIE9: /msie 9.0/i.test(navigator.userAgent),
        isWebkit: /webkit/i.test(navigator.userAgent),
        isGecko: /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent),
        isOpera: /opera/i.test(navigator.userAgent),
        Xc: function() {
            return !! document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1")
        },
        addEvent: function(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
        },
        removeEvent: function(a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = o
        },
        formatEvent: function(a) {
            if (this.isIE) {
                a.charCode = a.type == "keypress" ? a.keyCode: 0;
                a.eventPhase = 2;
                a.isChar = a.charCode > 0;
                a.pageX = a.clientX + document.body.scrollLeft;
                a.pageY = a.clientY + document.body.scrollTop;
                a.preventDefault = function() {
                    this.returnValue = !1
                };
                if (a.type == "mouseout") a.relatedTarget = a.toElement;
                else if (a.type == "mouseover") a.relatedTarget = a.fromElement;
                a.stopPropagation = function() {
                    this.cancelBubble = !0
                };
                a.target = a.srcElement;
                a.ed = (new Date).getTime()
            }
            if (this.isGecko) a.offsetX = a.layerX,
            a.offsetY = a.layerY;
            if (a.wheelDelta) a.detail = a.wheelDelta;
            return a
        },
        stopPropagation: function(a) {
            a.stopPropagation ? (a.stopPropagation(), a.preventDefault()) : (a.cancelBubble = !0, a.returnValue = !1)
        },
        drag: function(a, b, c, d) {
            function f(a) {
                a = a || window.event;
                c(a)
            }
            function g(a) {
                a = a || window.event;
                b(a);
                j.addEvent(document, "mousemove", f);
                j.addEvent(document, "mouseup",
                function(a) {
                    a = a || window.event;
                    d(a);
                    j.removeEvent(document, "mousemove", f);
                    j.removeEvent(document, "mouseup", arguments.callee)
                })
            }
            var j = this;
            j.addEvent(a, "mousedown", g);
            return {
                mousedown: g,
                move: f
            }
        },
        Tb: function(a, b) {
            function c(a) {
                a = a || window.event;
                if (a.wheelDelta) a.Ob = a.wheelDelta / 120;
                else if (a.detail) a.Ob = -a.detail / 3;
                b(a)
            }
            document.addEventListener && a.addEventListener("DOMMouseScroll", c, !1);
            a.onmousewheel = c
        },
        c: function(a, b, c) {
            c = c || {};
            c.mapId = this.id;
            c.overlay = a._type;
            this.d[a._type] || (this.d[a._type] = []);
            for (var d = 0; d < this.d[a._type].length; d++) this.d[a._type][d].name == b && this.d[a._type][d].obj == a && this.d[a._type][d].func(c)
        }
    },
    F = z({
        jc: function() {
            this.u = {};
            this.O = [];
            this.v = {
                Ab: 0,
                alpha: 0,
                va: 0,
                Wa: 0,
                Ga: 0
            };
            this.level = Math.min(Math.max(this.level, this.zooms[0]), this.zooms[1]);
            this.Ya = this.j(this.center, this.level);
            this.h = new w.Pixel(this.Ya.x - Math.round(this.width / 2), this.Ya.y - Math.round(this.height / 2));
            this.B = new w.Pixel(0, 0);
            this.I = new w.Pixel(this.width, this.height);
            this.f = {
                V: !1,
                x: this.width / 2,
                y: this.height / 2,
                Yc: this.center
            };
            this.worldCopyJump = !0;
            this.pa = 5;
            this.bc();
            this.Hb(this.defaultTileLayer)
        },
        Hb: function(a) {
            if (!a.id || this.u[a.id]) return ! 1;
            var b = this.contains.lay.getElementsByTagName("div").length,
            c = parseInt(a.zIndex),
            d = this;
            if (c == 1 && b > 0) {
                for (var f = 0; f < b; f++) if (c < this.contains.lay.getElementsByTagName("div")[f].style.zIndex) c = this.contains.lay.getElementsByTagName("div")[f].style.zIndex;
                c = parseInt(c) + 1
            }
            a.s.style.zIndex = c;
            a.zIndex = c;
            a.H = this;
            this.u[a.id] = a;
            this.contains.lay.appendChild(a.s);
            if (a._type == "tilelayer" || a._type == "tilelayer.satellite" || a._type == "tilelayer.tmc") this.Ib(a);
            else if (a._type == "wmslayer") a.Ca(),
            a.m = function() {
                a.Ca()
            },
            this.bind(this, "dragend", a.m);
            if (a.refresh) a.Ta = setInterval(function() {
                d.gb();
                d.oa()
            },
            a.refresh)
        },
        fc: function(a) {
            this.defaultTileLayer.tileUrl = a
        },
        Ib: function(a) {
            var b = Math.pow(2, this.level);
            this.B = B(this.B, this.Da(this.B, this.h));
            this.I = B(this.I, this.Da(this.I, this.h));
            for (var c = this.B.line - 1; c <= this.I.line; c++) for (var d = this.B.column - 1; d <= this.I.column; d++) {
                var f = d,
                g = c;
                if (f < 0 || f >= b) f %= b,
                f < 0 && (f += b);
                this.ba.Ub == "BOTTOM_LEFT" && (g = b - c - 1);
                a.Ca(f, g, this.level, d, c);
                this.O.join(",").indexOf(f + "." + g) == -1 && this.O.push(f + "." + g)
            }
        },
        oc: function() {
            var a = Math.pow(2, this.level);
            this.B = B(this.B, this.Da(this.B, this.h));
            this.I = B(this.I, this.Da(this.I, this.h));
            var b = [],
            c = this.O.join(","),
            d;
            for (d in this.u) {
                var f = this.u[d];
                if (f._type == "tilelayer" || f._type == "tilelayer.satellite" || f._type == "tilelayer.tmc") for (var g = this.B.line - 1; g <= this.I.line + 1; g++) for (var j = this.B.column - 1; j <= this.I.column + 1; j++) {
                    var h = j,
                    k = g;
                    if (h < 0 || h >= a) h %= a,
                    h < 0 && (h += a);
                    c.indexOf(h + "." + k) == -1 && f.Ca(h, k, this.level, j, g);
                    this.O.join(",").indexOf(h + "." + k) == -1 && this.O.push(h + "." + k);
                    b.push(h + "." + k)
                }
            }
            b = b.join(",");
            for (d = 0; d < this.O.length; d++) if (b.indexOf(this.O[d]) == -1) {
                for (var l in this.u)(this.u[l]._type == "tilelayer" || f._type == "tilelayer.satellite" || f._type == "tilelayer.tmc") && this.u[l].cb(this.O[d]);
                this.O.splice(d, 1);
                d--
            }
            this._circleWorldOve();
            this.c(this, "moved")
        },
        gb: function() {
			debugger;
            this.Ya = this.j(this.center, this.level);
            this.h = {
                x: this.Ya.x - Math.round(this.width / 2),
                y: this.Ya.y - Math.round(this.height / 2)
            };
            var a = this.contains.root,
            b = this.contains.cac;
            b.style.left = this.A.x + "px";
            b.style.top = this.A.y + "px";
            a.style.left = "0px";
            a.style.top = "0px";
            this.A = new w.Pixel(0, 0);
            this.B = new w.Pixel(0, 0);
            this.I = new w.Pixel(this.width, this.height);
            for (var c in this.u) {
                if (this.u[c]._type == "tilelayer" || this.u[c]._type == "tilelayer.satellite" || this.u[c]._type == "tilelayer.tmc") for (a = 0; a < this.O.length; a++) this.u[c].cb(this.O[a]),
                this.O.splice(a, 1),
                a--;
                this.O.length = 0;
                this.O = [];
                this.u[c].s.innerHTML = "";
                this.u[c].q = {};
                w.Util.Nb();
                this.Ib(this.u[c])
            }
        },
        Kb: function(a) {
            if (a._type && (a._type == "tilelayer" || a._type == "tilelayer.satellite" || a._type == "tilelayer.tmc")) {
                if (a.id == "base") return alert("\u4e0d\u80fd\u5220\u9664\u5e95\u56fe\u56fe\u5c42"),
                !1;
                a.ab();
                this.u[a.id] = o;
                delete this.u[a.id]
            } else {
                if (!this.u[a]) return ! 1;
                if (a == "base") return alert("\u4e0d\u80fd\u5220\u9664\u5e95\u56fe\u56fe\u5c42"),
                !1;
                this.u[a].ab();
                this.u[a] = o;
                delete this.u[a]
            }
        },
        Da: function(a, b) {
            return {
                line: Math.floor((a.y + b.y) / this.defaultTileLayer.tileSize),
                column: Math.floor((a.x + b.x) / this.defaultTileLayer.tileSize)
            }
        },
        _getOffset: function(a) {
            var a = this.formatEvent(a),
            b = new w.Pixel(a.offsetX, a.offsetY),
            c = a.target,
            d = "svg,path,circle,".indexOf(a.target.nodeName) > -1;
            if (this.isOpera && ["path", "circle"].indexOf(a.target.nodeName) > -1) d = this.j(this.r[a.target.id].ha, this.level),
            new w.Pixel("path" == a.target.nodeName ? 5 : -2, "path" == a.target.nodeName ? 5 : -1),
            b.x += d.x - this.h.x - 5,
            b.y += d.y - this.h.y - 5;
            else if (d && !this.isIE9) {
                if (c.nodeName != "svg") c = c.parentNode;
                try {
                    b.x = parseInt(c.style.left) + a.offsetX,
                    b.y = parseInt(c.style.top) + a.offsetY
                } catch(f) {
                    try {
                        return b
                    } finally {
                        b = o
                    }
                }
                c = c.parentNode
            }
            try {
                if (this.isIE8) {
                    b.x = 0;
                    b.y = 0;
                    for (c = this.fa; c && c != document.body;) b.x += parseInt(c.offsetLeft) + parseInt(c.clientLeft),
                    b.y += parseInt(c.offsetTop) + parseInt(c.clientTop),
                    c = c.offsetParent;
                    b.x = a.clientX + document.documentElement.scrollLeft - b.x;
                    b.y = a.clientY + document.documentElement.scrollTop - b.y
                } else for (; c && c.className != "mcjt";) b.x += c.offsetLeft || 0,
                b.y += c.offsetTop || 0,
                c = c.offsetParent
            } catch(g) {} finally {
                return a.preventDefault = o,
                a.stopPropagation = o,
                c || (b.x += this.A.x, b.y += this.A.y),
                b
            }
        },
        __panBy: function() {
            var a = this.limit,
            b = this.getBounds(),
            c = b.northeast.lng,
            d = b.northeast.lat,
            f = b.southwest.lng,
            g = b.southwest.lat,
            j = a.northeast.lng,
            h = a.northeast.lat,
            k = a.southwest.lng,
            l = a.southwest.lat,
            m = b.southwest,
            n = a.northeast,
            a = a.southwest;
            if (c > j && f < k && d > h && g < l) return o;
            var t = [];
            t.push(b.northeast);
            t.push(new w.LngLat(c, g));
            t.push(m);
            t.push(new w.LngLat(f, d));
            b = new w.Polygon({
                path: t
            });
            m = [];
            m.push(n);
            m.push(new w.LngLat(j, l));
            m.push(a);
            m.push(new w.LngLat(k, h));
            var u = new w.Polygon({
                path: m
            }),
            q,
            p,
            t = m = 0,
            r = this.level;
            b.getArea() > u.getArea() ? (c < j ? (q = this.j(new w.LngLat(c, h), r), p = this.j(n, r)) : f > k && (q = this.j(new w.LngLat(f, l), r), p = this.j(a, r)), q && p && (m = p.x - q.x), h > d ? (q = this.j(new w.LngLat(j, d), r), p = this.j(n, r)) : l < g && (q = this.j(new w.LngLat(k, g), r), p = this.j(a, r)), q && p && (t = p.y - q.y)) : j < c && h < d ? (q = this.j(new w.LngLat(c, h), r), p = this.j(n, r), q && p && (m = p.x - q.x), q = this.j(new w.LngLat(j, d), r), p = this.j(n, r), q && p && (t = p.y - q.y)) : k > f && l > g ? (q = this.j(new w.LngLat(k, g), r), p = this.j(a, r), q && p && (t = p.y - q.y), q = this.j(new w.LngLat(f, l), r), p = this.j(a, r), q && p && (m = p.x - q.x)) : k > f && h < d ? (q = this.j(new w.LngLat(f, h), r), p = this.j(new w.LngLat(k, h), r), q && p && (m = p.x - q.x), q = this.j(new w.LngLat(k, d), r), p = this.j(new w.LngLat(k, h), r), q && p && (t = p.y - q.y)) : j < c && l > g ? (q = this.j(new w.LngLat(c, l), r), p = this.j(new w.LngLat(j, l), r), q && p && (m = p.x - q.x), q = this.j(new w.LngLat(j, g), r), p = this.j(new w.LngLat(j, l), r), q && p && (t = p.y - q.y)) : (n = this.getCenter(), h < d ? (q = this.j(new w.LngLat(n.lng, d), r), p = this.j(new w.LngLat(n.lng, h), r)) : j < c ? (q = this.j(new w.LngLat(c, n.lat), r), p = this.j(new w.LngLat(j, n.lat), r)) : l > g ? (q = this.j(new w.LngLat(n.lng, g), r), p = this.j(new w.LngLat(n.lng, l), r)) : k > f && (q = this.j(new w.LngLat(f, n.lat), r), p = this.j(new w.LngLat(k, n.lat), r)), q && p && (m = p.x - q.x, t = p.y - q.y));
            this.P( - m, -t)
        },
        bc: function() {
            var a = this.contains.lays,
            b = this.contains.mc,
            c = this,
            d = {},
            f = 0,
            g = 0,
            j = 0,
            h = 0,
            c = this,
            k = 0,
            l = 0,
            m = 0;
            this.drag(a,
            function(a) {
                window.clearInterval(c.v.Wa);
                f = j = parseInt(a.clientX);
                g = h = parseInt(a.clientY);
                k = (new Date).getTime();
                c.stopPropagation(a);
                a.lnglat = c.f.lnglat;
                c.c(c, "dragstart", a)
            },
            function(a) {
                if (c.dragEnable) {
                    var b = a.clientX - f,
                    d = a.clientY - g,
                    h = c.limit,
                    j = c.getBounds();
                    if ((!w.Util.mb(h) || !(j.northeast.lng > h.northeast.lng && j.southwest.lng < h.southwest.lng && j.northeast.lat > h.northeast.lat && j.southwest.lat < h.southwest.lat)) && w.Util.mb(h)) j.northeast.lng > h.northeast.lng && b < 0 && (b = 0),
                    j.southwest.lng < h.southwest.lng && b > 0 && (b = 0),
                    j.northeast.lat > h.northeast.lat && d > 0 && (d = 0),
                    j.southwest.lat < h.southwest.lat && d < 0 && (d = 0);
                    c.P(b, d);
                    f = a.clientX;
                    g = a.clientY;
                    window.clearTimeout(m);
                    m = setTimeout(function() {
                        l = 0
                    },
                    50);
                    l = 1;
                    c.fa.style.cursor = "url(" + (w.Conf._client || c._client) + "Images/closedhand.cur),pointer"
                }
                a.lnglat = c.f.lnglat;
                c.c(c, "dragging", a);
                c.stopPropagation(a)
            },
            function(a) {
                a.lnglat = c.f.lnglat;
                if (c.dragEnable && c.jogEnable && l == 1 && !w.Util.mb(c.limit)) {
                    k = (new Date).getTime() - k;
                    j = a.clientX - j;
                    h = a.clientY - h;
                    var b = Math.sqrt(Math.pow(j, 2) + Math.pow(h, 2));
                    if (2 * b / Math.pow(k, 2) > 0.0010) {
                        window.clearInterval(c.v.Wa);
                        var d = 0;
                        c.v.Wa = setInterval(function() {
                            var a = w.Tween.Cubic.easeOut,
                            a = a(d, 0, b / 2, 10) - a(d - 1, 0, b / 2, 10);
                            c.P(Math.round(j / b * a), Math.round(h / b * a));
                            if (d >= 10) window.clearInterval(c.v.Wa),
                            c.v.Wa = 0,
                            c.c(c, "dragend");
                            d++
                        },
                        40)
                    } else b != 0 && c.c(c, "dragend", a)
                } else a.clientX - j != 0 && a.clientY - h != 0 && !c.isDragging && c.c(c, "dragend", a),
                w.Util.mb(c.limit) && c.__panBy();
                c.fa.style.cursor = c.Ba.map == "default" ? c.Ba.map: "url(" + c.Ba.map + "),pointer"
            });
            this.addEvent(a, "dblclick",
            function(a) {
                c.doubleClickZoom && c.level < c.zooms[1] && c.S("+");
                a.id = c.id;
                a.pixel = new w.Pixel(c.f.x, c.f.y);
                a.lnglat = c.f.lnglat;
                c.c(c, "dblclick", a);
                c.stopPropagation(a)
            });
            this.Tb(a,
            function(a) {
                c.stopPropagation(a);
                if (c.scrollWheel) a.pixel = c._getOffset(a),
                a.lnglat = c.X(a.pixel),
                c.f = {
                    x: a.pixel.x,
                    y: a.pixel.y,
                    V: !0,
                    lnglat: a.lnglat
                },
                a.Ob > 0 ? c.level < c.zooms[1] && c.S("+") : c.level > c.zooms[0] && c.S("-");
                c.c(c, "mousewheel", a)
            });
            this.isIE ? (this.addEvent(a, "mouseenter",
            function(a) {
                c.f.V = !0;
                a.pixel = new w.Pixel(c.f.x, c.f.y);
                a.lnglat = c.f.lnglat;
                c.c(c, "mouseover", a)
            }), this.addEvent(a, "mouseleave",
            function(a) {
                c.f.V = !1;
                a.pixel = new w.Pixel(c.f.x, c.f.y);
                a.lnglat = c.f.lnglat;
                c.c(c, "mouseout", a)
            })) : (this.addEvent(a, "mouseover",
            function(a) {
                var b = a.relatedTarget;
                if (b && !(b.compareDocumentPosition(this) & 8)) c.f.V = !0,
                b = c._getOffset(a),
                a.lnglat = c.X(b),
                c.c(c, "mouseover", a)
            }), this.addEvent(a, "mouseout",
            function(a) {
                var b = a.relatedTarget;
                if (b && !(b.compareDocumentPosition(this) & 8)) c.f.V = !1,
                a.pixel = new w.Pixel(c.f.x, c.f.y),
                a.lnglat = c.f.lnglat,
                c.c(c, "mouseout", a)
            }));
            this.addEvent(a, "mousedown",
            function(a) {
                a.pixel = new w.Pixel(c.f.x, c.f.y);
                a.lnglat = c.f.lnglat;
                d = a.lnglat;
                c.c(c, "mousedown", a)
            });
            this.addEvent(a, "mouseup",
            function(a) {
                a.pixel = new w.Pixel(c.f.x, c.f.y);
                a.lnglat = c.f.lnglat;
                c.c(c, "mouseup", a)
            });
            this.addEvent(a, "click",
            function(a) {
                a.pixel = new w.Pixel(c.f.x, c.f.y);
                a.lnglat = c.f.lnglat;
                d == a.lnglat && c.c(c, "click", a)
            });
            this.addEvent(a, "mousemove",
            function(a) {
                a.pixel = c._getOffset(a);
                a.lnglat = c.X(a.pixel);
                a.tile = c.Da(c.j(a.lnglat, c.level), {
                    x: 0,
                    y: 0
                });
                c.f = {
                    x: a.pixel.x,
                    y: a.pixel.y,
                    V: !0,
                    lnglat: a.lnglat
                };
                if (c.autoPanby) {
                    var b = 0,
                    d = 0;
                    a.pixel.x < 20 && (b = 20);
                    c.width - a.pixel.x < 20 && (b = -20);
                    a.pixel.y < 20 && (d = 20);
                    c.height - a.pixel.y < 20 && (d = -20);
                    b == 0 && d == 0 || c.P(b, d)
                }
                c.c(c, "mousemove", a)
            });
            this.addEvent(a, "contextmenu",
            function(a) {
                c.stopPropagation(a);
                a.pixel = new w.Pixel(c.f.x, c.f.y);
                a.lnglat = c.f.lnglat;
                c.c(c, "rightclick", a)
            });
            this.addEvent(document, "keydown",
            function(a) {
                if (c.f.V && c.keyboardEnable) switch (a.keyCode) {
                case 107:
                    c.S("+");
                    c.stopPropagation(a);
                    break;
                case 61:
                    c.S("+");
                    c.stopPropagation(a);
                    break;
                case 109:
                    c.S("-");
                    c.stopPropagation(a);
                    break;
                case 37:
                    c.P(5, 0);
                    c.c(c, "keymove", a);
                    c.stopPropagation(a);
                    break;
                case 38:
                    c.P(0, 5);
                    c.c(c, "keymove", a);
                    c.stopPropagation(a);
                    break;
                case 39:
                    c.P( - 5, 0);
                    c.c(c, "keymove", a);
                    c.stopPropagation(a);
                    break;
                case 40:
                    c.P(0, -5);
                    c.c(c, "keymove", a);
                    c.stopPropagation(a);
                    break;
                case 187:
                    if (c.isIE || c.isWebkit || c.isOpera) c.S("+"),
                    c.stopPropagation(a);
                    break;
                case 189:
                    if (c.isIE || c.isWebkit || c.isOpera) c.S("-"),
                    c.stopPropagation(a);
                    break;
                case 173:
                    c.isGecko && (c.S("-"), c.stopPropagation(a))
                }
            });
            this.Tb(b,
            function(a) {
                a.pixel = new w.Pixel(c.f.x, c.f.y);
                a.lnglat = c.f.lnglat;
                c.stopPropagation(a)
            })
        },
        dc: function() {
            var a = this.defaultTileLayer;
            this.contains.lays.replaceChild(a.s, this.contains.cac).innerHTML = o;
            a.s.style.zIndex = -1;
            a.s.removeAttribute("id");
            this.contains.cac = a.s;
            var a = a.q,
            b = document.createElement("div");
            b.style.cssText = "position:absolute;left:0px;top:0px;z-index:" + this.defaultTileLayer.zIndex;
            this.contains.lay.appendChild(b).innerHTML = o;
            this.u[this.defaultTileLayer.id].q = {};
            this.u[this.defaultTileLayer.id].s = b;
            b.innerHTML = o;
            return a
        },
        rc: function(a) {
            var b = this.O,
            c = this.level - a;
            if (!this.f.V) this.f.x = this.width / 2,
            this.f.y = this.height / 2;
            var d = this.Sa(new w.Pixel(this.h.x + this.f.x - this.A.x, this.h.y + this.f.y - this.A.y), a);
            c == 1 && this.f.V && (this.center = new w.LngLat((this.center.lng + d.lng) / 2, (this.center.lat + d.lat) / 2));
            c == -1 && this.f.V && (this.center = new w.LngLat(2 * this.center.lng - d.lng, 2 * this.center.lat - d.lat));
            var f = this.dc();
            this.contains.lay.style.visibility = "hidden";
            this.contains.mk.style.visibility = "hidden";
            this.contains.re.style.visibility = "hidden";
            window.clearInterval(this.v.Ab);
            this.tc(a, c, b, f, d)
        },
        tc: function(a, b, c, d, f) {
            function g() {
                var a = h.column,
                c = h.line,
                f = n * m,
                r = b * l.x / 4 * m * t,
                D = b * l.y / 4 * m * t,
                C;
                for (C in d) {
                    var A = d[C];
                    A.T.style.width = A.T.style.height = k + f + "px";
                    A.T.style.left = A.left - (a - A.x) * f - r + "px";
                    A.T.style.top = A.top - (c - A.y) * f - D + "px"
                }
                if (m >= 4) {
                    window.clearInterval(j.v.Ab);
                    j.contains.lay.style.visibility = "visible";
                    j.contains.mk.style.visibility = "visible";
                    j.contains.re.style.visibility = "visible";
                    for (var E in d) j.defaultTileLayer.cb(d[E]);
                    d = {};
                    g = j = o;
                    w.Util.Nb()
                }
                m++
            }
            var j = this,
            h = this.Da(this.j(f, a), new w.Pixel(0, 0)),
            k = this.defaultTileLayer.tileSize;
            if (d[h.column + "." + h.line]) var l = {
                x: this.f.x - j.A.x - d[h.column + "." + h.line].left,
                y: this.f.y - j.A.y - d[h.column + "." + h.line].top
            };
            else xy = c[Math.floor(c.length / 2)],
            xy = xy.split("."),
            l = {
                x: this.f.x - j.A.x - d[xy[0] + "." + xy[1]].left,
                y: this.f.y - j.A.y - d[xy[0] + "." + xy[1]].top
            };
            var m = 1,
            n = b == 1 ? 64 : -32,
            t = b == 1 ? 1 : 0.5;
            this.v.Ab = setInterval(g, 40)
        },
        Rc: function() {
            this.gb();
            this.oa()
        },
        _circleWorldOve: function() {
            if (this.level > this.pa) return ! 1;
            var a = Math.pow(2, this.level) * 256,
            b,
            c = 0,
            d,
            f;
            for (f in this.r) if (b = this.r[f], b._type == "marker") if ((d = b.b) || (d = b._node), b = parseInt(d.style.left), d.childNodes[0].style && (c = parseInt(d.childNodes[0].style.width) || d.childNodes[0].width), this.B.x + c > b && this.I.x > b + a) d.style.left = b + a + "px";
            else if (this.I.x < b && this.B.x < b - a + c) d.style.left = b - a + "px";
            if (this.k) if (b = parseInt(this.k.b.style.left), c = parseInt(this.k.b.style.width), d = this.k.ua ? this.k.ua: [0, 0], this.B.x > b + c + d[0] && this.I.x > b + a + d[1]) this.k.b.style.left = b + a + "px";
            else if (this.I.x - c < b + d[1] && this.B.x < b - a + c + d[0]) this.k.b.style.left = b - a + "px"
        }
    }),
    G = z({
        kc: function() {
            this.k = !1;
            this.qc()
        },
        Aa: function(a, b) {
            this.r[a.id] && this.sa(this.r[a.id]);
            a.a = this;
            this.r[a.id] = a;
            a._type == "marker" && this.contains.mk.appendChild(a._getHtmlDom());
            if ("polyline,polygon,circle".indexOf(a._type) > -1) {
                if (this.k == !1) this.k = this.isIE && !this.isIE9 ? new w.$b(this) : new w.Zb(this);
                this.k[a._type](a, this);
                this._setRenderPostion()
            }
            a._bind_();
            b || this.c(this, "addoverlay", a)
        },
        sa: function(a, b) {
            this.r[a.id] && (a._unbind_ && a._unbind_(), this.r[a.id]._destroy(), this.r[a.id] = o, delete this.r[a.id], this._resetRenderArr(), b || (this.unbind(a), this.c(this, "removeoverlay", a)))
        },
        oa: function() {
            var a = [],
            b;
            for (b in this.r) a.push(this.r[b]),
            this.sa(this.r[b], !0);
            if (this.isIE && !this.isIE9 && this.k && this.k.b) this.k.b.style.left = "0px";
            for (b = 0; b < a.length; b++) if (this.Aa(a[b], !0), a[b]._type == "circle" && this.isIE8) a[b].b.style.visibility = "inherit";
            if (this.isOpera && this.k.fb) {
                var c = this.k,
                d = c.b;
                setTimeout(function() {
                    d.setAttribute("viewBox", (c.C - 5).toFixed(0) + " " + (c.D - 5).toFixed(1) + " " + (c.K - c.C + 10).toFixed(1) + " " + (c.N - c.D + 10).toFixed(1))
                },
                500)
            }
            for (b = 0; b < a.length; b++) this.c(a[b], "reload", a[b])
        },
        rb: function(a) {
            var b = this.contains.ti;
            b.style.visibility = "hidden";
            b.innerHTML = "";
            this.ka && (this.ka.isOpen = !1);
            if (a) this.ka = o,
            delete this.ka
        },
        qc: function() {
            function a() {
                b.dragEnable = d;
                b.removeEvent(c, "mouseup", a)
            }
            var b = this,
            c = this.contains.ti,
            d;
            this.addEvent(c, "mousedown",
            function() {
                d = b.dragEnable;
                b.addEvent(c, "mouseup", a)
            })
        },
        _setRenderPostion: function() {
            if (this.level <= this.pa) {
                var a = Math.pow(2, this.level) * 256;
                if (this.isIE && !this.isIE9) {
                    isNaN(this.ib) ? this.ib = 1 : this.ib++;
                    if (this.ib % 2 != 0) {
                        var a = Math.pow(2, this.level) * 256,
                        b = Math.round(this.B.x / a),
                        a = a * b - parseInt(this.k.b.style.left);
                        this.k.b.style.left = a + "px"
                    } else this.ib++;
                    var a = parseInt(this.k.b.style.left) - this.B.x,
                    b = this.width + a,
                    c = this.k.K + a,
                    d = this.k.C + a;
                    if (!this.k.ua) this.k.ua = [0, 0];
                    if (c > b && d > a) this.k.ua[0] = c - b;
                    else if (d < a && c < b) this.k.ua[1] = d - a;
                    else if (d < a && c > b) this.k.ua = [c - b, d - a]
                } else c = parseInt(this.k.b.style.left),
                b = Math.round(this.B.x / a),
                this.k.b.style.left = c + a * b + "px"
            }
        },
        _resetRenderArr: function() {
            if (this.level <= this.pa) {
                var a = !1,
                b;
                for (b in this.r) if (this.r[b]._type !== "marker" && !a) {
                    a = !0;
                    break
                }
                if (!a && this.k) this.k.ua = [0, 0],
                this.k.C = 0,
                this.k.K = 0,
                this.k.D = 0,
                this.k.N = 0
            }
        }
    });
    w.Tween = {
        Linear: function(a, b, c, d) {
            return c * a / d + b
        },
        Cubic: {
            easeIn: function(a, b, c, d) {
                return c * (a /= d) * a * a + b
            },
            easeOut: function(a, b, c, d) {
                return c * ((a = a / d - 1) * a * a + 1) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a + b: c / 2 * ((a -= 2) * a * a + 2) + b
            }
        }
    };
    w.Map = z(w.Conf, Event, F, G, {
        ic: function() {
            var a = document.createElement("div");
            a.style.cssText = "width:108px;height:73px;overflow:hidden;position:absolute;visibility:hidden;z-index:200";
            w.Util.userSelect(a);
            var b = document.createElement("div");
            b.id = "_copyright_" + this.id;
            b.style.cssText = "width:auto;height:14px;line-height:14px;font-size:11px; font-family:Arial,sans-serif;white-space:nowrap;position:absolute;right:5px;bottom:0;z-index:200";
            b.innerHTML = this._copyright;
            w.Util.userSelect(b);
            this.Vc = b;
            this.fa.appendChild(b);
            b = [];
            b.push('<div style="width:6px;height:4px;overflow:hidden;border-right:#F00 solid 2px;border-bottom:#F00 solid 2px;position:absolute;left:0;top:0;"></div>');
            b.push('<div style="width:6px;height:4px;overflow:hidden;border-left:#F00 solid 2px;border-bottom:#F00 solid 2px;position:absolute;left:100px;top:0;"></div>');
            b.push('<div style="width:6px;height:4px;overflow:hidden;border-top:#F00 solid 2px;border-left:#F00 solid 2px;position:absolute;left:100px;top:67px;"></div>');
            b.push('<div style="width:6px;height:4px;overflow:hidden;border-top:#F00 solid 2px;border-right:#F00 solid 2px;position:absolute;left:0;top:67px;"></div>');
            a.innerHTML = b.join("");
            this.va = a;
            this.contains.frame.appendChild(a);
            if (this.isIE6) this.contains.frame.style.zIndex = 1;
            if (this.isGecko) {
                var c = this;
                this.addEvent(this.va, "mouseover",
                function(a) {
                    var b = a.relatedTarget;
                    if (b && !(b.compareDocumentPosition(this) & 8)) c.f.V = !0,
                    b = c._getOffset(a),
                    a.lnglat = c.X(b),
                    c.c(c, "mouseover", a)
                })
            }
            a = document.createElement("div");
            a.style.cssText = "position:absolute;top:5px;z-index:150;background-color:#F00;color:#FFF;font-size:12px;padding:5px;";
            a.style.left = (this.width - 150) / 2 + "px";
            if (w.Conf._verify) a.style.display = "none";
            a.innerHTML = "\u5bc6\u94a5\u9a8c\u8bc1\u5931\u8d25,\u8bf7\u6838\u67e5!";
            this.contains.mc.appendChild(a);
            this.contains.bd = a
        },
        gc: function(a) {
            var b = this.va;
            if (this.f.x < 5 || this.f.y < 5 || this.f.x > this.width - 5 || this.f.y > this.height - 5 || this.f.V == !1) this.f.x = this.width / 2,
            this.f.y = this.height / 2;
            b.style.left = this.f.x - 54 + "px";
            b.style.top = this.f.y - 36.5 + "px";
            var c = 0,
            d = this;
            window.clearInterval(d.v.va);
            this.v.va = a > 0 ? setInterval(function() {
                var a = 9.5 * (4 - c),
                g = 5.75 * (4 - c);
                b.children[2].style.left = a + "px";
                b.children[2].style.top = g + "px";
                b.children[3].style.left = 108 - a - 9 + "px";
                b.children[3].style.top = g + "px";
                b.children[0].style.left = 108 - a - 9 + "px";
                b.children[0].style.top = 63 - g + "px";
                b.children[1].style.left = a + "px";
                b.children[1].style.top = 63 - g + "px";
                c >= 5 ? (window.clearInterval(d.v.va), b.style.visibility = "hidden") : b.style.visibility = "visible";
                c++
            },
            80) : setInterval(function() {
                var a = 9.5 * c,
                g = 5.375 * c;
                b.children[0].style.left = a + "px";
                b.children[0].style.top = g + "px";
                b.children[1].style.left = 99 - a + "px";
                b.children[1].style.top = g + "px";
                b.children[2].style.left = 99 - a + "px";
                b.children[2].style.top = 64 - g + "px";
                b.children[3].style.left = a + "px";
                b.children[3].style.top = 64 - g + "px";
                c >= 5 ? (window.clearInterval(d.v.va), b.style.visibility = "hidden") : b.style.visibility = "visible";
                c++
            },
            120)
        },
        ac: function(a) {
            var b = this.contains.mc;
            a._getHtmlDom && (a._dom = a._getHtmlDom(this));
            b.parentNode.appendChild(a._dom);
            a._trigger && a._trigger()
        },
        pc: function(a) {
            var b = a._dom;
            b.parentNode.removeChild(b);
            if (a._type == "overview") w.$("_copyright_" + (this._unique || this.id)).style.right = "5px"
        }
    },
    {
        getCenter: function() {
            return new w.LngLat(this.center.lng, this.center.lat)
        },
        getZoom: v("level"),
        getZooms: v("zooms"),
        getSize: function() {
            return new w.Size(this.width, this.height)
        },
        getBounds: function() {
            return new w.Bounds(this.X(new w.Pixel(0, this.height)), this.X(new w.Pixel(this.width, 0)))
        },
        getTiles: function() {
            return [].concat(this.O)
        },
        getStatus: function() {
            for (var a = ["dragEnable", "zoomEnable", "keyboardEnable", "jogEnable", "continuousZoomEnable", "doubleClickZoom", "scrollWheel"], b = {},
            c = 0; c < a.length; c++) b[a[c]] = this[a[c]];
            return b
        },
        getResolution: function(a) {
            return (a ? Math.cos(a.lat * Math.PI / 180) : 1) * 2 * Math.PI * 6378137 / (256 * Math.pow(2, this.level))
        },
        getScale: function(a) {
            a || (a = 96);
            return parseInt(this.getResolution() * a / 0.0254)
        },
        getDefaultCursor: function() {
            return this.Ba.map
        },
        setRoom: function(a) {
            a && this.fc(a)
        },
        setLimit: function(a) {
            this.limit = a ? a: {}
        },
        getLimit: v("limit"),
        setCenter: function(a) {
            this.center = a;
            this.S()
        },
        setCity: function(a, b) {
            var b = b || s(),
            c = this;
            new w.AjaxRequest((w.Conf._server || this._server) + "gss/simple?sid=1026&resType=json&encode=utf-8&keyword=" + encodeURIComponent(a) + "&key=" + w.Conf._key,
            function(a) {
                a.list && a.list.length > 0 && c.setZoomAndCenter(a.list[0].level, new w.LngLat(a.list[0].x, a.list[0].y));
                b()
            })
        },
        setZoom: function(a) {
            if (this.level == a) return ! 1;
            this.S(a)
        },
        zoomIn: function() {
            this.S("+")
        },
        zoomOut: function() {
            this.S("-")
        },
        setZoomAndCenter: function(a, b) {
            this.f.V = !1;
            this.center = b;
            this.S(a)
        },
        setBounds: function(a) {
            var b, c, d, f = [];
            b = this.ba.la.za(a.southwest);
            c = this.ba.la.za(new w.LngLat(a.northeast.lng, a.southwest.lat));
            d = this.ba.la.za(new w.LngLat(a.southwest.lng, a.northeast.lat));
            c = Math.max((d.y - b.y) / this.height, (c.x - b.x) / this.width);
            resolutions = this.ba.la.U();
            for (var g in resolutions) Math.abs(resolutions[g] - c) < resolutions[g] / 2 && f.push(g);
            level = f[0];
            a = this.ba.la.za(a.northeast);
            b = this.ba.la.qb(new w.Pixel((b.x + a.x) / 2, (b.y + a.y) / 2));
            this.level == level ? this.setCenter(b) : this.setZoomAndCenter(Math.min(Math.max(level, this.zooms[0]), this.zooms[1]), b)
        },
        setStatus: function(a) {
            var b = ["dragEnable", "zoomEnable", "keyboardEnable", "jogEnable", "continuousZoomEnable", "doubleClickZoom", "scrollWheel"],
            c;
            for (c in a) typeof a[c] == "boolean" && b.join(",").indexOf(c) != -1 && this[c] != e && (this[c] = a[c])
        },
        panTo: function(a) {
            var b = 0;
            if (this.rotation) b = this.rotation,
            this.setRotation(0);
            var c = this.j(this.center, this.level),
            a = this.j(a, this.level);
            this.P(Math.round(c.x - a.x), Math.round(c.y - a.y));
            b && this.setRotation(b)
        },
        panBy: function(a, b) {
            this.P(a, b)
        },
        setRotation: function(a) {
            var b = this.contains.lays,
            c = "",
            c = "MozTransform" in document.documentElement.style ? "MozTransform": "OTransform" in document.documentElement.style ? "OTransform": "msTransform" in document.documentElement.style ? "msTransform": "WebkitTransform",
            d = new w.Pixel(this.width / 2 - this.A.x, this.height / 2 - this.A.y);
            b.style[c + "Origin"] = d.x.toFixed(1) + "px " + d.y.toFixed(1) + "px";
            b.style[c] = "rotate(" + a + "deg)";
            this.rotation = a
        },
        clearMap: function() {
            this.clearbind();
            this.clearOverlays();
            this.clearInfoWindow();
            for (var a in this.u) this.u[a].uc || this.Kb(this.u[a])
        },
        destroy: function() {
            for (var a = this.fa,
            b = a.getElementsByTagName("*"); b.length > 0;) a.removeChild(b[0])
        },
        setDefaultCursor: function(a) {
            this.Ba.map = a ? a: "default";
            this.fa.style.cursor = this.Ba.map == "default" ? "default": "url(" + a + "),pointer"
        },
        addLayer: function(a) {
            this.Hb(a)
        },
        getLayer: function(a) {
            for (var b in this.u) if (a == this.u[b].id) return this.u[b];
            return ! 1
        },
        removeLayer: function(a) {
            this.Kb(a)
        },
        addOverlays: function(a) {
            if (a instanceof Array) for (var b = 0; b < a.length; b++) this.Aa(a[b]);
            else this.Aa(a);
            return ! 0
        },
        getOverlays: function(a) {
            if (a instanceof Array) {
                for (var b = [], c = 0; c < a.length; c++) this.r[a[c]] && b.push(this.r[a[c]]);
                return b
            } else return this.r[a] ? this.r[a] : !1
        },
        getOverlaysByType: function(a) {
            var b = [];
            for (id in this.r) this.r[id]._type == a && b.push(this.r[id]);
            return b
        },
        updateOverlay: function(a) {
            if (a instanceof Array) {
                for (var b = [].concat(a), c = 0; c < a.length; c++) this.sa(a[c], !0);
                for (c = 0; c < b.length; c++) this.Aa(b[c], !0)
            } else this.sa(a, !0),
            this.Aa(a, !0);
            return ! 0
        },
        removeOverlays: function(a) {
            if (a instanceof Array) for (var b = 0; b < a.length; b++) {
                var c = this.r[a[b]];
                c && "marker,polyline,polygon,circle".indexOf(c._type) > -1 && this.sa(c)
            } else(c = this.r[typeof a == "object" ? a.id: a]) && this.sa(c)
        },
        clearOverlays: function() {
            for (var a in this.r) this.r[a].Jc && this.r[a].Jc(),
            this.sa(this.r[a])
        },
        clearOverlaysByType: function(a) {
            for (id in this.r) this.r[id]._type == a && this.removeOverlays(id)
        },
        setFitView: function(a) {
            function b(a) {
                c.C = Math.min(a.lng, c.C);
                c.D = Math.min(a.lat, c.D);
                c.K = Math.max(a.lng, c.K);
                c.N = Math.max(a.lat, c.N)
            }
            var a = a || this.r,
            c = {
                C: 180,
                D: 90,
                K: -180,
                N: -90
            },
            d;
            for (d in a) if (a[d]._type == "marker") b(a[d].position);
            else if (a[d]._type == "circle") this.ra(a[d].center, -a[d].radius, -a[d].radius),
            b(this.ra(a[d].center, -a[d].radius, -a[d].radius)),
            this.ra(a[d].center, a[d].radius, a[d].radius),
            b(this.ra(a[d].center, a[d].radius, a[d].radius));
            else for (var f = a[d].path, g = 0; g < f.length; g++) b(f[g]);
            this.setBounds(new w.Bounds(new w.LngLat(c.C, c.D), new w.LngLat(c.K, c.N)))
        },
        clearInfoWindow: function() {
            this.rb(!0)
        },
        setMouseTool: function(a, b) {
            var b = b || {},
            c = this;
            a == "panWheelZoom" && (a = "close", b = !1);
            if ("marker,polyline,circle,rule,rectZoomIn,rectZoomOut,polygon,rectangle,measureArea,panWheelZoom,close".indexOf(a) > -1) if (this.wb) this.wb[a](b);
            else this.plugin("MMap.MouseTool",
            function() {
                c.wb = new w.MouseTool(c);
                c.wb[a](b)
            })
        },
        bind: function(a, b, c, d) {
            d || (d = "default");
            this.d[a._type] || (this.d[a._type] = []);
            this.d[a._type].push({
                obj: a,
                name: b,
                func: c,
                cate: d
            })
        },
        unbind: function(a, b, c) {
            if (! (typeof a !== "object" || !a._type || !this.d[a._type])) for (var d = 0; d < this.d[a._type].length; d++) if (this.d[a._type][d].obj == a && (!b || this.d[a._type][d].name == b) && (!c || this.d[a._type][d].func.toString() == c.toString())) this.d[a._type].splice(d, 1),
            d--
        },
        clearbind: function(a) {
            a || (a = "default");
            for (var b in this.d) for (var c = this.d[b], d = 0; d < c.length; d++) c[d].cate != "system" && c[d].cate == a && c[d].cate != "plugin" && (c.splice(d, 1), d--)
        },
        trigger: function(a, b, c) {
            this.c(a, b, c)
        },
        getLngLatByOffset: function(a, b, c) {
            return this.ra(a, b, c)
        },
        getDistance: function(a, b) {
            return this.Pa(a, b)
        },
        lnglatToPixel: function(a, b) {
            return this.j(a, b)
        },
        pixelToLngLat: function(a, b) {
            return this.Sa(a, b)
        },
        containerToLngLat: function(a) {
            return this.X(a)
        },
        lnglatToContainer: function(a) {
            return this.eb(a)
        },
        addControl: function(a) {
            a && typeof a == "object" && this.ac(a)
        },
        removeControl: function(a) {
            this.pc(a)
        },
        plugin: function(a, b) {
            typeof a == "string" && (a = [a]);
            for (var c = 0; c < a.length; c++) {
                try {
                    eval("new " + eval(a[c]))
                } catch(d) {
                    continue
                }
                a.splice(c, 1);
                c--
            }
            a.length == 0 ? b() : (a = a.join(","), c = (w.Conf._plugin || this._plugin) + "?cls=" + a, w.Util.cookieEnabled() || (c += "&key=" + w.Conf._key), new w.AjaxRequest(c, b, !0))
        }
    },
    {
        _type: "map",
        initialize: function(a, b) {
            this.Ba = {
                map: "default"
            };
            this.id = this.rotation = this.height = this.width = 0;
            this.defaultTileLayer = new w.TileLayer({
                id: "base",
                tileUrl: w.Conf.mapUrl ? w.Conf.mapUrl: this.mapUrl
            });
            this.A = new w.Pixel(0, 0);
            this.r = {};
            this.d = {
                map: [],
                Zc: [],
                dd: [],
                cd: [],
                Tc: [],
                Wc: [],
                Uc: []
            };
            var c = (new Date).getTime(),
            b = b || {},
            d;
            for (d in b) d.substr(0, 1) != "_" && this[d] != e && (this[d] = b[d]);
            this.mapType = {
                type: this.crs || "EPSG:3857",
                originPosition: "TOP_LEFT"
            };
            this.defaultTileLayer.uc = !0;
            this.vc();
            if (a) {
                typeof a == "string" && (a = document.getElementById(a));
                this.fa = a;
                this.width = w.Util.pageSize(a).width;
                this.height = w.Util.pageSize(a).height;
                this.id = this.id = w.Util.guid();
                if (a.style.position == "" && (a.currentStyle || document.defaultView.getComputedStyle(a, o)).position == "static") a.style.position = "relative";
                this.ec();
                this.Lb && this.Lb();
                this.jc();
                this.kc();
                this.ic();
                this.nc(c);
                window._itd_ ? window._itd_.push(this) : window._itd_ = [this]
            }
        },
        ec: function() {
            var a = document.createElement("div");
            a.className = "mcjt";
            a.style.cssText = "position:relative;width:100%;height:100%;overflow:hidden;z-index:100;";
            var b = document.createElement("div");
            b.style.cssText = "width:100%;position:absolute;left:0px;top:0px;";
            var c = document.createElement("div");
            c.style.cssText = "width:100%;position:absolute;left:0px;top:0px;";
            var d = document.createElement("div");
            d.style.cssText = "position:absolute;left:0px;top:0px;";
            var f = document.createElement("div");
            f.style.cssText = "position:absolute;left:0px;top:0px;z-index:-1;";
            d.appendChild(f);
            var g = document.createElement("div");
            g.style.cssText = "position:absolute;left:0px;top:0px;z-index:100;";
            d.appendChild(g);
            var j = document.createElement("div");
            j.style.cssText = "position:absolute;left:0px;top:0px;z-index:110;text-align:left;";
            d.appendChild(j);
            var h = document.createElement("div");
            h.style.cssText = "position:absolute;left:0px;top:0px;z-index:120;";
            d.appendChild(h);
            var k = document.createElement("div");
            k.style.cssText = "position:absolute;left:0px;top:0px;z-index:130;";
            d.appendChild(k);
            c.appendChild(d);
            var l = document.createElement("div");
            l.style.cssText = "position:absolute;left:0px;top:0px;";
            var m = document.createElement("div");
            m.style.cssText = "position:absolute;left:0px;top:0px;";
            m.style.cssText = "position:absolute;left:0px;top:0px;z-index:140;";
            l.appendChild(m);
            m = document.createElement("div");
            m.style.cssText = "position:absolute;left:0px;top:0px;z-index:150;";
            l.appendChild(m);
            c.appendChild(l);
            a.appendChild(b);
            a.appendChild(c);
            this.fa.appendChild(a);
            this.contains = {
                mc: a,
                frame: b,
                root: c,
                cac: f,
                lays: d,
                lay: g,
                re: j,
                mk: h,
                me: k,
                ti: m
            }
        },
        Lb: function() {
            if (w.Conf._verify && w.Conf._status && w.Conf._status != 0) {
                var a = document.createElement("div");
                a.style.cssText = "line-height:14px;font-size:11px; font-family:Arial,sans-serif;white-space:nowrap;position:absolute;z-index:200";
                a.style.top = "50px";
                a.style.left = "150px";
                var b = "";
                switch (Number(w.Conf.Pc)) {
                case 0:
                    break;
                case 1:
                    b = "\u60a8\u7684key\u88ab\u5f3a\u5236\u9501\u5b9a\uff0c\u8bf7\u60a8\u4e0eMapabc\u8054\u7cfb\uff01";
                    break;
                case 2:
                    b = "\u60a8\u7684api\u4f59\u989d\u4e0d\u8db3\uff0c\u8bf7\u60a8\u53ca\u65f6\u5145\u503c\uff01";
                    break;
                case 3:
                    b = "\u60a8\u7684api\u5df2\u7ecf\u5230\u671f\uff0c\u8bf7\u60a8\u4e0eMapabc\u8054\u7cfb\uff01";
                    break;
                case 4:
                    b = "\u5f15\u7528\u7684url\u9519\u8bef\uff0c\u8bf7\u60a8\u4e0ekey\u6838\u5bf9\u540e\u518d\u8bd5\uff01";
                    break;
                case 5:
                    b = "\u5f15\u7528\u7684key\u4e0d\u5b58\u5728\uff0c\u6216\u8005\u8be5key\u5df2\u7ecf\u6ce8\u9500\uff0c\u8bf7\u60a8\u4e0eurl\u6838\u5bf9\u540e\u518d\u8bd5\uff01";
                    break;
                default:
                    b = "\u9a8c\u8bc1\u5931\u8d25\uff01"
                }
                this.defaultTileLayer.id = o;
                a.innerHTML = b;
                w.Util.fd(a);
                this.contains.$c.appendChild(a)
            }
        },
        nc: function(a) {
            function b() {
                var a = w.Util.pageSize(c.fa);
                if (c.width != a.width || c.height != a.height) c.width = a.width,
                c.height = a.height,
                c.gb(),
                c.oa(),
                c.c(c, "resize", c)
            }
            var a = (new Date).getTime() - a,
            c = this;
            this.isIE && !this.isIE9 ? this.addEvent(this.fa, "resize", b) : this.Oc = setInterval(b, 1E3);
            if (this._ad) {
                var d = document.createElement("div");
                d.style.cssText = "visibility:hidden;";
                var f = document.createElement("script");
                f.src = this._ad;
                f.onerror = function() {
                    d.removeChild(f)
                };
                d.appendChild(f);
                this.contains.mc.appendChild(d)
            }
            if (this._count) {
                var g = document.createElement("div");
                g.style.cssText = "visibility:hidden;";
                var j = document.createElement("script");
                j.src = this._count + "?v=" + this._version + "&k=" + w.Conf._key + "&u=" + window.location.href + "&t=" + a;
                j.onerror = function() {
                    g.removeChild(j)
                };
                g.appendChild(j);
                this.contains.mc.appendChild(g)
            }
        },
        P: function(a, b) {
            var a = Number(a.toFixed(1)),
            b = Number(b.toFixed(1)),
            c = this.contains.root;
            this.A.x += a;
            this.A.y += b;
            c.style.left = this.A.x + "px";
            c.style.top = this.A.y + "px";
            c = this.j(this.center, this.level);
            this.center = this.Sa(new w.Pixel(c.x - a, c.y - b), this.level);
            this.B = new w.Pixel(this.B.x - a, this.B.y - b);
            this.I = new w.Pixel(this.I.x - a, this.I.y - b);
            this.oc();
            this.c(this, "mapmove", new w.Pixel(a, b));
            var d = this;
            if (!d.Gb) d.Gb = setTimeout(function() {
                d.isOpera || d.oa();
                d.Gb = 0
            },
            1E3)
        },
        S: function(a) {
            if (!this.zoomEnable) return ! 1;
            var b = this;
            this.rb();
            var c = this.level;
            a == "+" ? (this.level++, this.level = Math.min(this.zooms[1], this.level)) : a == "-" ? (this.level--, this.level = Math.max(this.zooms[0], this.level)) : a >= this.zooms[0] && a <= this.zooms[1] && a != this.level && (this.level = a);
            Math.abs(this.level - c) == 1 && this.continuousZoomEnable && this.rc(c);
            this.level - c != 0 && this.gc(this.level - c);
            this.gb();
            this.oa();
            this.level >= this.zooms[0] && this.level <= this.zooms[1] && this.level - c != 0 && this.c(this, "zoomchange", {
                lastLevel: c
            });
            this.ka && (b = this, setTimeout(function() {
                b.ka.open(b, b.ka.position)
            },
            500));
            this.A = new w.Pixel(0, 0)
        },
        ra: function(a, b, c) {
            return new w.LngLat(a.lng + Math.asin(Math.sin(Math.round(b) / 12756274) / Math.cos(a.lat * Math.PI / 180)) * 360 / Math.PI, a.lat + Math.asin(Math.round(c) / 12756274) * 360 / Math.PI)
        },
        Pa: function(a, b) {
            var c = a.lat * Math.PI / 180,
            d = b.lat * Math.PI / 180;
            return (Math.asin(Math.sqrt(Math.pow(Math.sin((c - d) / 2), 2) + Math.cos(c) * Math.cos(d) * Math.pow(Math.sin((a.lng - b.lng) * Math.PI / 180 / 2), 2))) * 12756274).toFixed(2)
        },
        vc: function() {
            var a = this.mapType,
            b;
            if (a.type == "EPSG:3857") b = new w.Yb,
            a = {
                minExtent: new w.Pixel( - 2.003750834E7, -2.003750834E7),
                maxExtent: new w.Pixel(2.003750834E7, 2.003750834E7),
                maxZoom: a.maxZoom || this.zooms[1],
                baseSize: 256
            };
            else if (a.type == "EPSG:4326") b = new w.Eb,
            a = {
                minExtent: a.minExtent || new w.Pixel( - 180, -90),
                maxExtent: a.maxExtent || new w.Pixel(180, 90),
                maxZoom: a.maxZoom || this.zooms[1],
                baseSize: 256
            };
            else if (a.type == "CUSTOM") b = new w.Eb,
            a = {
                minExtent: a.minExtent,
                maxExtent: a.maxExtent,
                originPosition: a.originPosition,
                resolutions: a.resolutions,
                maxZoom: a.maxZoom || this.zooms[1]
            };
            else if (window.Mc) {
                b = new w.Wb(a.type, "EPSG:900913");
                var c = [];
                for (i = 0; i < 25; i++) c.push(156543.0339 / Math.pow(2, i));
                a = {
                    minExtent: new w.Pixel( - 2.003750834E7, -2.003750834E7),
                    maxExtent: new w.Pixel(2.003750834E7, 2.003750834E7),
                    resolutions: c,
                    maxZoom: a.maxZoom || this.zooms[1]
                }
            } else return alert("\u6682\u65f6\u4e0d\u652f\u6301\u6b64\u79cd\u5750\u6807\u7cfb\uff01"),
            !1;
            this.ba = new w.Xb(b, a)
        },
        j: function(a, b) {
        	var xx = this.ba.la.za(a);
        	console.log(xx)
            return this.ba.Hc(xx, b)
        },
        Sa: function(a, b) {
            return this.ba.la.qb(this.ba.Gc(a, b))
        },
        X: function(a) {
            var b = this.A;
            return this.Sa(new w.Pixel(this.h.x + a.x - b.x, this.h.y + a.y - b.y), this.level)
        },
        eb: function(a) {
            var b = this.A,
            a = this.j(a, this.level);
            x = parseInt(a.x - this.h.x + b.x);
            y = parseInt(a.y - this.h.y + b.y);
            return new w.Pixel(x, y)
        }
    });
    w.Class = z;
    w.extend = B;
    w.Zb = z({
        fb: "http://www.w3.org/2000/svg",
        a: !1,
        b: !1,
        C: 0,
        D: 0,
        K: 0,
        N: 0,
        initialize: function(a) {
            var b = document.createElementNS(this.fb, "svg");
            b.setAttribute("id", "ren_" + a.id);
            b.setAttribute("version", 1.1);
            b.setAttribute("viewBox", "0 0 " + a.width + " " + a.height);
            b.style.position = "absolute";
            b.style.width = a.width + "px";
            b.style.height = a.height + "px";
            b.style.left = 0;
            b.style.top = 0;
            b.style.zIndex = 1;
            this.b = b;
            this.a = a;
            a.contains.re.appendChild(b)
        },
        Xa: function(a, b) {
            if (this.C == 0 && this.K == 0 && this.D == 0 && this.N == 0) this.C = this.K = a,
            this.D = this.N = b;
            this.C = Math.min(a, this.C);
            this.K = Math.max(a, this.K);
            this.D = Math.min(b, this.D);
            this.N = Math.max(b, this.N);
            node = this.b;
            node.style.left = this.C - 5 + "px";
            node.style.top = this.D - 5 + "px";
            node.style.width = this.K - this.C + 10 + "px";
            node.style.height = this.N - this.D + 10 + "px";
            node.setAttribute("viewBox", (this.C - 5).toFixed(1) + " " + (this.D - 5).toFixed(1) + " " + (this.K - this.C + 10).toFixed(1) + " " + (this.N - this.D + 10).toFixed(1))
        },
        polyline: function(a) {
            var b = this.b,
            c;
            c = document.createElementNS(this.fb, "path");
            c.setAttribute("stroke-linejoin", "round");
            c.setAttribute("stroke-linecap", "round");
            c.setAttribute("id", a.id);
            b.appendChild(c);
            a.b = c;
            this.nb(a);
            this.ob(a)
        },
        nb: function(a) {
            for (var b = a.b,
            c = this.a,
            d = "",
            f = [], g = 180, j = -85, h = [], k = 0; k < a.path.length; k++) if (a.path[k] && a.path[k].lng && a.path[k].lat) {
                var l = c.j(a.path[k], c.level),
                m = l.x - c.h.x,
                l = l.y - c.h.y;
                f.push(new w.Pixel(parseInt(m), parseInt(l)));
                h.push({
                    x: m.toFixed(1),
                    y: l.toFixed(1)
                });
                this.Xa(m, l, b.parentNode);
                g = Math.min(a.path[k].lng, g);
                j = Math.max(a.path[k].lat, j)
            }
            m = "";
            k = c.level >= c.pa;
            a.W = [];
            if (a.icons && k) if (m = this.Cb(h, a), c.isOpera) {
                k = 0;
                for (h = a.W.length; k < h; k++) {
                    var n = a.W[k],
                    l = " M " + n[0].x + "," + n[0].y + " L " + n[2].x + " " + n[2].y,
                    n = " M " + n[1].x + "," + n[1].y + " L " + n[2].x + " " + n[2].y;
                    m += l + n
                }
            } else {
                k = 0;
                for (h = a.W.length; k < h; k++) n = a.W[k],
                a.$a(n),
                a.ja && a.ja[0] && (n = a.ja[0], l = " M " + n[0].x + "," + n[0].y + " L " + n[2].x + " " + n[2].y, n = " M " + n[1].x + "," + n[1].y + " L " + n[2].x + " " + n[2].y, m += l + n)
            }
            if (c.isOpera) b.setAttribute("d", f.length > 0 ? "M " + f.join(" ") + m: "M 1,1");
            else {
                a.$a(f);
                f = a.ja;
                k = 0;
                for (h = f.length; k < h; k++) d += "M " + f[k].join(" ") + " ";
                b.setAttribute("d", d != "" ? d + m: "M 1, 1")
            }
            a.ha = new w.LngLat(g, j)
        },
        Cb: function(a, b) {
            for (var c = 0,
            d = 0,
            f = 0,
            g = 0,
            j = a.length; g < j; g++) g < j - 1 && (c += Math.sqrt(Math.pow(a[g].x - a[g + 1].x, 2) + Math.pow(a[g].y - a[g + 1].y, 2)));
            g = 0;
            for (j = b.icons.length; g < j; g++) {
                var h = c * parseFloat(b.icons[g].offset) / 100,
                k = !1;
                if (b.icons[g].type == "BACKWARD_ARROW") k = !1;
                else if (b.icons[g].type == "FORWARD_ARROW") k = !0;
                else continue;
                for (var l = d = 0,
                m = a.length; l < m; l++) {
                    f = Math.sqrt(Math.pow(a[l].x - a[l + 1].x, 2) + Math.pow(a[l].y - a[l + 1].y, 2));
                    d += f;
                    if (h == 0) {
                        b.W.push(this.ya(a[l], {
                            x: a[l].x * 2 - a[l + 1].x,
                            y: a[l].y * 2 - a[l + 1].y
                        },
                        b.strokeWeight, k, b));
                        break
                    }
                    if (d > h) {
                        d = w.Util.interpolate(a[l], a[l + 1], (d - h) / f);
                        b.W.push(this.ya(d, a[l], b.strokeWeight, k, b));
                        break
                    } else if (d == h) {
                        b.W.push(this.ya(a[l + 1], a[l], b.strokeWeight, k, b));
                        break
                    }
                }
            }
            return ""
        },
        ya: function(a, b, c, d, f) {
            var g = Math.sqrt((a.y - b.y) * (a.y - b.y) + (a.x - b.x) * (a.x - b.x)),
            j,
            h;
            d ? (d = parseInt(a.x) + parseInt(5 * c * (b.x - a.x + (b.y - a.y) / 2) / g), j = parseInt(a.y) + parseInt(5 * c * (b.y - a.y - (b.x - a.x) / 2) / g), h = parseInt(a.x) + parseInt(5 * c * (b.x - a.x - (b.y - a.y) / 2) / g), b = parseInt(a.y) + parseInt(5 * c * (b.y - a.y + (b.x - a.x) / 2) / g)) : (d = parseInt(a.x) + parseInt(5 * c * (a.x - b.x + (a.y - b.y) / 2) / g), j = parseInt(a.y) + parseInt(5 * c * (a.y - b.y - (a.x - b.x) / 2) / g), h = parseInt(a.x) + parseInt(5 * c * (a.x - b.x - (a.y - b.y) / 2) / g), b = parseInt(a.y) + parseInt(5 * c * (a.y - b.y + (a.x - b.x) / 2) / g));
            c = a.x;
            a = a.y;
            c && a && this.Xa(c, a, f.b.parentNode);
            d && j && this.Xa(d, j, f.b.parentNode);
            h && b && this.Xa(h, b, f.b.parentNode);
            return d && j && h && b && c && a ? [new w.Pixel(d, j), new w.Pixel(h, b), new w.Pixel(c, a)] : []
        },
        ob: function(a) {
            var b = a.b;
            b.setAttribute("fill", "none");
            b.setAttribute("stroke", a.strokeColor);
            b.setAttribute("stroke-width", a.strokeWeight + "px");
            b.setAttribute("stroke-opacity", a.strokeOpacity);
            var c = a.strokeStyle == "solid" ? [0, 0, 0] : a.strokeDasharray,
            c = a.strokeStyle == "solid" ? [0, 0, 0] : a.strokeStyle != "dashed" ? [a.strokeWeight * 2, a.strokeWeight * 2] : a.strokeDasharray;
            b.setAttribute("stroke-dasharray", c.join(","));
            b.style.visibility = a.visible ? "inherit": "hidden";
            b.style.zIndex = a.zIndex
        },
        polygon: function(a) {
            var b = this.b,
            c;
            c = document.createElementNS(this.fb, "path");
            c.setAttribute("id", a.id);
            c.setAttribute("stroke-linejoin", "round");
            c.setAttribute("stroke-linecap", "round");
            b.appendChild(c);
            a.b = c;
            this.xa(a);
            this.Ia(a)
        },
        xa: function(a) {
            for (var b = a.b,
            c = this.a,
            d = [], f = 180, g = -85, j = 0; j < a.path.length; j++) {
                var h = c.j(a.path[j], c.level),
                k = h.x - c.h.x,
                h = h.y - c.h.y;
                d.push(new w.Pixel(parseInt(k), parseInt(h)));
                this.Xa(k, h, b.parentNode);
                f = Math.min(a.path[j].lng, f);
                g = Math.max(a.path[j].lat, g)
            }
            var l = c.level >= c.pa,
            m = [];
            if (a.holes && a.holes instanceof Array) for (var n, j = 0; j < a.holes.length; j++) {
                n = [];
                for (var t = 0; t < a.holes[j].length; t++) h = c.j(a.holes[j][t], c.level),
                k = h.x - c.h.x,
                h = h.y - c.h.y,
                n.push(new w.Pixel(parseInt(k), parseInt(h))); ! c.isOpera && l && (n = a.La(n));
                n.length > 0 && m.push("M " + n.join(" ") + " z ")
            }
            m.length > 0 && b.setAttribute("fill-rule", "evenodd"); ! c.isOpera && l && (d = a.La(d));
            b.setAttribute("d", d.length > 0 ? "M " + d.join(" ") + " z " + m.join(" ") : "M 1,1 z");
            a.ha = new w.LngLat(f, g)
        },
        Ia: function(a) {
            var b = a.b;
            b.setAttribute("fill", a.fillColor);
            b.setAttribute("fill-opacity", a.fillOpacity);
            b.setAttribute("stroke", a.strokeColor);
            b.setAttribute("stroke-width", a.strokeWeight + "px");
            b.setAttribute("stroke-opacity", a.strokeOpacity);
            b.setAttribute("stroke-dasharray", (a.strokeStyle == "solid" ? [0, 0, 0] : a.strokeDasharray).join(","));
            b.style.visibility = a.visible ? "inherit": "hidden";
            b.style.zIndex = a.zIndex
        },
        circle: function(a) {
            this.polygon(a)
        },
        hb: function(a) {
            a.tb();
            this.xa(a)
        },
        Mb: function(a) {
            this.Ia(a)
        }
    });
    w.$b = z({
        a: !1,
        b: !1,
        sc: "urn:schemas-microsoft-com:vml",
        C: 0,
        D: 0,
        K: 0,
        N: 0,
        initialize: function(a) {
            document.namespaces.Sc || document.namespaces.add("abc", this.sc);
            var b = document.createElement("abc:group");
            b.id = "ren_" + a.id;
            b.coordsize = a.width + "," + a.height;
            b.style.width = a.width + "px";
            b.style.height = a.height + "px";
            b.style.left = "0px";
            b.style.top = "0px";
            b.style.position = "absolute";
            b.unselectable = "on";
            if (/msie 7.0/i.test(navigator.userAgent)) b.innerHTML = '<abc:shape style="Z-INDEX:1;POSITION:absolute;WIDTH:1px;HEIGHT:1px;BEHAVIOR:url(#default#VML)" coordsize="1,1" filled="f" stroked="t" strokecolor="red" strokeweight="0.5pt" path="m0,0 1,1 e"><abc:stroke style="BEHAVIOR:url(#default#VML)" opacity="26214f" dashstyle="shortDash"></abc:stroke></abc:shape>';
            this.a = a;
            this.b = b;
            a.contains.re.appendChild(b)
        },
        _rect: function(a, b) {
            if (this.C == 0 && this.K == 0 && this.D == 0 && this.N == 0) this.C = this.K = a,
            this.D = this.N = b;
            this.C = Math.min(a, this.C);
            this.K = Math.max(a, this.K);
            this.D = Math.min(b, this.D);
            this.N = Math.max(b, this.N)
        },
        polyline: function(a) {
            var b = this.b,
            c;
            c = document.createElement("abc:shape");
            c.id = a.id;
            c.style.cssText = "behavior:url(#default#VML);position:absolute;width:1px;height:1px;";
            c.coordsize = "1,1";
            c.filled = !1;
            c.stroked = !0;
            a.b = c;
            this.nb(a);
            this.ob(a);
            b.appendChild(c)
        },
        nb: function(a) {
            for (var b = a.b,
            c = this.a,
            d = [], f = 180, g = -85, j = [], h = 0; h < a.path.length; h++) {
                var k = c.j(a.path[h], c.level),
                l = (k.x - c.h.x).toFixed(0),
                k = (k.y - c.h.y).toFixed(0);
                this._rect(l, k);
                d.push(new w.Pixel(parseInt(l), parseInt(k)));
                j.push({
                    x: l,
                    y: k
                });
                x1 = l;
                y1 = k;
                f = Math.min(a.path[h].lng, f);
                g = Math.max(a.path[h].lat, g)
            }
            l = "";
            c = c.level >= c.pa;
            a.W = [];
            if (a.icons && c) {
                l = this.Cb(j, a);
                h = 0;
                for (j = a.W.length; h < j; h++) k = a.W[h],
                a.$a(k),
                a.ja && a.ja[0] && (k = a.ja[0], l += "c m " + k[0].x + "," + k[0].y + " l " + k[2].x + " " + k[2].y + ("c m " + k[1].x + "," + k[1].y + " l " + k[2].x + " " + k[2].y))
            }
            if (c) {
                a.$a(d);
                d = a.ja;
                k = "";
                h = 0;
                for (j = d.length; h < j; h++) c = d[h][0],
                d[h].shift(),
                k += " m " + c + " l " + d[h].join(" ") + " ";
                b.path = k == "" ? " m 1, 1": k + l
            } else c = d[0],
            d.shift(),
            b.path = "m " + c + " l " + d.join(" ") + l;
            a.ha = new w.LngLat(f, g)
        },
        Cb: function(a, b) {
            for (var c = 0,
            d = 0,
            f = 0,
            g = 0,
            j = a.length; g < j; g++) g < j - 1 && (c += Math.sqrt(Math.pow(a[g].x - a[g + 1].x, 2) + Math.pow(a[g].y - a[g + 1].y, 2)));
            for (var j = 0,
            h = b.icons.length; j < h; j++) {
                var k = c * parseFloat(b.icons[j].offset) / 100,
                l = !0;
                if (b.icons[j].type == "BACKWARD_ARROW") l = !1;
                else if (b.icons[j].type == "FORWARD_ARROW") l = !0;
                else continue;
                for (var g = d = 0,
                m = a.length; g < m; g++) {
                    f = Math.sqrt(Math.pow(a[g].x - a[g + 1].x, 2) + Math.pow(a[g].y - a[g + 1].y, 2));
                    d += f;
                    if (k == 0) {
                        b.W.push(this.ya(a[g], {
                            x: a[g].x * 2 - a[g + 1].x,
                            y: a[g].y * 2 - a[g + 1].y
                        },
                        b.strokeWeight, l));
                        break
                    }
                    if (d > k) {
                        d = w.Util.interpolate(a[g], a[g + 1], (d - k) / f);
                        b.W.push(this.ya(d, a[g], b.strokeWeight, l));
                        break
                    } else if (d == k) {
                        b.W.push(this.ya(a[g + 1], a[g], b.strokeWeight, l));
                        break
                    }
                }
            }
            return ""
        },
        ya: function(a, b, c, d) {
            var f = Math.sqrt((a.y - b.y) * (a.y - b.y) + (a.x - b.x) * (a.x - b.x)),
            g,
            j;
            d ? (d = parseInt(a.x) + parseInt(5 * c * (b.x - a.x + (b.y - a.y) / 2) / f), g = parseInt(a.y) + parseInt(5 * c * (b.y - a.y - (b.x - a.x) / 2) / f), j = parseInt(a.x) + parseInt(5 * c * (b.x - a.x - (b.y - a.y) / 2) / f), b = parseInt(a.y) + parseInt(5 * c * (b.y - a.y + (b.x - a.x) / 2) / f)) : (d = parseInt(a.x) + parseInt(5 * c * (a.x - b.x + (a.y - b.y) / 2) / f), g = parseInt(a.y) + parseInt(5 * c * (a.y - b.y - (a.x - b.x) / 2) / f), j = parseInt(a.x) + parseInt(5 * c * (a.x - b.x - (a.y - b.y) / 2) / f), b = parseInt(a.y) + parseInt(5 * c * (a.y - b.y + (a.x - b.x) / 2) / f));
            c = a.x;
            a = a.y;
            return d && g && j && b && c && a ? [new w.Pixel(d, g), new w.Pixel(j, b), new w.Pixel(c, a)] : []
        },
        ob: function(a) {
            var b = a.b;
            b.strokecolor = a.strokeColor;
            b.strokeweight = a.strokeWeight + "px";
            var c = b.children[0] || document.createElement("abc:stroke");
            c.style.cssText = "behavior:url(#default#VML);";
            c.opacity = a.strokeOpacity;
            a.strokeStyle != "solid" && (c.dashstyle = "ShortDash");
            c.endcap = "round";
            b.children[0] || b.appendChild(c);
            b.style.visibility = a.visible ? "inherit": "hidden";
            b.style.zIndex = a.zIndex
        },
        polygon: function(a) {
            var b = this.b,
            c;
            c = document.createElement("abc:shape");
            c.id = a.id;
            c.style.cssText = "behavior:url(#default#VML);position:absolute;width:1px;height:1px;";
            c.coordsize = "1,1";
            c.filled = !0;
            c.stroked = !0;
            b.appendChild(c);
            a.b = c;
            this.xa(a);
            this.Ia(a)
        },
        xa: function(a) {
            for (var b = a.b,
            c = this.a,
            d = [], f = 180, g = -85, j = 0; j < a.path.length; j++) {
                var h = c.j(a.path[j], c.level),
                k = (h.x - c.h.x).toFixed(0),
                h = (h.y - c.h.y).toFixed(0);
                this._rect(k, h);
                d.push(new w.Pixel(parseInt(k), parseInt(h)));
                f = Math.min(a.path[j].lng, f);
                g = Math.max(a.path[j].lat, g)
            }
            var l = [],
            m,
            n = c.level >= c.pa;
            if (a.holes) for (j = 0; j < a.holes.length; j++) {
                m = [];
                for (var t = 0; t < a.holes[j].length; t++) h = c.j(a.holes[j][t], c.level),
                k = h.x - c.h.x,
                h = h.y - c.h.y,
                m.push(new w.Pixel(parseInt(k), parseInt(h)));
                n && (m = a.La(m));
                m.length > 0 && (k = m[0] ? m[0] : "", m.shift(), l.push("m " + k + " l " + m.join(" ") + " x "))
            }
            n && (d = a.La(d));
            c = d[0] ? d[0] : "";
            d.shift();
            b.path = "m " + c + " l " + d.join(" ") + " x " + l.join(" ") + " e";
            a.ha = new w.LngLat(f, g)
        },
        Ia: function(a) {
            var b = a.b;
            b.fillcolor = a.fillColor;
            b.strokecolor = a.strokeColor;
            b.strokeweight = a.strokeWeight + "px";
            var c = b.children[0] || document.createElement("abc:stroke"),
            d = b.children[1] || document.createElement("abc:fill");
            c.opacity = a.strokeOpacity;
            a.strokeStyle != "solid" && (c.dashstyle = "ShortDash");
            c.style.cssText = "behavior:url(#default#VML);";
            d.opacity = a.fillOpacity;
            d.style.cssText = "behavior:url(#default#VML);";
            b.children[0] || b.appendChild(c);
            b.children[1] || b.appendChild(d);
            b.style.visibility = a.visible ? "inherit": "hidden";
            b.style.zIndex = a.zIndex
        },
        circle: function(a) {
            this.polygon(a)
        },
        hb: function(a) {
            a.tb();
            this.xa(a)
        },
        Mb: function(a) {
            this.Ia(a)
        }
    });
    w.Circle = z({
        _type: "circle",
        a: !1,
        b: !1,
        id: 0,
        zIndex: 1E3,
        center: {},
        radius: 100,
        strokeColor: "#BDBDBD",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        strokeStyle: "solid",
        strokeDasharray: [10, 5],
        fillColor: "#F8F8F8",
        fillOpacity: 0.8,
        visible: !0,
        holes: [],
        M: !1,
        z: w.Util.guid(),
        d: {},
        ha: !1,
        initialize: function(a) {
            this.id = "circle" + w.Util.guid();
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            this.z = w.Util.guid();
            Number(this.center.lng) && Number(this.center.lat) && Number(this.radius) && this.tb();
            return this
        },
        tb: function() {
            for (var a = Math.PI,
            b = [], c = this.center, d = this.radius / 6378800, f = a / 180 * c.lat, c = a / 180 * c.lng, g = 0; g < 361; g += 6) {
                var j = a / 180 * g,
                h = Math.asin(Math.sin(f) * Math.cos(d) + Math.cos(f) * Math.sin(d) * Math.cos(j)),
                j = new w.LngLat(parseFloat(((c - Math.atan2(Math.sin(j) * Math.sin(d) * Math.cos(f), Math.cos(d) - Math.sin(f) * Math.sin(h)) + a) % (2 * a) - a) * (180 / a)), parseFloat(h * (180 / a)));
                b.push(j)
            }
            this.path = b
        },
        setCenter: function(a) {
            this.center = a;
            this.a.k.hb(this);
            this.a.c(this, "change", this);
            this.a.c(this, "center_change", this)
        },
        getBounds: function() {
            var a = this.a,
            b = a.ra(this.center, -this.radius, -this.radius),
            a = a.ra(this.center, this.radius, this.radius);
            return new w.Bounds(b, a)
        },
        getCenter: v("center"),
        setRadius: function(a) {
            this.radius = a;
            this.a.k.hb(this);
            this.a.c(this, "change", this);
            this.a.c(this, "radius_change", this)
        },
        getRadius: v("radius"),
        hide: function() {
            this.visible = !1;
            this.b.style.visibility = "hidden";
            this.a.c(this, "hide", this)
        },
        show: function() {
            this.b.style.visibility = "inherit";
            this.visible = !0;
            this.a.c(this, "show", this);
            w.Util.isIE && this.a.Aa(this, !0)
        },
        setOptions: function(a) {
            for (var b in a)"strokeColor,strokeStyle,strokeOpacity,strokeDasharray,strokeWeight,fillColor,fillOpacity".indexOf(b) > -1 && a[b] && (this[b] = a[b]);
            this.a.k.Mb(this);
            this.a.c(this, "change", this)
        },
        getOptions: function() {
            for (var a = ["strokeColor", "strokeStyle", "strokeOpacity", "strokeDasharray", "strokeWeight", "fillColor", "fillOpacity"], b = {},
            c = 0; c < a.length; c++) b[a[c]] = this[a[c]];
            return b
        },
        getArea: function() {
            return (Math.PI * Math.pow(this.radius, 2)).toFixed(2)
        },
        setHoles: function(a) {
            this.holes = [].concat(a);
            this.a.k.hb(this);
            this.a.c(this, "hole", this)
        },
        setEditable: function(a) {
            this.M ? a || (this.a.oa(), this.Q()) : a && (this._destroy(), this.a.k.b.appendChild(this.b), this.ea())
        },
        ea: function() {
            function a(a) {
                var b = a.lnglat.lng - c.getCenter().lng,
                f = a.lnglat.lat - c.getCenter().lat,
                b = new w.LngLat(g.getPosition().lng + b, g.getPosition().lat + f);
                g.setPosition(b);
                c.bb = !0;
                c.setCenter(a.lnglat);
                c.bb = !1;
                d.trigger(c, "move", c)
            }
            function b(a) {
                c.bb = !0;
                c.setRadius(d.getDistance(c.center, a.lnglat));
                c.bb = !1;
                d.trigger(c, "adjust", c)
            }
            var c = this,
            d = this.a;
            c.Q();
            c.M = !0;
            d.isDragging = !0;
            var f = d.getLngLatByOffset(c.center, c.radius, 0),
            g = new w.Marker({
                zIndex: 2,
                id: "m" + c.z,
                offset: new w.Pixel( - 5, -5),
                position: f,
                draggable: !0,
                isEditClass: !0,
                visible: !0
            });
            g.content = d.isIE6 ? '<div title="\u62d6\u52a8\u4ee5\u8c03\u6574\u5706\u5927\u5c0f" class="edit_mapabc" style="width:11px;height:11px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + (w.Conf._client || d._client) + "Images/dd-via.png');\"></div>": '<div title="\u62d6\u52a8\u4ee5\u8c03\u6574\u5706\u5927\u5c0f" class="edit_mapabc" style="width:11px;height:11px;background:url(' + (w.Conf._client || d._client) + 'Images/dd-via.png) 0px 0px no-repeat;"></div>';
            d.addOverlays(g);
            d.bind(g, "dragging", b);
            c.d["m" + c.z] = [{
                p: g,
                n: "dragging",
                m: b
            }];
            f = new w.Marker({
                zIndex: 1,
                id: "d" + c.z,
                offset: new w.Pixel( - 5, -5),
                position: c.center,
                draggable: !0,
                isEditClass: !0
            });
            f.content = d.isIE6 ? '<div title="\u62d6\u52a8\u79fb\u52a8\u56fe\u5f62" class="edit_mapabc" style="width:11px;height:11px;cursor:move;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + (w.Conf._client || d._client) + "Images/dd-via.png');\"></div>": '<div title="\u62d6\u52a8\u79fb\u52a8\u56fe\u5f62" class="edit_mapabc" style="width:11px;height:11px;cursor:move;background:url(' + (w.Conf._client || d._client) + 'Images/dd-via.png) 0px 0px no-repeat;"></div>';
            d.addOverlays(f);
            typeof DD_belatedPNG != "undefined" && DD_belatedPNG.fix(".edit_mapabc");
            d.bind(f, "dragging", a);
            d.bind(f, "dragend", a);
            c.d["d" + c.z] = [{
                p: f,
                n: "dragend",
                m: a
            }];
            this.R = !0;
            for (var f = [{
                p: this,
                n: "center_change",
                m: w.Util.Y(this, this.Fa)
            },
            {
                p: this,
                n: "radius_change",
                m: w.Util.Y(this, this.Fa)
            },
            {
                p: this,
                n: "hide",
                m: w.Util.Y(this, this.Ra)
            },
            {
                p: this,
                n: "show",
                m: w.Util.Y(this, this.Ua)
            },
            {
                p: this,
                n: "predestroy",
                m: w.Util.Y(this, this.Ma)
            }], j = 0; j < f.length; j++) d.bind(f[j].p, f[j].n, f[j].m);
            this.G = f
        },
        Ra: function() {
            if (this.R !== !1) this.a.getOverlays("d" + this.z).hide(),
            this.a.getOverlays("m" + this.z).hide(),
            this.R = !1
        },
        Ua: function() {
            if (this.R !== !0) this.a.getOverlays("d" + this.z).show(),
            this.a.getOverlays("m" + this.z).show(),
            this.R = !0
        },
        Fa: function() {
            this.M && !this.bb && (this.Q(), this.ea())
        },
        Ma: function() {
            if (this.M) {
                this.Q();
                var a = function(b) {
                    b.ea();
                    b.a.unbind(b, "reload", a)
                };
                this.a.bind(this, "reload", a)
            }
        },
        Q: function() {
            var a = this.a;
            this.M = !1;
            a.isDragging = !1;
            for (var b in this.d) {
                for (var c = this.d[b], d = 0; d < c.length; d++) a.unbind(c[d].p, c[d].n, c[d].m);
                this.d[b] = o;
                delete this.d[b];
                a.removeOverlays(b)
            }
            if (this.G) for (b = 0; b < this.G.length; b++) a.unbind(this.G[b].p, this.G[b].n, this.G[b].m);
            this.G = o
        },
        na: function(a, b) {
            var c = this.a,
            d = c.A,
            f = new w.Pixel(0, 0);
            if (c.isIE && !c.isIE9 || c.isOpera) {
                var g = c.j(this.ha, c.level);
                f.x = d.x + g.x - c.h.x + b.offsetX;
                f.y = d.y + g.y - c.h.y + b.offsetY - 2
            } else c.isIE9 ? (f.x = d.x + b.offsetX, f.y = d.y + b.offsetY) : (f.x = d.x + parseInt(a.parentNode.style.left) + b.layerX, f.y = d.y + parseInt(a.parentNode.style.top) + b.layerY);
            return f
        },
        _destroy: function() {
            this.a.c(this, "predestroy", this);
            this.a.k.b.removeChild(this.b)
        },
        _bind_: function() {
            function a(a) {
                var b = f.na(c, a);
                a.layerX = b.x;
                a.layerY = b.y;
                a.id = c.id;
                a.lnglat = d.X(b);
                d.c(f, "rightclick", a);
                d.isDragging || d.stopPropagation(a)
            }
            function b(a) {
                var b = f.na(c, a);
                a.layerX = b.x;
                a.layerY = b.y;
                a.id = c.id;
                a.lnglat = d.X(b); ! d.isDragging && a.type == "click" && d.stopPropagation(a);
                d.c(f, a.type, a)
            }
            var c = this.b,
            d = this.a,
            f = this,
            g = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup"];
            this.l = {};
            for (var j = 0; j < g.length; j++) d.addEvent(c, g[j], b),
            this.l[g[j]] = b;
            d.addEvent(c, "contextmenu", a);
            this.l.contextmenu = a
        },
        _unbind_: function() {
            var a = this.b,
            b = this.a,
            c;
            for (c in this.l) b.removeEvent(a, c, this.l[c]),
            this.l[c] = o;
            this.l = {}
        },
        La: function(a) {
            var b = this.a,
            c = b.getBounds(),
            d = b.lnglatToPixel(c.southwest, b.level),
            f = b.lnglatToPixel(c.northeast, b.level);
            c.min = {
                x: parseInt(d.x - b.h.x - b.width / 2),
                y: parseInt(f.y - b.h.y - b.height / 2)
            };
            c.max = {
                x: parseInt(f.x - b.h.x + b.width / 2),
                y: parseInt(d.y - b.h.y + b.height / 2)
            };
            var d = [1, 4, 2, 8],
            g,
            j,
            h,
            k,
            l,
            f = 0;
            for (k = a.length; f < k; f++) a[f].ca = this.da(a[f], c);
            for (j = 0; j < 4; j++) {
                l = d[j];
                b = [];
                f = 0;
                k = a.length;
                for (g = k - 1; f < k; g = f++) if (h = a[f], g = a[g], h.ca & l) {
                    if (! (g.ca & l)) g = this.qa(g, h, l, c),
                    g.ca = this.da(g, c),
                    b.push(g)
                } else {
                    if (g.ca & l) g = this.qa(g, h, l, c),
                    g.ca = this.da(g, c),
                    b.push(g);
                    b.push(h)
                }
                a = b
            }
            return a
        },
        qa: function(a, b, c, d) {
            var f = b.x - a.x,
            b = b.y - a.y,
            g = d.min,
            d = d.max;
            if (c & 8) return new w.Pixel(parseInt(a.x + f * (d.y - a.y) / b), parseInt(d.y));
            else if (c & 4) return new w.Pixel(parseInt(a.x + f * (g.y - a.y) / b), parseInt(g.y));
            else if (c & 2) return new w.Pixel(parseInt(d.x), parseInt(a.y + b * (d.x - a.x) / f));
            else if (c & 1) return new w.Pixel(parseInt(g.x), parseInt(a.y + b * (g.x - a.x) / f))
        },
        da: function(a, b) {
            var c = 0;
            a.x < b.min.x ? c |= 1 : a.x > b.max.x && (c |= 2);
            a.y < b.min.y ? c |= 4 : a.y > b.max.y && (c |= 8);
            return c
        }
    });
    w.ContextMenu = z({
        _type: "contextmenu",
        isCustom: !1,
        position: {},
        content: "",
        width: 200,
        className: "",
        initialize: function(a) {
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            document.createElement("ul").style.cssText = "margin:0;padding:0;list-style-type:none;position:relative;background-color:#FFFFFF;border:1px solid #4B4B4B;border-radius:3px 3px 3px 3px;box-shadow:2px 2px 8px #999999;padding:2px;white-space:nowrap;cursor:hand;cursor:pointer;";
            this.Ja = [];
            return this
        },
        Qa: function() {
            var a = this.Ja.sort(function(a, b) {
                return a.so - b.so
            }),
            b = document.createElement("ul");
            b.style.cssText = "margin:0;padding:0;list-style-type:none;position:relative;background-color:#FFFFFF;border:1px solid #4B4B4B;border-radius:3px 3px 3px 3px;box-shadow:2px 2px 8px #999999;padding:2px;white-space:nowrap;cursor:hand;cursor:pointer;";
            for (var c = 0; c < a.length; c++) {
                var d = document.createElement("li");
                d.style.cssText = "text-indent:0.5em;height:20px;line-height:20px;word-break:break-all;white-space:nowrap;";
                d.innerHTML = a[c].text;
                d.onclick = a[c].fn;
                d.so = a[c].so;
                d.onmouseover = function() {
                    this.style.backgroundColor = "#F3F3EE"
                };
                d.onmouseout = function() {
                    this.style.backgroundColor = ""
                };
                b.appendChild(d)
            }
            d = document.createElement("li");
            d.innerHTML = "JavaScript API v3.1&copy;MapABC";
            d.onclick = function() {
                window.open("http://www.mapabc.com")
            };
            d.so = 9999;
            d.style.cssText = "font-size:12px;border-top:#ccc solid 1px;padding:2px 0;text-align:center";
            b.appendChild(d);
            return b
        },
        open: function(a, b) {
            function c() {
                h.a.contains.me.style.display = "none";
                h.a.contains.me.innerHTML = "";
                h.a.removeEvent(h.a.fa, "click", c)
            }
            this.a = a;
            var d = this.a.contains.me;
            d.innerHTML = "";
            this.isCustom == !1 ? d.appendChild(this.Qa()) : d.innerHTML = this.content;
            d.className = this.className;
            d.style.display = "block";
            d.style.width = this.width + "px";
            var f = this.a.j(b, this.a.level),
            f = {
                x: f.x - this.a.h.x,
                y: f.y - this.a.h.y
            },
            g = this.a.eb(b, this.a.level),
            j = g.y + this.width;
            g.x + this.width > this.a.width && (f.x -= this.width);
            j > this.a.height && (f.y -= d.offsetHeight);
            d.style.left = f.x + "px";
            d.style.top = f.y + "px";
            var h = this;
            this.a.addEvent(this.a.fa, "click", c);
            this.a.c(this, "open", this)
        },
        close: function() {
            this.a.contains.me.style.display = "none";
            this.a.contains.me.innerHTML = "";
            this.a.c(this, "close", this)
        },
        addItem: function(a, b, c) {
            if (!a || !b) return ! 1;
            c == e && (c = 0);
            this.Ja.push({
                text: a,
                fn: b,
                so: c
            });
            return ! 0
        },
        removeItem: function(a, b) {
            if (!a || !b) return ! 1;
            for (var c = 0; c < this.Ja.length; c++) if (this.Ja[c].text == a && this.Ja[c].fn.toString() == b.toString()) return this.Ja.splice(c, 1),
            !0;
            return ! 1
        },
        setClassName: function() {
            this.a.contains.me.className = this.className
        },
        getClassName: v("className")
    });
    w.Icon = z(w.Conf, {
        _type: "icon",
        size: new w.Size(20, 24),
        imageOffset: new w.Pixel(0, 0),
        image: "Images/marker_sprite.png",
        initialize: function(a) {
            this.image = (w.Conf._client || this._client) + this.image;
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            return this
        },
        Qa: function() {
            var a = document.createElement("div");
            a.style.cssText = "width:" + this.size.width + "px;height:" + this.size.height + "px;overflow:hidden;position:relative;z-index:1;";
            this.b = a;
            var b;
            if (w.Util.isIE) {
                var c = new Image;
                c.src = this.image;
                b = document.createElement("div");
                b.style.cssText = "position:absolute;z-index:1;left:" + this.imageOffset.x + "px;top:" + this.imageOffset.y + "px;cursor:pointer;";
                this.image.toLocaleLowerCase().indexOf(".png") > -1 ? (b.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.image + "',sizingMethod='scale');", c.complete ? b.style.cssText += ";width:" + c.width + "px;height:" + c.height + "px;": c.onload = function() {
                    b.style.cssText += ";width:" + c.width + "px;height:" + c.height + "px;";
                    c.onload = o
                }) : (a = document.createElement("img"), a.src = this.image, b.appendChild(a))
            } else b = document.createElement("img"),
            b.style.cssText = "position:absolute;z-index:-1;left:" + this.imageOffset.x + "px;top:" + this.imageOffset.y + "px;cursor:pointer",
            b.src = this.image;
            this.b.appendChild(b);
            return this.b
        }
    });
    w.InfoWindow = z(w.Conf, {
        _type: "inforwindow",
        a: !1,
        isCustom: !1,
        position: {},
        content: "",
        offset: new w.Pixel( - 106, -61),
        size: new w.Size(300, 0),
        isOpen: !1,
        autoMove: !1,
        initialize: function(a) {
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            if (window.ActiveXObject && !window.XMLHttpRequest && typeof DD_belatedPNG == "undefined" && (a = (w.Conf._plugin || this._plugin) + "?cls=iepngfix", w.Util.cookieEnabled() || (a += "&key=" + w.Conf._key), !w.InfoWindow.zc)) w.InfoWindow.zc = !0,
            new w.AjaxRequest(a,
            function() {
                DD_belatedPNG.fix(".tip_mapabc");
                DD_belatedPNG.fix(".tip_closeX_mapabc")
            },
            !0);
            return this
        },
        Qa: function() {
            if (this.isCustom == !1) {
                var a = (w.Conf._client || this._client) + "Images/info.png",
                b = document.createDocumentFragment(),
                c = document.createElement("div");
                c.style.cssText = "height:8px;position:relative;z-index:104;overflow:hidden;";
                var d = [];
                d.push('<div style="width:8px;height:8px;background:url(' + a + ') -13px 0px;position:absolute;left:0;top:0;overflow:hidden;"></div>');
                d.push('<div style="position:relative;height:7px;border-top:#BDBDBD solid 1px;margin:0px 8px 1px 8px;background-color:#F8F8F8;overflow:hidden;"></div>');
                d.push('<div style="width:8px;height:8px;background:url(' + a + ') -19px 0px;position:absolute;right:0;top:0;overflow:hidden;"></div>');
                c.innerHTML = d.join("");
                b.appendChild(c);
                c = document.createElement("div");
                c.style.cssText = "padding:0 8px;border-left:#BDBDBD solid 1px;border-right:#BDBDBD solid 1px; background-color:#F8F8F8;height:auto;white-space:break-word;overflow:hidden;";
                this.size.height == 0 ? c.style.width = this.size.width - 18 + "px": (c.style.width = this.size.width - 18 + "px", c.style.height = this.size.height - 16 + "px");
                c.innerHTML = this.content;
                b.appendChild(c);
                c = document.createElement("div");
                c.style.cssText = "height:8px;position:relative;z-index:104;";
                d = [];
                d.push('<div style="width:8px;height:8px;background:url(' + a + ') -13px -6px;position:absolute;left:0;top:0;overflow:hidden;"></div>');
                d.push('<div style="height:7px;border-bottom:#BDBDBD solid 1px;margin:0px 8px;background-color:#F8F8F8;overflow:hidden;"></div>');
                d.push('<div style="width:8px;height:8px;background:url(' + a + ') -19px -6px;position:absolute;right:0;top:0;overflow:hidden;"></div>');
                c.innerHTML = d.join("");
                b.appendChild(c);
                c = document.createDocumentFragment();
                d = Math.ceil((this.size.width || this.t.clientWidth) / 2) - 6;
                for (i = 0; i < 6; i++) {
                    var f = document.createElement("div");
                    f.style.cssText = "position:relative;height:8px;z-index:105;border:none;overflow:hidden;";
                    f.style.backgroundImage = "url(" + a + ")";
                    f.style.backgroundPosition = "-" + (35 - i * 7) + "px -" + (1 + i * 7) + "px";
                    f.style.width = 52 - i * 7 + "px";
                    f.style.left = d - i * 8 + "px";
                    f.style.top = "-1px";
                    f.className = "tip_mapabc";
                    c.appendChild(f)
                }
                b.appendChild(c);
                c = document.createElement("img");
                c.style.cssText = "position:absolute;top:4px;right:4px;z-index:500;width:12px;height:12px;background:url(" + a + ") 0px 0px;cursor:hand;cursor:pointer;";
                c.src = (w.Conf._client || this._client) + "Images/blank.gif";
                c.alt = "close";
                c.className = "tip_closeX_mapabc";
                c.onmouseover = function() {
                    this.style.backgroundPosition = "0px -12px"
                };
                c.onmouseout = function() {
                    this.style.backgroundPosition = "0px -0px"
                };
                var g = this;
                this.a.addEvent(c, "click",
                function(a) {
                    g.close();
                    g.a.stopPropagation(a)
                });
                b.appendChild(c);
                return b
            } else return this.content
        },
        open: function(a, b) {
            this.Jb(a, b);
            var c = this;
            a.bind(a, "resize",
            function() {
                c.Jb(a, c.position)
            })
        },
        Jb: function(a, b) {
            function c() {
                if (h.autoMove) {
                    var a = d.A.x + parseInt(h.t.style.left),
                    b = d.A.y + parseInt(h.t.style.top),
                    c = 0,
                    f = 0;
                    a < 0 ? c = -a + 5 : a + h.size.width > d.width && (c = d.width - h.size.width - a - 5);
                    a = (h.size.height || h.t.clientHeight) + 47;
                    b < 0 ? f = -b + 5 : b + a >= d.height && (f = d.height - b - a - 5);
                    d.P(c, f)
                }
                setTimeout(function() {
                    h.t.style.visibility = "visible"
                },
                40);
                h.isOpen = !0;
                h._bind_();
                d.c(h, "open", h);
                d.ka = h
            }
            var d = this.a = a;
            this.position = b;
            this.t = d.contains.ti;
            for (var f = this.t.children; f.length > 0;) this.t.removeChild(f[0]);
            f = this.Qa();
            typeof f == "object" ? (this.t.appendChild(f), typeof DD_belatedPNG != "undefined" && DD_belatedPNG.fix(".tip_mapabc")) : this.t.innerHTML = f;
            try {
                var g = a.j(b, a.level)
            } catch(j) {
                alert(j)
            }
            var h = this;
            this.isCustom == !1 ? setTimeout(function() {
                if (h.size.height == 0) {
                    if (!h.t.children[1]) return ! 1;
                    var a = h.offset.y != 0 ? h.offset.y - h.t.children[1].clientHeight: 0;
                    if (h.t.clientHeight > 47) h.t.style.height = h.t.clientHeight - 47 + "px";
                    h.t.style.top = g.y - d.h.y + a + "px"
                } else h.t.style.height = h.size.height - 47 + "px",
                h.t.style.top = g.y - d.h.y + h.offset.y + "px";
                h.t.style.width = h.size.width + "px";
                h.t.style.left = g.x - d.h.x + h.offset.x + "px";
                d.P(1, 0);
                d.P( - 1, 0);
                c()
            },
            1) : setTimeout(function() {
                h.t.style.left = g.x - d.h.x + h.offset.x + "px";
                h.t.style.top = g.y - d.h.y + h.offset.y + "px";
                h.t.style.height = (h.size.height || h.t.clientHeight) + "px";
                h.t.style.width = (h.size.width || h.t.clientWidth) + "px";
                d.P(1, 0);
                d.P( - 1, 0);
                c()
            },
            1)
        },
        close: function() {
            this.t.style.visibility = "hidden";
            for (var a = this.t.children; a.length > 0;) this.t.removeChild(a[0]);
            this.isOpen = !1;
            this.a && this.a.c(this, "close", this);
            a = this.a;
            a.ka = o;
            delete a.ka
        },
        getIsOpen: v("isOpen"),
        setIsCustom: function(a) {
            this.isCustom = a;
            this.a && this.a.c(this, "change", this)
        },
        getIsCustom: v("isCustom"),
        setOffset: function(a) {
            this.offset = a;
            this.a && (this.a.c(this, "change", this), this.open(this.a, this.position))
        },
        getOffset: v("offset"),
        setContent: function(a) {
            this.content = a;
            this.a && (this.a.c(this, "change", this), this.open(this.a, this.position))
        },
        getContent: v("content"),
        setPosition: function(a) {
            this.position = a;
            this.a && (this.a.c(this, "change", this), this.open(this.a, this.position))
        },
        getPosition: v("position"),
        setSize: function(a) {
            this.size = a;
            this.a && (this.a.c(this, "change", this), this.open(this.a, this.position))
        },
        getSize: v("size"),
        _bind_: function() {
            for (var a = this.a,
            b = this.t,
            c = ["click", "dblclick"], d = 0; d < c.length; d++) a.addEvent(b, c[d],
            function(b) {
                a.stopPropagation(b)
            })
        }
    });
    w.Marker = z(w.Conf, {
        _type: "marker",
        a: !1,
        b: !1,
        Z: {},
        id: 0,
        position: {},
        zIndex: 2,
        icon: "Images/marker_sprite.png",
        rotate: 0,
        content: "",
        offset: new w.Pixel(0, 0),
        draggable: !0,
        cursor: "default",
        autoRotation: !0,
        visible: !0,
        isAdded: !1,
        isEditClass: !1,
        initialize: function(a) {
            this.icon = (w.Conf._client || this._client) + this.icon;
            this.Z[0] = 0;
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            this.id = this.id ? this.id: w.Util.guid();
            return this
        },
        _getHtmlDom: function() {
            var a = this.a,
            b = document.createElement("div");
            b.style.cssText = "position:absolute;z-index:" + this.zIndex;
            b.style.cursor = this.cursor != "default" ? "url(" + this.cursor + "),pointer": "default";
            b.style.visibility = this.visible ? "inherit": "hidden";
            b.id = this.id;
            if (this.content != "") typeof this.content == "object" ? b.appendChild(this.content) : b.innerHTML = this.content;
            else if (typeof this.icon == "string") {
                var c;
                if (a.isIE && !a.isIE9) {
                    var d = new Image;
                    d.src = this.icon;
                    c = document.createElement("div");
                    c.style.cssText = a.isOpera ? ";border:none;display:inline-block;": ";cursor:hand;border:none;display:inline-block;";
                    if (this.icon.toLocaleLowerCase().indexOf(".png") > -1) c.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.icon + "',sizingMethod='scale');",
                    d.complete ? c.style.cssText += ";width:" + d.width + "px;height:" + d.height + "px;": d.onload = function() {
                        c.style.cssText += ";width:" + d.width + "px;height:" + d.height + "px;";
                        d.onload = o
                    };
                    else {
                        var f = document.createElement("img");
                        f.src = this.icon;
                        c.appendChild(f)
                    }
                } else c = document.createElement("img"),
                c.src = this.icon,
                c.style.cssText = a.isOpera ? ";border:none;": ";cursor:hand;border:none;";
                b.appendChild(c)
            } else b.appendChild(this.icon.Qa());
            this.rotate && this.autoRotation && this.zb(b, this.rotate);
            f = a.j(this.position, a.level);
            b.style.left = f.x - a.h.x + this.offset.x + "px";
            b.style.top = f.y - a.h.y + this.offset.y + "px";
            this.b = b;
            this._markerInWorlds();
            return b
        },
        setPosition: function(a) {
            var b = this.b,
            c = this.a,
            d = c.j(a, c.level);
            b.style.left = d.x - c.h.x + this.offset.x + "px";
            b.style.top = d.y - c.h.y + this.offset.y + "px";
            this.position = a
        },
        getPosition: v("position"),
        lb: function() {
            var a = this.b,
            b = {},
            c = this.a;
            b.x = parseInt(a.style.left) + c.h.x - this.offset.x;
            b.y = parseInt(a.style.top) + c.h.y - this.offset.y;
            return this.position = c.Sa(b, this.a.level)
        },
        setIcon: function(a) {
            var b = this.b,
            c = this.a;
            if (!this.content) {
                this.icon = a;
                if (typeof this.icon == "string") {
                    var d = new Image;
                    d.src = this.icon;
                    var f = b.children[0];
                    c.isIE && !c.isIE9 ? this.icon.toLocaleLowerCase().indexOf(".png") > -1 ? (f.children[0] && f.removeChild(f.children[0]), f.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.icon + "',sizingMethod='image');", d.complete ? (f.style.width = d.width, f.style.height = d.height) : d.onload = function() {
                        f.style.width = d.width;
                        f.style.height = d.height;
                        d.onload = o
                    }) : (f.style.filter = "", f.children[0] ? f.children[0].src = this.icon: (b = document.createElement("img"), b.src = this.icon, f.appendChild(b))) : (d.complete ? (f.width = d.width, f.height = d.height) : d.onload = function() {
                        f.width = d.width;
                        f.height = d.height;
                        d.onload = o
                    },
                    f.src = this.icon)
                } else {
                    f = b.children[0];
                    if (a.size) f.style.height = a.size.height + "px",
                    f.style.width = a.size.width + "px";
                    if (a.imageOffset) f.children[0].style.left = a.imageOffset.x + "px",
                    f.children[0].style.top = a.imageOffset.y + "px";
                    if (a.image) w.Util.isIE ? (b = f.children[0].children[0], a.image.toLocaleLowerCase().indexOf(".png") > -1 ? (b && f.children[0].removeChild(b), f.children[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a.image + "',sizingMethod='image');", d = new Image, d.src = a.image, d.complete ? f.children[0].style.cssText += ";width:" + d.width + "px;height:" + d.height + "px;": d.onload = function() {
                        f.children[0].style.cssText += ";width:" + d.width + "px;height:" + d.height + "px;";
                        d.onload = o
                    }) : (f.children[0].style.filter = "", b ? b.src = a.image: (b = document.createElement("img"), b.src = a.image, f.children[0].appendChild(b)))) : f.children[0].src = a.image
                }
                return ! 0
            }
            return ! 1
        },
        getIcon: v("icon"),
        setzIndex: function(a) {
            this.zIndex = a;
            this.b.style.zIndex = a
        },
        setDraggable: function(a) {
            this.draggable = a
        },
        getDraggable: v("draggable"),
        setVisible: function(a) {
            this.visible = a;
            this.b.style.visibility = a ? "inherit": "hidden"
        },
        getVisible: v("visible"),
        show: function() {
            this.visible = !0;
            this.b.style.visibility = "inherit"
        },
        hide: function() {
            this.visible = !1;
            this.b.style.visibility = "hidden"
        },
        setCursor: function(a) {
            this.b.style.cursor = "url(" + a + "),pointer";
            this.cursor = a
        },
        getCursor: v("cursor"),
        setWidth: function(a) {
            if (isNaN(a) || !this.yc) return ! 1;
            this.b.children[0].style.height = this.b.children[0].height;
            this.b.children[0].style.width = a
        },
        setHeight: function(a) {
            if (isNaN(a) || !this.yc) return ! 1;
            this.b.children[0].style.width = this.b.children[0].width;
            this.b.children[0].style.height = a
        },
        setContent: function(a) {
            this.content = a;
            if (typeof this.content == "object") {
                for (a = this.b.getElementsByTagName("*"); a.length > 0;) this.b.removeChild(a[0]);
                this.b.appendChild(this.content)
            } else this.b.innerHTML = this.content
        },
        getContent: v("content"),
        moveTo: function(a, b, c) {
            var d = this,
            f = this.a,
            g = this.b,
            j = 0;
            this.Nc = a;
            var h = this.lb(),
            k = a.lng - h.lng,
            l = a.lat - h.lat,
            m = Math.round(f.Pa(a, h) * 3.6 / b);
            if (m == 0) return this.setPosition(a),
            f.c(d, "moveend", d),
            !1;
            c = c || w.Tween.Linear;
            d.v && window.clearInterval(d.v);
            d.v = setInterval(function() {
                j++;
                d.setPosition(new w.LngLat(c(j, h.lng, k, m), c(j, h.lat, l, m)));
                j >= m ? (d.setPosition(a), window.clearInterval(d.v), f.c(d, "moveend", d)) : f.c(d, "moving", d)
            },
            40);
            this.autoRotation && this.zb(g, this.hc(h, a))
        },
        moveAlong: function(a, b, c, d) {
            function f() {
                h.v && window.clearInterval(h.v);
                l > 1 ? h.setPosition(a[l - 1]) : h.setPosition(a[0]);
                l < a.length && h.moveTo(a[l], b, c)
            }
            function g() {
                l++;
                l < a.length ? (h.moveTo(a[l], b, c), h.Z[0] = l) : (d ? (l = 1, h.Z[0] = l, h.setPosition(a[0]), h.moveTo(a[l], b, c)) : (k.unbind(h, "moveend", g), k.unbind(k, "zoomchange", f)), k.c(h, "movealong", h))
            }
            try {
                this.Z[1] = this.getPosition()
            } catch(j) {}
            var h = this,
            k = this.a,
            l = 1;
            h.Z[0] ? h.Z[1] ? (l = h.Z[0], h.setPosition(h.Z[1])) : (h.setPosition(a[0]), h.Z[0] = l) : (h.setPosition(a[0]), h.Z[0] = l);
            k.unbind(h, "moveend", g);
            k.bind(h, "moveend", g);
            k.bind(k, "zoomchange", f);
            h.moveTo(a[l], b, c)
        },
        pauseMove: function() {
            this.v && window.clearInterval(this.v);
            this.Z[1] = this.getPosition()
        },
        stopMove: function() {
            this.v && window.clearInterval(this.v);
            this.Z[0] = 0
        },
        hc: function(a, b) {
            var c = this.a,
            a = c.j(a, c.level),
            b = c.j(b, c.level),
            c = 0,
            d = b.y - a.y,
            f = b.x - a.x;
            b.x - a.x != 0 ? (c = Math.atan((b.y - a.y) / (b.x - a.x)), d >= 0 && f < 0 ? c = Math.PI + c: d < 0 && f <= 0 ? c = Math.PI + c: d < 0 && f >= 0 && (c = 2 * Math.PI + c)) : c = b.y > a.y ? Math.PI / 2 : 3 * Math.PI / 2;
            return (c * 180 / Math.PI).toFixed(1)
        },
        setRotation: function(a) {
            this.zb(this.b, a)
        },
        zb: function(a, b) {
            var c = 0,
            d = 0,
            f = this.a;
            if (c = w.Util.transform()) a.style[c] = "rotate(" + b + "deg)";
            else if (f.isIE) d = Math.cos(b * Math.PI / 180),
            c = Math.sin(b * Math.PI / 180),
            a.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + d + ",M12=" + -c + ",M21=" + c + ",M22=" + d + ",SizingMethod='auto expand')";
            this.rotate = b;
            f.c(this, "rotate", b)
        },
        _destroy: function() {
            this.onload = o;
            this.a.contains.mk.removeChild(this.b)
        },
        _bind_: function() {
            function a(a) {
                a.id = l.id;
                a.lnglat = m.lb();
                n.c(m, "rightclick", a);
                n.isDragging || n.stopPropagation(a)
            }
            function b(a) {
                if (r != 0) a.id = l.id,
                a.lnglat = m.lb(),
                n.c(m, "dragend", a);
                r = 0;
                n.stopPropagation(a)
            }
            function c(a) {
                if (m.draggable) a.id = l.id,
                a.lnglat = m.lb(),
                r == 0 && n.c(m, "dragstart", a),
                r = 1,
                l.style.left = parseInt(l.style.left) + a.clientX - q + "px",
                l.style.top = parseInt(l.style.top) + a.clientY - p + "px",
                q = a.clientX,
                p = a.clientY,
                n.c(m, "dragging", a);
                n.stopPropagation(a)
            }
            function d(a) {
                r = 0;
                n.rb();
                q = parseInt(a.clientX);
                p = parseInt(a.clientY); (!n.isDragging || m.draggable) && n.stopPropagation(a)
            }
            function f(a) {
                a.id = l.id;
                a.lnglat = m.position;
                n.c(m, "mouseup", a)
            }
            function g(a) {
                a.id = l.id;
                a.lnglat = m.position;
                t = a.lnglat;
                n.c(m, "mousedown", a)
            }
            function j(a) {
                a.id = l.id;
                a.lnglat = m.position;
                n.c(m, "dblclick", a)
            }
            function h(a) {
                a.id = l.id;
                a.lnglat = m.position;
                n.c(m, "mousemove", a)
            }
            function k(a) {
                a.id = l.id;
                a.lnglat = m.position;
                t == a.lnglat && n.c(m, "click", a)
            }
            var l = this.b,
            m = this,
            n = this.a,
            t = {};
            this.l = {};
            this.l.click = k;
            n.addEvent(l, "click", k);
            this.l.mousemove = h;
            n.addEvent(l, "mousemove", h);
            if (n.isIE) {
                var u = function(a) {
                    a.id = l.id;
                    a.lnglat = n.f.lnglat;
                    n.c(m, "mouseover", a)
                };
                this.l.mouseenter = u;
                n.addEvent(l, "mouseenter", u);
                u = function(a) {
                    a.id = l.id;
                    a.lnglat = n.f.lnglat;
                    n.c(m, "mouseout", a)
                };
                this.l.mouseleave = u;
                n.addEvent(l, "mouseleave", u)
            } else u = function(a) {
                var b = a.relatedTarget;
                if (b && !(b.compareDocumentPosition(this) & 8)) a.id = l.id,
                a.lnglat = n.f.lnglat,
                n.c(m, "mouseover", a)
            },
            this.l.mouseover = u,
            n.addEvent(l, "mouseover", u),
            u = function(a) {
                var b = a.relatedTarget;
                if (b && !(b.compareDocumentPosition(this) & 8)) a.id = l.id,
                a.lnglat = n.f.lnglat,
                n.c(m, "mouseout", a)
            },
            this.l.mouseout = u,
            n.addEvent(l, "mouseout", u);
            this.l.dblclick = j;
            n.addEvent(l, "dblclick", j);
            this.l.mousedown = [g];
            n.addEvent(l, "mousedown", g);
            this.l.mouseup = f;
            n.addEvent(l, "mouseup", f);
            var q = 0,
            p = 0,
            r = 0;
            this.l.drag = [d, c, b];
            u = n.drag(l, d, c, b);
            this.l.mousedown.push(u.mousedown);
            this.l.move = u.move;
            this.l.contextmenu = a;
            n.addEvent(l, "contextmenu", a)
        },
        _unbind_: function() {
            var a = this.b,
            b = this.a,
            c;
            for (c in this.l) if (c != "drag") {
                if (c == "mousedown") {
                    for (var d = 0; d < this.l[c].length; d++) b.removeEvent(a, c, this.l[c][d]),
                    this.l[c][d] = o;
                    this.l[c].length = 0;
                    this.l[c] = []
                }
                b.removeEvent(a, c, this.l[c]);
                this.l[c] = o
            } else if (c == "drag") {
                for (d = 0; d < this.l[c].length; d++) this.l[c][d] = o;
                this.l[c].length = 0;
                this.l[c] = []
            }
            this.l = {}
        },
        _markerInWorlds: function() {
            var a = this.b,
            b = this.a;
            if (b.level <= b.pa) {
                var c = Math.pow(2, b.level) * 256,
                d = Math.round(b.B.x / c),
                d = parseInt(a.style.left) + c * (d == 0 ? 1 : d + 1);
                d > b.B.x && d < b.I.x || (d -= c);
                a.style.left = d + "px"
            }
        }
    });
    w.Polygon = z({
        _type: "polygon",
        a: !1,
        b: !1,
        id: "po" + w.Util.guid(),
        zIndex: 1E3,
        path: [],
        strokeColor: "#BDBDBD",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        strokeStyle: "solid",
        fillColor: "#F8F8F8",
        fillOpacity: 0.8,
        strokeDasharray: [10, 5],
        visible: !0,
        M: !1,
        z: w.Util.guid(),
        d: {},
        g: [],
        ha: !1,
        holes: [],
        initialize: function(a) {
            this.z = w.Util.guid();
            this.id = "po" + w.Util.guid();
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            return this
        },
        setPath: function(a) {
            this.path = [].concat(a);
            this.a.k.xa(this);
            this.a.c(this, "change", this);
            this.a.c(this, "path_change", this)
        },
        getPath: v("path"),
        setOptions: function(a) {
            for (var b in a)"strokeColor,strokeStyle,strokeDasharray,strokeOpacity,strokeWeight,fillColor,fillOpacity".indexOf(b) > -1 && a[b] && (this[b] = a[b]);
            this.a.k.Ia(this);
            this.a.c(this, "change", this)
        },
        getOptions: function() {
            for (var a = ["strokeColor", "strokeStyle", "strokeOpacity", "strokeDasharray", "strokeWeight", "fillColor", "fillOpacity"], b = {},
            c = 0; c < a.length; c++) b[a[c]] = this[a[c]];
            return b
        },
        hide: function() {
            this.visible = !1;
            this.b.style.visibility = "hidden";
            this.a.c(this, "hide", this)
        },
        show: function() {
            this.b.style.visibility = "inherit";
            this.visible = !0;
            this.a.c(this, "show", this)
        },
        getArea: function() {
            var a = 6378137 * Math.PI / 180,
            b = 0,
            c = this.path,
            d = c.length;
            if (d < 3) return 0;
            for (i = 0; i < d - 1; i++) {
                var f = c[i],
                g = c[i + 1];
                b += f.lng * a * Math.cos(f.lat * Math.PI / 180) * g.lat * a - g.lng * a * Math.cos(g.lat * Math.PI / 180) * f.lat * a
            }
            d = c[i];
            c = c[0];
            b += d.lng * a * Math.cos(d.lat * Math.PI / 180) * c.lat * a - c.lng * a * Math.cos(c.lat * Math.PI / 180) * d.lat * a;
            return Number((0.5 * Math.abs(b)).toFixed(2))
        },
        setEditable: function(a) {
            this.M ? a || (this.a.oa(), this.Q()) : a && (window.ActiveXObject && !window.XMLHttpRequest && typeof DD_belatedPNG == "undefined" && new w.AjaxRequest((w.Conf._plugin || this.a._plugin) + "?cls=iepngfix", s(), !0), this._destroy(), this.a.k.b.appendChild(this.b), this.ea())
        },
        setHoles: function(a) {
            this.holes = [].concat(a);
            this.a.k.xa(this);
            this.a.c(this, "hole", this)
        },
        Ka: function(a, b) {
            function c(a) {
                for (var c = [], d = a.lnglat, f = 0; f < g.g.length; f++) {
                    if (g.g[f].id == b) d.id = b,
                    g.g[f] = d;
                    c.push(g.g[f])
                }
                g.F = !0;
                g.setPath(c);
                g.F = !1;
                j.c(g, "adjust", g);
                g.aa.setPosition(g.Oa());
                j.stopPropagation(a);
                g.o && g.o.hide()
            }
            function d() {
                k.style.display = "none"
            }
            function f() {
                if (g.g.length > 3) k.style.display = "block"
            }
            var g = this,
            j = this.a,
            h = document.createElement("div");
            h.title = "\u62d6\u52a8\u4ee5\u66f4\u6539\u56fe\u5f62";
            h.className = "edit_mapabc";
            h.style.cssText += j.isIE6 ? ";width:11px;height:11px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + (w.Conf._client || j._client) + "Images/dd-via.png');": ";width:11px;height:11px;background:url(" + (w.Conf._client || j._client) + "Images/dd-via.png) 0px 0px no-repeat;";
            var k = document.createElement("img");
            k.Kc = "\u5220\u9664\u6b64\u8282\u70b9";
            k.style.cssText = "display:none;position:absolute;left:11px;top:-1px;z-Index:101;";
            k.src = (w.Conf._client || j._client) + "Images/close.gif";
            k.onclick = function() {
                g.yb(b)
            };
            h.appendChild(k);
            h = new w.Marker({
                id: b,
                offset: new w.Pixel( - 5, -5),
                position: a,
                draggable: !0,
                zIndex: 100,
                content: h
            });
            j.addOverlays(h);
            j.bind(h, "mouseover", f);
            j.bind(h, "mouseout", d);
            j.bind(h, "dragging", c);
            j.bind(h, "dragend", c);
            g.d[b] = [];
            g.d[b].push({
                p: h,
                n: "dragging",
                m: c
            });
            g.d[b].push({
                p: h,
                n: "dragend",
                m: c
            });
            g.d[b].push({
                p: h,
                n: "mouseover",
                m: f
            });
            g.d[b].push({
                p: h,
                n: "mouseout",
                m: d
            });
            typeof DD_belatedPNG != "undefined" && DD_belatedPNG.fix(".edit_mapabc");
            j.c(this, "addnode", this)
        },
        yb: function(a) {
            for (var b = [], c = this.a, d = 0; d < this.g.length; d++) if (this.g[d].id == a) {
                for (var f = this.d[a], g = 0; g < f.length; g++) c.unbind(f[g].p, f[g].n, f[g].m);
                this.d[a] = o;
                delete this.d[a];
                c.removeOverlays(a);
                this.g.splice(d, 1);
                d--
            } else b.push(this.g[d]);
            this.F = !0;
            this.setPath(b);
            this.F = !1;
            this.aa.setPosition(this.Oa());
            c.c(this, "removenode", this)
        },
        Ea: function(a, b) {
            for (var c = {
                dis: Number.MAX_VALUE
            },
            d = 0; d < a.length - 1; d++) {
                var f = this.xb([a[d], a[d + 1]], b);
                f.dis < c.dis && (c = {
                    lng: f.lng,
                    lat: f.lat,
                    dis: f.dis,
                    i: d,
                    _type: "lnglat"
                })
            }
            c.dis = Math.round(this.a.Pa(b, new w.LngLat(c.lng, c.lat)) / this.a.getResolution());
            return c
        },
        xb: function(a, b) {
            var c = 0,
            d = 0,
            c = a[1].lng - a[0].lng,
            d = a[1].lat - a[0].lat,
            f = -(a[0].lat - b.lat) * d - (a[0].lng - b.lng) * c,
            g;
            f <= 0 ? (c = a[0].lng, d = a[0].lat) : f >= (g = c * c + d * d) ? (c = a[1].lng, d = a[1].lat) : (c = a[0].lng + f * c / g, d = a[0].lat + f * d / g);
            return {
                lng: c,
                lat: d,
                dis: Math.pow(b.lng - c, 2) + Math.pow(b.lat - d, 2)
            }
        },
        Oa: function() {
            for (var a = 0,
            b = 0,
            c = this.g.length,
            d = 0; d < c; d++) a += this.g[d].lng,
            b += this.g[d].lat;
            return new w.LngLat(a / c, b / c)
        },
        ea: function() {
            function a(a) {
                if (C == 1) return ! 1;
                C = 1;
                for (var b = a.clientX - r,
                c = a.clientY - D,
                d = [], f = 0; f < h.g.length; f++) {
                    var g = k.lnglatToPixel(h.g[f], k.level);
                    g.x += b;
                    g.y += c;
                    g = k.pixelToLngLat(g, k.level);
                    g.id = h.g[f].id;
                    h.d[g.id][0].p.setPosition(g);
                    d.push(g)
                }
                h.g = d;
                h.F = !0;
                h.setPath([].concat(d));
                h.F = !1;
                k.c(h, "move", h);
                r = a.clientX;
                D = a.clientY;
                C = 0;
                h.o && h.o.hide()
            }
            function b(a) {
                r = a.clientX;
                D = a.clientY
            }
            function c(a) {
                u = 0;
                for (var b = a.lnglat,
                c = [], d = [], f = 0; f < h.g.length; f++) if (c.push(h.g[f]), d.push(h.g[f]), f == q.i) b.id = p,
                c.push(b),
                d.push(b);
                h.F = !0;
                h.setPath(d);
                h.F = !1;
                h.g = c;
                h.d[p] = [];
                h.Ka(a.lnglat, p);
                h.aa.setPosition(h.Oa());
                h.o.hide();
                k.unbind(k, "mousemove", j);
                k.stopPropagation(a)
            }
            function d(a) {
                u = 1;
                for (var a = a.lnglat,
                b = [], c = [], d = 0; d < h.g.length; d++) if (b.push(h.g[d]), c.push(h.g[d]), d == q.i) a.id = p,
                b.push(a),
                c.push(a);
                h.F = !0;
                h.setPath(c);
                h.F = !1;
                k.c(h, "adjust", h)
            }
            function f(a) {
                u = 1;
                for (var b = [], c = 0; c < h.g.length; c++) b.push(h.g[c]);
                b.push(b[0]);
                q = h.Ea(b, a.lnglat);
                p = "s" + w.Util.guid()
            }
            function g(a) {
                var b = h.xc(a.lnglat),
                c;
                if (parseFloat(b.length) < 15) c = h.ga.Db ? "mousemove": "mouseover",
                h.ga.Vb = h.ga.n,
                h.ga.Db = h.ga.Qb,
                t = 1,
                h.o.show(),
                b = [].concat(h.getPath()),
                b.push(b[0]),
                b = h.Ea(b, a.lnglat),
                b.dis < 10 ? h.o.setPosition(b) : (t = 0, u || h.o.setVisible(!1));
                else if (h.o.setVisible(!1), !h.ga.Vb && h.ga.Db) c = "mouseout",
                h.ga.Db = h.ga.n,
                h.ga.Vb = h.ga.Qb;
                c && k.c(h, c, a)
            }
            function j(a) {
                if (!t) return ! 1;
                var b = [].concat(h.getPath());
                b.push(b[0]);
                a = h.Ea(b, a.lnglat);
                if (a.dis < 10) {
                    if (!h.o) return k.unbind(k, "mousemove", j),
                    !1;
                    h.o.setPosition(a)
                } else t = 0,
                u || (h.o.setVisible(!1), k.unbind(k, "mousemove", j))
            }
            var h = this,
            k = this.a;
            h.Q();
            h.M = !0;
            k.isDragging = !0;
            h.g = [];
            h.d = {};
            for (var l = h.getPath(), m = 0; m < l.length; m++) {
                var n = "s" + w.Util.guid();
                l[m].id = n;
                h.g.push(l[m]);
                h.d[n] = [];
                h.Ka(l[m], n)
            }
            h.o = new w.Marker({
                id: "m" + h.z,
                offset: new w.Pixel( - 5, -5),
                position: h.g[0],
                draggable: !0,
                visible: !1
            });
            h.o.content = k.isIE6 ? '<div title="\u62d6\u52a8\u4ee5\u589e\u52a0\u8282\u70b9" class="edit_mapabc" style="width:11px;height:11px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + (w.Conf._client || k._client) + "Images/dd-via.png');\"></div>": '<div title="\u62d6\u52a8\u4ee5\u589e\u52a0\u8282\u70b9" class="edit_mapabc" style="width:11px;height:11px;background:url(' + (w.Conf._client || k._client) + 'Images/dd-via.png) 0px 0px no-repeat;"></div>';
            k.addOverlays(h.o);
            var t = 0,
            u = 0;
            this.ga = {
                n: !1,
                Qb: !0
            };
            k.bind(k, "mousemove", g);
            h.d["p" + h.z] = [];
            h.d["p" + h.z].push({
                p: k,
                n: "mousemove",
                m: g
            });
            var q, p;
            k.bind(h.o, "dragstart", f);
            h.d["m" + h.z] = [{
                p: h.o,
                n: "dragstart",
                m: f
            }];
            k.bind(h.o, "dragging", d);
            h.d["m" + h.z].push({
                p: h.o,
                n: "dragging",
                m: d
            });
            k.bind(h.o, "dragend", c);
            h.d["m" + h.z].push({
                p: h.o,
                n: "dragend",
                m: c
            });
            h.aa = new w.Marker({
                id: "d" + h.z,
                offset: new w.Pixel( - 5, -5),
                position: h.Oa(),
                draggable: !0,
                zIndex: 1E3
            });
            h.aa.content = k.isIE6 ? '<div title="\u62d6\u52a8\u79fb\u52a8\u56fe\u5f62" class="edit_mapabc" style="width:11px;height:11px;cursor:move;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + (w.Conf._client || k._client) + "Images/dd-via.png',sizingMethod='image');overflow:hidden;\"></div>": '<div title="\u62d6\u52a8\u79fb\u52a8\u56fe\u5f62" class="edit_mapabc" style="width:11px;height:11px;cursor:move;background:url(' + (w.Conf._client || k._client) + 'Images/dd-via.png) 0px 0px no-repeat;overflow:hidden;"></div>';
            k.addOverlays(h.aa);
            var r = 0,
            D = 0;
            k.bind(h.aa, "dragstart", b);
            var C = 0;
            k.bind(h.aa, "dragging", a);
            h.d["d" + h.z] = [{
                p: h.aa,
                n: "dragstart",
                m: b
            },
            {
                p: h.aa,
                n: "draging",
                m: a
            }];
            typeof DD_belatedPNG != "undefined" && DD_belatedPNG.fix(".edit_mapabc");
            this.R = !0;
            l = [{
                p: this,
                n: "path_change",
                m: w.Util.Y(this, this.Fa)
            },
            {
                p: this,
                n: "hide",
                m: w.Util.Y(this, this.Ra)
            },
            {
                p: this,
                n: "show",
                m: w.Util.Y(this, this.Ua)
            },
            {
                p: this,
                n: "predestroy",
                m: w.Util.Y(this, this.Ma)
            }];
            for (m = 0; m < l.length; m++) k.bind(l[m].p, l[m].n, l[m].m);
            this.G = l
        },
        Ra: function() {
            if (this.R !== !1) {
                this.Na("hide");
                if (this.o.getVisible()) this.sb = !0,
                this.o.hide();
                this.R = !1
            }
        },
        Ua: function() {
            if (this.R !== !0) this.Na("show"),
            this.sb && this.o.show(),
            this.R = !0
        },
        Na: function(a) {
            if (this.g instanceof Array) for (var b in this.g) {
                var c = this.a.getOverlays(this.g[b].id);
                c && c[a]()
            }
            this.aa[a]()
        },
        Fa: function() {
            this.M && !this.F && (this.Q(), this.ea())
        },
        Ma: function() {
            if (this.M) {
                this.Q();
                var a = function(b) {
                    b.ea();
                    b.a.unbind(b, "reload", a)
                };
                this.a.bind(this, "reload", a)
            }
        },
        Q: function() {
            var a = this.a;
            this.M = !1;
            a.isDragging = !1;
            for (var b in this.d) {
                for (var c = this.d[b], d = 0; d < c.length; d++) a.unbind(c[d].p, c[d].n, c[d].m);
                this.d[b] = o;
                delete this.d[b];
                a.removeOverlays(b)
            }
            if (this.G) for (b = 0; b < this.G.length; b++) a.unbind(this.G[b].p, this.G[b].n, this.G[b].m);
            this.g = [];
            this.o = o;
            delete this.o;
            this.aa = o;
            delete this.aa
        },
        na: function(a, b) {
            var c = this.a,
            d = new w.Pixel(0, 0),
            f = c.A,
            b = c.formatEvent(b);
            if (c.isIE && !c.isIE9 || c.isOpera) {
                var g = new w.Pixel(c.isOpera ? 2 : 4, c.isOpera ? 5 : 6),
                j = c.j(this.ha, c.level);
                d.x = f.x + j.x - c.h.x + b.offsetX - g.x;
                d.y = f.y + j.y - c.h.y + b.offsetY - g.y
            } else c.isIE9 ? (d.x = f.x + b.offsetX, d.y = f.y + b.offsetY) : (d.x = f.x + parseInt(a.parentNode.style.left) + Number(b.layerX || b.offsetX), d.y = f.y + parseInt(a.parentNode.style.top) + Number(b.layerY || b.offsetY));
            return d
        },
        _destroy: function() {
            this.a.c(this, "predestroy", this);
            this.a.k.b.removeChild(this.b)
        },
        _bind_: function() {
            function a(a) {
                w.Util.isIE9 && a.preventDefault();
                var b = f.na(c, a);
                a.layerX = b.x;
                a.layerY = b.y;
                a.id = c.id;
                a.lnglat = d.X(b);
                d.c(f, "rightclick", a);
                d.isDragging || d.stopPropagation(a)
            }
            function b(a) {
                var b = f.na(c, a);
                a.layerX = b.x;
                a.layerY = b.y;
                a.id = c.id;
                a.lnglat = d.X(b); ! d.isDragging && a.type == "click" && d.stopPropagation(a);
                d.c(f, a.type, a)
            }
            var c = this.b,
            d = this.a,
            f = this,
            g = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup"];
            this.l = {};
            for (var j = 0; j < g.length; j++) d.addEvent(c, g[j], b),
            this.l[g[j]] = b;
            d.addEvent(c, "contextmenu", a);
            this.l.contextmenu = a
        },
        _unbind_: function() {
            var a = this.b,
            b = this.a,
            c;
            for (c in this.l) b.removeEvent(a, c, this.l[c]),
            this.l[c] = o;
            this.l = {}
        },
        Fc: function(a) {
            for (var b = [], c = 0; c < a.length; c++) b.push(this.a.eb(a[c]));
            return b
        },
        xc: function(a) {
            var b = this.a,
            c, d, f = this.getPath(),
            g = b.eb(a),
            j = this.Fc(f),
            h = j.length;
            if (1 < h) {
                for (b = 1; b < h; b++) {
                    var k = j[b - 1],
                    l = j[b];
                    if (k && l) {
                        k.x != l.x ? (d = (l.y - k.y) / (l.x - k.x), d = Math.abs(d * g.x + (l.y - d * l.x) - g.y) / Math.sqrt(d * d + 1)) : d = Math.abs(g.x - l.x);
                        var m = Math.pow(l.y - g.y, 2) + Math.pow(l.x - g.x, 2),
                        n = Math.pow(k.y - g.y, 2) + Math.pow(k.x - g.x, 2),
                        t = Math.pow(d, 2);
                        m - t + n - t > Math.pow(l.y - k.y, 2) + Math.pow(l.x - k.x, 2) && (d = Math.sqrt(Math.min(m, n)));
                        if (c == o || c > d) c = d;
                        c = Math.min(c, d)
                    }
                }
                if (this.Qc != "polyline") {
                    for (b = d = g = 0; b < h; b++) g = b == h - 1 ? 0 : g + 1,
                    f[b].lat != f[g].lat && (a.lat >= f[b].lat && a.lat < f[g].lat || a.lat >= f[g].lat && a.lat < f[b].lat) && a.lng < (f[g].lng - f[b].lng) * (a.lat - f[b].lat) / (f[g].lat - f[b].lat) + f[b].lng && d++;
                    c = Math.min(c, 0 < d % 2 ? 0 : c)
                }
            }
            return {
                length: c
            }
        },
        La: function(a) {
            var b = this.a,
            c = b.getBounds(),
            d = b.lnglatToPixel(c.southwest, b.level),
            f = b.lnglatToPixel(c.northeast, b.level);
            c.min = {
                x: parseInt(d.x - b.h.x - b.width * 2),
                y: parseInt(f.y - b.h.y - b.height * 2)
            };
            c.max = {
                x: parseInt(f.x - b.h.x + b.width * 2),
                y: parseInt(d.y - b.h.y + b.height * 2)
            };
            var d = [1, 4, 2, 8],
            g,
            j,
            h,
            k,
            l,
            f = 0;
            for (k = a.length; f < k; f++) a[f].ca = this.da(a[f], c);
            for (j = 0; j < 4; j++) {
                l = d[j];
                b = [];
                f = 0;
                k = a.length;
                for (g = k - 1; f < k; g = f++) if (h = a[f], g = a[g], h.ca & l) {
                    if (! (g.ca & l)) g = this.qa(g, h, l, c),
                    g.ca = this.da(g, c),
                    b.push(g)
                } else {
                    if (g.ca & l) g = this.qa(g, h, l, c),
                    g.ca = this.da(g, c),
                    b.push(g);
                    b.push(h)
                }
                a = b
            }
            return a
        },
        qa: function(a, b, c, d) {
            var f = b.x - a.x,
            b = b.y - a.y,
            g = d.min,
            d = d.max;
            if (c & 8) return new w.Pixel(parseInt(a.x + f * (d.y - a.y) / b), parseInt(d.y));
            else if (c & 4) return new w.Pixel(parseInt(a.x + f * (g.y - a.y) / b), parseInt(g.y));
            else if (c & 2) return new w.Pixel(parseInt(d.x), parseInt(a.y + b * (d.x - a.x) / f));
            else if (c & 1) return new w.Pixel(parseInt(g.x), parseInt(a.y + b * (g.x - a.x) / f))
        },
        da: function(a, b) {
            var c = 0;
            a.x < b.min.x ? c |= 1 : a.x > b.max.x && (c |= 2);
            a.y < b.min.y ? c |= 4 : a.y > b.max.y && (c |= 8);
            return c
        }
    });
    w.Polyline = z({
        _type: "polyline",
        a: !1,
        b: !1,
        id: "pl" + w.Util.guid(),
        zIndex: 1E3,
        path: [],
        strokeColor: "#006600",
        strokeOpacity: 0.9,
        strokeWeight: 3,
        strokeStyle: "solid",
        strokeDasharray: [10, 5],
        visible: !0,
        icons: [],
        M: !1,
        z: w.Util.guid(),
        d: {},
        g: [],
        ha: !1,
        initialize: function(a) {
            this.id = "pl" + w.Util.guid();
            for (var b in a) b.substr(0, 1) != "_" && this[b] != e && (this[b] = a[b]);
            this.z = w.Util.guid();
            return this
        },
        setPath: function(a) {
            this.path = [].concat(a);
            this.a.k.nb(this);
            this.a.c(this, "change", this);
            this.a.c(this, "path_change", this)
        },
        getPath: v("path"),
        setOptions: function(a) {
            for (var b in a)"strokeColor,strokeStyle,strokeOpacity,strokeDasharray,strokeWeight,fillColor,fillOpacity".indexOf(b) > -1 && a[b] && (this[b] = a[b]);
            this.a.k.ob(this);
            this.a.c(this, "change", this)
        },
        getOptions: function() {
            for (var a = ["strokeColor", "strokeStyle", "strokeOpacity", "strokeDasharray", "strokeWeight", "fillColor", "fillOpacity"], b = {},
            c = 0; c < a.length; c++) b[a[c]] = this[a[c]];
            return b
        },
        hide: function() {
            this.visible = !1;
            this.b.style.visibility = "hidden";
            this.a.c(this, "hide", this)
        },
        show: function() {
            this.b.style.visibility = "inherit";
            this.visible = !0;
            this.a.c(this, "show", this)
        },
        getLength: function() {
            for (var a = this.path,
            b = 0,
            c = 0; c < a.length - 1; c++) b += Number(this.a.Pa(a[c], a[c + 1]));
            return Number(b.toFixed(2))
        },
        setEditable: function(a) {
            this.M ? a || (this.a.oa(), this.Q()) : a && (window.ActiveXObject && !window.XMLHttpRequest && typeof DD_belatedPNG == "undefined" && new w.AjaxRequest((w.Conf._plugin || this.a._plugin) + "?cls=iepngfix", s(), !0), this._destroy(), this.a.k.b.appendChild(this.b), this.ea())
        },
        Ka: function(a, b) {
            function c(a) {
                for (var c = [], d = a.lnglat, f = 0; f < g.g.length; f++) {
                    if (g.g[f].id == b) d.id = b,
                    g.g[f] = d;
                    c.push(g.g[f])
                }
                g.F = !0;
                g.setPath(c);
                g.F = !1;
                j.trigger(g, "adjust", g);
                j.stopPropagation(a)
            }
            function d() {
                k.style.display = "none"
            }
            function f() {
                if (g.g.length > 2) k.style.display = "block"
            }
            var g = this,
            j = this.a,
            h = document.createElement("div");
            h.title = "\u62d6\u52a8\u4ee5\u66f4\u6539\u56fe\u5f62";
            h.className = "edit_mapabc";
            h.style.cssText += j.isIE6 ? ";width:11px;height:11px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + (w.Conf._client || j._client) + "Images/dd-via.png');": ";width:11px;height:11px;background:url(" + (w.Conf._client || j._client) + "Images/dd-via.png) 0px 0px no-repeat;";
            var k = document.createElement("img");
            k.Kc = "\u5220\u9664\u6b64\u8282\u70b9";
            k.style.cssText = "display:none;position:absolute;left:11px;top:-1px;z-Index:101";
            k.src = (w.Conf._client || j._client) + "Images/close.gif";
            k.onclick = function() {
                g.yb(b)
            };
            h.appendChild(k);
            h = new w.Marker({
                id: b,
                offset: new w.Pixel( - 5, -5),
                position: a,
                draggable: !0,
                zIndex: 100,
                content: h
            });
            j.addOverlays(h);
            j.bind(h, "mouseover", f);
            j.bind(h, "mouseout", d);
            j.bind(h, "dragging", c);
            j.bind(h, "dragend", c);
            g.d[b] = [];
            g.d[b].push({
                p: h,
                n: "dragging",
                m: c
            });
            g.d[b].push({
                p: h,
                n: "dragend",
                m: c
            });
            g.d[b].push({
                p: h,
                n: "mouseover",
                m: f
            });
            g.d[b].push({
                p: h,
                n: "mouseout",
                m: d
            });
            typeof DD_belatedPNG != "undefined" && DD_belatedPNG.fix(".edit_mapabc");
            j.trigger(this, "addnode", this)
        },
        yb: function(a) {
            for (var b = [], c = this.a, d = 0; d < this.g.length; d++) if (this.g[d].id == a) {
                for (var f = this.d[a], g = 0; g < f.length; g++) c.unbind(f[g].p, f[g].n, f[g].m);
                this.d[a] = o;
                delete this.d[a];
                c.removeOverlays(a);
                this.g.splice(d, 1);
                d--
            } else b.push(this.g[d]);
            this.F = !0;
            this.setPath(b);
            this.F = !1;
            c.trigger(this, "removenode", this)
        },
        Ea: function(a, b) {
            for (var c = {
                dis: Number.MAX_VALUE
            },
            d = 0; d < a.length - 1; d++) {
                var f = this.xb([a[d], a[d + 1]], b);
                f.dis < c.dis && (c = {
                    lng: f.lng,
                    lat: f.lat,
                    dis: f.dis,
                    i: d,
                    _type: "lnglat"
                })
            }
            c.dis = Math.round(this.a.Pa(b, new w.LngLat(c.lng, c.lat)) / this.a.getResolution());
            return c
        },
        xb: function(a, b) {
            var c = 0,
            d = 0,
            c = a[1].lng - a[0].lng,
            d = a[1].lat - a[0].lat,
            f = -(a[0].lat - b.lat) * d - (a[0].lng - b.lng) * c,
            g;
            f <= 0 ? (c = a[0].lng, d = a[0].lat) : f >= (g = c * c + d * d) ? (c = a[1].lng, d = a[1].lat) : (c = a[0].lng + f * c / g, d = a[0].lat + f * d / g);
            return {
                lng: c,
                lat: d,
                dis: Math.pow(b.lng - c, 2) + Math.pow(b.lat - d, 2)
            }
        },
        Oa: function() {
            for (var a = 0,
            b = 0,
            c = this.g.length,
            d = 0; d < c; d++) a += this.g[d].lng,
            b += this.g[d].lat;
            return new w.LngLat(a / c, b / c)
        },
        ea: function() {
            function a(a) {
                n = 0;
                for (var b = a.lnglat,
                c = [], d = [], h = 0; h < g.g.length; h++) if (c.push(g.g[h]), d.push(g.g[h]), h == t.i) b.id = u,
                c.push(b),
                d.push(b);
                g.F = !0;
                g.setPath(d);
                g.F = !1;
                g.g = c;
                g.d[u] = [];
                g.Ka(a.lnglat, u);
                g.o.hide();
                j.unbind(j, "mousemove", f);
                j.stopPropagation(a)
            }
            function b(a) {
                n = 1;
                for (var a = a.lnglat,
                b = [], c = [], d = 0; d < g.g.length; d++) if (b.push(g.g[d]), c.push(g.g[d]), d == t.i) a.id = u,
                b.push(a),
                c.push(a);
                g.F = !0;
                g.setPath(c);
                g.F = !1;
                j.trigger(g, "adjust", g)
            }
            function c(a) {
                n = 1;
                for (var b = [], c = 0; c < g.g.length; c++) b.push(g.g[c]);
                t = g.Ea(b, a.lnglat);
                u = "s" + w.Util.guid()
            }
            function d() {
                m = 1;
                g.o.show();
                j.bind(j, "mousemove", f)
            }
            function f(a) {
                if (!m) return ! 1;
                var b = [].concat(g.getPath()),
                a = g.Ea(b, a.lnglat);
                if (a.dis < 10) {
                    if (!g.o) return j.unbind(j, "mousemove", f),
                    !1;
                    g.o.setPosition(a)
                } else m = 0,
                n || (g.o.setVisible(!1), j.unbind(j, "mousemove", f))
            }
            var g = this,
            j = this.a;
            g.Q();
            g.M = !0;
            j.isDragging = !0;
            g.g = [];
            g.d = {};
            for (var h = g.getPath(), k = 0; k < h.length; k++) {
                var l = "s" + w.Util.guid();
                h[k].id = l;
                g.g.push(h[k]);
                g.d[l] = [];
                g.Ka(h[k], l)
            }
            g.o = new w.Marker({
                id: "m" + g.z,
                offset: new w.Pixel( - 5, -5),
                position: g.g[0],
                draggable: !0,
                visible: !1
            });
            g.o.content = j.isIE6 ? '<div title="\u62d6\u52a8\u4ee5\u589e\u52a0\u8282\u70b9" class="edit_mapabc" style="width:11px;height:11px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + (w.Conf._client || j._client) + "Images/dd-via.png');\"></div>": '<div title="\u62d6\u52a8\u4ee5\u589e\u52a0\u8282\u70b9" class="edit_mapabc" style="width:11px;height:11px;background:url(' + (w.Conf._client || j._client) + 'Images/dd-via.png) 0px 0px no-repeat;"></div>';
            j.addOverlays(g.o);
            var m = 0,
            n = 0;
            j.bind(g, "mousemove", d);
            g.d["p" + g.z] = [];
            g.d["p" + g.z].push({
                p: g,
                n: "mousemove",
                m: d
            });
            var t, u;
            j.bind(g.o, "dragstart", c);
            g.d["m" + g.z] = [{
                p: g.o,
                n: "dragstart",
                m: c
            }];
            j.bind(g.o, "dragging", b);
            g.d["m" + g.z].push({
                p: g.o,
                n: "dragging",
                m: b
            });
            j.bind(g.o, "dragend", a);
            g.d["m" + g.z].push({
                p: g.o,
                n: "dragend",
                m: a
            });
            typeof DD_belatedPNG != "undefined" && DD_belatedPNG.fix(".edit_mapabc");
            this.R = !0;
            h = [{
                p: this,
                n: "path_change",
                m: w.Util.Y(this, this.Fa)
            },
            {
                p: this,
                n: "hide",
                m: w.Util.Y(this, this.Ra)
            },
            {
                p: this,
                n: "show",
                m: w.Util.Y(this, this.Ua)
            },
            {
                p: this,
                n: "predestroy",
                m: w.Util.Y(this, this.Ma)
            }];
            for (k = 0; k < h.length; k++) j.bind(h[k].p, h[k].n, h[k].m);
            this.G = h
        },
        Ra: function() {
            if (this.R !== !1) {
                this.Na("hide");
                if (this.o.getVisible()) this.sb = !0,
                this.o.hide();
                this.R = !1
            }
        },
        Ua: function() {
            if (this.R !== !0) this.Na("show"),
            this.sb && this.o.show(),
            this.R = !0
        },
        Na: function(a) {
            if (this.g instanceof Array) for (var b in this.g) {
                var c = this.a.getOverlays(this.g[b].id);
                c && c[a]()
            }
        },
        Fa: function() {
            this.M && !this.F && (this.Q(), this.ea())
        },
        Ma: function() {
            if (this.M) {
                this.Q();
                var a = function(b) {
                    b.ea();
                    b.a.unbind(b, "reload", a)
                };
                this.a.bind(this, "reload", a)
            }
        },
        Q: function() {
            var a = this.a;
            this.M = !1;
            a.isDragging = !1;
            for (var b in this.d) {
                for (var c = this.d[b], d = 0; d < c.length; d++) a.unbind(c[d].p, c[d].n, c[d].m);
                this.d[b] = o;
                delete this.d[b];
                a.removeOverlays(b)
            }
            if (this.G) for (b = 0; b < this.G.length; b++) a.unbind(this.G[b].p, this.G[b].n, this.G[b].m);
            this.G = o;
            this.g = [];
            this.o = o;
            delete this.o
        },
        na: function(a, b) {
            var c = this.a,
            d = new w.Pixel(0, 0),
            f = c.A;
            if (c.isIE && !c.isIE9 || c.isOpera) {
                var g = new w.Pixel(c.isOpera ? 1 : 2, c.isOpera ? 2 : 2),
                j = c.j(this.ha, c.level);
                d.x = f.x + j.x - c.h.x + b.offsetX - g.x;
                d.y = f.y + j.y - c.h.y + b.offsetY - g.y
            } else c.isIE9 ? (d.x = f.x + b.offsetX, d.y = f.y + b.offsetY) : (d.x = f.x + parseInt(a.parentNode.style.left) + Number(b.offsetX || b.layerX), d.y = f.y + parseInt(a.parentNode.style.top) + Number(b.offsetY || b.layerY));
            return d
        },
        _destroy: function() {
            this.a.c(this, "predestroy", this);
            this.a.k.b.removeChild(this.b)
        },
        $a: function(a) {
            var a = [].concat(a),
            b = a.length,
            c,
            d,
            f;
            c = this.a;
            this.ja = [];
            var g = c.getBounds();
            d = c.lnglatToPixel(g.southwest, c.level);
            f = c.lnglatToPixel(g.northeast, c.level);
            g.min = {
                x: parseInt(d.x - c.h.x - c.width * 2),
                y: parseInt(f.y - c.h.y - c.height * 2)
            };
            g.max = {
                x: parseInt(f.x - c.h.x + c.width * 2),
                y: parseInt(d.y - c.h.y + c.height * 2)
            };
            var j = this.ja;
            for (d = c = 0; c < b - 1; c++) if (f = this.cc(a[c], a[c + 1], g, c)) if (j[d] = j[d] || [], j[d].push(f[0]), f[1] !== a[c + 1] || c === b - 2) j[d].push(f[1]),
            d++
        },
        cc: function(a, b, c, d) {
            var d = d ? this.lc: this.da(a, c),
            f = this.da(b, c),
            g,
            j,
            h;
            for (this.lc = f;;) if (d | f) if (d & f) return ! 1;
            else g = d || f,
            j = this.qa(a, b, g, c),
            h = this.da(j, c),
            g === d ? (a = j, d = h) : (b = j, f = h);
            else return [a, b]
        },
        qa: function(a, b, c, d) {
            var f = b.x - a.x,
            b = b.y - a.y,
            g = d.min,
            d = d.max;
            if (c & 8) return new w.Pixel(parseInt(a.x + f * (d.y - a.y) / b), parseInt(d.y));
            else if (c & 4) return new w.Pixel(parseInt(a.x + f * (g.y - a.y) / b), parseInt(g.y));
            else if (c & 2) return new w.Pixel(parseInt(d.x), parseInt(a.y + b * (d.x - a.x) / f));
            else if (c & 1) return new w.Pixel(parseInt(g.x), parseInt(a.y + b * (g.x - a.x) / f))
        },
        da: function(a, b) {
            var c = 0;
            a.x < b.min.x ? c |= 1 : a.x > b.max.x && (c |= 2);
            a.y < b.min.y ? c |= 4 : a.y > b.max.y && (c |= 8);
            return c
        },
        _bind_: function() {
            function a(a) {
                var b = f.na(c, a);
                a.layerX = b.x;
                a.layerY = b.y;
                a.id = c.id;
                a.pixel = b;
                a.lnglat = d.X(b);
                d.c(f, "rightclick", a);
                d.isDragging || d.stopPropagation(a)
            }
            function b(a) {
                var b = f.na(c, a);
                a.layerX = b.x;
                a.layerY = b.y;
                a.id = c.id;
                a.pixel = b;
                a.lnglat = d.X(b); ! d.isDragging && a.type == "click" && d.stopPropagation(a);
                d.c(f, a.type, a)
            }
            var c = this.b,
            d = this.a,
            f = this;
            this.l = {};
            for (var g = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup"], j = 0; j < g.length; j++) d.addEvent(c, g[j], b),
            this.l[g[j]] = b;
            b = o;
            d.addEvent(c, "contextmenu", a);
            this.l.contextmenu = a;
            a = o
        },
        _unbind_: function() {
            var a = this.b,
            b = this.a,
            c;
            for (c in this.l) b.removeEvent(a, c, this.l[c]),
            this.l[c] = o;
            this.l = {}
        }
    });
    w.Eb = z({
        _type: "crs",
        initialize: s(),
        za: function(a) {
            return new w.Pixel(a.lng, a.lat)
        },
        qb: function(a) {
            return new w.LngLat(a.x, a.y)
        },
        U: function() {
            var a = [];
            for (i = 0; i < 25; i++) a.push(156543.0339 / Math.pow(2, i));
            return a
        }
    });
    w.Wb = z({
        _type: "PROJ4CRS",
        ta: {},
        jb: o,
        pb: o,
        initialize: function(a, b) {
            this.jb = new Proj4js.Proj(a);
            this.pb = new Proj4js.Proj(b);
            this.jb.readyToUse = !0;
            this.pb.readyToUse = !0;
            this.ta = {
                ma: 6378137,
                L: new w.Pixel( - 2.003750834E7, -2.003750834E7),
                J: new w.Pixel(2.003750834E7, 2.003750834E7)
            }
        },
        za: function(a) {
            var a = new Proj4js.Point(a.lng, a.lat),
            a = Proj4js.transform(this.jb, this.pb, a),
            a = new w.LngLat(a.x, a.y),
            b = this.ta,
            c = Math.sin(this.Va(a.lat));
            return new w.Pixel(this.ia(b.ma * this.Va(a.lng), b.L.x, b.J.x), this.ia(b.ma * 0.5 * Math.log((1 + c) / (1 - c)), b.L.y, b.J.y))
        },
        qb: function(a) {
            var a = new Proj4js.Point(a.x, a.y),
            a = Proj4js.transform(this.pb, this.jb, a),
            a = new w.Pixel(a.x, a.y),
            b = this.ta;
            a.x = this.ia(a.x, b.L.x, b.J.x);
            a.y = this.ia(a.y, b.L.y, b.J.y);
            var c = Math.exp(a.y / b.ma * 2);
            return new w.LngLat(this.Za(a.x / b.ma), this.Za(Math.asin((c - 1) / (1 + c))))
        },
        U: function() {
            var a = [];
            for (i = 0; i < 25; i++) a.push(156543.0339 / Math.pow(2, i));
            return a
        },
        ia: function(a, b, c) {
            b != 0 && (a = Math.max(a, b));
            c != 0 && (a = Math.min(a, c));
            return a
        },
        Va: function(a) {
            return a * (Math.PI / 180)
        },
        Za: function(a) {
            return a * (180 / Math.PI)
        }
    });
    w.Xb = z({
        _type: "pcs",
        la: o,
        J: {},
        L: {},
        U: [],
        Bb: [],
        Ub: "TOP_LEFT",
        initialize: function(a, b) {
            this.la = a;
            this.L = b.minExtent ? b.minExtent: new w.Pixel(0, 0);
            this.J = b.maxExtent ? b.maxExtent: new w.Pixel(0, 0);
            this.Ub = b.originPosition ? b.originPosition: "TOP_LEFT";
            var c = b.resolutions;
            if (c && c.length > 1) {
                this.U = c;
                for (var d = [], f = 0; f < c.length; f++) d.push(new w.Pixel((this.J.x - this.L.x) / c[f], (this.J.y - this.L.y) / c[f]));
                this.Bb = d
            } else if (f = b.maxZoom ? b.maxZoom: 0, this.U = [], c && c.length == 1) {
                for (var c = c[0], d = [], g = 0; g <= f; g++) this.U.push(c),
                d.push(new w.Pixel((this.J.x - this.L.x) / this.U[g], (this.J.y - this.L.y) / this.U[g])),
                c /= 2;
                this.Bb = d
            } else if (b.baseSize) {
                c = b.baseSize;
                d = [];
                for (g = 0; g <= f; g++) this.U.push((this.J.x - this.L.x) / c),
                d.push(new w.Pixel(c, c)),
                c *= 2;
                this.Bb = d
            }
        },
        Hc: function(a, b) {
            var c = 0,
            d = 0,
            c = (a.x - this.L.x) / this.U[b],
            d = (this.J.y - a.y) / this.U[b];
            return new w.Pixel(c, d)
        },
        Gc: function(a, b) {
            var c = 0,
            d = 0,
            c = a.x * this.U[b] + this.L.x,
            d = this.J.y - a.y * this.U[b];
            return new w.Pixel(c, d)
        }
    });
    w.Yb = z({
        _type: "se",
        ta: {},
        initialize: function() {
            this.ta = {
                ma: 6378137,
                L: new w.Pixel( - 2.003750834E7, -2.003750834E7),
                J: new w.Pixel(2.003750834E7, 2.003750834E7)
            }
        },
        za: function(a) {
            var b = this.ta,
            c = Math.sin(this.Va(a.lat));
            return new w.Pixel(this.Rb(b.ma * this.Va(a.lng), b.L.x, b.J.x), this.ia(b.ma * 0.5 * Math.log((1 + c) / (1 - c)), b.L.y, b.J.y))
        },
        qb: function(a) {
            var b = this.ta;
            a.x = this.Rb(a.x, b.L.x, b.J.x);
            a.y = this.ia(a.y, b.L.y, b.J.y);
            var c = Math.exp(a.y / b.ma * 2);
            return new w.LngLat(this.Za(a.x / b.ma), this.Za(Math.asin((c - 1) / (1 + c))))
        },
        U: function() {
            var a = [];
            for (i = 0; i < 25; i++) a.push(156543.0339 / Math.pow(2, i));
            return a
        },
        Rb: function(a, b, c) {
            for (; a > c;) a -= c - b;
            for (; a < b;) a += c - b;
            return a
        },
        ia: function(a, b, c) {
            b != 0 && (a = Math.max(a, b));
            c != 0 && (a = Math.min(a, c));
            return a
        },
        Va: function(a) {
            return a * (Math.PI / 180)
        },
        Za: function(a) {
            return a * (180 / Math.PI)
        }
    });
    w.MAjaxResult = {};
    w.AjaxRequest = function(a, b, c) {
        var d = w.Util.guid(),
        f = document.getElementById("abc_" + d);
        f && document.getElementsByTagName("head")[0].removeChild(f);
        f = document.createElement("script");
        f.id = "abc_" + d;
        f.type = "text/javascript";
        f.src = a + "&rid=" + d;
        document.getElementsByTagName("head")[0].appendChild(f);
        var g = this;
        w.Util.isIE && !w.Util.isIE9 ? f.onreadystatechange = function() { (this.readyState == "loaded" || this.readyState == "complete") && g.ajaxResult()
        }: (f.onload = function() {
            g.ajaxResult()
        },
        f.onerror = function() {
            w.MAjaxResult[d] = {
                status: "E200",
                server: "MapABC",
                version: "v"
            };
            g.ajaxResult()
        });
        this.ajaxResult = function() {
            w.MAjaxResult[d] ? (b && b(w.MAjaxResult[d]), document.getElementsByTagName("head")[0].removeChild(w.$("abc_" + d)), w.MAjaxResult[d] = o, delete w.MAjaxResult[d]) : c ? b && b() : (w.MAjaxResult[d] = {
                status: "E100",
                server: "MapABC",
                version: "v"
            },
            g.ajaxResult())
        }
    };
    w.BusSearch = z(w.Conf, {
        _type: "bussearch",
        e: "",
        initialize: function(a) {
            var a = a || {},
            b = {
                encode: "utf-8",
                _resType: "json",
                per: "",
                batch: 1,
                number: 10
            },
            c = "",
            d;
            for (d in b) if (b[d] || a[d]) c += d.replace("_", "") + "=" + encodeURIComponent(a[d.replace("_", "")] || b[d]) + "&";
            c += a.type && a.type < 8 ? "type=" + a.type + "&": "type=0&";
            c += a.retvalue == 1 ? "retvalue=1&": "retvalue=0&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "bus/simple?" + c;
            this.w = a.encode
        },
        byBusId: function(a, b, c) {
            a instanceof Array && (a = a.join(","));
            if (this.w == "gb2312") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=8085&ids=" + a + "&city=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=8085&ids=" + a + "&city=" + encodeURIComponent(b), c)
        },
        byBusName: function(a, b, c) {
            if (this.w == "gb2312") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=8004&busName=" + w.Util.encodeToGb2312(a) + "&city=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=8004&busName=" + encodeURIComponent(a) + "&city=" + encodeURIComponent(b), c)
        },
        byBusStation: function(a, b, c) {
            if (this.w == "gb2312") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=8086&stationName=" + w.Util.encodeToGb2312(a) + "&city=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=8086&stationName=" + encodeURIComponent(a) + "&city=" + encodeURIComponent(b), c)
        },
        byTwoPoi: function(a, b, c) {
            for (var d = [], f = 0; f < a.length; f++) d.push(a[f].toString());
            if (this.w == "gb2312") {
                var g = this,
                a = (w.Conf._plugin || g._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (a += "&key=" + w.Conf._key);
                new w.AjaxRequest(a,
                function() {
                    var a = g.e + "sid=8001&xys=" + d.join(";") + "&city=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(a, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=8001&xys=" + d.join(";") + "&city=" + encodeURIComponent(b), c)
        }
    });
    w.Geocoder = z(w.Conf, {
        _type: "geocoder",
        initialize: function(a) {
            var a = a || {},
            b = {
                _resType: "json",
                encode: "utf-8",
                range: 3E3,
                roadnum: 10,
                crossnum: 3,
                poinum: 10
            },
            c = "",
            d;
            for (d in b) b[d] && (c += d.replace("_", "") + "=" + encodeURIComponent(a[d.replace("_", "")] || b[d]) + "&");
            c += a.retvalue == 1 ? "retvalue=1&": "retvalue=0&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = c;
            this.w = a.encode
        },
        geocode: function(a, b) {
            if (this.w == "gb2312") {
                var c = this,
                d = (w.Conf._plugin || c._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (d += "&key=" + w.Conf._key);
                new w.AjaxRequest(d,
                function() {
                    var d = (w.Conf._server || this._server) + "geocode/simple?" + c.e + "sid=7000&address=" + w.Util.encodeToGb2312(a);
                    new w.AjaxRequest(d, b)
                },
                !0)
            } else new w.AjaxRequest((w.Conf._server || this._server) + "geocode/simple?" + this.e + "sid=7000&address=" + encodeURIComponent(a), b)
        },
        regeocode: function(a, b) {
            new w.AjaxRequest((w.Conf._server || this._server) + "rgeocode/simple?" + this.e + "sid=7001&region=" + a.toString(), b)
        }
    });
    w.Partition = z(w.Conf, {
        _type: "partition",
        e: "",
        initialize: function(a) {
            var a = a || {},
            b = {
                encode: "utf-8",
                srctype: "POI",
                type: "",
                number: 10,
                batch: 1,
                range: 3E3,
                ext: "",
                _resType: "json"
            },
            c = "",
            d;
            for (d in b) b[d] && (c += d.replace("_", "") + "=" + encodeURIComponent(a[d.replace("_", "")] || b[d]) + "&");
            c += a.retvalue == 1 ? "retvalue=1&": "retvalue=0&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "gss/simple?" + c;
            this.w = a.encode
        },
        byProvince: function(a) {
            new w.AjaxRequest(this.e + "sid=1022&region=116.39,39.51&maplevel=2", a)
        },
        byCity: function(a, b) {
            if (this.w == "gb2312") {
                var c = this,
                d = (w.Conf._plugin || c._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (d += "&key=" + w.Conf._key);
                new w.AjaxRequest(d,
                function() {
                    var d = c.e + "sid=1021&city=" + w.Util.encodeToGb2312(a);
                    new w.AjaxRequest(d, b)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1021&city=" + encodeURIComponent(a), b)
        },
        byDistrict: function(a, b, c) {
            if (this.w == "gb2312") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=1003&districtName=" + w.Util.encodeToGb2312(a) + "&city=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1003&districtName=" + encodeURIComponent(a) + "&city=" + encodeURIComponent(b), c)
        }
    });
    w.PoiSearch = z(w.Conf, {
        _type: "poisearch",
        e: "",
        initialize: function(a) {
            var a = a || {},
            b = {
                encode: "utf-8",
                srctype: "POI",
                type: "",
                number: 10,
                batch: 1,
                range: 3E3,
                tempid: "",
                eid: "",
                ext: "",
                _resType: "json"
            },
            c = "",
            d;
            for (d in b) if (b[d] || a[d]) c += d.replace("_", "") + "=" + encodeURIComponent(a[d.replace("_", "")] || b[d]) + "&";
            c += a.retvalue == 1 ? "retvalue=1&": "retvalue=0&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "gss/simple?" + c;
            this.w = a.encode
        },
        byKeywords: function(a, b, c) {
            if (this.w == "gb2312") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=1000&keyword=" + w.Util.encodeToGb2312(a) + "&city=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1000&keyword=" + encodeURIComponent(a) + "&city=" + encodeURIComponent(b), c)
        },
        byCenKeywords: function(a, b, c, d) {
            if (this.w == "gb2312") {
                var f = this,
                g = (w.Conf._plugin || f._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (g += "&key=" + w.Conf._key);
                new w.AjaxRequest(g,
                function() {
                    var g = f.e + "sid=1001&cen=" + w.Util.encodeToGb2312(b) + "&keyword=" + w.Util.encodeToGb2312(a) + "&city=" + w.Util.encodeToGb2312(c);
                    new w.AjaxRequest(g, d)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1001&cen=" + encodeURIComponent(b) + "&keyword=" + encodeURIComponent(a) + "&city=" + encodeURIComponent(c), d)
        },
        byCenPoi: function(a, b, c) {
            if (this.w == "gb2312") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=1002&cenX=" + a.lng + "&cenY=" + a.lat + "&keyword=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1002&cenX=" + a.lng + "&cenY=" + a.lat + "&keyword=" + encodeURIComponent(b), c)
        },
        byPguid: function(a, b) {
            new w.AjaxRequest(this.e + "sid=1006&pguid=" + a, b)
        },
        byRegion: function(a, b, c) {
            for (var d = [], f = 0; f < a.length; f++) d.push(a[f].lng + "," + a[f].lat);
            if (this.w == "gb2312") {
                var g = this,
                a = (w.Conf._plugin || g._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (a += "&key=" + w.Conf._key);
                new w.AjaxRequest(a,
                function() {
                    var a = g.e + "sid=1005&regionType=polygon&region=" + d.join(";") + "&keyword=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(a, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1005&regionType=polygon&region=" + d.join(";") + "&keyword=" + encodeURIComponent(b), c)
        },
        inputPrompt: function(a, b, c) {
            if (this.w == "gb2312") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=1014&keyword=" + w.Util.encodeToGb2312(a) + "&city=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1014&keyword=" + encodeURIComponent(a) + "&city=" + encodeURIComponent(b), c)
        }
    });
    w.RoadSearch = z(w.Conf, {
        _type: "roadsearch",
        e: "",
        initialize: function(a) {
            var a = a || {},
            b = {
                encode: "utf-8",
                _resType: "json",
                ext: "",
                batch: 1,
                number: 10
            },
            c = "",
            d;
            for (d in b) b[d] && (c += d.replace("_", "") + "=" + encodeURIComponent(a[d.replace("_", "")] || b[d]) + "&");
            c += a.retvalue == 1 ? "retvalue=1&": "retvalue=0&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "gss/simple?" + c;
            this.w = a.encode
        },
        roadInfoSearchByRoadName: function(a, b, c) {
            if (this.w == "gb2312") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=1008&roadName=" + w.Util.encodeToGb2312(a) + "&city=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1008&roadName=" + encodeURIComponent(a) + "&city=" + encodeURIComponent(b), c)
        },
        roadCrossSearchByRoadName: function(a, b, c) {
            if (this.w == "gb2312") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=1010&roadName=" + w.Util.encodeToGb2312(a) + "&city=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1010&roadName=" + encodeURIComponent(a) + "&city=" + encodeURIComponent(b), c)
        },
        roadCrossSearchByRoadNames: function(a, b, c, d) {
            if (this.w == "gb2312") {
                var f = this,
                g = (w.Conf._plugin || f._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (g += "&key=" + w.Conf._key);
                new w.AjaxRequest(g,
                function() {
                    var g = f.e + "sid=1009&roadName1=" + w.Util.encodeToGb2312(a) + "&roadName2=" + w.Util.encodeToGb2312(b) + "&city=" + w.Util.encodeToGb2312(c);
                    new w.AjaxRequest(g, d)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=1009&roadName1=" + encodeURIComponent(a) + "&roadName2=" + encodeURIComponent(b) + "&city=" + encodeURIComponent(c), d)
        }
    });
    w.RouteSearch = z(w.Conf, {
        _type: "routesearch",
        e: "",
        initialize: function(a) {
            var a = a || {},
            b = {
                encode: "utf-8",
                _resType: "json",
                routeType: 0,
                avoidName: "",
                avoidRegion: [],
                flag: 0,
                per: 10
            },
            c = "",
            d;
            for (d in b) if (b[d] || a[d]) {
                var f = a[d.replace("_", "")] || b[d],
                f = f instanceof Array ? f.join(";") : f;
                c += d.replace("_", "") + "=" + encodeURIComponent(f) + "&"
            }
            c += a.retvalue == 1 ? "retvalue=1&": "retvalue=0&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "route/simple?" + c
        },
        getNaviPath: function(a, b) {
            for (var c = [], d = 0; d < a.length; d++) c.push(a[d].toString());
            new w.AjaxRequest(this.e + "sid=8000&xys=" + c.join(";"), b)
        }
    });
    w.RestAPI = z({
        _type: "restapi",
        e: "",
        initialize: s(),
        request: function(a, b) {
            new w.AjaxRequest(a, b)
        }
    });
    w.RoomAround = z(w.Conf, {
        _type: "roomaround",
        e: "",
        initialize: function(a) {
            var a = a || {},
            b = {
                encode: "GBK",
                number: "",
                batch: "",
                project: "",
                floor: "",
                _resType: "json"
            },
            c = "",
            d;
            for (d in b) if (b[d] || a[d]) c += d.replace("_", "") + "=" + encodeURIComponent(a[d.replace("_", "")] || b[d]) + "&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "cgs?" + c;
            this.w = a.encode
        },
        byKeywords: function(a, b) {
            if (this.w == "GBK") {
                var c = this,
                d = (w.Conf._plugin || c._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (d += "&key=" + w.Conf._key);
                new w.AjaxRequest(d,
                function() {
                    var d = c.e + "sid=200021&keyword=" + w.Util.encodeToGb2312(a);
                    new w.AjaxRequest(d, b)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=200021&keyword=" + encodeURIComponent(a), b)
        },
        byCenPoi: function(a, b, c) {
            new w.AjaxRequest(this.e + "sid=200021&cenX=" + a.lng + "&cenY=" + a.lat + "&range=" + b, c)
        }
    });
    w.RoomPoi = z(w.Conf, {
        _type: "roompoi",
        e: "",
        initialize: function(a) {
            var a = a || {},
            b = {
                encode: "GBK",
                type: "",
                number: "",
                batch: "",
                range: "",
                project: "",
                floor: "",
                _resType: "json"
            },
            c = "",
            d;
            for (d in b) if (b[d] || a[d]) c += d.replace("_", "") + "=" + encodeURIComponent(a[d.replace("_", "")] || b[d]) + "&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "cgs?" + c;
            this.w = a.encode
        },
        byKeywords: function(a, b) {
            if (this.w == "GBK") {
                var c = this,
                d = (w.Conf._plugin || c._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (d += "&key=" + w.Conf._key);
                new w.AjaxRequest(d,
                function() {
                    var d = c.e + "sid=200001&keyword=" + w.Util.encodeToGb2312(a);
                    new w.AjaxRequest(d, b)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=200001&keyword=" + encodeURIComponent(a), b)
        },
        byCenPoi: function(a, b, c) {
            if (this.w == "GBK") {
                var d = this,
                f = (w.Conf._plugin || d._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (f += "&key=" + w.Conf._key);
                new w.AjaxRequest(f,
                function() {
                    var f = d.e + "sid=200002&cenX=" + a.lng + "&cenY=" + a.lat + "&keyword=" + w.Util.encodeToGb2312(b);
                    new w.AjaxRequest(f, c)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=200002&cenX=" + a.lng + "&cenY=" + a.lat + "&keyword=" + encodeURIComponent(b), c)
        }
    });
    w.RoomGeocode = z(w.Conf, {
        _type: "roomgeocode",
        initialize: function(a) {
            var a = a || {},
            b = {
                _resType: "json",
                encode: "GBK",
                project: "",
                floor: ""
            },
            c = "",
            d;
            for (d in b) if (b[d] || a[d]) c += d.replace("_", "") + "=" + encodeURIComponent(a[d.replace("_", "")] || b[d]) + "&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "cgs?" + c;
            this.w = a.encode
        },
        geocode: function(a, b) {
            if (this.w == "GBK") {
                var c = this,
                d = (w.Conf._plugin || c._plugin) + "?cls=encodeToGb2312";
                w.Util.cookieEnabled() || (d += "&key=" + w.Conf._key);
                new w.AjaxRequest(d,
                function() {
                    var d = c.e + "sid=200011&keyword=" + w.Util.encodeToGb2312(a);
                    new w.AjaxRequest(d, b)
                },
                !0)
            } else new w.AjaxRequest(this.e + "sid=200011&keyword=" + encodeURIComponent(a), b)
        },
        regeocode: function(a, b) {
            new w.AjaxRequest(this.e + "sid=200012&cenX=" + a.lng + "&cenY=" + a.lat, b)
        }
    });
    w.RoomRoute = z(w.Conf, {
        _type: "roomroute",
        e: "",
        initialize: function(a) {
            var a = a || {},
            b = {
                encode: "GBK",
                _resType: "json"
            },
            c = "",
            d;
            for (d in b) if (b[d] || a[d]) {
                var f = a[d.replace("_", "")] || b[d],
                f = f instanceof Array ? f.join(";") : f;
                c += d.replace("_", "") + "=" + encodeURIComponent(f) + "&"
            }
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "route/simple?" + c
        },
        getNaviPath: function(a, b, c, d, f) {
            for (var g = [], j = 0; j < b.length; j++) g.push(b[j].toString());
            new w.AjaxRequest(this.e + "sid=8008&projectid=" + a + "&xys=" + g.join(";") + "&sf=" + c + "&tf=" + d, f)
        }
    });
    w.RoomSearch = z(w.Conf, {
        _type: "roomsearch",
        e: "",
        initialize: function(a) {
            var a = a || {},
            b = {
                encode: "GBK",
                _resType: "json"
            },
            c = "",
            d;
            for (d in b) if (b[d] || a[d]) c += d.replace("_", "") + "=" + encodeURIComponent(a[d.replace("_", "")] || b[d]) + "&";
            w.Util.cookieEnabled() || (c += "key=" + w.Conf._key + "&");
            this.e = (w.Conf._server || this._server) + "cgs?" + c;
            this.w = a.encode
        },
        searchLimit: function(a, b, c) {
            new w.AjaxRequest(this.e + "sid=200031&projectId=" + a + "&floorId=" + b, c)
        }
    });
    window.AMap = w;
})();