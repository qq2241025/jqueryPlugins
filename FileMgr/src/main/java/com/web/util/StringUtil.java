package com.web.util;

import java.util.regex.Pattern;

public class StringUtil {
	/*
	 * 判断字符串是否为�?
	 */
	public static boolean isEmpty(String str){
		return str == null || str.trim().length() == 0 || "null".equalsIgnoreCase(str.trim());
	}
	/*
	 * 将字符串null转换为空
	 */
	public static String trimNull(String str){
		if( str == null || "null".equalsIgnoreCase(str.trim()))
			return "";
		return str.trim();
	}
	/*
	 * 将字符串null转换为空
	 */
	public static String trimNull(Object obj){
		String str = String.valueOf(obj);
		if( str == null || "null".equalsIgnoreCase(str.trim()))
			return "";
		return str.trim();
	}	
	/*
	 * 将字符串null转换为任意字�?
	 */
	public static String nullToValue(String str,String value){
		if( str == null || "null".equalsIgnoreCase(str.trim()))
			return value;
		return str.trim();
	}
	/*
	 * 将单引号 ' 转换�? 双引�? "  主要为了方便构�?�xml内容
	 */
	public static String transfDblQuot(String str){
		return str.replaceAll("'", "\"");
	}
	/*
	 * 将yyyy-MM-dd hh:mm:ss.SSS日期格式的字符串转换为yyyy-MM-dd字符串格�?
	 */
	public static String conv2YyyyMmDdWithSep(String str){
		if(isEmpty(str)){
			return "";
		}else{
			return str.split(" ")[0];
		}
	}
	/*
	 * 将yyyy-MM-dd hh:mm:ss.SSS日期格式的字符串转换为hh:mm:ss.SSS字符串格�?
	 */
	
	public static String conv2HhMmSsWithSep(String str){
		if( isEmpty(str)){
			return "";
		}else{
			return str.split(" ")[1].split("\\.")[0];
		}
	}
	
	/*
	 * 将yyyy-MM-dd hh:mm:ss.SSS日期格式的字符串转换为hh:mm:ss.SSS字符串格�?
	 */
	
	public static String conv2YyyyMmWithSep(String str){
		if( isEmpty(str)){
			return "";
		}else{
			return str.split(" ")[0].substring(0,7);
		}
	}
	
	/*
	 * 将yyyy-MM-dd hh:mm:ss.SSS日期格式的字符串转换为yyyy-MM-dd hh:mm:ss字符串格�?
	 */	
	public static String conv2DateTime(String str){
		if( isEmpty(str)){
			return "";
		}else{
			return str.split("\\.")[0];
		}
	}
	/**
	 * 判断字符串不为空
	 * @param str
	 * @return
	 */
	public static boolean isNotEmpty(String str){
		return !isEmpty(str);
	}
	/**
	 * �? " ' 字符转换为全角的字符
	 * @param str
	 * @return
	 */
	public static String castQujiao(String str){
		if(isEmpty(str)){
			return "";
		}
		String tmp = str.replaceAll("'","�?");
		return trimNull(tmp.replaceAll("\"","�?"));
	}
	/**
	 * 转换为html的编�?
	 * @param str
	 * @return
	 */
	public static String toHtmlEncode(String str){
		if( isEmpty(str)){
			return "";
		}
		str=str.replaceAll("&", "&amp;");
		str=str.replaceAll("<","&lt;");
		str=str.replaceAll(">","&gt;");
		str=str.replaceAll("'","&apos;");
		str=str.replaceAll("\"","&quot;");
		str=str.replaceAll("\r\n","<br><br>&nbsp;&nbsp;&nbsp;&nbsp;");
//		str=str.replaceAll("\n","<br>");
//		str=str.replaceAll("/g","&nbsp;");
//		str=str.replaceAll("/\t/g","&nbsp;&nbsp;&nbsp;&nbsp;");
		return str;
	}
	/**
	 * 转换为xml的编�?
	 * @param str
	 * @return
	 */
	public static String toXmlEncode(String str){
		if( isEmpty(str)){
			return "";
		}
		str=str.replaceAll("&", "&amp;");
		str=str.replaceAll("<","&lt;");
		str=str.replaceAll(">","&gt;");
		str=str.replaceAll("'","&apos;");
		str=str.replaceAll("\"","&quot;");
		return str;		
	}
	/**
	 * 为长度不够指定�?�得整数在左边补0
	 * @param value
	 * @param length
	 * @return
	 * @throws Exception
	 */
	public static String addLeftZero(int value,int length)throws Exception{
		String tmp = String.valueOf(value);
		int diff = length - tmp.length();
		for(int i=0;i<diff;i++){
			tmp = "0" + tmp;
		}
		return tmp;
	}
	public static String trimRightZero(String str)throws Exception{
		if(isEmpty(str)){
			return "";
		}
		return str.replaceAll("\\.{0,1}[0]+$","");
	}
	public final static String toUpperForFirstChar(String str) {
		if( isEmpty(str)) return "";
		return str.substring(0, 1).toUpperCase() + str.substring(1);
	}	
	/**
	 * ISO-8859-1,UTF-8
	 * @param str
	 * @return
	 */
	public final static String cast2Gbk(String str,String srcCode){
		if( isEmpty(str)){
			return "";
		}
		String ret = "";
		try{
			ret =  new String(str.getBytes(srcCode),"GBK");
			return ret;
		}catch (Exception e) {
			return "";
		}
	}
	/**
	 * ISO-8859-1,UTF-8
	 * @param str
	 * @return
	 */
	public final static String cast2UTF8(String str,String srcCode){
		if( isEmpty(str)){
			return "";
		}
		String ret = "";
		try{
			ret =  new String(str.getBytes(srcCode),"UTF-8");
			return ret;
		}catch (Exception e) {
			return "";
		}
	}	
	public final static boolean isMobileNo(String str){
		return Pattern.matches("^1[3|5][\\d]{9}$",str);
	}
	public final static boolean isTelNo(String str){
		return Pattern.matches("(^[0-9]{3,4}[0-9]{7,8}$)|(^[0-9]{7,8}$)", str);
	}
}
