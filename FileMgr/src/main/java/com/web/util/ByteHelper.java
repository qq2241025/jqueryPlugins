package com.web.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
public class ByteHelper {

	/** 小写十六进制字符 */
	public final static String[] hexDigits = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };
	/** 大写十六进制字符 */
	public final static String[] HEXDigits = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" };

	/**
	 * 构�?�?
	 */
	private ByteHelper() {

	}

	/**
	 * 获得�?��整数的byte数组表示
	 * 
	 * @param i
	 *            任意整数，此值大小不会影响到转换速度
	 * @return byte[4]
	 */
	public static byte[] toBytes(int i) {
		byte[] bytes = new byte[4];// FIXME 创建数组这么费时间，怎么�?
		bytes[0] = (byte) (i & 0xff);
		bytes[1] = (byte) ((i >> 8) & 0xff);
		bytes[2] = (byte) ((i >> 16) & 0xff);
		bytes[3] = (byte) (i >>> 24);
		return bytes;
	}

	/**
	 * 从byte数组表示转换为一个int数字
	 * 
	 * @param bytes
	 *            如果传入的数组大小不�?，那么会自动补充�?个，且原数据会左对齐
	 * @return 返回bytes的整数表�?
	 */
	public static int toInt(byte[] bytes) {
		int i = 0;
		if (bytes.length == 4) {
			i = (bytes[0] & 0xff) | ((bytes[1] << 8) & 0xff00) | ((bytes[2] << 24) >>> 8) | (bytes[3] << 24);
		} else {

		}

		return i;

	}

	/**
	 * 将一个short型整数（16位）放置在一个byte数组中，占两个byte�?如果传入的数组长度不能再增加�?��short型，则不增加直接返回pos
	 * 
	 * @param s
	 *            �?��编码的整�?
	 * @param ba
	 *            �?��放置的byte数组
	 * @param pos
	 *            数组的起始位�?
	 * @return int 返回数组增加short后的位置
	 */
	public static int short2bytes(short s, byte[] ba, int pos) {
		if (ba.length <= pos + 2)
			return pos;
		ba[pos] = (byte) (s >>> 8 & 0xff);
		ba[pos + 1] = (byte) (s & 0xff);
		return pos + 2;
	}

	/**
	 * 将偏移量处的2个字节，变成短整数字节（short�?
	 * 
	 * @param ba
	 *            字节数组
	 * @param pos
	 *            偏移�?
	 * @return short 解码后的短整形数
	 */
	public static short bytes2short(byte[] ba, int pos) {
		if (ba.length < pos + 2)
			return 0;

		short word0 = (short) ((ba[pos] & 0xff) << 8 | ba[pos + 1] & 0xff);
		return word0;
	}

	/**
	 * 将偏移量�?个字节，变成32位整数（int)
	 * 
	 * @return int 返回整数信息
	 */
	public static int bytes2int(byte[] ba, int pos) {
		if (ba.length < pos + 4)
			return 0;
		int i = (ba[pos] & 0xff) << 24 | (ba[pos + 1] & 0xff) << 16 | (ba[pos + 2] & 0xff) << 8 | ba[pos + 3] & 0xff;
		return i;
	}

	/**
	 * 无符�?字节数组转换为long
	 * 
	 * @param buf
	 * @param pos
	 * @return
	 */
	public static long unsigned4Bytes2long(byte[] buf, int pos) {
		int firstByte = 0;
		int secondByte = 0;
		int thirdByte = 0;
		int fourthByte = 0;
		int index = pos;
		firstByte = (0x000000FF & ((int) buf[index]));
		secondByte = (0x000000FF & ((int) buf[index + 1]));
		thirdByte = (0x000000FF & ((int) buf[index + 2]));
		fourthByte = (0x000000FF & ((int) buf[index + 3]));
		index = index + 4;
		return ((long) (firstByte << 24 | secondByte << 16 | thirdByte << 8 | fourthByte)) & 0xFFFFFFFFL;
	}

	/**
	 * 8字节数组转换为long
	 * 
	 * @param b
	 * @return
	 */
	public static long bytes2long(byte[] b) {
		int mask = 0xff;
		int temp = 0;
		int res = 0;
		for (int i = 0; i < 8; i++) {
			res <<= 8;
			temp = b[i] & mask;
			res |= temp;
		}
		return res;
	}

	/**
	 * long 转换�?8字节数组
	 * 
	 * @param num
	 * @return
	 */
	public static byte[] long2bytes(long num) {
		byte[] b = new byte[8];
		for (int i = 0; i < 8; i++) {
			b[i] = (byte) (num >>> (56 - i * 8));
		}
		return b;
	}

	/**
	 * 将一个int型整数（32位）放置在一个byte数组中，�?个byte�?如果传入的数组长度不能再增加�?��int型，则不增加直接返回pos
	 * 
	 * @param i
	 *            �?��编码的整�?
	 * @param ba
	 *            �?��放置的byte数组
	 * @param pos
	 *            数组的起始位�?
	 * @return int 返回数组增加int后的位置
	 */
	public static int int2bytes(int i, byte[] ba, int pos) {
		if (ba.length < pos + 4)
			return pos;

		ba[pos] = (byte) (i >>> 24 & 0xff);
		ba[pos + 1] = (byte) (i >>> 16 & 0xff);
		ba[pos + 2] = (byte) (i >>> 8 & 0xff);
		ba[pos + 3] = (byte) (i & 0xff);
		return pos + 4;
	}

	/**
	 * 将整数转换成16进制字符串，到长度len，不够补0
	 * 
	 * @param i
	 *            要转换的整数
	 * @param len
	 *            16进制定长字符串的长度
	 * @return String 返回16进制定长字符�?
	 * @exception NumberFormatException
	 *                数据格式错误
	 */
	public static String int2LengthHex(int i, int len) throws NumberFormatException {
		String sh = Integer.toHexString(i);
		if (len == 0)
			return sh;
		if (sh.length() > len)
			throw new NumberFormatException("value length is longer than defined length");
		StringBuilder strRet = new StringBuilder();
		for (int j = 0; j < len - sh.length(); j++) {
			strRet.append("0");
		}
		strRet.append(sh);

		return strRet.toString();
	}

	/**
	 * 将整数转换成指定长度字符串，10进制,不够�?
	 * 
	 * @param i
	 *            要转换的整数
	 * @param len
	 *            定长字符串的长度
	 * @return String 返回定长字符�?
	 * @exception NumberFormatException
	 *                数据格式错误
	 */
	public static String int2LengthDec(int i, int len) throws NumberFormatException {
		String sh = Integer.toString(i);
		if (len == 0)
			return sh;
		if (sh.length() > len)
			throw new NumberFormatException("value length is longer than defined length");
		StringBuilder strRet = new StringBuilder();
		for (int j = 0; j < len - sh.length(); j++) {
			strRet.append("0");
		}
		strRet.append(sh);
		return strRet.toString();
	}

	/**
	 * 将byte数组转换�?6进制字符串，用分隔符连接
	 * 
	 * @param block
	 *            byte[]
	 * @param sep
	 *            String
	 * @return String
	 */
	public static String bytes2HexString(byte[] block, String sep) {
		if (null == sep)
			sep = "";
		StringBuffer buf = new StringBuffer();
		int len = block.length;
		for (int i = 0; i < len; i++) {
			byte2HexString(block[i], buf);
			if (i < len - 1) {
				buf.append(sep);
			}
		}
		return buf.toString();
	}

	/**
	 * 数组转换�?6进制字符�?
	 * 
	 * @param block
	 * @return
	 */
	public static String bytes2HexString(byte[] block) {
		StringBuffer buf = new StringBuffer();
		int len = block.length;
		for (int i = 0; i < len; i++) {
			byte2HexString(block[i], buf);
		}
		return buf.toString();
	}

	/**
	 * 将单个字符转换为16进制
	 * 
	 * @param b
	 * @return
	 */
	public static String byte2HexString(byte b) {
		int high = ((b & 0xf0) >> 4);
		int low = (b & 0x0f);
		return "" + HEXDigits[high] + HEXDigits[low];
	}

	/**
	 * 将单个字符转换为16进制并追加到buffer�?Converts a byte to hex digit and writes to the
	 * supplied buffer
	 * 
	 * @param b
	 * @param buf
	 */
	public static void byte2HexString(byte b, StringBuffer buf) {
		char[] hexChars = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };
		int high = ((b & 0xf0) >> 4);
		int low = (b & 0x0f);
		buf.append(hexChars[high]);
		buf.append(hexChars[low]);
	}

	/**
	 * 字符串转换为BCD�?
	 * 
	 * @param asc
	 * @return
	 */
	public static byte[] string2bytes(String asc) {
		int len = asc.length();
		int mod = len % 2;
		if (mod != 0) {
			asc = "0" + asc;
			len = asc.length();
		}
		byte abt[] = new byte[len];
		if (len >= 2) {
			len = len / 2;
		}
		byte bbt[] = new byte[len];
		abt = asc.getBytes();
		int j, k;
		for (int p = 0; p < asc.length() / 2; p++) {
			if ((abt[2 * p] >= '0') && (abt[2 * p] <= '9')) {
				j = abt[2 * p] - '0';
			} else if ((abt[2 * p] >= 'a') && (abt[2 * p] <= 'z')) {
				j = abt[2 * p] - 'a' + 0x0a;
			} else {
				j = abt[2 * p] - 'A' + 0x0a;
			}
			if ((abt[2 * p + 1] >= '0') && (abt[2 * p + 1] <= '9')) {
				k = abt[2 * p + 1] - '0';
			} else if ((abt[2 * p + 1] >= 'a') && (abt[2 * p + 1] <= 'z')) {
				k = abt[2 * p + 1] - 'a' + 0x0a;
			} else {
				k = abt[2 * p + 1] - 'A' + 0x0a;
			}
			int a = (j << 4) + k;
			byte b = (byte) a;
			bbt[p] = b;
		}
		return bbt;
	}

	/**
	 * 在原始增数组上追加指定长度的字符串编�?
	 * 
	 * @param s
	 *            字符�?
	 * @param ba
	 *            字符串编码到的字符数�?
	 * @param pos
	 *            在字符数组中，字符串编码的起始位�?
	 * @throws encoderException
	 *             编码错误
	 */
	public static int appendString2bytes(String s, byte[] ba, int pos) {
		if (ba.length <= pos + s.length())
			return pos;
	
		for (int k = 0; k < s.length(); k++) {
			ba[pos + k] = (byte) (s.charAt(k) & 0xff);
		}
		return pos + s.length();
	}

	/**
	 * 合并两个数组
	 * 
	 * @param validData
	 * @param tailData2
	 * @return
	 */
	public static byte[] mergeBytes(byte[] validData, byte[] tailData2) {
		if (validData != null && tailData2 != null) {
			byte[] target = new byte[validData.length + tailData2.length];
			System.arraycopy(validData, 0, target, 0, validData.length);
			System.arraycopy(tailData2, 0, target, validData.length, tailData2.length);
			return target;
		} else
			return null;
	}

	/**
	 * 查询数组subArr�?��array的最后出现的位置 要求连续的字节与子数组完全一�?
	 * 
	 * @param array
	 *            要查询的父数�?
	 * @param subArr
	 *            要查询的子数�?
	 * @return 返回找到的最后位�?
	 */
	public static int lastIndexOfArray(byte[] array, byte[] subArr) {
		if (array == null || subArr == null || array.length < subArr.length)
			return -1;
		int index = -1;
		// 该算法不优化，弃�?
		// for(int i=0;i<array.length;i++){
		// if(array[i]==subArr[0]){
		// if(Arrays.equals(Arrays.copyOfRange(array, i, i+subArr.length),
		// subArr)){
		// index =i;
		// }
		// }
		//
		// }
		for (int i = array.length - 1; i >= subArr.length - 1; i--) {
			if (array[i] == subArr[subArr.length - 1]) {
				if (subArr.length == 1)
					index = i;
				boolean found = true;
				for (int j = subArr.length - 2; j >= 0; j--) {
					if (array[i + 1 + j - subArr.length] != subArr[j]) {
						// 有一个不等则�?��
						found = false;
						break;
					}
				}
				if (found) {// 全部相等则�?�?
					index = i - subArr.length + 1;
					break;
				}
			}

		}
		return index;
	}

	/**
	 * 查询数组subArr�?��数组array的最先出现的位置 要求连续的字节与子数组完全一�?
	 * 
	 * @param array
	 *            要查询的父数�?
	 * @param subArr
	 *            要查询的子数�?
	 * @return 返回找到的头�?��位置
	 */
	public static int firstIndexOfArray(byte[] array, byte[] subArr) {
		if (array == null || subArr == null || array.length < subArr.length)
			return -1;
		int index = -1;
		// 注意该算�?
		for (int i = 0; i <= array.length - subArr.length; i++) {
			if (array[i] == subArr[0]) {
				if (subArr.length == 1)
					index = i;
				boolean found = true;
				for (int j = 1; j < subArr.length; j++) {
					if (array[i + j] != subArr[j]) {
						// 有一个不等则�?��
						found = false;
						break;
					}
				}
				if (found) {// 全部相等则�?�?
					index = i;
					break;
				}
			}

		}
		return index;
	}

	/**
	 * 比较两个数组是否完全相等 
	 * @param target
	 * @param sep
	 * @return
	 */
	public static boolean bytesEquals(byte[] target, byte[] sep) {
		if(target==null||sep==null||target.length!=sep.length) return false;
		for(int i=0;i<target.length;i++){
			if(target[i]!=sep[i])
				return false;
		}
		return true;
	}

	/**
	 * 对指定数组进行按位异�?
	 * 
	 * @param src
	 *            要计算的数组
	 * @param start
	 *            数组起始位置
	 * @param dest
	 *            数组的结束位�?
	 * @return 异或结果
	 */
	public static byte exclusiveOr(byte[] src, int start, int dest) {
		// 例子24,24,61,00,06,00,00,53,2E,1A,0A
		if (src == null || dest <= start || dest > src.length - 1
				|| start > src.length - 1)
			return 0;
		byte ret = src[0];
		for (int i = start + 1; i <= dest; i++) {
			ret ^= src[i];
		}
		return ret;
	}
	/**
	 * 将输入流导向到输出流 
	 * @param inStream
	 * @return
	 * @throws IOException
	 */
	public static void inputStream2outputStream(InputStream inStream,OutputStream outStream ) throws IOException {
		byte[] buff = new byte[1024];
		int rc = 0;
		while ((rc = inStream.read(buff, 0, buff.length)) > 0) {
			outStream.write(buff, 0, rc);
		}
	}
	/**
	 * FIXME
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		byte[] sim = { (byte) 0x9C, (byte) 0x03, (byte) 0xBB, 0x1D };
		long ret = bytes2short(sim, 0);
		System.out.println("数组转换为long为：" + ret+",0x4b is"+byte2HexString((byte) 0x9B));

		System.out.println("BCD转换str2Bcd:" + bytes2HexString(string2bytes("abc123"), " "));
	}

}
