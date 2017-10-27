package com.web.util;

import java.net.URL;

public class Application {
	
	    public Application()  {
	    }
	    public static String getRootPath()
	    {
	        String result = Application.class.getResource("Application.class").toString();
	        int index = result.indexOf("WEB-INF");
	        if(index == -1)
	            index = result.indexOf("bin");
	        if(index == -1)
	            index = result.indexOf("wmwTools.jar");
	        result = result.substring(0, index);
	        if(result.startsWith("jar"))
	            result = result.substring(10);
	        else
	        if(result.startsWith("file"))
	            result = result.substring(6);
	        if(result.endsWith("/"))
	            result = result.substring(0, result.length() - 1);
	        result = result.replace("%20", " ");
	        result = result.replace("\\", "/");
	        return result;
	    }

	    public static String getClassRootPath()
	    {
	        String result =Application.class.getResource("Application.class").toString();
	        boolean isWeb = false;
	        if(result.indexOf("webapps") > 0)
	            isWeb = true;
	        int index = result.indexOf("WEB-INF");
	        if(index == -1)
	            index = result.indexOf("bin");
	        if(index == -1)
	            index = result.indexOf("wmwTools.jar");
	        result = result.substring(0, index);
	        if(result.startsWith("jar"))
	            result = result.substring(10);
	        else
	        if(result.startsWith("file"))
	            result = result.substring(6);
	        if(result.endsWith("/"))
	            result = result.substring(0, result.length() - 1);
	        if(isWeb)
	            result = (new StringBuilder(String.valueOf(result))).append("/WEB-INF/classes/").toString();
	        else
	            result = (new StringBuilder(String.valueOf(result))).append("/../bo/").toString();
	        result = result.replace("%20", " ");
	        result = result.replace("\\", "/");
	        return result;
	    }

	    public static final boolean isWebPublish()
	    {
	        String appPath = getRootPath();
	        return appPath.indexOf("webapps") >= 0;
	    }

	    public static String getRealFilePath(String resourcePath)
	    {
	        URL inputURL = Application.class.getResource(resourcePath);
	        String filePath = inputURL.getFile();
	        return filePath;
	    }

	    public static String getCaller()
	    {
	        StackTraceElement stack[] = (new Throwable()).getStackTrace();
	        for(int i = 0; i < stack.length; i++)
	        {
	            StackTraceElement ste = stack[i];
	            System.out.println((new StringBuilder(String.valueOf(ste.getClassName()))).append(".").append(ste.getMethodName()).append("(...);").toString());
	            System.out.println((new StringBuilder(String.valueOf(i))).append("--").append(ste.getMethodName()).toString());
	            System.out.println((new StringBuilder(String.valueOf(i))).append("--").append(ste.getFileName()).toString());
	            System.out.println((new StringBuilder(String.valueOf(i))).append("--").append(ste.getLineNumber()).toString());
	        }

	        return null;
	    }

	    public static String getCaller(int num)
	    {
	        StackTraceElement stack[] = (new Throwable()).getStackTrace();
	        for(int i = 0; i < stack.length && i < num; i++)
	        {
	            StackTraceElement ste = stack[i];
	            System.out.println((new StringBuilder(String.valueOf(ste.getClassName()))).append(".").append(ste.getMethodName()).append("(...);").toString());
	            System.out.println((new StringBuilder(String.valueOf(i))).append("--").append(ste.getMethodName()).toString());
	            System.out.println((new StringBuilder(String.valueOf(i))).append("--").append(ste.getFileName()).toString());
	            System.out.println((new StringBuilder(String.valueOf(i))).append("--").append(ste.getLineNumber()).toString());
	        }

	        return null;
	    }
}
