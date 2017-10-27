<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs-noscipts.jsp" %>



<div class="box box box-success">
  <div class="box-header with-border">
    <h3 class="box-title">
    	<div class="btn-group">
	         <button type="button" class="btn btn-info" title="回到根目录" id="rootBtn"><i class="glyphicon glyphicon-home"></i> 根目录</button>
	         <button type="button" class="btn btn-info" title="返回上一级" id="updirBtn"><i class="glyphicon glyphicon-home"></i> 返回上一级</button>
	         <button type="button" class="btn btn-info" title="新建文件夹" id="mkdirBtn"><i class="glyphicon glyphicon-folder-open"></i> 新建文件夹</button>
	         <button type="button" class="btn btn-info" title="上传文件" id="uploadBtn"><i class="glyphicon glyphicon-upload"></i> 上传文件</button>
	         <button type="button" class="btn btn-info" title="刷新" id="refreshBtn"><i class="glyphicon glyphicon-refresh"></i> 刷新</button>
	         <button type="button" class="btn btn-info" title="删除" id="removeBtn"><i class="glyphicon glyphicon-trash"></i> 删除</button>
	         <button type="button" class="btn btn-info checkedView" title="列表"   id="listBtn" dataType="view"><i class="glyphicon glyphicon-list"></i>列表</button>
	         <button type="button" class="btn btn-info" title="缩略图" id="pingpuBtn" dataType="view"><i class="glyphicon glyphicon-th-large"></i>缩略图</button>
       </div>
    </h3>
  </div>
  <div class="box-body">
      <div id="fileContiner">
      
      </div>
  </div>
</div>

<script type="text/javascript">
	require(['js/file/FileManage.js'], function(mod){
		mod.init();
	});
</script>