package com.web.services.impl;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.web.services.FileManageServer;
import com.web.util.DateUtils;
import com.web.util.EncryUtils;

@Service
public class FileManageServerImpl implements FileManageServer{
	
		public final List<String> ALLOW_TYPES = Arrays.asList("image/jpg","image/jpeg","image/png","image/gif" );
		public String encryPath(String path){
			return EncryUtils.encodeStr(path);
		}
		
	    public String decryPath(String encodePath){
			return EncryUtils.decodeStr(encodePath);
		}
		
		private List<Map<String,Object>> getRootDiskList(){
			File[] roots = File.listRoots();// 获取磁盘分区列表
			FileSystemView fsv = FileSystemView.getFileSystemView(); 
			List<Map<String,Object>> array = new ArrayList<Map<String,Object>>();
			for (File disk : roots) {  
				 Map<String,Object> obj = new HashMap<String,Object>();
	             String modfiyTime = DateUtils.dateTimeToStr(new Date(disk.lastModified()));
	             String diskName= fsv.getSystemDisplayName(disk);
	             
	             if(StringUtils.isNotEmpty(diskName)){
	            	 long total = disk.getTotalSpace();
	            	 long used = total - disk.getFreeSpace();
	            	 obj.put("name",diskName);
					 obj.put("modfiyTime",modfiyTime);
					 obj.put("total",(total/(1024*1024))/1024);
					 obj.put("used",(used/(1024*1024))/1024);
					 obj.put("type","disk");
					 obj.put("url",encryPath(disk.getAbsolutePath()));
					 obj.put("size",(total/(1024*1024))/1024 + "G");
					 array.add(obj);
	             }
	         }  
			 return array;
		}
		
		private String getFileSize(File file){
			String size = "";
			if(file!=null){
				long fileS = file.length();
				DecimalFormat df = new DecimalFormat("#.00"); 
	            if (fileS < 1024) {
	               size = df.format((double) fileS) + "BT";
	            } else if (fileS < 1048576) {
	               size = df.format((double) fileS / 1024) + "KB";
	            } else if (fileS < 1073741824) {
	               size = df.format((double) fileS / 1048576) + "MB";
	            } else {
	               size = df.format((double) fileS / 1073741824) +"GB";
	            }
			}
			return size;
		}
		
		//获取文件列表
		public Map<String,Object> readDiskFileList(String rootDir)  throws Exception{
			Map<String,Object> result = new HashMap<String,Object>();
			List<Map<String,Object>> array = new ArrayList<Map<String,Object>>();
			rootDir = decryPath(rootDir);
			if(StringUtils.isEmpty(rootDir)){
				result.put("list",this.getRootDiskList());
				result.put("success", true);
				return result;
			}else{
				File dir = new File(rootDir);
				if(dir!=null){
					 File[] children = dir.listFiles();  
					 
					 
					 List<Map<String,Object>> dirList = new ArrayList<Map<String,Object>>();
					 List<Map<String,Object>> fileList = new ArrayList<Map<String,Object>>();
					 
					 if(children!=null && children.length>0){
						 for (int i = 0; i < children.length; i++) {
							 File childfile = children[i];
							 String filename = childfile.getName();
							 String prefix   = childfile.isDirectory() ? "folder" : this.getFilePrefix(filename);
							 Map<String,Object> obj = new HashMap<String,Object>();
							 String modfiyTime = DateUtils.dateTimeToStr(new Date(childfile.lastModified()));
							 
							 
							 obj.put("name",childfile.getName());
							 obj.put("modfiyTime",modfiyTime);
							 obj.put("type",prefix);
							 obj.put("parentPath", encryPath(childfile.getParent()));
							 obj.put("url",encryPath(childfile.getAbsolutePath()));
							 //文件夹
							 if(childfile.isDirectory()){
								 obj.put("size","0KB");
							 }else{
								 obj.put("size",getFileSize(childfile));
							 }
							 //隐藏文件不读取
							 if(!childfile.isHidden()) {
								 //
								 if(childfile.isDirectory()){
									 dirList.add(obj);
								 }else{
									 fileList.add(obj);
								 }
							 }
						 }
					 }
					 array.addAll(dirList);
					 array.addAll(fileList);
					 result.put("parentPath", encryPath(dir.getParent()));
				}
				result.put("list", array);
				result.put("success", true);
			}
			return result;
		}
		//创建文件夹
		@Override
		public Map<String,Object> createNewDir(String dirPath, String fileName) {
			Map<String,Object> json = new HashMap<String,Object>();
			dirPath = decryPath(dirPath);
			File dir = new File(dirPath);
			if(dir.exists() && dir.isDirectory()){
				File newfileDir  = new File(fileName);
				newfileDir.mkdir();
				json.put("msg","创建成功");
				json.put("success",true);
			}else{
				json.put("msg","创建失败");
				json.put("success",false);
			}
			return json;
		}
		
