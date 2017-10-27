package com.web.interceptor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/** 拦截器
 * Created by xiaobing on 2016/9/5.
 */
public class CommonInterceptor implements HandlerInterceptor {
	
	
	private List<String> authPaths;
	private static final String encoding = "UTF-8";

	public List<String> getAuthPaths() {
		return authPaths;
	}

	public void setAuthPaths(List<String> authPaths) {
		this.authPaths = authPaths;
	}
	
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
    	request.setCharacterEncoding(encoding);
		response.setCharacterEncoding(encoding);
		response.setContentType("text/html;charset="+encoding);
    	String uri = request.getRequestURI();
		boolean beFilter = true;
		for (String s : authPaths) {
			if (uri.endsWith(s)) {
				beFilter = false;
				break;
			}
		}
        if (beFilter) {
//			Map<String, Object> user = new HashMap<String, Object>();
//			if (user == null) {// 未登录
//				response.setHeader("sessionstatus", "timeout");
//				System.out.println("请重新登录");
//				response.sendRedirect(request.getContextPath() + "/login");
//				return false;
//			}
		}
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
