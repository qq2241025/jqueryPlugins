

function pad(num, n) {  
    var len = num.toString().length;  
    while(len < n) {  
        num = "0" + num;  
        len++;  
    }  
    return num;  
}  

var  getSMSCode = function(num){
	
   var mat = Math.pow(10,num);
   for(var i = 0 ;i<100;i++){
   	   var codeNum = mat[i]+"";
   	   var len  = 6 - code.length;
   	   var newValu= pad(codeNum,len);
   	   console.log(newValu);
   }
	
}
