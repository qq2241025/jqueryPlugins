package com.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


/**
 * 用户controller
 */
@Controller
@RequestMapping("home")
public class HomeController {

	

	/**
	 * 跳转到登录页面
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping("")
	public ModelAndView login(ModelMap modelMap,HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception{
		return new ModelAndView("/index");
	}
	@RequestMapping("index")
	public ModelAndView index(ModelMap modelMap,HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception{
		return new ModelAndView("/demo");
	}
	
}
