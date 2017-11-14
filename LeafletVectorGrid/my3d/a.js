webpackJsonp([1], {
    194 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        var r = n(0),
        o = _interopRequireDefault(r),
        a = n(9),
        i = n(5),
        l = n(195),
        s = (_interopRequireDefault(l), n(70)),
        u = _interopRequireDefault(s),
        c = n(201),
        d = _interopRequireDefault(c),
        f = (0, i.getParams)("type"),
        p = null;
        switch (f) {
        case "fcode":
            p = o["default"].createElement(u["default"], null);
            break;
        case "grab":
            p = o["default"].createElement(d["default"], null);
            break;
        default:
            p = o["default"].createElement(d["default"], null)
        } (0, a.render)(p, document.getElementById("purchase"))
    },
    195 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t["default"] = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } (),
        o = n(0),
        a = _interopRequireDefault(o),
        i = n(69),
        l = n(5),
        s = n(2),
        u = n(70),
        c = _interopRequireDefault(u),
        d = function(e) {
            function DepositPurchase(e) {
                _classCallCheck(this, DepositPurchase);
                var t = _possibleConstructorReturn(this, (DepositPurchase.__proto__ || Object.getPrototypeOf(DepositPurchase)).call(this, e));
                return t.state = {
                    status: 1,
                    userTotal: 123287,
                    currTime: new Date,
                    startTime: new Date("2017 9 19 20:00:00"),
                    endTime: new Date("2017 10 10 21:00:00"),
                    color: "black",
                    deliverDate: null,
                    deliverDateConfig: []
                },
                t.deliverDateChange = t.deliverDateChange.bind(t),
                t.submitOrder = t.submitOrder.bind(t),
                t
            }
            return _inherits(DepositPurchase, e),
            r(DepositPurchase, [{
                key: "componentDidMount",
                value: function() {
                    this.getConfig(),
                    this.getDeliverDateConfig(),
                    this.initCurrTimer()
                }
            },
            {
                key: "getConfig",
                value: function() {
                    var e = this,
                    t = function(t) {
                        var n = function(t) {
                            var n = t.num,
                            r = t.status,
                            o = t.timestamp,
                            a = t.start_order_time,
                            i = t.end_order_time;
                            e.setState({
                                userTotal: n,
                                status: r,
                                currTime: new Date(1e3 * o),
                                startTime: new Date(a.replace(/-/g, "/")),
                                endTime: new Date(i.replace(/-/g, "/"))
                            })
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/prepay/getconfig").done(t)
                }
            },
            {
                key: "getDeliverDateConfig",
                value: function() {
                    var e = this,
                    t = function(t) {
                        var n = function(t) {
                            var n = t.deliver_list,
                            r = null;
                            n.forEach(function(e, t, n) {
                                e.date = e.deliver_time
                            }),
                            n.every(function(e) {
                                return ! e.has || (r = e.date, !1)
                            }),
                            e.setState({
                                deliverDateConfig: n,
                                deliverDate: r
                            })
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/prepay/deliverlist").done(t)
                }
            },
            {
                key: "initCurrTimer",
                value: function() {
                    var e = this;
                    window.setInterval(function() {
                        e.setState({
                            currTime: new Date(e.state.currTime.getTime() + 1e3)
                        })
                    },
                    1e3)
                }
            },
            {
                key: "deliverDateChange",
                value: function(e) {
                    this.setState({
                        deliverDate: e
                    })
                }
            },
            {
                key: "submitOrder",
                value: function() {
                    var e = this,
                    t = this.state,
                    n = t.imgCode,
                    r = t.color,
                    o = t.deliverDate;
                    if (!n) return this.state.vcodeShow && this.setState({
                        vcodeErro: !0
                    }),
                    void this.setState({
                        vcodeShow: !0
                    });
                    var a = {
                        black_num: 0,
                        blue_num: 0,
                        orange_num: 0,
                        deliver_time: o,
                        vcode: n
                    };
                    a[r + "_num"] = 1,
                    console.log(a);
                    var i = function(t) {
                        e.setState({
                            vcodeShow: !1
                        }),
                        e.setState({
                            imgCode: null
                        }),
                        e.setState({
                            vcodeError: !1
                        });
                        var n = function() {
                            e.showPopHandler("预定成功", "/html/prepay.html", "去支付"),
                            window.setTimeout(function() {
                                window.location.href = "http://zqb.red.xunlei.com/html/prepay.html"
                            },
                            3e3)
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/prepay/submit", a).done(i)
                }
            },
            {
                key: "submit",
                value: function(e) {
                    var t = this;
                    e.preventDefault();
                    var n = function(e) {
                        console.log(e);
                        var n = e.iRet;
                        if (t.commonErrorHandler(n), !t.inProcess()) return void t.showPopHandler("预定时间结束");
                        if (0 == n && e.data) {
                            var r = e.data.status,
                            o = ["待支付定金", "已支付定金", "支付定金超时", "待支付尾款", "已支付尾款", "支付尾款超时"];
                            0 == r ? t.showPopHandler(o[r], "/html/prepay.html") : 3 == r ? t.showPopHandler(o[r], "/html/pay.html?type=payend") : t.showPopHandler(o[r], "/html/usercenter.html")
                        }
                        30013 == n && t.submitOrder()
                    };
                    this.getLoginInfo("/prepay/info").done(n)
                }
            },
            {
                key: "inProcess",
                value: function() {
                    var e = this.state,
                    t = e.currTime,
                    n = e.startTime,
                    r = e.endTime;
                    return t >= n && t < r
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.state,
                    t = e.color,
                    n = e.deliverDate,
                    r = e.deliverDateConfig,
                    o = e.status,
                    l = e.currTime,
                    s = e.startTime,
                    u = e.endTime,
                    c = e.userTotal,
                    d = (e.colorConfig, this.state.popShow ? a["default"].createElement(i.TipPop, {
                        btnTxt: this.state.popBtn,
                        msg: this.state.popMsg,
                        jump: this.state.popJump,
                        onClose: this.onClose
                    }) : null),
                    f = null,
                    p = a["default"].createElement("a", {
                        href: "#",
                        className: "btn-oc btn-oc-disable"
                    },
                    "立即购买");
                    switch (o) {
                    case 0:
                        f = a["default"].createElement(i.Countdown, {
                            currTime: l,
                            targetTime: s,
                            desc: "预定开启倒计时"
                        });
                        break;
                    case 1:
                        f = a["default"].createElement(i.Countdown, {
                            currTime: l,
                            targetTime: u,
                            desc: "预定结束倒计时"
                        }),
                        p = a["default"].createElement("a", {
                            href: "#",
                            className: "btn-oc",
                            onClick: this.submit
                        },
                        "立即购买");
                        break;
                    default:
                        f = null
                    }
                    return a["default"].createElement("div", {
                        className: "oc-buy-box"
                    },
                    d, this.state.vcodeShow ? a["default"].createElement(i.VerifyCode, {
                        checkImgCode: this.checkImgCode,
                        vcodeErro: this.state.vcodeErro,
                        onClose: this.vcodeClose,
                        onChange: this.handleImgCodeChange,
                        submitVcode: this.submitOrder
                    }) : null, a["default"].createElement(i.PurchaseHeader, {
                        userTotal: c
                    }), a["default"].createElement("div", {
                        className: "oc-buy-main"
                    },
                    f, a["default"].createElement(i.ColorSelector, {
                        colorConfig: this.colorConfig,
                        currColor: t,
                        onChange: this.switchColor
                    }), a["default"].createElement(i.DeliverDate, {
                        deliverDateConfig: r,
                        currDate: n,
                        onChange: this.deliverDateChange
                    }), a["default"].createElement("div", {
                        className: "oc-buy-free"
                    },
                    a["default"].createElement("span", {
                        className: "oc-lbl"
                    },
                    "赠品"), "购买即送玩客币1枚，", a["default"].createElement("a", {
                        href: "http://red.xunlei.com/index.php?r=site/coin"
                    },
                    "了解玩客币>")), a["default"].createElement("div", {
                        className: "oc-bot-sum"
                    },
                    p, a["default"].createElement("h3", null, a["default"].createElement("span", {
                        className: "oc-buy-price-pay"
                    },
                    "预售价：328元"), "定金：", a["default"].createElement("strong", null, "32.8"), "元"), a["default"].createElement("p", null, a["default"].createElement("span", {
                        className: "oc-col-red"
                    },
                    "*定金不可退"), "，定金可直接抵扣商品总价")), a["default"].createElement("div", {
                        className: "oc-buy-aside"
                    },
                    a["default"].createElement(i.PurchaseFlow, null), a["default"].createElement(i.PurchaseRule, null))))
                }
            }]),
            DepositPurchase
        } (c["default"]);
        t["default"] = d
    },
    196 : function(e, t, n) {
        "use strict"; (function(e, r) {
            var o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
            function(e) {
                return typeof e
            }: function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
            }; !
            function(e) {
                function classExtends(e, t) {
                    function ctor() {
                        this.constructor = e
                    }
                    var n;
                    for (n in t) u.call(t, n) && (e[n] = t[n]);
                    ctor.prototype = t.prototype,
                    e.prototype = new ctor,
                    e.SUPER = t.prototype
                }
                var i = {},
                l = function(e) {
                    var t, n = "0123456789abcdef",
                    r = "";
                    for (t = 0; t < e.length; t++) r += n.charAt(e.charCodeAt(t) >> 4 & 15),
                    r += n.charAt(15 & e.charCodeAt(t));
                    return r
                },
                s = function() {
                    function init() {
                        throw "InnerHash.init should be overriden"
                    }
                    function addPart() {
                        throw "InnerHash.addPart should be  verriden"
                    }
                    function transform() {
                        throw "InnerHash.transform should be overriden"
                    }
                    function getDigest() {
                        throw "InnerHash.getDigest should be overriden"
                    }
                    function getHexDigest() {
                        return l(this.getDigest())
                    }
                    function InnerHash() {}
                    return InnerHash.prototype.reInit = init,
                    InnerHash.prototype.addPart = addPart,
                    InnerHash.prototype.transform = transform,
                    InnerHash.prototype.getDigest = getDigest,
                    InnerHash.prototype.getHexDigest = getHexDigest,
                    InnerHash
                } (),
                u = {}.hasOwnProperty,
                c = function(e) {
                    return e >>> 0
                },
                d = function(e, t) {
                    return c(e << t | e >>> 32 - t)
                },
                f = "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0",
                p = function(e, t) {
                    for (var n = 0,
                    r = e.length,
                    o = "",
                    a = ""; n < r;) a = "",
                    a += String.fromCharCode(255 & e[n]),
                    a += String.fromCharCode(e[n] >> 8 & 255),
                    a += String.fromCharCode(e[n] >> 16 & 255),
                    a += String.fromCharCode(e[n] >> 24 & 255),
                    t && (a = a.split("").reverse().join("")),
                    o += a,
                    n++;
                    return o
                },
                m = function() {
                    function innerUint(e) {
                        var t, n = e.length;
                        for (t = 0; t < n; t++) this[t] = c(e[t]) || 0;
                        this.length = n
                    }
                    function add(e) {
                        if (! (e instanceof Array)) return this.add([e]);
                        var t, n = Math.min(e.length, this.length);
                        for (t = 0; t < n; t++) this[t] += e[t];
                        for (n = this.length, t = 0; t < n; t++) this[t] > 4294967295 && (this[t] -= 4294967296, t + 1 < n && this[t + 1]++)
                    }
                    function Uint(e) {
                        var t;
                        if (e instanceof Array) t = e;
                        else {
                            var n = e || 64;
                            t = new Array(Math.ceil(n / 32))
                        }
                        return new innerUint(t)
                    }
                    return classExtends(innerUint, Array),
                    innerUint.prototype.add = add,
                    Uint
                } (),
                h = function() {
                    function addPart(e) {
                        if (this.isEnd) return null;
                        var t = 8 * e.length;
                        t < 4294967296 ? this.count.add(t) : this.count.add([c(t), Math.floor(t / 4294967296)]);
                        var n = this.buffer.concat(e),
                        r = 0,
                        o = n.length;
                        for (r = 0; r + this.block_size <= o; r += this.block_size) this.state = this.transform(this.state, n.substr(r, 64));
                        return this.buffer = n.substring(r),
                        this
                    }
                    function getDigest() {
                        var e = "" + f;
                        if (this.isEnd) return p(this.state, this.isBigEndian);
                        var t, n = this.count[0] >> 3 & 63,
                        r = n < 56 ? 56 - n: 120 - n,
                        o = e.substr(0, r);
                        return t = this.isBigEndian ? p(this.count.reverse(), !0) : p(this.count),
                        this.addPart(o),
                        this.addPart(t),
                        this.isEnd = !0,
                        p(this.state, this.isBigEndian)
                    }
                    function MD5Family() {
                        MD5Family.SUPER.constructor.apply(this, arguments),
                        this.count = new m(64),
                        this.buffer = "",
                        this.isEnd = !1
                    }
                    return classExtends(MD5Family, s),
                    MD5Family.prototype.block_size = 64,
                    MD5Family.prototype.isBigEndian = !1,
                    MD5Family.prototype.reInit = function() {
                        return this.constructor.call(this)
                    },
                    MD5Family.prototype.addPart = addPart,
                    MD5Family.prototype.getDigest = getDigest,
                    MD5Family
                } (),
                g = function(e, t) {
                    for (var n = 0,
                    r = e.length,
                    o = []; n + 3 < r;) {
                        var a = e.substr(n, 4);
                        t && (a = a.split("").reverse().join(""));
                        var i = 255 & a.charCodeAt(0) | (255 & a.charCodeAt(1)) << 8 | (255 & a.charCodeAt(2)) << 16 | (255 & a.charCodeAt(3)) << 24;
                        o.push(c(i)),
                        n += 4
                    }
                    return o
                },
                C = function() {
                    function MD5_F(e, t, n) {
                        return c(e & t | ~e & n)
                    }
                    function MD5_G(e, t, n) {
                        return c(e & n | t & ~n)
                    }
                    function MD5_H(e, t, n) {
                        return c(e ^ t ^ n)
                    }
                    function MD5_I(e, t, n) {
                        return c(t ^ (e | ~n))
                    }
                    function MD5Transform(n, r) {
                        var o = n[0],
                        a = n[1],
                        i = n[2],
                        l = n[3],
                        s = [];
                        s = g(r);
                        var u, f, p, m;
                        for (m = 0; m < 64; m++) m < 16 ? (f = m, p = MD5_F(a, i, l)) : m < 32 ? (f = 5 * m + 1 & 15, p = MD5_G(a, i, l)) : m < 48 ? (f = 3 * m + 5 & 15, p = MD5_H(a, i, l)) : (f = 7 * m & 15, p = MD5_I(a, i, l)),
                        u = l,
                        l = i,
                        i = a,
                        a += d(o + p + e[m] + s[f], t[m]),
                        a = c(a),
                        o = u;
                        return [c(n[0] + o), c(n[1] + a), c(n[2] + i), c(n[3] + l)]
                    }
                    function InnerMD5() {
                        InnerMD5.SUPER.constructor.apply(this, arguments),
                        this.state = [1732584193, 4023233417, 2562383102, 271733878]
                    }
                    function MD5(e) {
                        if (! (this instanceof MD5)) {
                            var t = new MD5;
                            return t.addPart(e),
                            t.getHexDigest()
                        }
                        return new InnerMD5
                    }
                    var e = [3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426, 2821735955, 4249261313, 1770035416, 2336552879, 4294925233, 2304563134, 1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664, 643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448, 568446438, 3275163606, 4107603335, 1163531501, 2850285829, 4243563512, 1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740, 2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074, 3572445317, 76029189, 3654602809, 3873151461, 530742520, 3299628645, 4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690, 4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649, 4149444226, 3174756917, 718787259, 3951481745],
                    t = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
                    return classExtends(InnerMD5, h),
                    InnerMD5.prototype.transform = MD5Transform,
                    MD5
                } ();
                i.md5 = C;
                var v = function() {
                    function encode(t) {
                        var n, r, o, a, i, l, s, u = "",
                        c = 0;
                        for (t = y.UCS2toUTF8(t); c < t.length;) n = t.charCodeAt(c++),
                        r = t.charCodeAt(c++),
                        o = t.charCodeAt(c++),
                        a = n >> 2,
                        i = (3 & n) << 4 | r >> 4,
                        l = (15 & r) << 2 | o >> 6,
                        s = 63 & o,
                        isNaN(r) ? l = s = 64 : isNaN(o) && (s = 64),
                        u = u + e.charAt(a) + e.charAt(i) + e.charAt(l) + e.charAt(s);
                        return u
                    }
                    function decode(t) {
                        var n, r, o, a, i, l, s, u = "",
                        c = 0;
                        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < t.length;) a = e.indexOf(t.charAt(c++)),
                        i = e.indexOf(t.charAt(c++)),
                        l = e.indexOf(t.charAt(c++)),
                        s = e.indexOf(t.charAt(c++)),
                        n = a << 2 | i >> 4,
                        r = (15 & i) << 4 | l >> 2,
                        o = (3 & l) << 6 | s,
                        u += String.fromCharCode(n),
                        64 != l && (u += String.fromCharCode(r)),
                        64 != s && (u += String.fromCharCode(o));
                        return u = y.UTF8toUCS2(u)
                    }
                    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    return {
                        encode: encode,
                        decode: decode
                    }
                } ();
                i.base64 = v;
                var y = function() {
                    function UCS2toUTF8(n) {
                        return t(e.encodeURIComponent(n))
                    }
                    function UTF8toUCS2(t) {
                        return e.decodeURIComponent(n(t))
                    }
                    function UCS2toBigEndian(e) {
                        var t, n, r = "";
                        for (n = e.length, t = 0; t < n; t++) {
                            var o = e.charCodeAt(t);
                            r += String.fromCharCode(o >> 8),
                            r += String.fromCharCode(255 & o)
                        }
                        return r
                    }
                    function UCS2toLittleEndian(e) {
                        var t, n, r = "";
                        for (n = e.length, t = 0; t < n; t++) {
                            var o = e.charCodeAt(t);
                            r += String.fromCharCode(255 & o),
                            r += String.fromCharCode(o >> 8)
                        }
                        return r
                    }
                    var t = e.unescape ||
                    function(e) {
                        for (var t = e.toString(), n = t.length, r = "", o = 0;;) {
                            if (o >= n) return r;
                            var a = t.charAt(o);
                            if ("%" === a) {
                                var i = t.substr(o + 2, 4),
                                l = t.substr(o + 1, 2);
                                o + 6 <= n && "u" === t.charAt(o + 1) && /^[0-9a-fA-F]{4}$/.test(i) ? (a = String.fromCharCode(parseInt(i, 16)), o += 5) : o + 3 <= n && /^[0-9a-fA-F]{2}$/.test(l) && (a = String.fromCharCode(parseInt(l, 16)), o += 2)
                            }
                            r += a,
                            o++
                        }
                        return r
                    },
                    n = e.escape ||
                    function(e) {
                        for (var t, n = e.toString(), r = n.length, o = "", a = 0, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./", l = "0123456789ABCDEF";;) {
                            if (a >= r) return o;
                            var s = n.charAt(a); - 1 != i.indexOf(s) ? t = s: n.charCodeAt(a) < 256 ? (t = "%u", t += l[s >> 12 & 15], t += l[s >> 8 & 15], t += l[s >> 4 & 15], t += l[s >> 0 & 15]) : (t = "%", t += l[s >> 4 & 15], t += l[s >> 0 & 15]),
                            o += t,
                            a++
                        }
                        return o
                    };
                    return {
                        UCS2toUTF8: UCS2toUTF8,
                        UTF8toUCS2: UTF8toUCS2,
                        UCS2toBigEndian: UCS2toBigEndian,
                        UCS2toLittleEndian: UCS2toLittleEndian
                    }
                } ();
                if (i.toolkits = y, "object" === a(r) && "object" === a(r.exports)) r.exports.jHash = i;
                else { (o = function() {
                        return i
                    }.call(t, n, t, r)) !== undefined && (r.exports = o)
                }
            } ("undefined" != typeof window ? window: e)
        }).call(t, n(197), n(198)(e))
    },
    197 : function(e, t) {
        var n;
        n = function() {
            return this
        } ();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch(r) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    },
    198 : function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {},
            e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
                enumerable: !0,
                get: function() {
                    return e.l
                }
            }), Object.defineProperty(e, "id", {
                enumerable: !0,
                get: function() {
                    return e.i
                }
            }), e.webpackPolyfill = 1),
            e
        }
    },
    199 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startAnimation = t.formatNumber = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } (),
        o = n(0),
        a = _interopRequireDefault(o),
        i = n(200),
        l = _interopRequireDefault(i),
        s = t.formatNumber = function(e, t) {
            var n = "" + e.toFixed(t.decimals),
            r = n.split("."),
            o = r[0],
            a = r.length > 1 ? "" + t.decimal + r[1] : "",
            i = /(\d+)(\d{3})/;
            if (t.useGrouping && t.separator) for (; i.test(o);) o = o.replace(i, "$1" + t.separator + "$2");
            return "" + t.prefix + o + a + t.suffix
        },
        u = t.startAnimation = function(e) {
            if (!e || !e.spanElement) throw new Error("You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);");
            var t = e.props,
            n = t.decimal,
            r = t.decimals,
            o = t.duration,
            a = t.easingFn,
            i = t.end,
            s = t.formattingFn,
            u = t.onComplete,
            c = t.onStart,
            d = t.prefix,
            f = t.separator,
            p = t.start,
            m = t.suffix,
            h = t.useEasing,
            g = t.useGrouping,
            C = new l["default"](e.spanElement, p, i, r, o, {
                decimal: n,
                easingFn: a,
                formattingFn: s,
                separator: f,
                prefix: d,
                suffix: m,
                useEasing: h,
                useGrouping: g
            });
            "function" == typeof c && c(),
            C.start(u)
        },
        c = function(e) {
            function CountUp() {
                var e, t, n, r;
                _classCallCheck(this, CountUp);
                for (var o = arguments.length,
                a = Array(o), i = 0; i < o; i++) a[i] = arguments[i];
                return t = n = _possibleConstructorReturn(this, (e = CountUp.__proto__ || Object.getPrototypeOf(CountUp)).call.apply(e, [this].concat(a))),
                n.spanElement = null,
                n.refSpan = function(e) {
                    n.spanElement = e
                },
                r = t,
                _possibleConstructorReturn(n, r)
            }
            return _inherits(CountUp, e),
            r(CountUp, [{
                key: "componentDidMount",
                value: function() {
                    u(this)
                }
            },
            {
                key: "shouldComponentUpdate",
                value: function(e) {
                    var t = this.props.duration !== e.duration || this.props.end !== e.end || this.props.start !== e.start;
                    return e.redraw || t
                }
            },
            {
                key: "componentDidUpdate",
                value: function() {
                    u(this)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.className,
                    n = e.start,
                    r = e.decimal,
                    o = e.decimals,
                    i = e.useGrouping,
                    l = e.separator,
                    u = e.prefix,
                    c = e.suffix,
                    d = e.style;
                    return a["default"].createElement("span", {
                        className: t,
                        ref: this.refSpan,
                        style: d
                    },
                    s(n, {
                        decimal: r,
                        decimals: o,
                        useGrouping: i,
                        separator: l,
                        prefix: u,
                        suffix: c
                    }))
                }
            }]),
            CountUp
        } (a["default"].Component);
        c.defaultProps = {
            className: undefined,
            decimal: ".",
            decimals: 0,
            duration: 3,
            easingFn: null,
            end: 100,
            formattingFn: null,
            onComplete: undefined,
            onStart: undefined,
            prefix: "",
            separator: ",",
            start: 0,
            suffix: "",
            redraw: !1,
            style: undefined,
            useEasing: !0,
            useGrouping: !1
        },
        t["default"] = c
    },
    2 : function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = t.API_HOST = "http://wk-cgi.content.xunlei.com";
        t.GRAB_URL = r + "/wanke/?m=vceu0c9",
        t.ZQB_HOST = "http://zqb.red.xunlei.com",
        t.ONECLOUD_API_HOST = "http://api-onecloud.content.xunlei.com"
    },
    200 : function(e, t, n) {
        var r, o; !
        function(a, i) {
            r = i,
            (o = "function" == typeof r ? r.call(t, n, t, e) : r) !== undefined && (e.exports = o)
        } (0,
        function(e, t, n) {
            return function(e, t, n, r, a, i) {
                function o(e) {
                    e = e.toFixed(l.decimals),
                    e += "";
                    var t, n, r, o, a, i;
                    if (t = e.split("."), n = t[0], r = t.length > 1 ? l.options.decimal + t[1] : "", l.options.useGrouping) {
                        for (o = "", a = 0, i = n.length; a < i; ++a) 0 !== a && a % 3 == 0 && (o = l.options.separator + o),
                        o = n[i - a - 1] + o;
                        n = o
                    }
                    return l.options.numerals.length && (n = n.replace(/[0-9]/g,
                    function(e) {
                        return l.options.numerals[ + e]
                    }), r = r.replace(/[0-9]/g,
                    function(e) {
                        return l.options.numerals[ + e]
                    })),
                    l.options.prefix + n + r + l.options.suffix
                }
                function u(e, t, n, r) {
                    return n * (1 - Math.pow(2, -10 * e / r)) * 1024 / 1023 + t
                }
                function s(e) {
                    return "number" == typeof e && !isNaN(e)
                }
                var l = this;
                if (l.version = function() {
                    return "1.9.2"
                },
                l.options = {
                    useEasing: !0,
                    useGrouping: !0,
                    separator: ",",
                    decimal: ".",
                    easingFn: u,
                    formattingFn: o,
                    prefix: "",
                    suffix: "",
                    numerals: []
                },
                i && "object" == typeof i) for (var c in l.options) i.hasOwnProperty(c) && null !== i[c] && (l.options[c] = i[c]);
                "" === l.options.separator ? l.options.useGrouping = !1 : l.options.separator = "" + l.options.separator;
                for (var d = 0,
                f = ["webkit", "moz", "ms", "o"], p = 0; p < f.length && !window.requestAnimationFrame; ++p) window.requestAnimationFrame = window[f[p] + "RequestAnimationFrame"],
                window.cancelAnimationFrame = window[f[p] + "CancelAnimationFrame"] || window[f[p] + "CancelRequestAnimationFrame"];
                window.requestAnimationFrame || (window.requestAnimationFrame = function(e, t) {
                    var n = (new Date).getTime(),
                    r = Math.max(0, 16 - (n - d)),
                    o = window.setTimeout(function() {
                        e(n + r)
                    },
                    r);
                    return d = n + r,
                    o
                }),
                window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
                    clearTimeout(e)
                }),
                l.initialize = function() {
                    return ! (!l.initialized && (l.error = "", l.d = "string" == typeof e ? document.getElementById(e) : e, l.d ? (l.startVal = Number(t), l.endVal = Number(n), s(l.startVal) && s(l.endVal) ? (l.decimals = Math.max(0, r || 0), l.dec = Math.pow(10, l.decimals), l.duration = 1e3 * Number(a) || 2e3, l.countDown = l.startVal > l.endVal, l.frameVal = l.startVal, l.initialized = !0, 0) : (l.error = "[CountUp] startVal (" + t + ") or endVal (" + n + ") is not a number", 1)) : (l.error = "[CountUp] target is null or undefined", 1)))
                },
                l.printValue = function(e) {
                    var t = l.options.formattingFn(e);
                    "INPUT" === l.d.tagName ? this.d.value = t: "text" === l.d.tagName || "tspan" === l.d.tagName ? this.d.textContent = t: this.d.innerHTML = t
                },
                l.count = function(e) {
                    l.startTime || (l.startTime = e),
                    l.timestamp = e;
                    var t = e - l.startTime;
                    l.remaining = l.duration - t,
                    l.options.useEasing ? l.countDown ? l.frameVal = l.startVal - l.options.easingFn(t, 0, l.startVal - l.endVal, l.duration) : l.frameVal = l.options.easingFn(t, l.startVal, l.endVal - l.startVal, l.duration) : l.countDown ? l.frameVal = l.startVal - (l.startVal - l.endVal) * (t / l.duration) : l.frameVal = l.startVal + (l.endVal - l.startVal) * (t / l.duration),
                    l.countDown ? l.frameVal = l.frameVal < l.endVal ? l.endVal: l.frameVal: l.frameVal = l.frameVal > l.endVal ? l.endVal: l.frameVal,
                    l.frameVal = Math.round(l.frameVal * l.dec) / l.dec,
                    l.printValue(l.frameVal),
                    t < l.duration ? l.rAF = requestAnimationFrame(l.count) : l.callback && l.callback()
                },
                l.start = function(e) {
                    l.initialize() && (l.callback = e, l.rAF = requestAnimationFrame(l.count))
                },
                l.pauseResume = function() {
                    l.paused ? (l.paused = !1, delete l.startTime, l.duration = l.remaining, l.startVal = l.frameVal, requestAnimationFrame(l.count)) : (l.paused = !0, cancelAnimationFrame(l.rAF))
                },
                l.reset = function() {
                    l.paused = !1,
                    delete l.startTime,
                    l.initialized = !1,
                    l.initialize() && (cancelAnimationFrame(l.rAF), l.printValue(l.startVal))
                },
                l.update = function(e) {
                    if (l.initialize()) {
                        if (e = Number(e), !s(e)) return void(l.error = "[CountUp] update() - new endVal is not a number: " + e);
                        l.error = "",
                        e !== l.frameVal && (cancelAnimationFrame(l.rAF), l.paused = !1, delete l.startTime, l.startVal = l.frameVal, l.endVal = e, l.countDown = l.startVal > l.endVal, l.rAF = requestAnimationFrame(l.count))
                    }
                },
                l.initialize() && l.printValue(l.startVal)
            }
        })
    },
    201 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t["default"] = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } (),
        o = n(0),
        a = _interopRequireDefault(o),
        i = n(69),
        l = n(5),
        s = n(2),
        u = n(70),
        c = _interopRequireDefault(u),
        d = 2,
        f = !0,
        p = function(e) {
            function GrabPurchase(e) {
                _classCallCheck(this, GrabPurchase);
                var t = _possibleConstructorReturn(this, (GrabPurchase.__proto__ || Object.getPrototypeOf(GrabPurchase)).call(this, e));
                return t.state = {
                    price: "399.00",
                    currTime: new Date,
                    buyTime: null,
                    status: d,
                    color: "orange",
                    colorConfig: [{
                        color: "black",
                        text: "曜石黑",
                        has: 1
                    },
                    {
                        color: "blue",
                        text: "科技蓝",
                        has: 1
                    },
                    {
                        color: "orange",
                        text: "爱马仕橙",
                        has: 1
                    }],
                    bookedNum: 0,
                    popShow: !1,
                    popMsg: "",
                    popJump: "",
                    popBtn: "确定",
                    imgCode: null,
                    vcodeShow: !1,
                    vcodeErro: !1,
                    vcodeEmpty: !1,
                    lock: !1
                },
                t.getColorList = t.getColorList.bind(t),
                t.getBookedNumber = t.getBookedNumber.bind(t),
                t.submitBuy = t.submitBuy.bind(t),
                t.timeId = 1,
                (0, l.selfReport)("purchase"),
                t
            }
            return _inherits(GrabPurchase, e),
            r(GrabPurchase, [{
                key: "componentDidMount",
                value: function() {
                    this.getConfig(),
                    this.initCurrTimer(),
                    this.getColorList()
                }
            },
            {
                key: "getColorList",
                value: function() {
                    var e = this,
                    t = function() {
                        window.clearTimeout(e.timeId),
                        e.timeId = window.setTimeout(e.getColorList, 3e3)
                    },
                    n = function(n) {
                        var r = function(n) {
                            var r = {
                                has_black: n.has_black,
                                has_blue: n.has_blue,
                                has_orange: n.has_orange
                            },
                            o = [],
                            a = [];
                            for (var i in r) {
                                var l = r[i];
                                switch (l && a.push(i.slice(4)), i.slice(4)) {
                                case "black":
                                    o.push({
                                        color:
                                        "black",
                                        text: "曜石黑",
                                        has: l
                                    });
                                    break;
                                case "blue":
                                    o.push({
                                        color:
                                        "blue",
                                        text: "科技蓝",
                                        has: l
                                    });
                                    break;
                                case "orange":
                                    o.push({
                                        color:
                                        "orange",
                                        text: "爱马仕橙",
                                        has: l
                                    })
                                }
                            }
                            e.setState({
                                colorConfig: o,
                                currTime: new Date(1e3 * n.timestamp)
                            }),
                            f && (e.setState({
                                color: a[0] || ""
                            }), f = !1),
                            t()
                        };
                        e.responeHandler({
                            res: n,
                            success: r
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/colorlist").done(n).fail(t)
                }
            },
            {
                key: "getCurrColorConfig",
                value: function() {
                    var e = this.state,
                    t = e.color,
                    n = e.colorConfig,
                    r = n.filter(function(e) {
                        return e.color == t
                    });
                    return console.log("currentColorConfig:", r),
                    r[0] || {}
                }
            },
            {
                key: "hasSoldout",
                value: function() {
                    return 0 == this.state.colorConfig.filter(function(e) {
                        return e.has
                    }).length
                }
            },
            {
                key: "getConfig",
                value: function() {
                    var e = this,
                    t = function(t) {
                        var n = function(t) {
                            var n = t.start_buy_time,
                            r = (t.start_order_time, t.next_order_time, t.status),
                            o = t.num;
                            e.setState({
                                buyTime: new Date(n.replace(/-/g, "/")),
                                status: r,
                                bookedNum: o
                            })
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/getconfig").done(t)
                }
            },
            {
                key: "initCurrTimer",
                value: function() {
                    var e = this;
                    window.setInterval(function() {
                        var t = new Date(e.state.currTime.getTime() + 1e3),
                        n = {
                            currTime: t
                        };
                        e.state.status < 3 && t >= e.state.buyTime && (n.status = 3),
                        e.setState(n)
                    },
                    1e3)
                }
            },
            {
                key: "getBookedNumber",
                value: function() {
                    var e = this,
                    t = function(t) {
                        var n = function(t) {
                            e.setState({
                                currTime: new Date(1e3 * t.timestamp),
                                userTotal: parseInt(t.num)
                            }),
                            window.setTimeout(e.getBookedNumber, 3e4)
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/getnumber").done(t)
                }
            },
            {
                key: "submitBuy",
                value: function() {
                    var e = this,
                    t = this.state,
                    n = t.imgCode,
                    r = t.color;
                    if (!t.lock) {
                        if (!n) return this.state.vcodeShow && this.setState({
                            vcodeEmpty: !0,
                            vcodeErro: !1
                        }),
                        this.setState({
                            vcodeShow: !0
                        }),
                        void(0, l.addClassToHtmlElement)();
                        this.setState({
                            lock: !0
                        });
                        var o = {
                            vcode: n,
                            black_num: 0,
                            blue_num: 0,
                            orange_num: 0
                        };
                        o[r + "_num"] = 1;
                        var a = function(t) {
                            e.setState({
                                lock: !1
                            });
                            var n = t.iRet;
                            e.commonErrorHandler(n),
                            -2003 == n ? (e.setState({
                                vcodeErro: !0,
                                vcodeEmpty: !1
                            }), e.refs.grabVerify.changeVerifyCode()) : (e.setState({
                                imgCode: null,
                                vcodeShow: !1,
                                vcodeErro: !1,
                                vcodeEmpty: !1
                            }), (0, l.removeClassFromHtmlElement)()),
                            0 == n &&
                            function(e) {
                                window.setTimeout(function() {
                                    window.location.href = "http://zqb.red.xunlei.com/html/order.html?type=grab"
                                },
                                0)
                            } ()
                        },
                        i = function(t, n, r) {
                            e.showPopHandler("网络繁忙，请稍候重试"),
                            e.setState({
                                imgCode: null,
                                vcodeShow: !1,
                                vcodeErro: !1,
                                vcodeEmpty: !1,
                                lock: !1
                            }),
                            (0, l.removeClassFromHtmlElement)()
                        }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/buyclick", o, 3e3).done(a).fail(i)
                    }
                }
            },
            {
                key: "submit",
                value: function(e) {
                    var t = this;
                    e.preventDefault();
                    var n = function(e) {
                        console.log(e);
                        var n = e.iRet;
                        0 == n ? t.submitBuy() : (t.commonErrorHandler(n), 30013 == n && t.showPopHandler("只有预约的用户才有抢购资格", "/html/book.html"))
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/info").done(n)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.state,
                    t = e.color,
                    n = e.status,
                    r = this.state.popShow ? a["default"].createElement(i.TipPop, {
                        btnTxt: this.state.popBtn,
                        msg: this.state.popMsg,
                        jump: this.state.popJump,
                        onClose: this.onClose
                    }) : null,
                    o = n < 4 ? a["default"].createElement(i.Countdown, {
                        currTime: this.state.currTime,
                        targetTime: this.state.buyTime,
                        desc: "离抢购开始还有"
                    }) : null;
                    3 == n && (o = a["default"].createElement("div", {
                        className: "oc-u-tit oc-u-tit-buytime"
                    },
                    a["default"].createElement("div", {
                        className: "oc-buytime"
                    },
                    a["default"].createElement("h1", null, "正在抢购中..."))));
                    var l = 3 == n && t && !this.hasSoldout() ? a["default"].createElement("a", {
                        href: "#",
                        className: "btn-oc",
                        onClick: this.submit
                    },
                    "立即购买") : a["default"].createElement("a", {
                        className: "btn-oc btn-oc-disable"
                    },
                    "立即购买");
                    return a["default"].createElement("div", {
                        className: "oc-buy-box"
                    },
                    r, this.state.vcodeShow ? a["default"].createElement(i.VerifyCode, {
                        ref: "grabVerify",
                        changeVerifyCode: this.changeVerifyCode,
                        vcodeEmpty: this.state.vcodeEmpty,
                        inputValue: this.state.imgCode,
                        checkImgCode: this.checkImgCode,
                        vcodeErro: this.state.vcodeErro,
                        onClose: this.vcodeClose,
                        onChange: this.handleImgCodeChange,
                        submitVcode: this.submitBuy
                    }) : null, a["default"].createElement(i.PurchaseHeader, {
                        userTotal: this.state.bookedNum,
                        hideTxt: !0
                    }), a["default"].createElement("div", {
                        className: "oc-buy-main"
                    },
                    o, a["default"].createElement("div", {
                        className: "oc-buy-price"
                    },
                    a["default"].createElement("span", {
                        className: "oc-buy-price-pay"
                    },
                    "官网价：", this.state.price, "元")), a["default"].createElement(i.ColorSelector, {
                        colorConfig: this.state.colorConfig,
                        currColor: t,
                        onChange: this.switchColor
                    }), a["default"].createElement("div", {
                        className: "oc-bot-sum"
                    },
                    l, a["default"].createElement("h3", null, "合计：", a["default"].createElement("strong", null, this.state.price), "元"), a["default"].createElement("p", null, "温馨提示：请预约后及时抢购,购买成功后3天内发货 | 支持7天无理由退货"))))
                }
            }]),
            GrabPurchase
        } (c["default"]);
        t["default"] = p
    },
    69 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        function PurchaseHeader(e) {
            return a["default"].createElement("div", {
                className: "oc-buy-ban"
            },
            a["default"].createElement("div", {
                className: "oc-buy-banner"
            },
            a["default"].createElement("h2", null, "玩客云 自由畅快的私人云盘"), e.hideTxt ? null: a["default"].createElement("h3", null, "2小时不限量火热预定中"), e.userTotal ? a["default"].createElement("p", {
                className: "oc-buy-price-num"
            },
            "已有", a["default"].createElement("em", null, " ", a["default"].createElement(c["default"], {
                start: 1e4,
                end: e.userTotal,
                duration: 1
            }), " "), "人预约") : null, a["default"].createElement("div", {
                className: "i-banbox"
            },
            a["default"].createElement("i", {
                className: "i-ban-wky3"
            }), a["default"].createElement("i", {
                className: "i-ban-wky2"
            }), a["default"].createElement("i", {
                className: "i-ban-wky1"
            }))))
        }
        function PurchaseFlow(e) {
            return a["default"].createElement("div", {
                className: "oc-buy-aside-steps"
            },
            a["default"].createElement("h3", null, "预定购买流程"), a["default"].createElement("ol", null, a["default"].createElement("li", null, a["default"].createElement("h4", null, "1. 预定购买"), a["default"].createElement("p", null, "预定即将开始")), a["default"].createElement("li", {
                className: "oc-buy-aside-steps-arrow"
            }), a["default"].createElement("li", null, a["default"].createElement("h4", null, "2. 预付定金"), a["default"].createElement("p", null, "2017-08-10 10:10至2017-08-30: 18:00")), a["default"].createElement("li", {
                className: "oc-buy-aside-steps-arrow"
            }), a["default"].createElement("li", null, a["default"].createElement("h4", null, "3. 支付尾款"), a["default"].createElement("p", null, "等待尾款时间开启")), a["default"].createElement("li", {
                className: "oc-buy-aside-steps-arrow"
            }), a["default"].createElement("li", null, a["default"].createElement("h4", null, "4. 发货"), a["default"].createElement("p", null, "按定金支付顺序依次发货"))))
        }
        function PurchaseRule(e) {
            return a["default"].createElement("dl", {
                className: "oc-buy-aside-rule"
            },
            a["default"].createElement("dt", null, "活动规则"), a["default"].createElement("dd", null, "1. 预付定金启动时间：9月26日10:00-12:00，2小时不限量预定开启；"), a["default"].createElement("dd", null, "2. 预定成功后享受购买资格，成功支付定金与尾款后，我们将在统一时间发货；请关注预定时间及尾款支付时间，建议您开启短信提醒，以免错过购买时间；"), a["default"].createElement("dd", null, "3. 预付定金在预定期间不可退，请确认后提交预定订单；"), a["default"].createElement("dd", null, "4. 预付统一发货时间：2018年1月15日，预付用户我们会为您的激活码自动延期；"), a["default"].createElement("dd", null, "5. 定金可直接抵扣商品总额，定金不支持优惠码抵扣，尾款可支持优惠码抵扣；"), a["default"].createElement("dd", null, "6. 查看预定订单请至“我的订单”-“我的预售”进行查看。"))
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ImageCode = t.DeliverDate = t.ColorSelector = t.Countdown = t.TipPop = t.VerifyCode = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } ();
        t.PurchaseHeader = PurchaseHeader,
        t.PurchaseFlow = PurchaseFlow,
        t.PurchaseRule = PurchaseRule;
        var o = n(0),
        a = _interopRequireDefault(o),
        i = n(5),
        l = n(2),
        s = n(196),
        u = n(199),
        c = _interopRequireDefault(u);
        t.VerifyCode = function(e) {
            function VerifyCode(e) {
                _classCallCheck(this, VerifyCode);
                var t = _possibleConstructorReturn(this, (VerifyCode.__proto__ || Object.getPrototypeOf(VerifyCode)).call(this, e));
                return t.state = {
                    vcodeRes: ""
                },
                t.handleImgCodeChange = t.handleImgCodeChange.bind(t),
                t.changeVerifyCode = t.changeVerifyCode.bind(t),
                t.onKeyDown = t.onKeyDown.bind(t),
                t
            }
            return _inherits(VerifyCode, e),
            r(VerifyCode, [{
                key: "onKeyDown",
                value: function(e) {
                    13 == e.keyCode && this.props.submitVcode()
                }
            },
            {
                key: "componentDidMount",
                value: function() {
                    this.changeVerifyCode()
                }
            },
            {
                key: "changeVerifyCode",
                value: function() {
                    var e = this,
                    t = function(t) {
                        if (0 == t.iRet && t.data) {
                            var n = t.data.url,
                            r = function(t) {
                                if (0 == t.r && t.tips) {
                                    var n = s.jHash.base64.decode(s.jHash.base64.decode(t.tips));
                                    e.refs.vcodeResElem.innerHTML = n
                                }
                            }; (0, i.getJSONP)(n, "successCb", r)
                        }
                    },
                    n = ["grab", "fcode", "deposit"],
                    r = (0, i.getParams)("type") || "grab";
                    if (r) {
                        var o = l.ONECLOUD_API_HOST + "/verify/get?order_type=" + n.indexOf(r); (0, i.postPromise)(o).done(t)
                    }
                }
            },
            {
                key: "handleImgCodeChange",
                value: function(e) {
                    var t = e.target.value;
                    this.props.onChange(t),
                    this.props.checkImgCode(t)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.onClose,
                    n = e.submitVcode,
                    r = (e.onChange, e.vcodeErro),
                    o = e.inputValue,
                    i = e.vcodeEmpty,
                    l = {
                        height: "auto",
                        marginBottom: "10px"
                    };
                    return a["default"].createElement("div", {
                        className: "oc-pop",
                        style: {
                            zIndex: 999,
                            position: "absolute"
                        }
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-wp"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-textbox oc-tb"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-text oc-tb-cell"
                    },
                    a["default"].createElement("h3", null, "请输入验证码"), a["default"].createElement("div", {
                        className: "oc-quesbox",
                        ref: "vcodeResElem",
                        style: l
                    }), a["default"].createElement("div", {
                        className: "oc-u-inpbox oc-ques-inp"
                    },
                    a["default"].createElement("input", {
                        onKeyDown: this.onKeyDown,
                        className: "oc-inptxt",
                        type: "text",
                        placeholder: "请输入答案",
                        value: o,
                        onChange: this.handleImgCodeChange
                    }), i ? a["default"].createElement("p", {
                        className: "oc-err"
                    },
                    "请输入答案") : r ? a["default"].createElement("p", {
                        className: "oc-err"
                    },
                    "请输入正确答案") : null))), a["default"].createElement("div", {
                        className: "oc-pop-btnbox"
                    },
                    a["default"].createElement("a", {
                        href: "javascript:;",
                        className: "btn-oc",
                        onClick: n
                    },
                    "确定")), a["default"].createElement("a", {
                        href: "javascript:;",
                        className: "oc-pop-close",
                        onClick: t
                    },
                    "关闭")))
                }
            }]),
            VerifyCode
        } (o.Component); (t.TipPop = function(e) {
            function TipPop(e) {
                return _classCallCheck(this, TipPop),
                _possibleConstructorReturn(this, (TipPop.__proto__ || Object.getPrototypeOf(TipPop)).call(this, e))
            }
            return _inherits(TipPop, e),
            r(TipPop, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.msg,
                    n = e.jump,
                    r = e.onClose,
                    o = e.btnTxt,
                    i = n ? a["default"].createElement("a", {
                        href: n,
                        className: "btn-oc"
                    },
                    o) : a["default"].createElement("a", {
                        href: "javascript:;",
                        className: "btn-oc",
                        onClick: r
                    },
                    o);
                    return a["default"].createElement("div", {
                        className: "oc-pop"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-wp"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-textbox oc-tb"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-text oc-tb-cell"
                    },
                    a["default"].createElement("h3", null, t))), a["default"].createElement("div", {
                        className: "oc-pop-btnbox"
                    },
                    i), a["default"].createElement("a", {
                        href: "javascript:;",
                        className: "oc-pop-close",
                        onClick: r
                    },
                    "关闭")))
                }
            }]),
            TipPop
        } (o.Component)).propTypes = {
            msg: o.PropTypes.string.isRequired,
            onClose: o.PropTypes.func.isRequired,
            jump: o.PropTypes.string,
            btnName: o.PropTypes.string
        },
        (t.Countdown = function(e) {
            function Countdown() {
                return _classCallCheck(this, Countdown),
                _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).apply(this, arguments))
            }
            return _inherits(Countdown, e),
            r(Countdown, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.currTime,
                    n = e.targetTime,
                    r = e.desc;
                    if (!t || !n) return null;
                    var o = (0, i.surplusTime)(t, n);
                    return a["default"].createElement("div", {
                        className: "oc-u-tit oc-u-tit-buytime"
                    },
                    a["default"].createElement("div", {
                        className: "oc-buytime"
                    },
                    a["default"].createElement("p", null, r), o.day > 0 ? a["default"].createElement("span", null, a["default"].createElement("em", null, o.day), "天") : null, a["default"].createElement("span", null, a["default"].createElement("em", null, o.hour), "时"), a["default"].createElement("span", null, a["default"].createElement("em", null, o.minute), "分"), a["default"].createElement("span", null, a["default"].createElement("em", null, o.second), "秒")))
                }
            }]),
            Countdown
        } (o.Component)).propTypes = {
            currTime: o.PropTypes.instanceOf(Date).isRequired,
            targetTime: o.PropTypes.instanceOf(Date),
            type: o.PropTypes.string
        },
        (t.ColorSelector = function(e) {
            function ColorSelector(e) {
                _classCallCheck(this, ColorSelector);
                var t = _possibleConstructorReturn(this, (ColorSelector.__proto__ || Object.getPrototypeOf(ColorSelector)).call(this, e));
                return t.switchColor = t.switchColor.bind(t),
                t
            }
            return _inherits(ColorSelector, e),
            r(ColorSelector, [{
                key: "switchColor",
                value: function(e) {
                    this.props.onChange($(e.currentTarget).data("color"))
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this,
                    t = this.props,
                    n = t.colorConfig,
                    r = t.currColor;
                    return a["default"].createElement("dl", {
                        className: "oc-buy-color"
                    },
                    a["default"].createElement("dt", null, "选择颜色"), n.map(function(t) {
                        return t.has ? a["default"].createElement("dd", {
                            className: r == t.color ? "oc-selected": "",
                            key: t.color,
                            onClick: e.switchColor,
                            "data-color": t.color
                        },
                        a["default"].createElement("i", {
                            className: "i-oc-col-" + t.color
                        }), t.text) : a["default"].createElement("dd", {
                            className: "oc-buy-soldout",
                            key: t.color,
                            "data-color": t.color
                        },
                        a["default"].createElement("i", {
                            className: "i-oc-col-" + t.color
                        }), t.text, "(售罄)")
                    }))
                }
            }]),
            ColorSelector
        } (o.Component)).propTypes = {
            colorConfig: o.PropTypes.array.isRequired,
            currColor: o.PropTypes.string.isRequired,
            onChange: o.PropTypes.func.isRequired
        },
        (t.DeliverDate = function(e) {
            function DeliverDate(e) {
                _classCallCheck(this, DeliverDate);
                var t = _possibleConstructorReturn(this, (DeliverDate.__proto__ || Object.getPrototypeOf(DeliverDate)).call(this, e));
                return t.changeDate = t.changeDate.bind(t),
                t
            }
            return _inherits(DeliverDate, e),
            r(DeliverDate, [{
                key: "changeDate",
                value: function(e) {
                    this.props.onChange($(e.target).data("date"))
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this,
                    t = this.props,
                    n = t.deliverDateConfig,
                    r = t.currDate;
                    return n && 0 != n.length ? a["default"].createElement("dl", {
                        className: "oc-buy-color"
                    },
                    a["default"].createElement("dt", null, "选择发货日期"), n.map(function(t) {
                        return t.has ? a["default"].createElement("dd", {
                            onClick: e.changeDate,
                            key: t.date,
                            "data-date": t.date,
                            className: t.date == r ? "oc-selected": ""
                        },
                        t.date) : a["default"].createElement("dd", {
                            key: t.date,
                            className: "oc-buy-soldout"
                        },
                        t.date)
                    })) : null
                }
            }]),
            DeliverDate
        } (o.Component)).propTypes = {
            deliverDateConfig: o.PropTypes.array.isRequired,
            currDate: o.PropTypes.string,
            onChange: o.PropTypes.func.isRequired
        },
        (t.ImageCode = function(e) {
            function ImageCode(e) {
                _classCallCheck(this, ImageCode);
                var t = _possibleConstructorReturn(this, (ImageCode.__proto__ || Object.getPrototypeOf(ImageCode)).call(this, e));
                return t.state = {
                    imgCode: null,
                    imgCodeUrl: "/images/purchase/loading.gif",
                    errMsg: null
                },
                t.changeImgCode = t.changeImgCode.bind(t),
                t.handleImgCodeChange = t.handleImgCodeChange.bind(t),
                t
            }
            return _inherits(ImageCode, e),
            r(ImageCode, [{
                key: "componentDidMount",
                value: function() {
                    this.changeImgCode()
                }
            },
            {
                key: "changeImgCode",
                value: function(e) {
                    var t = this,
                    n = "http://verify.red.xunlei.com/imgcode/refresh.php?type=0&_=" + (new Date).getTime(),
                    r = new Image;
                    r.src = n,
                    r.onload = function() {
                        t.setState({
                            imgCodeUrl: n
                        })
                    }
                }
            },
            {
                key: "handleImgCodeChange",
                value: function(e) {
                    var t = e.target.value;
                    this.setState({
                        imgCode: t
                    }),
                    this.props.onChange(t)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props;
                    e.colorConfig,
                    e.currColor;
                    return a["default"].createElement("div", {
                        className: "oc-buy-code"
                    },
                    a["default"].createElement("span", {
                        className: "oc-buy-code-name"
                    },
                    "验证码"), a["default"].createElement("div", {
                        className: "oc-buy-code-img"
                    },
                    a["default"].createElement("input", {
                        className: "oc-inptxt",
                        type: "text",
                        placeholder: "请输入图形验证码",
                        maxLength: "5",
                        value: this.state.imgCode,
                        onChange: this.handleImgCodeChange
                    }), a["default"].createElement("span", {
                        className: "oc-inp-codeimg"
                    },
                    a["default"].createElement("img", {
                        src: this.state.imgCodeUrl,
                        onClick: this.changeImgCode
                    }))), a["default"].createElement("p", {
                        className: "oc-err"
                    },
                    this.state.errMsg))
                }
            }]),
            ImageCode
        } (o.Component)).propTypes = {
            onChange: o.PropTypes.func.isRequired
        }
    },
    70 : function(e, t, n) {
        "use strict";
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t["default"] = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } (),
        o = n(0),
        a = function(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        } (o),
        i = n(5),
        l = n(69),
        s = n(2),
        u = function(e) {
            function FcodePurchase(e) {
                _classCallCheck(this, FcodePurchase);
                var t = _possibleConstructorReturn(this, (FcodePurchase.__proto__ || Object.getPrototypeOf(FcodePurchase)).call(this, e));
                return t.state = {
                    color: "black",
                    popShow: !1,
                    popMsg: "",
                    popJump: "",
                    popBtn: "确定",
                    imgCode: null,
                    vcodeShow: !1,
                    vcodeErro: !1,
                    vcodeEmpty: !1,
                    price: "399.00"
                },
                t.colorConfig = [{
                    color: "black",
                    text: "曜石黑",
                    has: 1
                },
                {
                    color: "blue",
                    text: "科技蓝",
                    has: 1
                },
                {
                    color: "orange",
                    text: "爱马仕橙",
                    has: 1
                }],
                t.onClose = function() {
                    t.setState({
                        popShow: !1
                    })
                },
                t.switchColor = function(e) {
                    t.setState({
                        color: e
                    })
                },
                t.handleImgCodeChange = function(e) {
                    t.setState({
                        imgCode: e
                    })
                },
                t.vcodeClose = function() {
                    t.setState({
                        vcodeShow: !1,
                        imgCode: null
                    }),
                    (0, i.removeClassFromHtmlElement)()
                },
                t.checkImgCode = function(e) {
                    t.setState({
                        vcodeErro: !1
                    })
                },
                t.submit = t.submit.bind(t),
                t
            }
            return _inherits(FcodePurchase, e),
            r(FcodePurchase, [{
                key: "showPopHandler",
                value: function(e, t, n) {
                    this.setState({
                        popShow: !0,
                        popMsg: e,
                        popJump: t || "",
                        popBtn: n || "确定"
                    })
                }
            },
            {
                key: "commonErrorHandler",
                value: function(e) {
                    var t = {
                        30004 : "当前时间不能抢购",
                        30006 : "状态异常",
                        30008 : "找不到订单记录",
                        30009 : "没有抢购到资格，无法支付",
                        40000 : "非活动时间",
                        30003 : "已经预定过了",
                        30106 : "宝码已经使用",
                        "-2": "系统繁忙，请稍后再试",
                        "-2004": "本期已经售罄",
                        "-2000": "抢购未开始",
                        "-1003": "宝码已被使用"
                    },
                    n = {
                        30005 : "已经售罄",
                        30016 : "黑色售罄",
                        30025 : "橙色售罄",
                        30026 : "蓝色售罄"
                    };
                    if (n.hasOwnProperty(e) && (this.showPopHandler(n[e]), this.getColorList()), t.hasOwnProperty(e) && this.showPopHandler(t[e]), -501 == e) {
                        var r = window.location.href;
                        location.href = "/html/login.html?jumpurl=" + encodeURIComponent(r)
                    }
                    30007 == e && this.showPopHandler("已经抢购成功", "/html/usercenter.html", "查看订单")
                }
            },
            {
                key: "responeHandler",
                value: function(e) {
                    var t = e.res,
                    n = e.success,
                    r = t.iRet;
                    this.commonErrorHandler(r),
                    0 == r && (t.data ? n(t.data) : n())
                }
            },
            {
                key: "gotoLoginPage",
                value: function() {
                    var e = window.location.href;
                    location.href = "/html/login.html?jumpurl=" + encodeURIComponent(e)
                }
            },
            {
                key: "submit",
                value: function(e) {
                    var t = this;
                    e.preventDefault();
                    var n = (0, i.getParams)("fcode") || "";
                    if (!n) return void this.showPopHandler("未检测到宝码，去使用宝码", "/html/usercenter.html"); (0, i.setCookie)("zqb_fcode", n, 30, "xunlei.com");
                    var r = {};
                    r[this.state.color + "_num"] = 1;
                    var o = function(e) {
                        var n = function(e) {
                            var t = "http://zqb.red.xunlei.com/html/order.html?type=fcode&orderid=" + e.order_id;
                            window.setTimeout(function() {
                                window.location.href = t
                            },
                            0)
                        };
                        t.responeHandler({
                            res: e,
                            success: n
                        })
                    }; (0, i.postPromise)(s.ONECLOUD_API_HOST + "/fcode/commit", r).done(o)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.state.color,
                    t = this.state.popShow ? a["default"].createElement(l.TipPop, {
                        msg: this.state.popMsg,
                        jump: this.state.popJump,
                        btnTxt: this.state.popBtn,
                        onClose: this.onClose
                    }) : null;
                    return a["default"].createElement("div", {
                        className: "oc-buy-box"
                    },
                    t, a["default"].createElement(l.PurchaseHeader, {
                        hideTxt: !0
                    }), a["default"].createElement("div", {
                        className: "oc-buy-main"
                    },
                    a["default"].createElement("div", {
                        className: "oc-u-tit"
                    },
                    a["default"].createElement("h2", null, "使用宝码购买")), a["default"].createElement("div", {
                        className: "oc-buy-price"
                    },
                    a["default"].createElement("span", {
                        className: "oc-buy-price-pay"
                    },
                    "官网价：", this.state.price, "元")), a["default"].createElement(l.ColorSelector, {
                        colorConfig: this.colorConfig,
                        currColor: e,
                        onChange: this.switchColor
                    }), a["default"].createElement("div", {
                        className: "oc-bot-sum"
                    },
                    a["default"].createElement("a", {
                        href: "#",
                        className: "btn-oc",
                        onClick: this.submit
                    },
                    "立即购买"), a["default"].createElement("h3", null, "合计：", a["default"].createElement("strong", null, this.state.price), "元"), a["default"].createElement("p", null, "支持：7天无理由退货，15天包换，1年保修"))))
                }
            }]),
            FcodePurchase
        } (o.Component);
        t["default"] = u
    }
},
[194]);
webpackJsonp([1], {
    194 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        var r = n(0),
        o = _interopRequireDefault(r),
        a = n(9),
        i = n(5),
        l = n(195),
        s = (_interopRequireDefault(l), n(70)),
        u = _interopRequireDefault(s),
        c = n(201),
        d = _interopRequireDefault(c),
        f = (0, i.getParams)("type"),
        p = null;
        switch (f) {
        case "fcode":
            p = o["default"].createElement(u["default"], null);
            break;
        case "grab":
            p = o["default"].createElement(d["default"], null);
            break;
        default:
            p = o["default"].createElement(d["default"], null)
        } (0, a.render)(p, document.getElementById("purchase"))
    },
    195 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t["default"] = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } (),
        o = n(0),
        a = _interopRequireDefault(o),
        i = n(69),
        l = n(5),
        s = n(2),
        u = n(70),
        c = _interopRequireDefault(u),
        d = function(e) {
            function DepositPurchase(e) {
                _classCallCheck(this, DepositPurchase);
                var t = _possibleConstructorReturn(this, (DepositPurchase.__proto__ || Object.getPrototypeOf(DepositPurchase)).call(this, e));
                return t.state = {
                    status: 1,
                    userTotal: 123287,
                    currTime: new Date,
                    startTime: new Date("2017 9 19 20:00:00"),
                    endTime: new Date("2017 10 10 21:00:00"),
                    color: "black",
                    deliverDate: null,
                    deliverDateConfig: []
                },
                t.deliverDateChange = t.deliverDateChange.bind(t),
                t.submitOrder = t.submitOrder.bind(t),
                t
            }
            return _inherits(DepositPurchase, e),
            r(DepositPurchase, [{
                key: "componentDidMount",
                value: function() {
                    this.getConfig(),
                    this.getDeliverDateConfig(),
                    this.initCurrTimer()
                }
            },
            {
                key: "getConfig",
                value: function() {
                    var e = this,
                    t = function(t) {
                        var n = function(t) {
                            var n = t.num,
                            r = t.status,
                            o = t.timestamp,
                            a = t.start_order_time,
                            i = t.end_order_time;
                            e.setState({
                                userTotal: n,
                                status: r,
                                currTime: new Date(1e3 * o),
                                startTime: new Date(a.replace(/-/g, "/")),
                                endTime: new Date(i.replace(/-/g, "/"))
                            })
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/prepay/getconfig").done(t)
                }
            },
            {
                key: "getDeliverDateConfig",
                value: function() {
                    var e = this,
                    t = function(t) {
                        var n = function(t) {
                            var n = t.deliver_list,
                            r = null;
                            n.forEach(function(e, t, n) {
                                e.date = e.deliver_time
                            }),
                            n.every(function(e) {
                                return ! e.has || (r = e.date, !1)
                            }),
                            e.setState({
                                deliverDateConfig: n,
                                deliverDate: r
                            })
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/prepay/deliverlist").done(t)
                }
            },
            {
                key: "initCurrTimer",
                value: function() {
                    var e = this;
                    window.setInterval(function() {
                        e.setState({
                            currTime: new Date(e.state.currTime.getTime() + 1e3)
                        })
                    },
                    1e3)
                }
            },
            {
                key: "deliverDateChange",
                value: function(e) {
                    this.setState({
                        deliverDate: e
                    })
                }
            },
            {
                key: "submitOrder",
                value: function() {
                    var e = this,
                    t = this.state,
                    n = t.imgCode,
                    r = t.color,
                    o = t.deliverDate;
                    if (!n) return this.state.vcodeShow && this.setState({
                        vcodeErro: !0
                    }),
                    void this.setState({
                        vcodeShow: !0
                    });
                    var a = {
                        black_num: 0,
                        blue_num: 0,
                        orange_num: 0,
                        deliver_time: o,
                        vcode: n
                    };
                    a[r + "_num"] = 1,
                    console.log(a);
                    var i = function(t) {
                        e.setState({
                            vcodeShow: !1
                        }),
                        e.setState({
                            imgCode: null
                        }),
                        e.setState({
                            vcodeError: !1
                        });
                        var n = function() {
                            e.showPopHandler("预定成功", "/html/prepay.html", "去支付"),
                            window.setTimeout(function() {
                                window.location.href = "http://zqb.red.xunlei.com/html/prepay.html"
                            },
                            3e3)
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/prepay/submit", a).done(i)
                }
            },
            {
                key: "submit",
                value: function(e) {
                    var t = this;
                    e.preventDefault();
                    var n = function(e) {
                        console.log(e);
                        var n = e.iRet;
                        if (t.commonErrorHandler(n), !t.inProcess()) return void t.showPopHandler("预定时间结束");
                        if (0 == n && e.data) {
                            var r = e.data.status,
                            o = ["待支付定金", "已支付定金", "支付定金超时", "待支付尾款", "已支付尾款", "支付尾款超时"];
                            0 == r ? t.showPopHandler(o[r], "/html/prepay.html") : 3 == r ? t.showPopHandler(o[r], "/html/pay.html?type=payend") : t.showPopHandler(o[r], "/html/usercenter.html")
                        }
                        30013 == n && t.submitOrder()
                    };
                    this.getLoginInfo("/prepay/info").done(n)
                }
            },
            {
                key: "inProcess",
                value: function() {
                    var e = this.state,
                    t = e.currTime,
                    n = e.startTime,
                    r = e.endTime;
                    return t >= n && t < r
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.state,
                    t = e.color,
                    n = e.deliverDate,
                    r = e.deliverDateConfig,
                    o = e.status,
                    l = e.currTime,
                    s = e.startTime,
                    u = e.endTime,
                    c = e.userTotal,
                    d = (e.colorConfig, this.state.popShow ? a["default"].createElement(i.TipPop, {
                        btnTxt: this.state.popBtn,
                        msg: this.state.popMsg,
                        jump: this.state.popJump,
                        onClose: this.onClose
                    }) : null),
                    f = null,
                    p = a["default"].createElement("a", {
                        href: "#",
                        className: "btn-oc btn-oc-disable"
                    },
                    "立即购买");
                    switch (o) {
                    case 0:
                        f = a["default"].createElement(i.Countdown, {
                            currTime: l,
                            targetTime: s,
                            desc: "预定开启倒计时"
                        });
                        break;
                    case 1:
                        f = a["default"].createElement(i.Countdown, {
                            currTime: l,
                            targetTime: u,
                            desc: "预定结束倒计时"
                        }),
                        p = a["default"].createElement("a", {
                            href: "#",
                            className: "btn-oc",
                            onClick: this.submit
                        },
                        "立即购买");
                        break;
                    default:
                        f = null
                    }
                    return a["default"].createElement("div", {
                        className: "oc-buy-box"
                    },
                    d, this.state.vcodeShow ? a["default"].createElement(i.VerifyCode, {
                        checkImgCode: this.checkImgCode,
                        vcodeErro: this.state.vcodeErro,
                        onClose: this.vcodeClose,
                        onChange: this.handleImgCodeChange,
                        submitVcode: this.submitOrder
                    }) : null, a["default"].createElement(i.PurchaseHeader, {
                        userTotal: c
                    }), a["default"].createElement("div", {
                        className: "oc-buy-main"
                    },
                    f, a["default"].createElement(i.ColorSelector, {
                        colorConfig: this.colorConfig,
                        currColor: t,
                        onChange: this.switchColor
                    }), a["default"].createElement(i.DeliverDate, {
                        deliverDateConfig: r,
                        currDate: n,
                        onChange: this.deliverDateChange
                    }), a["default"].createElement("div", {
                        className: "oc-buy-free"
                    },
                    a["default"].createElement("span", {
                        className: "oc-lbl"
                    },
                    "赠品"), "购买即送玩客币1枚，", a["default"].createElement("a", {
                        href: "http://red.xunlei.com/index.php?r=site/coin"
                    },
                    "了解玩客币>")), a["default"].createElement("div", {
                        className: "oc-bot-sum"
                    },
                    p, a["default"].createElement("h3", null, a["default"].createElement("span", {
                        className: "oc-buy-price-pay"
                    },
                    "预售价：328元"), "定金：", a["default"].createElement("strong", null, "32.8"), "元"), a["default"].createElement("p", null, a["default"].createElement("span", {
                        className: "oc-col-red"
                    },
                    "*定金不可退"), "，定金可直接抵扣商品总价")), a["default"].createElement("div", {
                        className: "oc-buy-aside"
                    },
                    a["default"].createElement(i.PurchaseFlow, null), a["default"].createElement(i.PurchaseRule, null))))
                }
            }]),
            DepositPurchase
        } (c["default"]);
        t["default"] = d
    },
    196 : function(e, t, n) {
        "use strict"; (function(e, r) {
            var o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
            function(e) {
                return typeof e
            }: function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
            }; !
            function(e) {
                function classExtends(e, t) {
                    function ctor() {
                        this.constructor = e
                    }
                    var n;
                    for (n in t) u.call(t, n) && (e[n] = t[n]);
                    ctor.prototype = t.prototype,
                    e.prototype = new ctor,
                    e.SUPER = t.prototype
                }
                var i = {},
                l = function(e) {
                    var t, n = "0123456789abcdef",
                    r = "";
                    for (t = 0; t < e.length; t++) r += n.charAt(e.charCodeAt(t) >> 4 & 15),
                    r += n.charAt(15 & e.charCodeAt(t));
                    return r
                },
                s = function() {
                    function init() {
                        throw "InnerHash.init should be overriden"
                    }
                    function addPart() {
                        throw "InnerHash.addPart should be  verriden"
                    }
                    function transform() {
                        throw "InnerHash.transform should be overriden"
                    }
                    function getDigest() {
                        throw "InnerHash.getDigest should be overriden"
                    }
                    function getHexDigest() {
                        return l(this.getDigest())
                    }
                    function InnerHash() {}
                    return InnerHash.prototype.reInit = init,
                    InnerHash.prototype.addPart = addPart,
                    InnerHash.prototype.transform = transform,
                    InnerHash.prototype.getDigest = getDigest,
                    InnerHash.prototype.getHexDigest = getHexDigest,
                    InnerHash
                } (),
                u = {}.hasOwnProperty,
                c = function(e) {
                    return e >>> 0
                },
                d = function(e, t) {
                    return c(e << t | e >>> 32 - t)
                },
                f = "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0",
                p = function(e, t) {
                    for (var n = 0,
                    r = e.length,
                    o = "",
                    a = ""; n < r;) a = "",
                    a += String.fromCharCode(255 & e[n]),
                    a += String.fromCharCode(e[n] >> 8 & 255),
                    a += String.fromCharCode(e[n] >> 16 & 255),
                    a += String.fromCharCode(e[n] >> 24 & 255),
                    t && (a = a.split("").reverse().join("")),
                    o += a,
                    n++;
                    return o
                },
                m = function() {
                    function innerUint(e) {
                        var t, n = e.length;
                        for (t = 0; t < n; t++) this[t] = c(e[t]) || 0;
                        this.length = n
                    }
                    function add(e) {
                        if (! (e instanceof Array)) return this.add([e]);
                        var t, n = Math.min(e.length, this.length);
                        for (t = 0; t < n; t++) this[t] += e[t];
                        for (n = this.length, t = 0; t < n; t++) this[t] > 4294967295 && (this[t] -= 4294967296, t + 1 < n && this[t + 1]++)
                    }
                    function Uint(e) {
                        var t;
                        if (e instanceof Array) t = e;
                        else {
                            var n = e || 64;
                            t = new Array(Math.ceil(n / 32))
                        }
                        return new innerUint(t)
                    }
                    return classExtends(innerUint, Array),
                    innerUint.prototype.add = add,
                    Uint
                } (),
                h = function() {
                    function addPart(e) {
                        if (this.isEnd) return null;
                        var t = 8 * e.length;
                        t < 4294967296 ? this.count.add(t) : this.count.add([c(t), Math.floor(t / 4294967296)]);
                        var n = this.buffer.concat(e),
                        r = 0,
                        o = n.length;
                        for (r = 0; r + this.block_size <= o; r += this.block_size) this.state = this.transform(this.state, n.substr(r, 64));
                        return this.buffer = n.substring(r),
                        this
                    }
                    function getDigest() {
                        var e = "" + f;
                        if (this.isEnd) return p(this.state, this.isBigEndian);
                        var t, n = this.count[0] >> 3 & 63,
                        r = n < 56 ? 56 - n: 120 - n,
                        o = e.substr(0, r);
                        return t = this.isBigEndian ? p(this.count.reverse(), !0) : p(this.count),
                        this.addPart(o),
                        this.addPart(t),
                        this.isEnd = !0,
                        p(this.state, this.isBigEndian)
                    }
                    function MD5Family() {
                        MD5Family.SUPER.constructor.apply(this, arguments),
                        this.count = new m(64),
                        this.buffer = "",
                        this.isEnd = !1
                    }
                    return classExtends(MD5Family, s),
                    MD5Family.prototype.block_size = 64,
                    MD5Family.prototype.isBigEndian = !1,
                    MD5Family.prototype.reInit = function() {
                        return this.constructor.call(this)
                    },
                    MD5Family.prototype.addPart = addPart,
                    MD5Family.prototype.getDigest = getDigest,
                    MD5Family
                } (),
                g = function(e, t) {
                    for (var n = 0,
                    r = e.length,
                    o = []; n + 3 < r;) {
                        var a = e.substr(n, 4);
                        t && (a = a.split("").reverse().join(""));
                        var i = 255 & a.charCodeAt(0) | (255 & a.charCodeAt(1)) << 8 | (255 & a.charCodeAt(2)) << 16 | (255 & a.charCodeAt(3)) << 24;
                        o.push(c(i)),
                        n += 4
                    }
                    return o
                },
                C = function() {
                    function MD5_F(e, t, n) {
                        return c(e & t | ~e & n)
                    }
                    function MD5_G(e, t, n) {
                        return c(e & n | t & ~n)
                    }
                    function MD5_H(e, t, n) {
                        return c(e ^ t ^ n)
                    }
                    function MD5_I(e, t, n) {
                        return c(t ^ (e | ~n))
                    }
                    function MD5Transform(n, r) {
                        var o = n[0],
                        a = n[1],
                        i = n[2],
                        l = n[3],
                        s = [];
                        s = g(r);
                        var u, f, p, m;
                        for (m = 0; m < 64; m++) m < 16 ? (f = m, p = MD5_F(a, i, l)) : m < 32 ? (f = 5 * m + 1 & 15, p = MD5_G(a, i, l)) : m < 48 ? (f = 3 * m + 5 & 15, p = MD5_H(a, i, l)) : (f = 7 * m & 15, p = MD5_I(a, i, l)),
                        u = l,
                        l = i,
                        i = a,
                        a += d(o + p + e[m] + s[f], t[m]),
                        a = c(a),
                        o = u;
                        return [c(n[0] + o), c(n[1] + a), c(n[2] + i), c(n[3] + l)]
                    }
                    function InnerMD5() {
                        InnerMD5.SUPER.constructor.apply(this, arguments),
                        this.state = [1732584193, 4023233417, 2562383102, 271733878]
                    }
                    function MD5(e) {
                        if (! (this instanceof MD5)) {
                            var t = new MD5;
                            return t.addPart(e),
                            t.getHexDigest()
                        }
                        return new InnerMD5
                    }
                    var e = [3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426, 2821735955, 4249261313, 1770035416, 2336552879, 4294925233, 2304563134, 1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664, 643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448, 568446438, 3275163606, 4107603335, 1163531501, 2850285829, 4243563512, 1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740, 2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074, 3572445317, 76029189, 3654602809, 3873151461, 530742520, 3299628645, 4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690, 4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649, 4149444226, 3174756917, 718787259, 3951481745],
                    t = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
                    return classExtends(InnerMD5, h),
                    InnerMD5.prototype.transform = MD5Transform,
                    MD5
                } ();
                i.md5 = C;
                var v = function() {
                    function encode(t) {
                        var n, r, o, a, i, l, s, u = "",
                        c = 0;
                        for (t = y.UCS2toUTF8(t); c < t.length;) n = t.charCodeAt(c++),
                        r = t.charCodeAt(c++),
                        o = t.charCodeAt(c++),
                        a = n >> 2,
                        i = (3 & n) << 4 | r >> 4,
                        l = (15 & r) << 2 | o >> 6,
                        s = 63 & o,
                        isNaN(r) ? l = s = 64 : isNaN(o) && (s = 64),
                        u = u + e.charAt(a) + e.charAt(i) + e.charAt(l) + e.charAt(s);
                        return u
                    }
                    function decode(t) {
                        var n, r, o, a, i, l, s, u = "",
                        c = 0;
                        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < t.length;) a = e.indexOf(t.charAt(c++)),
                        i = e.indexOf(t.charAt(c++)),
                        l = e.indexOf(t.charAt(c++)),
                        s = e.indexOf(t.charAt(c++)),
                        n = a << 2 | i >> 4,
                        r = (15 & i) << 4 | l >> 2,
                        o = (3 & l) << 6 | s,
                        u += String.fromCharCode(n),
                        64 != l && (u += String.fromCharCode(r)),
                        64 != s && (u += String.fromCharCode(o));
                        return u = y.UTF8toUCS2(u)
                    }
                    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    return {
                        encode: encode,
                        decode: decode
                    }
                } ();
                i.base64 = v;
                var y = function() {
                    function UCS2toUTF8(n) {
                        return t(e.encodeURIComponent(n))
                    }
                    function UTF8toUCS2(t) {
                        return e.decodeURIComponent(n(t))
                    }
                    function UCS2toBigEndian(e) {
                        var t, n, r = "";
                        for (n = e.length, t = 0; t < n; t++) {
                            var o = e.charCodeAt(t);
                            r += String.fromCharCode(o >> 8),
                            r += String.fromCharCode(255 & o)
                        }
                        return r
                    }
                    function UCS2toLittleEndian(e) {
                        var t, n, r = "";
                        for (n = e.length, t = 0; t < n; t++) {
                            var o = e.charCodeAt(t);
                            r += String.fromCharCode(255 & o),
                            r += String.fromCharCode(o >> 8)
                        }
                        return r
                    }
                    var t = e.unescape ||
                    function(e) {
                        for (var t = e.toString(), n = t.length, r = "", o = 0;;) {
                            if (o >= n) return r;
                            var a = t.charAt(o);
                            if ("%" === a) {
                                var i = t.substr(o + 2, 4),
                                l = t.substr(o + 1, 2);
                                o + 6 <= n && "u" === t.charAt(o + 1) && /^[0-9a-fA-F]{4}$/.test(i) ? (a = String.fromCharCode(parseInt(i, 16)), o += 5) : o + 3 <= n && /^[0-9a-fA-F]{2}$/.test(l) && (a = String.fromCharCode(parseInt(l, 16)), o += 2)
                            }
                            r += a,
                            o++
                        }
                        return r
                    },
                    n = e.escape ||
                    function(e) {
                        for (var t, n = e.toString(), r = n.length, o = "", a = 0, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./", l = "0123456789ABCDEF";;) {
                            if (a >= r) return o;
                            var s = n.charAt(a); - 1 != i.indexOf(s) ? t = s: n.charCodeAt(a) < 256 ? (t = "%u", t += l[s >> 12 & 15], t += l[s >> 8 & 15], t += l[s >> 4 & 15], t += l[s >> 0 & 15]) : (t = "%", t += l[s >> 4 & 15], t += l[s >> 0 & 15]),
                            o += t,
                            a++
                        }
                        return o
                    };
                    return {
                        UCS2toUTF8: UCS2toUTF8,
                        UTF8toUCS2: UTF8toUCS2,
                        UCS2toBigEndian: UCS2toBigEndian,
                        UCS2toLittleEndian: UCS2toLittleEndian
                    }
                } ();
                if (i.toolkits = y, "object" === a(r) && "object" === a(r.exports)) r.exports.jHash = i;
                else { (o = function() {
                        return i
                    }.call(t, n, t, r)) !== undefined && (r.exports = o)
                }
            } ("undefined" != typeof window ? window: e)
        }).call(t, n(197), n(198)(e))
    },
    197 : function(e, t) {
        var n;
        n = function() {
            return this
        } ();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch(r) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    },
    198 : function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {},
            e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
                enumerable: !0,
                get: function() {
                    return e.l
                }
            }), Object.defineProperty(e, "id", {
                enumerable: !0,
                get: function() {
                    return e.i
                }
            }), e.webpackPolyfill = 1),
            e
        }
    },
    199 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.startAnimation = t.formatNumber = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } (),
        o = n(0),
        a = _interopRequireDefault(o),
        i = n(200),
        l = _interopRequireDefault(i),
        s = t.formatNumber = function(e, t) {
            var n = "" + e.toFixed(t.decimals),
            r = n.split("."),
            o = r[0],
            a = r.length > 1 ? "" + t.decimal + r[1] : "",
            i = /(\d+)(\d{3})/;
            if (t.useGrouping && t.separator) for (; i.test(o);) o = o.replace(i, "$1" + t.separator + "$2");
            return "" + t.prefix + o + a + t.suffix
        },
        u = t.startAnimation = function(e) {
            if (!e || !e.spanElement) throw new Error("You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);");
            var t = e.props,
            n = t.decimal,
            r = t.decimals,
            o = t.duration,
            a = t.easingFn,
            i = t.end,
            s = t.formattingFn,
            u = t.onComplete,
            c = t.onStart,
            d = t.prefix,
            f = t.separator,
            p = t.start,
            m = t.suffix,
            h = t.useEasing,
            g = t.useGrouping,
            C = new l["default"](e.spanElement, p, i, r, o, {
                decimal: n,
                easingFn: a,
                formattingFn: s,
                separator: f,
                prefix: d,
                suffix: m,
                useEasing: h,
                useGrouping: g
            });
            "function" == typeof c && c(),
            C.start(u)
        },
        c = function(e) {
            function CountUp() {
                var e, t, n, r;
                _classCallCheck(this, CountUp);
                for (var o = arguments.length,
                a = Array(o), i = 0; i < o; i++) a[i] = arguments[i];
                return t = n = _possibleConstructorReturn(this, (e = CountUp.__proto__ || Object.getPrototypeOf(CountUp)).call.apply(e, [this].concat(a))),
                n.spanElement = null,
                n.refSpan = function(e) {
                    n.spanElement = e
                },
                r = t,
                _possibleConstructorReturn(n, r)
            }
            return _inherits(CountUp, e),
            r(CountUp, [{
                key: "componentDidMount",
                value: function() {
                    u(this)
                }
            },
            {
                key: "shouldComponentUpdate",
                value: function(e) {
                    var t = this.props.duration !== e.duration || this.props.end !== e.end || this.props.start !== e.start;
                    return e.redraw || t
                }
            },
            {
                key: "componentDidUpdate",
                value: function() {
                    u(this)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.className,
                    n = e.start,
                    r = e.decimal,
                    o = e.decimals,
                    i = e.useGrouping,
                    l = e.separator,
                    u = e.prefix,
                    c = e.suffix,
                    d = e.style;
                    return a["default"].createElement("span", {
                        className: t,
                        ref: this.refSpan,
                        style: d
                    },
                    s(n, {
                        decimal: r,
                        decimals: o,
                        useGrouping: i,
                        separator: l,
                        prefix: u,
                        suffix: c
                    }))
                }
            }]),
            CountUp
        } (a["default"].Component);
        c.defaultProps = {
            className: undefined,
            decimal: ".",
            decimals: 0,
            duration: 3,
            easingFn: null,
            end: 100,
            formattingFn: null,
            onComplete: undefined,
            onStart: undefined,
            prefix: "",
            separator: ",",
            start: 0,
            suffix: "",
            redraw: !1,
            style: undefined,
            useEasing: !0,
            useGrouping: !1
        },
        t["default"] = c
    },
    2 : function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = t.API_HOST = "http://wk-cgi.content.xunlei.com";
        t.GRAB_URL = r + "/wanke/?m=vceu0c9",
        t.ZQB_HOST = "http://zqb.red.xunlei.com",
        t.ONECLOUD_API_HOST = "http://api-onecloud.content.xunlei.com"
    },
    200 : function(e, t, n) {
        var r, o; !
        function(a, i) {
            r = i,
            (o = "function" == typeof r ? r.call(t, n, t, e) : r) !== undefined && (e.exports = o)
        } (0,
        function(e, t, n) {
            return function(e, t, n, r, a, i) {
                function o(e) {
                    e = e.toFixed(l.decimals),
                    e += "";
                    var t, n, r, o, a, i;
                    if (t = e.split("."), n = t[0], r = t.length > 1 ? l.options.decimal + t[1] : "", l.options.useGrouping) {
                        for (o = "", a = 0, i = n.length; a < i; ++a) 0 !== a && a % 3 == 0 && (o = l.options.separator + o),
                        o = n[i - a - 1] + o;
                        n = o
                    }
                    return l.options.numerals.length && (n = n.replace(/[0-9]/g,
                    function(e) {
                        return l.options.numerals[ + e]
                    }), r = r.replace(/[0-9]/g,
                    function(e) {
                        return l.options.numerals[ + e]
                    })),
                    l.options.prefix + n + r + l.options.suffix
                }
                function u(e, t, n, r) {
                    return n * (1 - Math.pow(2, -10 * e / r)) * 1024 / 1023 + t
                }
                function s(e) {
                    return "number" == typeof e && !isNaN(e)
                }
                var l = this;
                if (l.version = function() {
                    return "1.9.2"
                },
                l.options = {
                    useEasing: !0,
                    useGrouping: !0,
                    separator: ",",
                    decimal: ".",
                    easingFn: u,
                    formattingFn: o,
                    prefix: "",
                    suffix: "",
                    numerals: []
                },
                i && "object" == typeof i) for (var c in l.options) i.hasOwnProperty(c) && null !== i[c] && (l.options[c] = i[c]);
                "" === l.options.separator ? l.options.useGrouping = !1 : l.options.separator = "" + l.options.separator;
                for (var d = 0,
                f = ["webkit", "moz", "ms", "o"], p = 0; p < f.length && !window.requestAnimationFrame; ++p) window.requestAnimationFrame = window[f[p] + "RequestAnimationFrame"],
                window.cancelAnimationFrame = window[f[p] + "CancelAnimationFrame"] || window[f[p] + "CancelRequestAnimationFrame"];
                window.requestAnimationFrame || (window.requestAnimationFrame = function(e, t) {
                    var n = (new Date).getTime(),
                    r = Math.max(0, 16 - (n - d)),
                    o = window.setTimeout(function() {
                        e(n + r)
                    },
                    r);
                    return d = n + r,
                    o
                }),
                window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
                    clearTimeout(e)
                }),
                l.initialize = function() {
                    return ! (!l.initialized && (l.error = "", l.d = "string" == typeof e ? document.getElementById(e) : e, l.d ? (l.startVal = Number(t), l.endVal = Number(n), s(l.startVal) && s(l.endVal) ? (l.decimals = Math.max(0, r || 0), l.dec = Math.pow(10, l.decimals), l.duration = 1e3 * Number(a) || 2e3, l.countDown = l.startVal > l.endVal, l.frameVal = l.startVal, l.initialized = !0, 0) : (l.error = "[CountUp] startVal (" + t + ") or endVal (" + n + ") is not a number", 1)) : (l.error = "[CountUp] target is null or undefined", 1)))
                },
                l.printValue = function(e) {
                    var t = l.options.formattingFn(e);
                    "INPUT" === l.d.tagName ? this.d.value = t: "text" === l.d.tagName || "tspan" === l.d.tagName ? this.d.textContent = t: this.d.innerHTML = t
                },
                l.count = function(e) {
                    l.startTime || (l.startTime = e),
                    l.timestamp = e;
                    var t = e - l.startTime;
                    l.remaining = l.duration - t,
                    l.options.useEasing ? l.countDown ? l.frameVal = l.startVal - l.options.easingFn(t, 0, l.startVal - l.endVal, l.duration) : l.frameVal = l.options.easingFn(t, l.startVal, l.endVal - l.startVal, l.duration) : l.countDown ? l.frameVal = l.startVal - (l.startVal - l.endVal) * (t / l.duration) : l.frameVal = l.startVal + (l.endVal - l.startVal) * (t / l.duration),
                    l.countDown ? l.frameVal = l.frameVal < l.endVal ? l.endVal: l.frameVal: l.frameVal = l.frameVal > l.endVal ? l.endVal: l.frameVal,
                    l.frameVal = Math.round(l.frameVal * l.dec) / l.dec,
                    l.printValue(l.frameVal),
                    t < l.duration ? l.rAF = requestAnimationFrame(l.count) : l.callback && l.callback()
                },
                l.start = function(e) {
                    l.initialize() && (l.callback = e, l.rAF = requestAnimationFrame(l.count))
                },
                l.pauseResume = function() {
                    l.paused ? (l.paused = !1, delete l.startTime, l.duration = l.remaining, l.startVal = l.frameVal, requestAnimationFrame(l.count)) : (l.paused = !0, cancelAnimationFrame(l.rAF))
                },
                l.reset = function() {
                    l.paused = !1,
                    delete l.startTime,
                    l.initialized = !1,
                    l.initialize() && (cancelAnimationFrame(l.rAF), l.printValue(l.startVal))
                },
                l.update = function(e) {
                    if (l.initialize()) {
                        if (e = Number(e), !s(e)) return void(l.error = "[CountUp] update() - new endVal is not a number: " + e);
                        l.error = "",
                        e !== l.frameVal && (cancelAnimationFrame(l.rAF), l.paused = !1, delete l.startTime, l.startVal = l.frameVal, l.endVal = e, l.countDown = l.startVal > l.endVal, l.rAF = requestAnimationFrame(l.count))
                    }
                },
                l.initialize() && l.printValue(l.startVal)
            }
        })
    },
    201 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t["default"] = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } (),
        o = n(0),
        a = _interopRequireDefault(o),
        i = n(69),
        l = n(5),
        s = n(2),
        u = n(70),
        c = _interopRequireDefault(u),
        d = 2,
        f = !0,
        p = function(e) {
            function GrabPurchase(e) {
                _classCallCheck(this, GrabPurchase);
                var t = _possibleConstructorReturn(this, (GrabPurchase.__proto__ || Object.getPrototypeOf(GrabPurchase)).call(this, e));
                return t.state = {
                    price: "399.00",
                    currTime: new Date,
                    buyTime: null,
                    status: d,
                    color: "orange",
                    colorConfig: [{
                        color: "black",
                        text: "曜石黑",
                        has: 1
                    },
                    {
                        color: "blue",
                        text: "科技蓝",
                        has: 1
                    },
                    {
                        color: "orange",
                        text: "爱马仕橙",
                        has: 1
                    }],
                    bookedNum: 0,
                    popShow: !1,
                    popMsg: "",
                    popJump: "",
                    popBtn: "确定",
                    imgCode: null,
                    vcodeShow: !1,
                    vcodeErro: !1,
                    vcodeEmpty: !1,
                    lock: !1
                },
                t.getColorList = t.getColorList.bind(t),
                t.getBookedNumber = t.getBookedNumber.bind(t),
                t.submitBuy = t.submitBuy.bind(t),
                t.timeId = 1,
                (0, l.selfReport)("purchase"),
                t
            }
            return _inherits(GrabPurchase, e),
            r(GrabPurchase, [{
                key: "componentDidMount",
                value: function() {
                    this.getConfig(),
                    this.initCurrTimer(),
                    this.getColorList()
                }
            },
            {
                key: "getColorList",
                value: function() {
                    var e = this,
                    t = function() {
                        window.clearTimeout(e.timeId),
                        e.timeId = window.setTimeout(e.getColorList, 3e3)
                    },
                    n = function(n) {
                        var r = function(n) {
                            var r = {
                                has_black: n.has_black,
                                has_blue: n.has_blue,
                                has_orange: n.has_orange
                            },
                            o = [],
                            a = [];
                            for (var i in r) {
                                var l = r[i];
                                switch (l && a.push(i.slice(4)), i.slice(4)) {
                                case "black":
                                    o.push({
                                        color:
                                        "black",
                                        text: "曜石黑",
                                        has: l
                                    });
                                    break;
                                case "blue":
                                    o.push({
                                        color:
                                        "blue",
                                        text: "科技蓝",
                                        has: l
                                    });
                                    break;
                                case "orange":
                                    o.push({
                                        color:
                                        "orange",
                                        text: "爱马仕橙",
                                        has: l
                                    })
                                }
                            }
                            e.setState({
                                colorConfig: o,
                                currTime: new Date(1e3 * n.timestamp)
                            }),
                            f && (e.setState({
                                color: a[0] || ""
                            }), f = !1),
                            t()
                        };
                        e.responeHandler({
                            res: n,
                            success: r
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/colorlist").done(n).fail(t)
                }
            },
            {
                key: "getCurrColorConfig",
                value: function() {
                    var e = this.state,
                    t = e.color,
                    n = e.colorConfig,
                    r = n.filter(function(e) {
                        return e.color == t
                    });
                    return console.log("currentColorConfig:", r),
                    r[0] || {}
                }
            },
            {
                key: "hasSoldout",
                value: function() {
                    return 0 == this.state.colorConfig.filter(function(e) {
                        return e.has
                    }).length
                }
            },
            {
                key: "getConfig",
                value: function() {
                    var e = this,
                    t = function(t) {
                        var n = function(t) {
                            var n = t.start_buy_time,
                            r = (t.start_order_time, t.next_order_time, t.status),
                            o = t.num;
                            e.setState({
                                buyTime: new Date(n.replace(/-/g, "/")),
                                status: r,
                                bookedNum: o
                            })
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/getconfig").done(t)
                }
            },
            {
                key: "initCurrTimer",
                value: function() {
                    var e = this;
                    window.setInterval(function() {
                        var t = new Date(e.state.currTime.getTime() + 1e3),
                        n = {
                            currTime: t
                        };
                        e.state.status < 3 && t >= e.state.buyTime && (n.status = 3),
                        e.setState(n)
                    },
                    1e3)
                }
            },
            {
                key: "getBookedNumber",
                value: function() {
                    var e = this,
                    t = function(t) {
                        var n = function(t) {
                            e.setState({
                                currTime: new Date(1e3 * t.timestamp),
                                userTotal: parseInt(t.num)
                            }),
                            window.setTimeout(e.getBookedNumber, 3e4)
                        };
                        e.responeHandler({
                            res: t,
                            success: n
                        })
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/getnumber").done(t)
                }
            },
            {
                key: "submitBuy",
                value: function() {
                    var e = this,
                    t = this.state,
                    n = t.imgCode,
                    r = t.color;
                    if (!t.lock) {
                        if (!n) return this.state.vcodeShow && this.setState({
                            vcodeEmpty: !0,
                            vcodeErro: !1
                        }),
                        this.setState({
                            vcodeShow: !0
                        }),
                        void(0, l.addClassToHtmlElement)();
                        this.setState({
                            lock: !0
                        });
                        var o = {
                            vcode: n,
                            black_num: 0,
                            blue_num: 0,
                            orange_num: 0
                        };
                        o[r + "_num"] = 1;
                        var a = function(t) {
                            e.setState({
                                lock: !1
                            });
                            var n = t.iRet;
                            e.commonErrorHandler(n),
                            -2003 == n ? (e.setState({
                                vcodeErro: !0,
                                vcodeEmpty: !1
                            }), e.refs.grabVerify.changeVerifyCode()) : (e.setState({
                                imgCode: null,
                                vcodeShow: !1,
                                vcodeErro: !1,
                                vcodeEmpty: !1
                            }), (0, l.removeClassFromHtmlElement)()),
                            0 == n &&
                            function(e) {
                                window.setTimeout(function() {
                                    window.location.href = "http://zqb.red.xunlei.com/html/order.html?type=grab"
                                },
                                0)
                            } ()
                        },
                        i = function(t, n, r) {
                            e.showPopHandler("网络繁忙，请稍候重试"),
                            e.setState({
                                imgCode: null,
                                vcodeShow: !1,
                                vcodeErro: !1,
                                vcodeEmpty: !1,
                                lock: !1
                            }),
                            (0, l.removeClassFromHtmlElement)()
                        }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/buyclick", o, 3e3).done(a).fail(i)
                    }
                }
            },
            {
                key: "submit",
                value: function(e) {
                    var t = this;
                    e.preventDefault();
                    var n = function(e) {
                        console.log(e);
                        var n = e.iRet;
                        0 == n ? t.submitBuy() : (t.commonErrorHandler(n), 30013 == n && t.showPopHandler("只有预约的用户才有抢购资格", "/html/book.html"))
                    }; (0, l.postPromise)(s.ONECLOUD_API_HOST + "/order/info").done(n)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.state,
                    t = e.color,
                    n = e.status,
                    r = this.state.popShow ? a["default"].createElement(i.TipPop, {
                        btnTxt: this.state.popBtn,
                        msg: this.state.popMsg,
                        jump: this.state.popJump,
                        onClose: this.onClose
                    }) : null,
                    o = n < 4 ? a["default"].createElement(i.Countdown, {
                        currTime: this.state.currTime,
                        targetTime: this.state.buyTime,
                        desc: "离抢购开始还有"
                    }) : null;
                    3 == n && (o = a["default"].createElement("div", {
                        className: "oc-u-tit oc-u-tit-buytime"
                    },
                    a["default"].createElement("div", {
                        className: "oc-buytime"
                    },
                    a["default"].createElement("h1", null, "正在抢购中..."))));
                    var l = 3 == n && t && !this.hasSoldout() ? a["default"].createElement("a", {
                        href: "#",
                        className: "btn-oc",
                        onClick: this.submit
                    },
                    "立即购买") : a["default"].createElement("a", {
                        className: "btn-oc btn-oc-disable"
                    },
                    "立即购买");
                    return a["default"].createElement("div", {
                        className: "oc-buy-box"
                    },
                    r, this.state.vcodeShow ? a["default"].createElement(i.VerifyCode, {
                        ref: "grabVerify",
                        changeVerifyCode: this.changeVerifyCode,
                        vcodeEmpty: this.state.vcodeEmpty,
                        inputValue: this.state.imgCode,
                        checkImgCode: this.checkImgCode,
                        vcodeErro: this.state.vcodeErro,
                        onClose: this.vcodeClose,
                        onChange: this.handleImgCodeChange,
                        submitVcode: this.submitBuy
                    }) : null, a["default"].createElement(i.PurchaseHeader, {
                        userTotal: this.state.bookedNum,
                        hideTxt: !0
                    }), a["default"].createElement("div", {
                        className: "oc-buy-main"
                    },
                    o, a["default"].createElement("div", {
                        className: "oc-buy-price"
                    },
                    a["default"].createElement("span", {
                        className: "oc-buy-price-pay"
                    },
                    "官网价：", this.state.price, "元")), a["default"].createElement(i.ColorSelector, {
                        colorConfig: this.state.colorConfig,
                        currColor: t,
                        onChange: this.switchColor
                    }), a["default"].createElement("div", {
                        className: "oc-bot-sum"
                    },
                    l, a["default"].createElement("h3", null, "合计：", a["default"].createElement("strong", null, this.state.price), "元"), a["default"].createElement("p", null, "温馨提示：请预约后及时抢购,购买成功后3天内发货 | 支持7天无理由退货"))))
                }
            }]),
            GrabPurchase
        } (c["default"]);
        t["default"] = p
    },
    69 : function(e, t, n) {
        "use strict";
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        }
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        function PurchaseHeader(e) {
            return a["default"].createElement("div", {
                className: "oc-buy-ban"
            },
            a["default"].createElement("div", {
                className: "oc-buy-banner"
            },
            a["default"].createElement("h2", null, "玩客云 自由畅快的私人云盘"), e.hideTxt ? null: a["default"].createElement("h3", null, "2小时不限量火热预定中"), e.userTotal ? a["default"].createElement("p", {
                className: "oc-buy-price-num"
            },
            "已有", a["default"].createElement("em", null, " ", a["default"].createElement(c["default"], {
                start: 1e4,
                end: e.userTotal,
                duration: 1
            }), " "), "人预约") : null, a["default"].createElement("div", {
                className: "i-banbox"
            },
            a["default"].createElement("i", {
                className: "i-ban-wky3"
            }), a["default"].createElement("i", {
                className: "i-ban-wky2"
            }), a["default"].createElement("i", {
                className: "i-ban-wky1"
            }))))
        }
        function PurchaseFlow(e) {
            return a["default"].createElement("div", {
                className: "oc-buy-aside-steps"
            },
            a["default"].createElement("h3", null, "预定购买流程"), a["default"].createElement("ol", null, a["default"].createElement("li", null, a["default"].createElement("h4", null, "1. 预定购买"), a["default"].createElement("p", null, "预定即将开始")), a["default"].createElement("li", {
                className: "oc-buy-aside-steps-arrow"
            }), a["default"].createElement("li", null, a["default"].createElement("h4", null, "2. 预付定金"), a["default"].createElement("p", null, "2017-08-10 10:10至2017-08-30: 18:00")), a["default"].createElement("li", {
                className: "oc-buy-aside-steps-arrow"
            }), a["default"].createElement("li", null, a["default"].createElement("h4", null, "3. 支付尾款"), a["default"].createElement("p", null, "等待尾款时间开启")), a["default"].createElement("li", {
                className: "oc-buy-aside-steps-arrow"
            }), a["default"].createElement("li", null, a["default"].createElement("h4", null, "4. 发货"), a["default"].createElement("p", null, "按定金支付顺序依次发货"))))
        }
        function PurchaseRule(e) {
            return a["default"].createElement("dl", {
                className: "oc-buy-aside-rule"
            },
            a["default"].createElement("dt", null, "活动规则"), a["default"].createElement("dd", null, "1. 预付定金启动时间：9月26日10:00-12:00，2小时不限量预定开启；"), a["default"].createElement("dd", null, "2. 预定成功后享受购买资格，成功支付定金与尾款后，我们将在统一时间发货；请关注预定时间及尾款支付时间，建议您开启短信提醒，以免错过购买时间；"), a["default"].createElement("dd", null, "3. 预付定金在预定期间不可退，请确认后提交预定订单；"), a["default"].createElement("dd", null, "4. 预付统一发货时间：2018年1月15日，预付用户我们会为您的激活码自动延期；"), a["default"].createElement("dd", null, "5. 定金可直接抵扣商品总额，定金不支持优惠码抵扣，尾款可支持优惠码抵扣；"), a["default"].createElement("dd", null, "6. 查看预定订单请至“我的订单”-“我的预售”进行查看。"))
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ImageCode = t.DeliverDate = t.ColorSelector = t.Countdown = t.TipPop = t.VerifyCode = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } ();
        t.PurchaseHeader = PurchaseHeader,
        t.PurchaseFlow = PurchaseFlow,
        t.PurchaseRule = PurchaseRule;
        var o = n(0),
        a = _interopRequireDefault(o),
        i = n(5),
        l = n(2),
        s = n(196),
        u = n(199),
        c = _interopRequireDefault(u);
        t.VerifyCode = function(e) {
            function VerifyCode(e) {
                _classCallCheck(this, VerifyCode);
                var t = _possibleConstructorReturn(this, (VerifyCode.__proto__ || Object.getPrototypeOf(VerifyCode)).call(this, e));
                return t.state = {
                    vcodeRes: ""
                },
                t.handleImgCodeChange = t.handleImgCodeChange.bind(t),
                t.changeVerifyCode = t.changeVerifyCode.bind(t),
                t.onKeyDown = t.onKeyDown.bind(t),
                t
            }
            return _inherits(VerifyCode, e),
            r(VerifyCode, [{
                key: "onKeyDown",
                value: function(e) {
                    13 == e.keyCode && this.props.submitVcode()
                }
            },
            {
                key: "componentDidMount",
                value: function() {
                    this.changeVerifyCode()
                }
            },
            {
                key: "changeVerifyCode",
                value: function() {
                    var e = this,
                    t = function(t) {
                        if (0 == t.iRet && t.data) {
                            var n = t.data.url,
                            r = function(t) {
                                if (0 == t.r && t.tips) {
                                    var n = s.jHash.base64.decode(s.jHash.base64.decode(t.tips));
                                    e.refs.vcodeResElem.innerHTML = n
                                }
                            }; (0, i.getJSONP)(n, "successCb", r)
                        }
                    },
                    n = ["grab", "fcode", "deposit"],
                    r = (0, i.getParams)("type") || "grab";
                    if (r) {
                        var o = l.ONECLOUD_API_HOST + "/verify/get?order_type=" + n.indexOf(r); (0, i.postPromise)(o).done(t)
                    }
                }
            },
            {
                key: "handleImgCodeChange",
                value: function(e) {
                    var t = e.target.value;
                    this.props.onChange(t),
                    this.props.checkImgCode(t)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.onClose,
                    n = e.submitVcode,
                    r = (e.onChange, e.vcodeErro),
                    o = e.inputValue,
                    i = e.vcodeEmpty,
                    l = {
                        height: "auto",
                        marginBottom: "10px"
                    };
                    return a["default"].createElement("div", {
                        className: "oc-pop",
                        style: {
                            zIndex: 999,
                            position: "absolute"
                        }
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-wp"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-textbox oc-tb"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-text oc-tb-cell"
                    },
                    a["default"].createElement("h3", null, "请输入验证码"), a["default"].createElement("div", {
                        className: "oc-quesbox",
                        ref: "vcodeResElem",
                        style: l
                    }), a["default"].createElement("div", {
                        className: "oc-u-inpbox oc-ques-inp"
                    },
                    a["default"].createElement("input", {
                        onKeyDown: this.onKeyDown,
                        className: "oc-inptxt",
                        type: "text",
                        placeholder: "请输入答案",
                        value: o,
                        onChange: this.handleImgCodeChange
                    }), i ? a["default"].createElement("p", {
                        className: "oc-err"
                    },
                    "请输入答案") : r ? a["default"].createElement("p", {
                        className: "oc-err"
                    },
                    "请输入正确答案") : null))), a["default"].createElement("div", {
                        className: "oc-pop-btnbox"
                    },
                    a["default"].createElement("a", {
                        href: "javascript:;",
                        className: "btn-oc",
                        onClick: n
                    },
                    "确定")), a["default"].createElement("a", {
                        href: "javascript:;",
                        className: "oc-pop-close",
                        onClick: t
                    },
                    "关闭")))
                }
            }]),
            VerifyCode
        } (o.Component); (t.TipPop = function(e) {
            function TipPop(e) {
                return _classCallCheck(this, TipPop),
                _possibleConstructorReturn(this, (TipPop.__proto__ || Object.getPrototypeOf(TipPop)).call(this, e))
            }
            return _inherits(TipPop, e),
            r(TipPop, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.msg,
                    n = e.jump,
                    r = e.onClose,
                    o = e.btnTxt,
                    i = n ? a["default"].createElement("a", {
                        href: n,
                        className: "btn-oc"
                    },
                    o) : a["default"].createElement("a", {
                        href: "javascript:;",
                        className: "btn-oc",
                        onClick: r
                    },
                    o);
                    return a["default"].createElement("div", {
                        className: "oc-pop"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-wp"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-textbox oc-tb"
                    },
                    a["default"].createElement("div", {
                        className: "oc-pop-text oc-tb-cell"
                    },
                    a["default"].createElement("h3", null, t))), a["default"].createElement("div", {
                        className: "oc-pop-btnbox"
                    },
                    i), a["default"].createElement("a", {
                        href: "javascript:;",
                        className: "oc-pop-close",
                        onClick: r
                    },
                    "关闭")))
                }
            }]),
            TipPop
        } (o.Component)).propTypes = {
            msg: o.PropTypes.string.isRequired,
            onClose: o.PropTypes.func.isRequired,
            jump: o.PropTypes.string,
            btnName: o.PropTypes.string
        },
        (t.Countdown = function(e) {
            function Countdown() {
                return _classCallCheck(this, Countdown),
                _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).apply(this, arguments))
            }
            return _inherits(Countdown, e),
            r(Countdown, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.currTime,
                    n = e.targetTime,
                    r = e.desc;
                    if (!t || !n) return null;
                    var o = (0, i.surplusTime)(t, n);
                    return a["default"].createElement("div", {
                        className: "oc-u-tit oc-u-tit-buytime"
                    },
                    a["default"].createElement("div", {
                        className: "oc-buytime"
                    },
                    a["default"].createElement("p", null, r), o.day > 0 ? a["default"].createElement("span", null, a["default"].createElement("em", null, o.day), "天") : null, a["default"].createElement("span", null, a["default"].createElement("em", null, o.hour), "时"), a["default"].createElement("span", null, a["default"].createElement("em", null, o.minute), "分"), a["default"].createElement("span", null, a["default"].createElement("em", null, o.second), "秒")))
                }
            }]),
            Countdown
        } (o.Component)).propTypes = {
            currTime: o.PropTypes.instanceOf(Date).isRequired,
            targetTime: o.PropTypes.instanceOf(Date),
            type: o.PropTypes.string
        },
        (t.ColorSelector = function(e) {
            function ColorSelector(e) {
                _classCallCheck(this, ColorSelector);
                var t = _possibleConstructorReturn(this, (ColorSelector.__proto__ || Object.getPrototypeOf(ColorSelector)).call(this, e));
                return t.switchColor = t.switchColor.bind(t),
                t
            }
            return _inherits(ColorSelector, e),
            r(ColorSelector, [{
                key: "switchColor",
                value: function(e) {
                    this.props.onChange($(e.currentTarget).data("color"))
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this,
                    t = this.props,
                    n = t.colorConfig,
                    r = t.currColor;
                    return a["default"].createElement("dl", {
                        className: "oc-buy-color"
                    },
                    a["default"].createElement("dt", null, "选择颜色"), n.map(function(t) {
                        return t.has ? a["default"].createElement("dd", {
                            className: r == t.color ? "oc-selected": "",
                            key: t.color,
                            onClick: e.switchColor,
                            "data-color": t.color
                        },
                        a["default"].createElement("i", {
                            className: "i-oc-col-" + t.color
                        }), t.text) : a["default"].createElement("dd", {
                            className: "oc-buy-soldout",
                            key: t.color,
                            "data-color": t.color
                        },
                        a["default"].createElement("i", {
                            className: "i-oc-col-" + t.color
                        }), t.text, "(售罄)")
                    }))
                }
            }]),
            ColorSelector
        } (o.Component)).propTypes = {
            colorConfig: o.PropTypes.array.isRequired,
            currColor: o.PropTypes.string.isRequired,
            onChange: o.PropTypes.func.isRequired
        },
        (t.DeliverDate = function(e) {
            function DeliverDate(e) {
                _classCallCheck(this, DeliverDate);
                var t = _possibleConstructorReturn(this, (DeliverDate.__proto__ || Object.getPrototypeOf(DeliverDate)).call(this, e));
                return t.changeDate = t.changeDate.bind(t),
                t
            }
            return _inherits(DeliverDate, e),
            r(DeliverDate, [{
                key: "changeDate",
                value: function(e) {
                    this.props.onChange($(e.target).data("date"))
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this,
                    t = this.props,
                    n = t.deliverDateConfig,
                    r = t.currDate;
                    return n && 0 != n.length ? a["default"].createElement("dl", {
                        className: "oc-buy-color"
                    },
                    a["default"].createElement("dt", null, "选择发货日期"), n.map(function(t) {
                        return t.has ? a["default"].createElement("dd", {
                            onClick: e.changeDate,
                            key: t.date,
                            "data-date": t.date,
                            className: t.date == r ? "oc-selected": ""
                        },
                        t.date) : a["default"].createElement("dd", {
                            key: t.date,
                            className: "oc-buy-soldout"
                        },
                        t.date)
                    })) : null
                }
            }]),
            DeliverDate
        } (o.Component)).propTypes = {
            deliverDateConfig: o.PropTypes.array.isRequired,
            currDate: o.PropTypes.string,
            onChange: o.PropTypes.func.isRequired
        },
        (t.ImageCode = function(e) {
            function ImageCode(e) {
                _classCallCheck(this, ImageCode);
                var t = _possibleConstructorReturn(this, (ImageCode.__proto__ || Object.getPrototypeOf(ImageCode)).call(this, e));
                return t.state = {
                    imgCode: null,
                    imgCodeUrl: "/images/purchase/loading.gif",
                    errMsg: null
                },
                t.changeImgCode = t.changeImgCode.bind(t),
                t.handleImgCodeChange = t.handleImgCodeChange.bind(t),
                t
            }
            return _inherits(ImageCode, e),
            r(ImageCode, [{
                key: "componentDidMount",
                value: function() {
                    this.changeImgCode()
                }
            },
            {
                key: "changeImgCode",
                value: function(e) {
                    var t = this,
                    n = "http://verify.red.xunlei.com/imgcode/refresh.php?type=0&_=" + (new Date).getTime(),
                    r = new Image;
                    r.src = n,
                    r.onload = function() {
                        t.setState({
                            imgCodeUrl: n
                        })
                    }
                }
            },
            {
                key: "handleImgCodeChange",
                value: function(e) {
                    var t = e.target.value;
                    this.setState({
                        imgCode: t
                    }),
                    this.props.onChange(t)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props;
                    e.colorConfig,
                    e.currColor;
                    return a["default"].createElement("div", {
                        className: "oc-buy-code"
                    },
                    a["default"].createElement("span", {
                        className: "oc-buy-code-name"
                    },
                    "验证码"), a["default"].createElement("div", {
                        className: "oc-buy-code-img"
                    },
                    a["default"].createElement("input", {
                        className: "oc-inptxt",
                        type: "text",
                        placeholder: "请输入图形验证码",
                        maxLength: "5",
                        value: this.state.imgCode,
                        onChange: this.handleImgCodeChange
                    }), a["default"].createElement("span", {
                        className: "oc-inp-codeimg"
                    },
                    a["default"].createElement("img", {
                        src: this.state.imgCodeUrl,
                        onClick: this.changeImgCode
                    }))), a["default"].createElement("p", {
                        className: "oc-err"
                    },
                    this.state.errMsg))
                }
            }]),
            ImageCode
        } (o.Component)).propTypes = {
            onChange: o.PropTypes.func.isRequired
        }
    },
    70 : function(e, t, n) {
        "use strict";
        function _classCallCheck(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function _inherits(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t["default"] = undefined;
        var r = function() {
            function defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && defineProperties(e.prototype, t),
                n && defineProperties(e, n),
                e
            }
        } (),
        o = n(0),
        a = function(e) {
            return e && e.__esModule ? e: {
                "default": e
            }
        } (o),
        i = n(5),
        l = n(69),
        s = n(2),
        u = function(e) {
            function FcodePurchase(e) {
                _classCallCheck(this, FcodePurchase);
                var t = _possibleConstructorReturn(this, (FcodePurchase.__proto__ || Object.getPrototypeOf(FcodePurchase)).call(this, e));
                return t.state = {
                    color: "black",
                    popShow: !1,
                    popMsg: "",
                    popJump: "",
                    popBtn: "确定",
                    imgCode: null,
                    vcodeShow: !1,
                    vcodeErro: !1,
                    vcodeEmpty: !1,
                    price: "399.00"
                },
                t.colorConfig = [{
                    color: "black",
                    text: "曜石黑",
                    has: 1
                },
                {
                    color: "blue",
                    text: "科技蓝",
                    has: 1
                },
                {
                    color: "orange",
                    text: "爱马仕橙",
                    has: 1
                }],
                t.onClose = function() {
                    t.setState({
                        popShow: !1
                    })
                },
                t.switchColor = function(e) {
                    t.setState({
                        color: e
                    })
                },
                t.handleImgCodeChange = function(e) {
                    t.setState({
                        imgCode: e
                    })
                },
                t.vcodeClose = function() {
                    t.setState({
                        vcodeShow: !1,
                        imgCode: null
                    }),
                    (0, i.removeClassFromHtmlElement)()
                },
                t.checkImgCode = function(e) {
                    t.setState({
                        vcodeErro: !1
                    })
                },
                t.submit = t.submit.bind(t),
                t
            }
            return _inherits(FcodePurchase, e),
            r(FcodePurchase, [{
                key: "showPopHandler",
                value: function(e, t, n) {
                    this.setState({
                        popShow: !0,
                        popMsg: e,
                        popJump: t || "",
                        popBtn: n || "确定"
                    })
                }
            },
            {
                key: "commonErrorHandler",
                value: function(e) {
                    var t = {
                        30004 : "当前时间不能抢购",
                        30006 : "状态异常",
                        30008 : "找不到订单记录",
                        30009 : "没有抢购到资格，无法支付",
                        40000 : "非活动时间",
                        30003 : "已经预定过了",
                        30106 : "宝码已经使用",
                        "-2": "系统繁忙，请稍后再试",
                        "-2004": "本期已经售罄",
                        "-2000": "抢购未开始",
                        "-1003": "宝码已被使用"
                    },
                    n = {
                        30005 : "已经售罄",
                        30016 : "黑色售罄",
                        30025 : "橙色售罄",
                        30026 : "蓝色售罄"
                    };
                    if (n.hasOwnProperty(e) && (this.showPopHandler(n[e]), this.getColorList()), t.hasOwnProperty(e) && this.showPopHandler(t[e]), -501 == e) {
                        var r = window.location.href;
                        location.href = "/html/login.html?jumpurl=" + encodeURIComponent(r)
                    }
                    30007 == e && this.showPopHandler("已经抢购成功", "/html/usercenter.html", "查看订单")
                }
            },
            {
                key: "responeHandler",
                value: function(e) {
                    var t = e.res,
                    n = e.success,
                    r = t.iRet;
                    this.commonErrorHandler(r),
                    0 == r && (t.data ? n(t.data) : n())
                }
            },
            {
                key: "gotoLoginPage",
                value: function() {
                    var e = window.location.href;
                    location.href = "/html/login.html?jumpurl=" + encodeURIComponent(e)
                }
            },
            {
                key: "submit",
                value: function(e) {
                    var t = this;
                    e.preventDefault();
                    var n = (0, i.getParams)("fcode") || "";
                    if (!n) return void this.showPopHandler("未检测到宝码，去使用宝码", "/html/usercenter.html"); (0, i.setCookie)("zqb_fcode", n, 30, "xunlei.com");
                    var r = {};
                    r[this.state.color + "_num"] = 1;
                    var o = function(e) {
                        var n = function(e) {
                            var t = "http://zqb.red.xunlei.com/html/order.html?type=fcode&orderid=" + e.order_id;
                            window.setTimeout(function() {
                                window.location.href = t
                            },
                            0)
                        };
                        t.responeHandler({
                            res: e,
                            success: n
                        })
                    }; (0, i.postPromise)(s.ONECLOUD_API_HOST + "/fcode/commit", r).done(o)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.state.color,
                    t = this.state.popShow ? a["default"].createElement(l.TipPop, {
                        msg: this.state.popMsg,
                        jump: this.state.popJump,
                        btnTxt: this.state.popBtn,
                        onClose: this.onClose
                    }) : null;
                    return a["default"].createElement("div", {
                        className: "oc-buy-box"
                    },
                    t, a["default"].createElement(l.PurchaseHeader, {
                        hideTxt: !0
                    }), a["default"].createElement("div", {
                        className: "oc-buy-main"
                    },
                    a["default"].createElement("div", {
                        className: "oc-u-tit"
                    },
                    a["default"].createElement("h2", null, "使用宝码购买")), a["default"].createElement("div", {
                        className: "oc-buy-price"
                    },
                    a["default"].createElement("span", {
                        className: "oc-buy-price-pay"
                    },
                    "官网价：", this.state.price, "元")), a["default"].createElement(l.ColorSelector, {
                        colorConfig: this.colorConfig,
                        currColor: e,
                        onChange: this.switchColor
                    }), a["default"].createElement("div", {
                        className: "oc-bot-sum"
                    },
                    a["default"].createElement("a", {
                        href: "#",
                        className: "btn-oc",
                        onClick: this.submit
                    },
                    "立即购买"), a["default"].createElement("h3", null, "合计：", a["default"].createElement("strong", null, this.state.price), "元"), a["default"].createElement("p", null, "支持：7天无理由退货，15天包换，1年保修"))))
                }
            }]),
            FcodePurchase
        } (o.Component);
        t["default"] = u
    }
},
[194]);