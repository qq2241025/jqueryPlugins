package com.web.services;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;


public interface FileManageServer {
	
	//读取文件列表
    public Map<String,Object> readDiskFileList(String rootDir) throws Exception;
    //创建文件夹
    public Map<String,Object> createNewDir(String currentDir,String newDirName) throws Exception;
	/*上传图片文件*/
	public Map<String, Object> uploadImgFile(MultipartFile file,String saveDir)throws Exception;
	//下载文件
	public void downloadFile(HttpServletResponse response, String filePath)throws Exception;
	//删除文件
	public void deleteFile(String filePath)throws Exception;
	//上传doc等文件
	public Map<String, Object> uploadOtherFile(MultipartFile file,HttpServletRequest request,String saveDir) ;
}
