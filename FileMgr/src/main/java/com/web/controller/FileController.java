package com.web.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.web.services.FileManageServer;

@Controller
@RequestMapping(value = "/fileMgr")
public class FileController{
	
	@Autowired
	private FileManageServer fileServer;
	
	
	@RequestMapping(value="") 
    public ModelAndView index(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return   new ModelAndView("/file/fileManage");
    } 
	 //文件列表
	 @RequestMapping(value="/listFile") 
	 @ResponseBody
     public Map<String,Object> listFile(HttpServletRequest request,HttpServletResponse response,String filePath) throws Exception{
		return  this.fileServer.readDiskFileList(filePath);
     } 
	//创建文件夹
	@RequestMapping(value="/createFolder") 
	@ResponseBody
	public Map<String,Object> createFolder(HttpServletRequest request,HttpServletResponse response,String currentDir,String newDirName) throws Exception{
		return this.fileServer.createNewDir(currentDir, newDirName);
	} 
	//上传文件
	@RequestMapping(value="/upload")
	@ResponseBody
	public Map<String,Object> upload(@RequestParam("file") MultipartFile file ,HttpServletRequest request,HttpServletResponse response,String path) throws Exception{
		 return fileServer.uploadOtherFile(file, request, path);
	}
}
