(function($){
	/**
	 * wrap the <ul> tag as a jtree and then return it.
	 */
	function wrapTree(target){
		var jtree = $(target);
		jtree.addClass('jtree');
		wrapNode(jtree, 0);
		function wrapNode(ul, depth){
			$('>li', ul).each(function(){
				var node = $('<div class="jtree-node"></div>').prependTo($(this));
				var text = $('>span', this).addClass('jtree-title').appendTo(node).text();
				$.data(node[0], 'jtree-node', { text: text });
				var subTree = $('>ul', this);
				if (subTree.length){
					$('<span class="jtree-folder jtree-folder-open"></span>').prependTo(node);
					$('<span class="jtree-hit jtree-expanded"></span>').prependTo(node);
					wrapNode(subTree, depth+1);
				} else {
					$('<span class="jtree-file"></span>').prependTo(node);
					$('<span class="jtree-indent"></span>').prependTo(node);
				}
				for(var i=0; i<depth; i++){
					$('<span class="jtree-indent"></span>').prependTo(node);
				}
			});
		}
		return jtree;
	}
	function bindTreeEvents(target){
		var opts = $.data(target, 'jtree').options;
		var jtree = $.data(target, 'jtree').jtree;
		$('.jtree-node', jtree).unbind('.jtree').bind('dblclick.jtree', function(){
			$('.jtree-node-selected', jtree).removeClass('jtree-node-selected');
			$(this).addClass('jtree-node-selected');
			if (opts.onDblClick){
				var treeNode = util.getNode($(this));
				opts.onDblClick.call(this,treeNode );
			}
		}).bind('click.jtree', function(){
			$('.jtree-node-selected', jtree).removeClass('jtree-node-selected');
			$(this).addClass('jtree-node-selected');
			if (opts.onClick){
				var treeNode = util.getNode($(this));
				opts.onClick.call(this,treeNode );
			}
			if (opts.onSelect){
				var treeNode = util.getNode($(this));
				opts.onSelect.call(this,treeNode );
			}
		}).bind('mouseenter.jtree', function(){
			$(this).addClass('jtree-node-hover');
			var treeNode = util.getNode($(this).parent());
			opts.onMouseOver.call(target, treeNode);
			return false;
		}).bind('mouseleave.jtree', function(){
			$(this).removeClass('jtree-node-hover');
			var treeNode = util.getNode($(this).parent());
			opts.onMouseOut.call(target, treeNode);
			return false;
		});
		$('.jtree-hit', jtree).unbind('.jtree').bind('click.jtree', function(){
			var node = $(this).parent();
			util.toggleNode(target, node);
			return false;
		}).bind('mouseenter.jtree', function(){
			if ($(this).hasClass('jtree-expanded')){
				$(this).addClass('jtree-expanded-hover');
			} else {
				$(this).addClass('jtree-collapsed-hover');
			}
		}).bind('mouseleave.jtree', function(){
			if ($(this).hasClass('jtree-expanded')){
				$(this).removeClass('jtree-expanded-hover');
			} else {
				$(this).removeClass('jtree-collapsed-hover');
			}
		});
		$('.jtree-checkbox', jtree).unbind('.jtree').bind('click.jtree', function(){
			if ($(this).hasClass('jtree-checkbox0')){
				$(this).removeClass('jtree-checkbox0').addClass('jtree-checkbox1');
			} else if ($(this).hasClass('jtree-checkbox1')){
				$(this).removeClass('jtree-checkbox1').addClass('jtree-checkbox0');
			} else if ($(this).hasClass('jtree-checkbox2')){
				$(this).removeClass('jtree-checkbox2').addClass('jtree-checkbox1');
			}
			var nodeTarget = $(this).parent();
			var treeNode = util.getNode($(nodeTarget));
			
			if(opts.onBeforeCheck.call(target, treeNode) == false) {
				opts.onBeforeCheck.call(target, treeNode)
				return;
			}
			setParentCheckbox(nodeTarget);
			setChildCheckbox(nodeTarget);
			opts.onCheck.call(target, treeNode);
			return false;
		});
		function setChildCheckbox(node){
			var childck = node.next().find('.jtree-checkbox');
			childck.removeClass('jtree-checkbox0 jtree-checkbox1 jtree-checkbox2')
			if (node.find('.jtree-checkbox').hasClass('jtree-checkbox1')){
				childck.addClass('jtree-checkbox1');
			} else {
				childck.addClass('jtree-checkbox0');
			}
		}
		function setParentCheckbox(node){
			var pnode = getParentNode(target, node[0]);
			if (pnode){
				var ck = $(pnode.target).find('.jtree-checkbox');
				ck.removeClass('jtree-checkbox0 jtree-checkbox1 jtree-checkbox2');
				if (isAllSelected(node)){
					ck.addClass('jtree-checkbox1');
				} else if (isAllNull(node)){
					ck.addClass('jtree-checkbox0');
				} else {
					ck.addClass('jtree-checkbox2');
				}
				setParentCheckbox($(pnode.target));
			}
			
			function isAllSelected(n){
				var ck = n.find('.jtree-checkbox');
				if (ck.hasClass('jtree-checkbox0') || ck.hasClass('jtree-checkbox2')) return false;
				var b = true;
				n.parent().siblings().each(function(){
					if (!$(this).find('.jtree-checkbox').hasClass('jtree-checkbox1')){
						b = false;
					}
				});
				return b;
			}
			function isAllNull(n){
				var ck = n.find('.jtree-checkbox');
				if (ck.hasClass('jtree-checkbox1') || ck.hasClass('jtree-checkbox2')) return false;
				var b = true;
				n.parent().siblings().each(function(){
					if (!$(this).find('.jtree-checkbox').hasClass('jtree-checkbox0')){
						b = false;
					}
				});
				return b;
			}
		}
	}
	
	function loadData(target, ul, data){
		if (target == ul) {
			$(target).empty();
		}
		var opts = $.data(target, 'jtree').options;
		function appendNodes(ul, children, depth){
			for(var i=0; i<children.length; i++){
				var li = $('<li></li>').appendTo(ul);
				var item = children[i],itemId = item.id;
				if (item.state != 'open' && item.state != 'closed'){
					item.state = 'open';
				}
				var node = $('<div class="jtree-node"></div>').appendTo(li);
				node.attr('node-id', itemId);
				var iconCls = item["iconCls"] || "";
				var itemText = opts.formatter.call(target, item);
				$.data(node[0], 'jtree-node', {
					id : itemId,
					text: itemText,
					iconCls: iconCls,
					item: item,
					attributes: item.attributes || ""
				});
				
				$('<span class="jtree-title"></span>').html(itemText).appendTo(node);
				if (opts.checkbox){
					if (item.checked){
						$('<span class="jtree-checkbox jtree-checkbox1"></span>').prependTo(node);
					} else {
						$('<span class="jtree-checkbox jtree-checkbox0"></span>').prependTo(node);
					}
				}
				if (item.children){
					var subul = $('<ul></ul>').appendTo(li);
					if (item.state == 'open'){
						$('<span class="jtree-icon jtree-folder jtree-folder-open"></span>').addClass(iconCls).prependTo(node);
						$('<span class="jtree-hit jtree-expanded"></span>').prependTo(node);
					} else {
						$('<span class="jtree-icon jtree-icon jtree-folder"></span>').addClass(iconCls).prependTo(node);
						$('<span class="jtree-hit jtree-collapsed"></span>').prependTo(node);
						subul.css('display','none');
					}
					appendNodes(subul, item.children, depth+1);
				} else {
					if (item.state == 'closed'){
						$('<span class="jtree-icon jtree-folder"></span>').addClass(iconCls).prependTo(node);
						$('<span class="jtree-hit jtree-collapsed"></span>').prependTo(node);
					} else {
						$('<span class="jtree-icon jtree-file"></span>').addClass(iconCls).prependTo(node);
						$('<span class="jtree-indent"></span>').prependTo(node);
					}
				}
				for(var j=0; j<depth; j++){
					$('<span class="jtree-indent"></span>').prependTo(node);
				}
			}
		}
		var depth = $(ul).prev().find('>span.jtree-indent,>span.jtree-hit').length;
		appendNodes(ul, data, depth);
		
		setTimeout(function() {
			showTreeLine(target, target);
		}, 0);
	}
	function request(target, ul, param){
		var opts = $.data(target, 'jtree').options;
		if (!opts.url) return;
		param = param || {};
		var folder = $(ul).prev().find('>span.jtree-folder');
		folder.addClass('jtree-loading');
		$.ajax({
			type: 'post',
			url: opts.url,
			data: param,
			dataType: 'json',
			success: function(data){
				folder.removeClass('jtree-loading');
				loadData(target, ul, data);
				bindTreeEvents(target);
				if (opts.onLoadSuccess){
					opts.onLoadSuccess.apply(this, arguments);
				}
			},
			error: function(){
				folder.removeClass('jtree-loading');
				if (opts.onLoadError){
					opts.onLoadError.apply(this, arguments);
				}
			}
		});
	}
	function loadTreeData(target,data){
		if(data && data.length >0){
			loadData(target, target, data);
			bindTreeEvents(target);
		}
	}
	function showTreeLine(target, ul, isFlag) {
		var opts = $.data(target, "jtree").options;
		if(!opts.lines) {
			return;
		}
		if(!isFlag) {
			isFlag = true;
			$(target).find("span.jtree-indent").removeClass("jtree-line jtree-join jtree-joinbottom");
			$(target).find("div.jtree-node").removeClass("jtree-node-last jtree-root-first jtree-root-one");
			var root = $(target).tree("getRoots");
			if(root && root.length >0) {
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
		var nodeLast = $(ul).children("li:last").children("div.jtree-node").addClass("jtree-node-last");
		nodeLast.children("span.jtree-join").removeClass("jtree-join").addClass("jtree-joinbottom");
	};
	
	var util = {
			getParentNode:function (target, param){
				var nodeTarget = $(param).parent().parent().prev();
				return nodeTarget && nodeTarget.length > 0 ? this.getNode($(nodeTarget)) : null;
			},
			getCheckedNode:function (target){
				var nodes = [];
				$(target).find('.jtree-checkbox1').each(function(){
					var node = $(this).parent();
					nodes.push($.extend({}, $.data(node[0], 'jtree-node'), {
						target: node[0],
						checked: node.find('.jtree-checkbox').hasClass('jtree-checkbox1')
					}));
				});
				return nodes;
			},
			getSelectedNode:function (target){
				var nodes = [],that =this;
				$(target).find('div.jtree-node-selected').each(function(){
					var nodeTarget = $(this),node = that.getNode($(nodeTarget));
					nodes.push(node);
				});
				return nodes;
			},
			expandNode:function (target, nodeTarget){
				var opts = $.data(target, 'jtree').options;
				var hit = $('>span.jtree-hit', nodeTarget);
				var treeNode = this.getNode($(nodeTarget));
				if (hit.length == 0) return;	//
				if( opts["onBeforeExpand"].call(target,treeNode) == false){
					opts["onBeforeExpand"].call(target,treeNode);
					return ;
				}
				if (hit.hasClass('jtree-collapsed')){
					hit.removeClass('jtree-collapsed jtree-collapsed-hover').addClass('jtree-expanded');
					hit.next().addClass('jtree-folder-open');
					var ul = $(nodeTarget).next();
					if (ul.length){
						if (opts.animate){
							ul.slideDown();
						} else {
							ul.css('display','block');
						}
					} else {
						var id = $.data($(nodeTarget)[0], 'jtree-node').id;
						var subul = $('<ul></ul>').insertAfter(nodeTarget);
						request(target, subul, {id:id});	// request children nodes data
					}
				}
				opts.onExpand.call(target, treeNode);
		},
		 collapseNode:function (target, nodeTarget){
			var opts = $.data(target, 'jtree').options;
			var hit = $('>span.jtree-hit', nodeTarget);
			var treeNode = this.getNode($(nodeTarget));
			if (hit.length == 0) return;	// is a leaf node
			if( opts["onBeforeCollapse"].call(target,treeNode) == false){
				opts["onBeforeCollapse"].call(target,treeNode);
				return ;
			}
			if (hit.hasClass('jtree-expanded')){
				hit.removeClass('jtree-expanded jtree-expanded-hover').addClass('jtree-collapsed');
				hit.next().removeClass('jtree-folder-open');
				if (opts.animate){
					$(nodeTarget).next().slideUp();
				} else {
					$(nodeTarget).next().css('display','none');
				}
			}
			opts.onCollapse.call(target, treeNode);
		 },
		 toggleNode:function(target, nodeTarget){
			var hit = $('>span.jtree-hit', nodeTarget);
			if (hit.length == 0) return;	// is a leaf node
			if (hit.hasClass('jtree-expanded')){
				this.collapseNode(target, nodeTarget);
			} else {
				this.expandNode(target, nodeTarget);
			}
		},
		appendNodes : function(target, param){
			var node = $(param.parent);
			var ul = node.next();
			if (ul.length == 0){
				ul = $('<ul></ul>').insertAfter(node);
			}
			if (param.data && param.data.length){
				var nodeIcon = node.find('span.jtree-file');
				if (nodeIcon.length){
					nodeIcon.removeClass('jtree-file').addClass('jtree-folder');
					var hit = $('<span class="jtree-hit jtree-expanded"></span>').insertBefore(nodeIcon);
					if (hit.prev().length){
						hit.prev().remove();
					}
				}
			}
			loadData(target, ul, param.data);
			bindTreeEvents(target);
		},
		removeNode: function(target, param){
			var node = $(param);
			var li = node.parent();
			var ul = li.parent();
			li.remove();
			if (ul.find('li').length == 0){
				var node = ul.prev();
				node.find('.jtree-folder').removeClass('jtree-folder').addClass('jtree-file');
				node.find('.jtree-hit').remove();
				$('<span class="jtree-indent"></span>').prependTo(node);
				if (ul[0] != target){
					ul.remove();
				}
			}
			showTreeLine(target, target);
		},
		setSelectNodes:function(target, ids){
			var opts = $.data(target, "jtree").options,that = this;;
			$('div.jtree-node-selected', target).removeClass('jtree-node-selected');
			if(ids && $.isArray(ids)){
					$.each(ids, function(index,id) {
						var nodeTarget = $(target).find("div.jtree-node[node-id=" + id + "]");
						$(nodeTarget).addClass('jtree-node-selected');
					});
			}else{
				var nodeTarget = $(target).find("div.jtree-node[node-id=" + ids + "]");
				$(nodeTarget).addClass('jtree-node-selected');
			}
		},
		unSelectAll:function(target){
			$('div.jtree-node-selected', target).removeClass('jtree-node-selected');
		},
		isLeaf:function(target, param){
			var node = $(param);
			var hit = $('>span.jtree-hit', node);
			return hit.length == 0;
		},
		getNode:function(nodeTarget) {
			var nodeDom = nodeTarget[0];
			var cacheData = $.data(nodeTarget[0], 'jtree-node') || {};
			var treeNode = $.extend({}, cacheData, {
				target : nodeDom,
				state  : $(nodeDom).find(".jtree-hit").hasClass("jtree-expanded") ? "open" : "closed",
				checked: $(nodeDom).find('.jtree-checkbox').hasClass('jtree-checkbox1')
			});
			return treeNode;
		},
		getRoots:function(target) {
			var list = [],that =this;
			$(target).children("li").each(function() {
				var treeNodeDiv = $(this).children("div.jtree-node");
				var treeNode = that.getNode($(treeNodeDiv));
				list.push(treeNode);
			});
			return list;
		},
		getChildrenTreeNode:function(treeView,nodeTarget){
			var treeNodeList = [],that =this;
			if(nodeTarget){
				getChild(nodeTarget);
			}else{
				var rootNode = this.getRoots(treeView);
				for(var i = 0; i < rootNode.length; i++) {
					var node = rootNode[i];
					treeNodeList.push(node);
					getChild(node.target);
				}
			}
			function getChild(target) {
				$(target).next().find("div.jtree-node").each(function() {
					var node = that.getNode($(this));
					treeNodeList.push(node);
				});
			};
			return treeNodeList;
		},
		findNodeById:function(target, id) {
			var nodeTarget = $(target).find("div.jtree-node[node-id=" + id + "]");
			return nodeTarget && nodeTarget.length > 0 ? this.getNode($(nodeTarget)):null;
		},
		expandToTreeNode:function(treeVide, nodeTarget) {
			var list = [];
			var p = this.getParentNode(treeVide, nodeTarget);
			while(p) {
				list.unshift(p);
				p = this.getParentNode(treeVide, p.target);
			}
			for(var i = 0; i < list.length; i++) {
				this.expandNode(treeVide, list[i].target);
			}
		}
	};
	
	$.fn.tree = function(options, param){
		if (typeof options == 'string'){
			var methodFn = $.fn.tree.methods;
			if(methodFn[options] && $.isFunction(methodFn[options])){
				return methodFn[options](this, param);
			}else{
				throw options + " method is not find";
			}
			return null;
		}
		var options = options || {};
		return this.each(function(){
			var state = $.data(this, 'jtree');
			var opts;
			if (state){
				opts = $.extend(state.options, options);
				state.options = opts;
			} else {
				opts = $.extend({}, $.fn.tree.defaults, {
					url:$(this).attr('url'),
					animate:($(this).attr('animate') ? $(this).attr('animate') == 'true' : undefined)
				}, options);
				$.data(this, 'jtree', {
					options: opts,
					jtree: wrapTree(this)
				});
			}
			if (opts.url){
				request(this, this);
			}
			if(opts.lines) {
				$(this).addClass("jtree-lines");
			}
			if(opts.data) {
				loadData(this, this, opts.data);
			}
			bindTreeEvents(this);
		});
	};
	
	
	$.fn.tree.methods = {
		options : function(target, param){
			return $.data(target[0], 'jtree').options;
		},
		reload:function(target, param){
			return target.each(function(){
				$(this).empty();
				request(this, this);
			});
		},
		getParent:function(target, param){
			return util.getParentNode(target[0], param);
		},
		getChecked:function(target){
			return util.getCheckedNode(target[0]);
		},
		getSelected:function(target){
			return util.getSelectedNode(target[0]);
		},
		isLeaf:function(target, param){
			return util.isLeaf(target[0], param);	
		},
		check:function(){},
		uncheck:function(){},
		collapse:function(target, param){
			return target.each(function(){
				util.collapseNode(this, $(param));	
			});
		},
		expand:function(target, param){
			return target.each(function(){
				util.expandNode(this, $(param));
			});
		},
		append:function(target, param){
			return target.each(function(){
				util.appendNodes(this, param);
			});
		},
		toggle:function(target, param){
			return target.each(function(){
				util.toggleNode(this, $(param));
			});
		},
		remove:function(target, param){
			return target.each(function(){
				util.removeNode(this, param);
			});
		},
		getRoots:function(target){
			return  util.getRoots(target);
		},
		loadData:function(target, data){
			return target.each(function() {
				$(this).empty();
				loadTreeData(this, data);
			});
		},
		findNodeById: function(target, id) {
			return util.findNodeById(target[0], id);
		},
		unSelectAll:function(target){
			return target.each(function(){
				util.unSelectAll(this);
			});
		},
		setSelectNodes:function(target, ids){
			return target.each(function(){
				util.setSelectNodes(this, ids);
			});
		},
		getChildren:function(target, param){
			return  util.getChildrenTreeNode(target[0],param);
		},
		expandTo: function(target, param) {
			return target.each(function() {
				util.expandToTreeNode(this, $(param));
			});
		}
	};
	$.fn.tree.defaults = {
		url: null,
		animate: false,
		checkbox: false,
		lines : false,
		formatter: function(node) {
			return node.text;
		},
		onLoadSuccess: function(){},
		onLoadError: function(){},
		selectNodes: function(node) {},
		onCollapse: function(node) {},
		onBeforeCollapse: function(node) {},
		onExpand: function(node) {},
		onMouseOver: function(node) {},
		onMouseOut: function(node) {},
		onBeforeExpand: function(node) {},
		onContextMenu: function(e,node) {},
		onBeforeCheck: function(node) {},
		onCheck: function(node) {},
		onClick: function(node){},
		onDblClick: function(node){}	
	};
})(jQuery);