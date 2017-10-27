package com.web.util;



public class EncryUtils {
	
	
	private static  boolean isEmpty(String str){
		return (str == "" || str ==null) ? true : false;
	}
	
	public static String decodeStr(String decodeStr) {
		if(isEmpty(decodeStr)){
			return "";
		}
		int uq = 0, iq = 0;
		int oq = decodeStr.length();
		StringBuffer pq = new StringBuffer();
		int aq = -1;
		int sq = 0;
		for (int dq = 0; dq < oq; dq++) {
			int fq = decodeStr.charAt(dq);
			fq = (fq == 95) ? 63 : ((fq == 44) ? 62 : ((fq >= 97) ? (fq - 61) : ((fq >= 65) ? (fq - 55) : (fq - 48))));
			iq = (iq << 6) + fq;
			uq += 6;
			while (uq >= 8) {
				int gq = iq >> (uq - 8);
				if (sq > 0) {
					aq = (aq << 6) + (gq & (0x3f));
					sq--;
					if (sq == 0) {
						pq.append((char)aq);
					};
				} else {
					if (gq >= 224) {
						aq = gq & (0xf);
						sq = 2;
					} else if (gq >= 128) {
						aq = gq & (0x1f);
						sq = 1;
					} else {
						pq.append((char)gq);
					};
				};
				iq = iq - (gq << (uq - 8));
				uq -= 8;
			};
		}
		return pq.toString();
	}
	
	public static String  encodeStr(String encodeString) {
		if(isEmpty(encodeString)){
			return "";
		}
		int uq = 0, iq = 0;
		int oq = encodeString.length();
		StringBuffer pq = new StringBuffer();
		for (int aq = 0; aq < oq; aq++) {
			int sq = encodeString.charAt(aq);
			if (sq >= 2048) {
				iq = (iq << 24) + (((sq >> 12) | 0xe0) << 16) + ((((sq & 0xfff) >> 6) | 0x80) << 8) + ((sq & 0x3f) | 0x80);
				uq += 24;
			} else if (sq >= 128) {
				iq = (iq << 16) + (((sq >> 6) | 0xc0) << 8)
						+ ((sq & 0x3f) | 0x80);
				uq += 16;
			} else {
				uq += 8;
				iq = (iq << 8) + sq;
			};
			while (uq >= 6) {
				int dq = iq >> (uq - 6);
				iq = iq - (dq << (uq - 6));
				uq -= 6;
				int sqst = (dq <= 9) ? (dq + 48) : ((dq <= 35) ? (dq + 55) : ((dq <= 61) ? (dq + 61) : ((dq == 62) ? 44 : 95)));
				pq.append((char) sqst);
			};
		};
		if (uq > 0) {
			int dq = iq << (6 - uq);
			int code = (dq <= 9) ? (dq + 48) : ((dq <= 35) ? (dq + 55) : ((dq <= 61) ? (dq + 61) : ((dq == 62) ? 44 : 95)));
			pq.append((char) code);
		};
		return pq.toString();
	};
	public static void main(String[] args) {
		String syso = EncryUtils.encodeStr("XiGua Yingshi");
		System.out.println(syso);
		System.out.println(EncryUtils.decodeStr(syso));
	}
}
