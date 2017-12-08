/**
 * jQuery EasyUI 1.3.1
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($) {
	function wrapTree(target) {
		var tree = $(target);
		tree.addClass("jtree");
		return tree;
	};

	function wrapNode(target) {
		var list = [];
		getChildData(list, $(target));
		function getChildData(aa, tree) {
			tree.children("li").each(function() {
				var liTarget = $(this);
				var opts = $.extend({}, $.parser.parseOptions(this, ["id", "iconCls", "state"]), {
					checked: (liTarget.attr("checked") ? true : undefined)
				});
				opts.text = liTarget.children("span").html();
				if(!opts.text) {
					opts.text = liTarget.html();
				}
				var ulDoom = liTarget.children("ul");
				if(ulDoom.length) {
					opts.children = [];
					getChildData(opts.children, ulDoom);
				}
				aa.push(opts);
			});
		};
		return list;
	};

	function bindTreeEvents(target) {
		var opts = $.data(target, "jtree").options;
		$(target).unbind().bind("mouseover", function(e) {
			var tt = $(e.target);
			var treeNode = tt.closest("div.jtree-node");
			if(!treeNode.length) {
				return;
			}
			treeNode.addClass("jtree-node-hover");
			if(tt.hasClass("jtree-hit")) {
				if(tt.hasClass("jtree-expanded")) {
					tt.addClass("jtree-expanded-hover");
				} else {
					tt.addClass("jtree-collapsed-hover");
				}
			}
			e.stopPropagation();
		}).bind("mouseout", function(e) {
			var tt = $(e.target);
			var treeNode = tt.closest("div.jtree-node");
			if(!treeNode.length) {
				return;
			}
			treeNode.removeClass("jtree-node-hover");
			if(tt.hasClass("jtree-hit")) {
				if(tt.hasClass("jtree-expanded")) {
					tt.removeClass("jtree-expanded-hover");
				} else {
					tt.removeClass("jtree-collapsed-hover");
				}
			}
			e.stopPropagation();
		}).bind("click", function(e) {
			var tt = $(e.target);
			var treeNode = tt.closest("div.jtree-node");
			if(!treeNode.length) {
				return;
			}
			if(tt.hasClass("jtree-hit")) {
				toggle(target, treeNode[0]);
				return false;
			} else {
				if(tt.hasClass("jtree-checkbox")) {
					check(target, treeNode[0], !tt.hasClass("jtree-checkbox1"));
					return false;
				} else {
					select(target, treeNode[0]);
					opts.onClick.call(target, getNode(target, treeNode[0]));
				}
			}
			e.stopPropagation();
		}).bind("dblclick", function(e) {
			var treeNode = $(e.target).closest("div.jtree-node");
			if(!treeNode.length) {
				return;
			}
			select(target, treeNode[0]);
			opts.onDblClick.call(target, getNode(target, treeNode[0]));
			e.stopPropagation();
		}).bind("contextmenu", function(e) {
			var treeNode = $(e.target).closest("div.jtree-node");
			if(!treeNode.length) {
				return;
			}
			opts.onContextMenu.call(target, e, getNode(target, treeNode[0]));
			e.stopPropagation();
		});
	};

	function disableDnd(target) {
		var treeNode = $(target).find("div.jtree-node");
		treeNode.css("cursor", "pointer");
	};

	function enableDnd(target) {};

	function check(target, _33, _34) {
		var _35 = $.data(target, "jtree").options;
		if(!_35.checkbox) {
			return;
		}
		var _36 = getNode(target, _33);
		if(_35.onBeforeCheck.call(target, _36, _34) == false) {
			return;
		}
		var _37 = $(_33);
		var ck = _37.find(".jtree-checkbox");
		ck.removeClass("jtree-checkbox0 jtree-checkbox1 jtree-checkbox2");
		if(_34) {
			ck.addClass("jtree-checkbox1");
		} else {
			ck.addClass("jtree-checkbox0");
		}
		if(_35.cascadeCheck) {
			setParentCheckbox(_37);
			setChildCheckbox(_37);
		}
		_35.onCheck.call(target, _36, _34);

		function setChildCheckbox(_3a) {
			var _3b = _3a.next().find(".jtree-checkbox");
			_3b.removeClass("jtree-checkbox0 jtree-checkbox1 jtree-checkbox2");
			if(_3a.find(".jtree-checkbox").hasClass("jtree-checkbox1")) {
				_3b.addClass("jtree-checkbox1");
			} else {
				_3b.addClass("jtree-checkbox0");
			}
		};

		function setParentCheckbox(_3c) {
			var _3d = getParent(target, _3c[0]);
			if(_3d) {
				var ck = $(_3d.target).find(".jtree-checkbox");
				ck.removeClass("jtree-checkbox0 jtree-checkbox1 jtree-checkbox2");
				if(_3e(_3c)) {
					ck.addClass("jtree-checkbox1");
				} else {
					if(_3f(_3c)) {
						ck.addClass("jtree-checkbox0");
					} else {
						ck.addClass("jtree-checkbox2");
					}
				}
				setParentCheckbox($(_3d.target));
			}

			function _3e(n) {
				var ck = n.find(".jtree-checkbox");
				if(ck.hasClass("jtree-checkbox0") || ck.hasClass("jtree-checkbox2")) {
					return false;
				}
				var b = true;
				n.parent().siblings().each(function() {
					if(!$(this).children("div.jtree-node").children(".jtree-checkbox").hasClass("jtree-checkbox1")) {
						b = false;
					}
				});
				return b;
			};

			function _3f(n) {
				var ck = n.find(".jtree-checkbox");
				if(ck.hasClass("jtree-checkbox1") || ck.hasClass("jtree-checkbox2")) {
					return false;
				}
				var b = true;
				n.parent().siblings().each(function() {
					if(!$(this).children("div.jtree-node").children(".jtree-checkbox").hasClass("jtree-checkbox0")) {
						b = false;
					}
				});
				return b;
			};
		};
	};

	function _40(_41, _42) {
		var _43 = $.data(_41, "jtree").options;
		var _44 = $(_42);
		if(isLeaf(_41, _42)) {
			var ck = _44.find(".jtree-checkbox");
			if(ck.length) {
				if(ck.hasClass("jtree-checkbox1")) {
					check(_41, _42, true);
				} else {
					check(_41, _42, false);
				}
			} else {
				if(_43.onlyLeafCheck) {
					$("<span class=\"jtree-checkbox jtree-checkbox0\"></span>").insertBefore(_44.find(".jtree-title"));
				}
			}
		} else {
			var ck = _44.find(".jtree-checkbox");
			if(_43.onlyLeafCheck) {
				ck.remove();
			} else {
				if(ck.hasClass("jtree-checkbox1")) {
					check(_41, _42, true);
				} else {
					if(ck.hasClass("jtree-checkbox2")) {
						var _46 = true;
						var _47 = true;
						var _48 = getChildren(_41, _42);
						for(var i = 0; i < _48.length; i++) {
							if(_48[i].checked) {
								_47 = false;
							} else {
								_46 = false;
							}
						}
						if(_46) {
							check(_41, _42, true);
						}
						if(_47) {
							check(_41, _42, false);
						}
					}
				}
			}
		}
	};

	function loadData(_4b, ul, data, isRemove) {
		var opts = $.extend({}, $.fn.tree.defaults);
		data = opts.loadFilter.call(_4b, data, $(ul).prev("div.jtree-node")[0]);
		if(!isRemove) {
			$(ul).empty();
		}
		var _4f = [];
		var depts = $(ul).prev("div.jtree-node").find("span.jtree-indent, span.jtree-hit").length;
		_51(ul, data, depts);
		for(var i = 0; i < _4f.length; i++) {
			check(_4b, _4f[i], true);
		}
		setTimeout(function() {
			showTreeLine(_4b, _4b);
		}, 0);
		var _52 = null;
		if(_4b != ul) {
			var _53 = $(ul).prev();
			_52 = getNode(_4b, _53[0]);
		}
		opts.onLoadSuccess.call(_4b, _52, data);

		function _51(ul, data, dept) {
			for(var i = 0; i < data.length; i++) {
				var li = $("<li></li>").appendTo(ul);
				var record = data[i];
				if(record.state != "open" && record.state != "closed") {
					record.state = "open";
				}
				var treeNode = $("<div class=\"jtree-node\"></div>").appendTo(li);
				treeNode.attr("node-id", record.id);
				var iconCls = record["iconCls"] || "";
				$.data(treeNode[0], "jtree-node", {
					id: record.id,
					text: record.text,
					iconCls: iconCls,
					attributes: record.attributes
				});
				$("<span class=\"jtree-title\"></span>").html(record.text).appendTo(treeNode);
				if(opts.checkbox) {
					if(opts.onlyLeafCheck) {
						if(record.state == "open" && (!record.children || !record.children.length)) {
							if(record.checked) {
								$("<span class=\"jtree-checkbox jtree-checkbox1\"></span>").prependTo(treeNode);
							} else {
								$("<span class=\"jtree-checkbox jtree-checkbox0\"></span>").prependTo(treeNode);
							}
						}
					} else {
						if(record.checked) {
							$("<span class=\"jtree-checkbox jtree-checkbox1\"></span>").prependTo(treeNode);
							_4f.push(treeNode[0]);
						} else {
							$("<span class=\"jtree-checkbox jtree-checkbox0\"></span>").prependTo(treeNode);
						}
					}
				}
				if(record.children && record.children.length) {
					var ulDom = $("<ul></ul>").appendTo(li);
					if(record.state == "open") {
						$("<span class=\"jtree-icon jtree-folder jtree-folder-open\"></span>").addClass(record.iconCls).prependTo(treeNode);
						$("<span class=\"jtree-hit jtree-expanded\"></span>").prependTo(treeNode);
					} else {
						$("<span class=\"jtree-icon jtree-folder\"></span>").addClass(record.iconCls).prependTo(treeNode);
						$("<span class=\"jtree-hit jtree-collapsed\"></span>").prependTo(treeNode);
						ulDom.css("display", "none");
					}
					_51(ulDom, record.children, dept + 1);
				} else {
					if(record.state == "closed") {
						$("<span class=\"jtree-icon jtree-folder\"></span>").addClass(record.iconCls).prependTo(treeNode);
						$("<span class=\"jtree-hit jtree-collapsed\"></span>").prependTo(treeNode);
					} else {
						$("<span class=\"jtree-icon jtree-file\"></span>").addClass(record.iconCls).prependTo(treeNode);
						$("<span class=\"jtree-indent\"></span>").prependTo(treeNode);
					}
				}
				for(var j = 0; j < dept; j++) {
					$("<span class=\"jtree-indent\"></span>").prependTo(treeNode);
				}
			}
		};
	};

	function showTreeLine(target, ul, isFlag) {
		
		var _5c = $.data(target, "jtree").options;
		if(!_5c.lines) {
			return;
		}
		if(!isFlag) {
			isFlag = true;
			$(target).find("span.jtree-indent").removeClass("jtree-line jtree-join jtree-joinbottom");
			$(target).find("div.jtree-node").removeClass("jtree-node-last jtree-root-first jtree-root-one");
			var root = $(target).tree("getRoots");
			if(root&& root.length >0) {
				var rootNode = root[0].target;
				if(root.length>1){
					$(rootNode).addClass("jtree-root-first");
				}else{
					$(rootNode).addClass("jtree-root-one");
				}
			} 
		}
		$(ul).children("li").each(function() {
			var treeNode = $(this).children("div.jtree-node");
			var ulDom = treeNode.next("ul");
			if(ulDom.length >0) {
				if($(this).next().length) {
					var _66 = treeNode.find("span.jtree-indent, span.jtree-hit").length;
					treeNode.next().find("div.jtree-node").each(function() {
						$(this).children("span:eq(" + (_66 - 1) + ")").addClass("jtree-line");
					});
				}
				showTreeLine(target, ulDom, isFlag);
			} else {
				var code= treeNode.find("span.jtree-icon");
				code.prev("span.jtree-indent").addClass("jtree-join");
			}
		});
		var _61 = $(ul).children("li:last").children("div.jtree-node").addClass("jtree-node-last");
		_61.children("span.jtree-join").removeClass("jtree-join").addClass("jtree-joinbottom");
	};

	function _67(_68, ul, _69, _6a) {
		var _6b = $.data(_68, "jtree").options;
		_69 = _69 || {};
		var _6c = null;
		if(_68 != ul) {
			var _6d = $(ul).prev();
			_6c = getNode(_68, _6d[0]);
		}
		if(_6b.onBeforeLoad.call(_68, _6c, _69) == false) {
			return;
		}
		var _6e = $(ul).prev().children("span.jtree-folder");
		_6e.addClass("jtree-loading");
		var _6f = _6b.loader.call(_68, _69, function(_70) {
			_6e.removeClass("jtree-loading");
			loadData(_68, ul, _70);
			if(_6a) {
				_6a();
			}
		}, function() {
			_6e.removeClass("jtree-loading");
			_6b.onLoadError.apply(_68, arguments);
			if(_6a) {
				_6a();
			}
		});
		if(_6f == false) {
			_6e.removeClass("jtree-loading");
		}
	};

	function expand(_72, _73, _74) {
		var _75 = $.data(_72, "jtree").options;
		var hit = $(_73).children("span.jtree-hit");
		if(hit.length == 0) {
			return;
		}
		if(hit.hasClass("jtree-expanded")) {
			return;
		}
		var _76 = getNode(_72, _73);
		if(_75.onBeforeExpand.call(_72, _76) == false) {
			return;
		}
		hit.removeClass("jtree-collapsed jtree-collapsed-hover").addClass("jtree-expanded");
		hit.next().addClass("jtree-folder-open");
		var ul = $(_73).next();
		if(ul.length) {
			if(_75.animate) {
				ul.slideDown("normal", function() {
					_75.onExpand.call(_72, _76);
					if(_74) {
						_74();
					}
				});
			} else {
				ul.css("display", "block");
				_75.onExpand.call(_72, _76);
				if(_74) {
					_74();
				}
			}
		} else {
			var _77 = $("<ul style=\"display:none\"></ul>").insertAfter(_73);
			_67(_72, _77[0], {
				id: _76.id
			}, function() {
				if(_77.is(":empty")) {
					_77.remove();
				}
				if(_75.animate) {
					_77.slideDown("normal", function() {
						_75.onExpand.call(_72, _76);
						if(_74) {
							_74();
						}
					});
				} else {
					_77.css("display", "block");
					_75.onExpand.call(_72, _76);
					if(_74) {
						_74();
					}
				}
			});
		}
	};

	function collapse(_79, _7a) {
		var _7b = $.data(_79, "jtree").options;
		var hit = $(_7a).children("span.jtree-hit");
		if(hit.length == 0) {
			return;
		}
		if(hit.hasClass("jtree-collapsed")) {
			return;
		}
		var _7c = getNode(_79, _7a);
		if(_7b.onBeforeCollapse.call(_79, _7c) == false) {
			return;
		}
		hit.removeClass("jtree-expanded jtree-expanded-hover").addClass("jtree-collapsed");
		hit.next().removeClass("jtree-folder-open");
		var ul = $(_7a).next();
		if(_7b.animate) {
			ul.slideUp("normal", function() {
				_7b.onCollapse.call(_79, _7c);
			});
		} else {
			ul.css("display", "none");
			_7b.onCollapse.call(_79, _7c);
		}
	};

	function toggle(_7e, _7f) {
		var hit = $(_7f).children("span.jtree-hit");
		if(hit.length == 0) {
			return;
		}
		if(hit.hasClass("jtree-expanded")) {
			collapse(_7e, _7f);
		} else {
			expand(_7e, _7f);
		}
	};

	function expandAll(_81, _82) {
		var _83 = getChildren(_81, _82);
		if(_82) {
			_83.unshift(getNode(_81, _82));
		}
		for(var i = 0; i < _83.length; i++) {
			expand(_81, _83[i].target);
		}
	};

	function expandTo(target, nodeTarget) {
		var list = [];
		var p = getParent(target, nodeTarget);
		while(p) {
			list.unshift(p);
			p = getParent(target, p.target);
		}
		for(var i = 0; i < list.length; i++) {
			expand(target, list[i].target);
		}
	};

	function collapseAll(target, nodeTarget) {
		var list = getChildren(target, nodeTarget);
		if(nodeTarget) {
			list.unshift(getNode(target, nodeTarget));
		}
		for(var i = 0; i < list.length; i++) {
			collapse(target, list[i].target);
		}
	};

	function _8d(_8e) {
		var _8f = getRoots(_8e);
		if(_8f.length) {
			return _8f[0];
		} else {
			return null;
		}
	};

	function getRoots(target) {
		var list = [];
		$(target).children("li").each(function() {
			var treeTarget = $(this).children("div.jtree-node");
			var node = getNode(target, treeTarget[0]);
			list.push(node);
		});
		return list;
	};

	function getChildren(target, nodeTarget) {
		var list = [];
		if(nodeTarget) {
			getChildNode($(nodeTarget));
		} else {
			var data = getRoots(target);
			for(var i = 0; i < data.length; i++) {
				list.push(data[i]);
				getChildNode($(data[i].target));
			}
		}

		function getChildNode(node) {
			$(node).next().find("div.jtree-node").each(function() {
				list.push(getNode(target, this));
			});
		};
		return list;
	};

	function getParent(_9a, _9b) {
		var ul = $(_9b).parent().parent();
		if(ul[0] == _9a) {
			return null;
		} else {
			return getNode(_9a, ul.prev()[0]);
		}
	};

	function getChecked(_9d, _9e) {
		_9e = _9e || "checked";
		var _9f = "";
		if(_9e == "checked") {
			_9f = "span.jtree-checkbox1";
		} else {
			if(_9e == "unchecked") {
				_9f = "span.jtree-checkbox0";
			} else {
				if(_9e == "indeterminate") {
					_9f = "span.jtree-checkbox2";
				}
			}
		}
		var _a0 = [];
		$(_9d).find(_9f).each(function() {
			var _a1 = $(this).parent();
			_a0.push(getNode(_9d, _a1[0]));
		});
		return _a0;
	};

	function getSelected(_a3) {
		var _a4 = $(_a3).find("div.jtree-node-selected");
		if(_a4.length) {
			return getNode(_a3, _a4[0]);
		} else {
			return null;
		}
	};

	function append(_a6, _a7) {
		var _a8 = $(_a7.parent);
		var ul;
		if(_a8.length == 0) {
			ul = $(_a6);
		} else {
			ul = _a8.next();
			if(ul.length == 0) {
				ul = $("<ul></ul>").insertAfter(_a8);
			}
		}
		if(_a7.data && _a7.data.length) {
			var _a9 = _a8.find("span.jtree-icon");
			if(_a9.hasClass("jtree-file")) {
				_a9.removeClass("jtree-file").addClass("jtree-folder");
				var hit = $("<span class=\"jtree-hit jtree-expanded\"></span>").insertBefore(_a9);
				if(hit.prev().length) {
					hit.prev().remove();
				}
			}
		}
		loadData(_a6, ul[0], _a7.data, true);
		_40(_a6, ul.prev());
	};

	function insert(_ab, _ac) {
		var ref = _ac.before || _ac.after;
		var _ad = getParent(_ab, ref);
		var li;
		if(_ad) {
			append(_ab, {
				parent: _ad.target,
				data: [_ac.data]
			});
			li = $(_ad.target).next().children("li:last");
		} else {
			append(_ab, {
				parent: null,
				data: [_ac.data]
			});
			li = $(_ab).children("li:last");
		}
		if(_ac.before) {
			li.insertBefore($(ref).parent());
		} else {
			li.insertAfter($(ref).parent());
		}
	};

	function remove(target, nodeTarget) {
		var parentNode = getParent(target, nodeTarget);
		var _b2 = $(nodeTarget);
		var li = _b2.parent();
		var ul = li.parent();
		li.remove();
		if(ul.children("li").length == 0) {
			var _b2 = ul.prev();
			_b2.find(".jtree-icon").removeClass("jtree-folder").addClass("jtree-file");
			_b2.find(".jtree-hit").remove();
			$("<span class=\"jtree-indent\"></span>").prependTo(_b2);
			if(ul[0] != target) {
				ul.remove();
			}
		}
		if(parentNode) {
			_40(target, parentNode.target);
		}
		showTreeLine(target, target);
	};

	function getData(_b4, _b5) {
		function _b6(aa, ul) {
			ul.children("li").each(function() {
				var _b7 = $(this).children("div.jtree-node");
				var _b8 = getNode(_b4, _b7[0]);
				var sub = $(this).children("ul");
				if(sub.length) {
					_b8.children = [];
					_b6(_b8.children, sub);
				}
				aa.push(_b8);
			});
		};
		if(_b5) {
			var _b9 = getNode(_b4, _b5);
			_b9.children = [];
			_b6(_b9.children, $(_b5).next());
			return _b9;
		} else {
			return null;
		}
	};

	function update(_bb, _bc) {
		var _bd = $(_bc.target);
		var _be = getNode(_bb, _bc.target);
		if(_be.iconCls) {
			_bd.find(".jtree-icon").removeClass(_be.iconCls);
		}
		var _bf = $.extend({}, _be, _bc);
		$.data(_bc.target, "jtree-node", _bf);
		_bd.attr("node-id", _bf.id);
		_bd.find(".jtree-title").html(_bf.text);
		if(_bf.iconCls) {
			_bd.find(".jtree-icon").addClass(_bf.iconCls);
		}
		if(_be.checked != _bf.checked) {
			check(_bb, _bc.target, _bf.checked);
		}
	};

	function getNode(treeView, nodeTarget) {
		var treeNode = $.extend({}, $.data(nodeTarget, "jtree-node"), {
			target: nodeTarget,
			checked: $(nodeTarget).find(".jtree-checkbox").hasClass("jtree-checkbox1")
		});
		console.log(treeNode);
		if(!isLeaf(treeView, nodeTarget)) {
			treeNode.state = $(nodeTarget).find(".jtree-hit").hasClass("jtree-expanded") ? "open" : "closed";
		}
		return treeNode;
	};

	function findNode(target, id) {
		var nodeDom = $(target).find("div.jtree-node[node-id=" + id + "]");
		if(nodeDom.length) {
			return getNode(target, nodeDom[0]);
		} else {
			return null;
		}
	};

	function select(target, nodeTarget) {
		var opts = $.data(target, "jtree").options;
		var node = getNode(target, nodeTarget);
		if(opts.onBeforeSelect.call(target, node) == false) {
			return;
		}
		$("div.jtree-node-selected", target).removeClass("jtree-node-selected");
		$(nodeTarget).addClass("jtree-node-selected");
		opts.onSelect.call(target, node);
	};

	function isLeaf(_cb, _cc) {
		var _cd = $(_cc);
		var hit = _cd.children("span.jtree-hit");
		return hit.length == 0;
	};

	function beginEdit(_cf, _d0) {
		var _d1 = $.data(_cf, "jtree").options;
		var _d2 = getNode(_cf, _d0);
		if(_d1.onBeforeEdit.call(_cf, _d2) == false) {
			return;
		}
		$(_d0).css("position", "relative");
		var nt = $(_d0).find(".jtree-title");
		var _d3 = nt.outerWidth();
		nt.empty();
		var _d4 = $("<input class=\"jtree-editor\">").appendTo(nt);
		_d4.val(_d2.text).focus();
		_d4.width(_d3 + 20);
		_d4.height(document.compatMode == "CSS1Compat" ? (18 - (_d4.outerHeight() - _d4.height())) : 18);
		_d4.bind("click", function(e) {
			return false;
		}).bind("mousedown", function(e) {
			e.stopPropagation();
		}).bind("mousemove", function(e) {
			e.stopPropagation();
		}).bind("keydown", function(e) {
			if(e.keyCode == 13) {
				endEdit(_cf, _d0);
				return false;
			} else {
				if(e.keyCode == 27) {
					cancelEdit(_cf, _d0);
					return false;
				}
			}
		}).bind("blur", function(e) {
			e.stopPropagation();
			endEdit(_cf, _d0);
		});
	};

	function endEdit(_d6, _d7) {
		var _d8 = $.data(_d6, "jtree").options;
		$(_d7).css("position", "");
		var _d9 = $(_d7).find("input.jtree-editor");
		var val = _d9.val();
		_d9.remove();
		var _da = getNode(_d6, _d7);
		_da.text = val;
		update(_d6, _da);
		_d8.onAfterEdit.call(_d6, _da);
	};

	function cancelEdit(target, _dd) {
		var opts = $.data(target, "jtree").options;
		$(_dd).css("position", "");
		$(_dd).find("input.jtree-editor").remove();
		var _df = getNode(target, _dd);
		update(target, _df);
		opts.onCancelEdit.call(target, _df);
	};
	$.fn.tree = function(options, _e1) {
		if(typeof options == "string") {
			return $.fn.tree.methods[options](this, _e1);
		}
		var options = options || {};
		return this.each(function() {
			var treeNode = $.data(this, "jtree");
			var opts;
			if(treeNode) {
				opts = $.extend(treeNode.options, options);
				treeNode.options = opts;
			} else {
				opts = $.extend({}, $.fn.tree.defaults, $.fn.tree.parseOptions(this), options);
				$.data(this, "jtree", {
					options: opts,
					jtree: wrapTree(this)
				});
				var data = wrapNode(this);
				if(data.length && !opts.data) {
					opts.data = data;
				}
			}
			bindTreeEvents(this);
			if(opts.lines) {
				$(this).addClass("jtree-lines");
			}
			if(opts.data) {
				loadData(this, this, opts.data);
			} else {
				if(opts.dnd) {
					enableDnd(this);
				} else {
					disableDnd(this);
				}
			}
			_67(this, this);
		});
	};
	$.fn.tree.methods = {
		options: function(jq) {
			return $.data(jq[0], "jtree").options;
		},
		loadData: function(jq, _e5) {
			return jq.each(function() {
				loadData(this, this, _e5);
			});
		},
		getNode: function(jq, _e6) {
			var node = getNode(jq[0], _e6);
			return node;
		},
		getData: function(jq, _e7) {
			return getData(jq[0], _e7);
		},
		reload: function(jq, _e8) {
			return jq.each(function() {
				if(_e8) {
					var _e9 = $(_e8);
					var hit = _e9.children("span.jtree-hit");
					hit.removeClass("jtree-expanded jtree-expanded-hover").addClass("jtree-collapsed");
					_e9.next().remove();
					expand(this, _e8);
				} else {
					$(this).empty();
					_67(this, this);
				}
			});
		},
		getRoot: function(jq) {
			return _8d(jq[0]);
		},
		getRoots: function(jq) {
			return getRoots(jq[0]);
		},
		getParent: function(jq, _ea) {
			return getParent(jq[0], _ea);
		},
		getChildren: function(jq, _eb) {
			return getChildren(jq[0], _eb);
		},
		getChecked: function(jq, _ec) {
			return getChecked(jq[0], _ec);
		},
		getSelected: function(jq) {
			return getSelected(jq[0]);
		},
		isLeaf: function(jq, _ed) {
			return isLeaf(jq[0], _ed);
		},
		find: function(jq, id) {
			return findNode(jq[0], id);
		},
		select: function(jq, _ee) {
			return jq.each(function() {
				select(this, _ee);
			});
		},
		check: function(jq, _ef) {
			return jq.each(function() {
				check(this, _ef, true);
			});
		},
		uncheck: function(jq, _f0) {
			return jq.each(function() {
				check(this, _f0, false);
			});
		},
		collapse: function(jq, _f1) {
			return jq.each(function() {
				collapse(this, _f1);
			});
		},
		expand: function(jq, _f2) {
			return jq.each(function() {
				expand(this, _f2);
			});
		},
		collapseAll: function(jq, _f3) {
			return jq.each(function() {
				collapseAll(this, _f3);
			});
		},
		expandAll: function(jq, _f4) {
			return jq.each(function() {
				expandAll(this, _f4);
			});
		},
		expandTo: function(jq, _f5) {
			return jq.each(function() {
				expandTo(this, _f5);
			});
		},
		toggle: function(jq, _f6) {
			return jq.each(function() {
				toggle(this, _f6);
			});
		},
		append: function(jq, _f7) {
			return jq.each(function() {
				append(this, _f7);
			});
		},
		insert: function(jq, _f8) {
			return jq.each(function() {
				insert(this, _f8);
			});
		},
		remove: function(jq, _f9) {
			return jq.each(function() {
				remove(this, _f9);
			});
		},
		pop: function(jq, _fa) {
			var _fb = jq.jtree("getData", _fa);
			jq.jtree("remove", _fa);
			return _fb;
		},
		update: function(jq, _fc) {
			return jq.each(function() {
				update(this, _fc);
			});
		},
		enableDnd: function(jq) {
			return jq.each(function() {
				enableDnd(this);
			});
		},
		disableDnd: function(jq) {
			return jq.each(function() {
				disableDnd(this);
			});
		},
		beginEdit: function(jq, _fd) {
			return jq.each(function() {
				beginEdit(this, _fd);
			});
		},
		endEdit: function(jq, _fe) {
			return jq.each(function() {
				endEdit(this, _fe);
			});
		},
		cancelEdit: function(jq, _ff) {
			return jq.each(function() {
				cancelEdit(this, _ff);
			});
		}
	};
	$.fn.tree.parseOptions = function(_100) {
		var t = $(_100);
		return $.extend({}, $.parser.parseOptions(_100, ["url", "method", {
			checkbox: "boolean",
			cascadeCheck: "boolean",
			onlyLeafCheck: "boolean"
		}, {
			animate: "boolean",
			lines: "boolean",
			dnd: "boolean"
		}]));
	};
	$.fn.tree.defaults = {
		url: null,
		method: "post",
		animate: false,
		checkbox: false,
		cascadeCheck: true,
		onlyLeafCheck: false,
		lines: false,
		dnd: false,
		data: null,
		loader: function(_101, _102, _103) {
			var opts = $(this).tree("options");
			if(!opts.url) {
				return false;
			}
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: _101,
				dataType: "json",
				success: function(data) {
					_102(data);
				},
				error: function() {
					_103.apply(this, arguments);
				}
			});
		},
		loadFilter: function(data, _104) {
			return data;
		},
		onBeforeLoad: function(node, _105) {},
		onLoadSuccess: function(node, data) {},
		onLoadError: function() {},
		onClick: function(node) {},
		onDblClick: function(node) {},
		onBeforeExpand: function(node) {},
		onExpand: function(node) {},
		onBeforeCollapse: function(node) {},
		onCollapse: function(node) {},
		onBeforeCheck: function(node, _106) {},
		onCheck: function(node, _107) {},
		onBeforeSelect: function(node) {},
		onSelect: function(node) {},
		onContextMenu: function(e, node) {},
		onDrop: function(_108, _109, _10a) {},
		onBeforeEdit: function(node) {},
		onAfterEdit: function(node) {},
		onCancelEdit: function(node) {}
	};
})(jQuery);

/**
 * jQuery EasyUI 1.3.1
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($) {
	$.parser = {
		auto: true,
		onComplete: function(_1) {},
		plugins: ["draggable", "droppable", "resizable", "pagination", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "jtree", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "numberspinner", "timespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "tabs", "accordion", "window", "dialog"],
		parse: function(_2) {
			var aa = [];
			for(var i = 0; i < $.parser.plugins.length; i++) {
				var _3 = $.parser.plugins[i];
				var r = $(".easyui-" + _3, _2);
				if(r.length) {
					if(r[_3]) {
						r[_3]();
					} else {
						aa.push({
							name: _3,
							jq: r
						});
					}
				}
			}
			if(aa.length && window.easyloader) {
				var _4 = [];
				for(var i = 0; i < aa.length; i++) {
					_4.push(aa[i].name);
				}
				easyloader.load(_4, function() {
					for(var i = 0; i < aa.length; i++) {
						var _5 = aa[i].name;
						var jq = aa[i].jq;
						jq[_5]();
					}
					$.parser.onComplete.call($.parser, _2);
				});
			} else {
				$.parser.onComplete.call($.parser, _2);
			}
		},
		parseOptions: function(_6, _7) {
			var t = $(_6);
			var _8 = {};
			var s = $.trim(t.attr("data-options"));
			if(s) {
				var _9 = s.substring(0, 1);
				var _a = s.substring(s.length - 1, 1);
				if(_9 != "{") {
					s = "{" + s;
				}
				if(_a != "}") {
					s = s + "}";
				}
				_8 = (new Function("return " + s))();
			}
			if(_7) {
				var _b = {};
				for(var i = 0; i < _7.length; i++) {
					var pp = _7[i];
					if(typeof pp == "string") {
						if(pp == "width" || pp == "height" || pp == "left" || pp == "top") {
							_b[pp] = parseInt(_6.style[pp]) || undefined;
						} else {
							_b[pp] = t.attr(pp);
						}
					} else {
						for(var _c in pp) {
							var _d = pp[_c];
							if(_d == "boolean") {
								_b[_c] = t.attr(_c) ? (t.attr(_c) == "true") : undefined;
							} else {
								if(_d == "number") {
									_b[_c] = t.attr(_c) == "0" ? 0 : parseFloat(t.attr(_c)) || undefined;
								}
							}
						}
					}
				}
				$.extend(_8, _b);
			}
			return _8;
		}
	};
	$(function() {
		if(!window.easyloader && $.parser.auto) {
			$.parser.parse();
		}
	});
	$.fn._outerWidth = function(_e) {
		if(_e == undefined) {
			if(this[0] == window) {
				return this.width() || document.body.clientWidth;
			}
			return this.outerWidth() || 0;
		}
		return this.each(function() {
			if(!$.support.boxModel && $.browser.msie) {
				$(this).width(_e);
			} else {
				$(this).width(_e - ($(this).outerWidth() - $(this).width()));
			}
		});
	};
	$.fn._outerHeight = function(_f) {
		if(_f == undefined) {
			if(this[0] == window) {
				return this.height() || document.body.clientHeight;
			}
			return this.outerHeight() || 0;
		}
		return this.each(function() {
			if(!$.support.boxModel && $.browser.msie) {
				$(this).height(_f);
			} else {
				$(this).height(_f - ($(this).outerHeight() - $(this).height()));
			}
		});
	};
	$.fn._propAttr = $.fn.prop || $.fn.attr;
})(jQuery);