<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<html>
<body>
<script type="text/javascript">
window.location.href="${ctx}/home?_dc="+ new Date().getTime();
</script>
</body>
</html>