		//校验文件类型是否是被允许的
	    public  boolean allowUpload(String postfix){
	        return ALLOW_TYPES.contains(postfix);
	    }
	
	
	
		@Override
		public Map<String, Object> uploadImgFile(MultipartFile multilFile,String saveDir)throws Exception {
			Map<String, Object> result = new HashMap<String, Object>();
			// 获取真实盘符路径
			try {
				if(multilFile==null){
					result.put("success",false);
					result.put("msg","UPLOAD_IMAGE_NULL");
				}else{
					InputStream file = multilFile.getInputStream();
					if(this.allowUpload(multilFile.getContentType())){
						String type = ".png";
						String sysName = System.currentTimeMillis()+ "" ;
						File refile = new File(saveDir);
						if(!refile.exists()){
							refile.mkdirs();
						}
						String imgfilePath = saveDir +File.separator + sysName+ type;
						BufferedImage bufferImg = ImageIO.read(file);
						Integer srcWidth  = bufferImg.getWidth(); // 源图宽度
					    Integer srcHeight = bufferImg.getHeight(); // 源图高度
						this.uploadFileAndCompressImage(bufferImg, new FileOutputStream(imgfilePath),false,srcWidth,srcHeight);
						result.put("success",true);
						result.put("msg",imgfilePath);
					}else{
						result.put("success",false);
						result.put("msg","UPLOAD_NOT_SUPPORT_IMAGE");
					}
				}
			} catch (IOException e) {
				e.printStackTrace();
				result.put("success",false);
				result.put("msg","UPLOAD_ERROR_MSG");
			}
			return result;
		}
	
		@Override
		public void downloadFile(HttpServletResponse response, String filePath) throws Exception {
			OutputStream out = null; 
			try {
				// 获取虚拟路径
				if(StringUtils.isNotEmpty(filePath)){
					File file = new File(filePath);
					if(file!=null && file.isFile()){
						response.setContentType("application/octet-stream; charset=utf-8");
						response.setHeader("Content-Disposition","attachment; filename=" + file.getName());
						out = response.getOutputStream(); 
						out.write(FileUtils.readFileToByteArray(file));
						out.flush();
					}
				}
			} catch (IOException e) {
				e.printStackTrace(); 
			} finally {
				if(out!=null){
					out.close();
				}
		   }
		}
	
	
		@Override
		public void deleteFile(String filePath) throws Exception {
			// 获取虚拟路径
			if(StringUtils.isNotEmpty(filePath)){
				File file = new File(filePath);
				if(file!=null && file.isFile()){
					file.delete();
				}
			}
		}
	
