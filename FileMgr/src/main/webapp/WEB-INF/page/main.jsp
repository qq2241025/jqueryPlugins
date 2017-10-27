<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<!DOCTYPE html>
<html>
<head>
  	<meta charset="utf-8">
 	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<title>AdminLTE 2 | Fixed Layout</title>
  	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  	
  	<%@ include file="common/taglibs.jsp"%>
	<link href="${ctx}/js/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="${ctx}/js/lib/bootstrap/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="${ctx}/js/lib/bootstrap/css/AdminLTE.min.css" rel="stylesheet"/>
	<link href="${ctx}/js/lib/viewer/viewer.min.css" rel="stylesheet"/>
	
	<script src="${ctx}/js/lib/jquery/jquery-1.12.4.js" type="text/javascript"></script>
	<script src="${ctx}/js/lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${ctx}/js/lib/bootstrap/js/adminlte.min.js"></script>
	
	<script type="text/javascript" src="${ctx}/js/lib/viewer/viewer.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/lib/bootstrap/js/bootstrap-paginator.js"></script>
	

  
</head>
<body class="hold-transition skin-blue layout-boxed sidebar-mini">
<div class="wrapper">

  <header class="main-header">
    <a href="../../index2.html" class="logo">
      <span class="logo-mini"><b>A</b>LT</span>
      <span class="logo-lg"><b>Admin</b>LTE</span>
    </a>
    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown messages-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-envelope-o"></i>
              <span class="label label-success">4</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 4 messages</li>
              <li class="footer"><a href="#">See All Messages</a></li>
            </ul>
          </li>
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">10</span>
            </a>
          </li>
          <li class="dropdown tasks-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-flag-o"></i>
              <span class="label label-danger">9</span>
            </a>
          </li>
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>


  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="images/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>亚历山大·皮尔斯</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="搜索内容....">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">主面板</li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-dashboard"></i> <span>指示板</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="../../index.html"><i class="fa fa-circle-o"></i> 指示板 v1</a></li>
            <li><a href="../../index2.html"><i class="fa fa-circle-o"></i> 指示板 v2</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>图标</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="../charts/chartjs.html"><i class="fa fa-circle-o"></i> 图标</a></li>
            <li><a href="../charts/morris.html"><i class="fa fa-circle-o"></i> 图标</a></li>
            <li><a href="../charts/flot.html"><i class="fa fa-circle-o"></i> 图标</a></li>
            <li><a href="../charts/inline.html"><i class="fa fa-circle-o"></i> 图标</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-laptop"></i>
            <span>页面</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="../UI/general.html"><i class="fa fa-circle-o"></i> 常规</a></li>
            <li><a href="../UI/icons.html"><i class="fa fa-circle-o"></i> 图标</a></li>
            <li><a href="../UI/buttons.html"><i class="fa fa-circle-o"></i> 按钮</a></li>
            <li><a href="../UI/sliders.html"><i class="fa fa-circle-o"></i> 活动</a></li>
            <li><a href="../UI/timeline.html"><i class="fa fa-circle-o"></i> 时间线</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-edit"></i> <span>表单</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="../forms/general.html"><i class="fa fa-circle-o"></i> General Elements</a></li>
            <li><a href="../forms/advanced.html"><i class="fa fa-circle-o"></i> Advanced Elements</a></li>
            <li><a href="../forms/editors.html"><i class="fa fa-circle-o"></i> Editors</a></li>
          </ul>
        </li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- =============================================== -->
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Layout</a></li>
        <li class="active">Fixed</li>
      </ol>
      <h1>Fixed Layout</h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="callout callout-info">
        <h4>Tip!</h4>
        <p>固定类body标签添加到这个布局。固定布局是你最好的选择,如果你的边栏大于你的内容,因为它可以防止多余的滚动。</p>
      </div>
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">box标题</h3>
          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
              <i class="fa fa-minus"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
              <i class="fa fa-times"></i></button>
          </div>
        </div>
        <div class="box-body">
          box内容
        </div>
        <div class="box-footer">
          box底部
        </div>
      </div>
    </section>
  </div>

  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.4.0
    </div>
     <strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">测试版本</a>.</strong> All rights reserved.
  </footer>

  <div class="control-sidebar-bg"></div>
</div>
</body>
</html>