		 //获取文件名字
		 public  String getFileNameNoEx(String filename) {   
	        if ((filename != null) && (filename.length() > 0)) {   
	            int dot = filename.lastIndexOf('.');   
	            if ((dot >-1) && (dot < (filename.length()))) {   
	            	return filename.substring(dot + 1);   
	            }   
	        }   
	        return filename;   
	    }
		//获取文件后缀名
		public  String getFilePrefix(String fileName){
	    	String prefix = "";
	    	if(StringUtils.isNotEmpty(fileName) && fileName.lastIndexOf(".") >0){
	    		prefix = fileName.substring(fileName.lastIndexOf(".")+1);
	    	}else{
	    		prefix = "unknown";
	    	}
	        return prefix;
	    }
	
	
		/**
		 * 上传任意文件
		 */
		@Override
		public Map<String, Object> uploadOtherFile(MultipartFile multilFile,HttpServletRequest request,String saveDir) {
			Map<String, Object> result = new HashMap<String, Object>();
			boolean isReName = false;
			// 获取真实盘符路径
			try {
				if(multilFile ==null){
					result.put("success",false);
					result.put("msg","UPLOAD_FILE_NULL");
				}else{
					InputStream inputStream = multilFile.getInputStream();
					String fileName = multilFile.getOriginalFilename();
					saveDir = decryPath(saveDir);
					File refile = new File(saveDir);
					if(!refile.exists()){
						refile.mkdirs();
					}
					//是否需要从命名
					if(isReName){
						String type = this.getFilePrefix(fileName);
						fileName = System.currentTimeMillis()+ type;
					}
					String filePath = saveDir +File.separator + fileName;
					this.fileUpLoad(inputStream, new FileOutputStream(filePath));
					//全路径
		            result.put("success",true);
					result.put("msg",filePath);
				}
			} catch (Exception e) {
				e.printStackTrace();
				result.put("success",false);
				result.put("msg","UPLOAD_ERROR_MSG");
			}
			return result;
		}
	
	
		private  void fileUpLoad(InputStream ins, FileOutputStream out) throws Exception {
	       int read = 0;  
	       byte[] bytes = new byte[1024];  
	       while ((read = ins.read(bytes)) != -1) {  
	           out.write(bytes, 0, read);  
	       }  
	       out.flush();  
	       out.close();  
		}
	
	   /**
	    * 按照 宽高 比例压缩
	    * 
	    * @param width
	    * @param height
	    * @param out
	    * @throws IOException
	    */
	   public void thumbnail_w_h(InputStream fileStream, int width, int height,
	           OutputStream out,boolean isText) throws IOException {
	       BufferedImage buffImg = ImageIO.read(fileStream);
	       double srcWidth = buffImg.getWidth(); // 源图宽度
	       double srcHeight = buffImg.getHeight(); // 源图高度
	
	       double scale = 1;
	
	       if (width > 0) {
	           scale = width / srcWidth;
	       }
	       if (height > 0) {
	           scale = height / srcHeight;
	       }
	       if (width > 0 && height > 0) {
	           scale = height / srcHeight < width / srcWidth ? height / srcHeight : width / srcWidth;
	       }
	       uploadFileAndCompressImage(buffImg, out,isText, (int) (srcWidth * scale), (int) (srcHeight * scale));
	   }
	   /**
	    * 按照固定宽高原图压缩
	    * 
	    * @param width
	    * @param height
	    * @param out
	    * @throws IOException
	    */
	   private  void uploadFileAndCompressImage(BufferedImage buffImg, OutputStream out,boolean isText, int width, int height) throws IOException {
		   if(buffImg!=null){
		       Image image = buffImg.getScaledInstance(width, height, Image.SCALE_DEFAULT);
		       BufferedImage tag = new BufferedImage(width, height,BufferedImage.TYPE_INT_RGB);
		       Graphics g = tag.getGraphics();
		       g.setColor(Color.RED);
		       g.drawImage(image, 0, 0, null); // 绘制处理后的图
		       g.dispose();
		       ImageIO.write(tag, "JPEG",out);
		       out.close();
		   }else{
			   System.out.println("BufferedImage is null ");
		   }
	  }
} 
