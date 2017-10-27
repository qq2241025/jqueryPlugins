package com.web.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateCrtKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import net.iharder.Base64;

public class RSAFrame {

	public static final String KEY_ALGORITHM = "RSA";
	private static final String PUBLIC_KEY = "publicKey";
	private static final String PRIVATE_KEY = "privateKey";
	/**
	 * RSA最大加密明文大小
	 */
	private static final int MAX_ENCRYPT_BLOCK = 117;

	/**
	 * RSA最大解密密文大小
	 */
	private static final int MAX_DECRYPT_BLOCK = 128;

	/**
	 * @Title: publicKeyToString
	 * @Description: 得到字符串型的公钥 Java
	 * @param publicKey
	 * @return String
	 */
	public static String publicKeyToString(RSAPublicKey publicKey) {
		return Base64.encodeBytes(publicKey.getEncoded());
	}

	/**
	 * @Title: privateKeyToString
	 * @Description: 得到字符串型的私钥 Java
	 * @param privateKey
	 * @return String
	 */
	public static String privateKeyToString(RSAPrivateKey privateKey) {
		return Base64.encodeBytes(privateKey.getEncoded());
	}

	/**
	 * @Title: getPublicKey
	 * @Description: 将字符串型公钥转化为PublicKey Java
	 * @param publicKey
	 * @return PublicKey
	 */
	public static PublicKey getPublicKey(String publicKey) {
		try {
			X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(Base64.decode(publicKey));
			KeyFactory factory;
			factory = KeyFactory.getInstance(KEY_ALGORITHM);
			return factory.generatePublic(x509EncodedKeySpec);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * @Title: getPrivateKey
	 * @Description: 将字符串型私钥转化为 PrivateKey Java
	 * @param privateKey
	 * @return PrivateKey
	 */
	public static PrivateKey getPrivateKey(String privateKey) {
		try {
			PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(Base64.decode(privateKey));
			KeyFactory factory = KeyFactory.getInstance(KEY_ALGORITHM);
			return factory.generatePrivate(pkcs8EncodedKeySpec);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * @Title: generateKeyBytes
	 * @Description: 初始化密钥对
	 * @return Map<String,Object>
	 */
	public static Map<String, Object> generateKeyBytes() {
		KeyPairGenerator keyPairGen;
		try {
			keyPairGen = KeyPairGenerator.getInstance(KEY_ALGORITHM);
			keyPairGen.initialize(1024);
			KeyPair keyPair = keyPairGen.generateKeyPair();
			RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
			RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
			Map<String, Object> keyMap = new HashMap<String, Object>(2);
			keyMap.put(PUBLIC_KEY, publicKey);
			keyMap.put(PRIVATE_KEY, privateKey);
			return keyMap;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * @Title: RSAEncode
	 * @Description: 将字符串加密
	 * @param key
	 * @param plainText
	 * @return String
	 */
	public static String RSAEncode(PublicKey key, String plainText) {
		byte[] b = plainText.getBytes();
		try {
			int inputLen = b.length;
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			int offSet = 0;
			byte[] cache;
			int i = 0;
			Cipher cipher = Cipher.getInstance(KEY_ALGORITHM);
			cipher.init(Cipher.ENCRYPT_MODE, key);
			// 对数据分段解密
			while (inputLen - offSet > 0) {
				if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
					cache = cipher.doFinal(b, offSet, MAX_ENCRYPT_BLOCK);
				} else {
					cache = cipher.doFinal(b, offSet, inputLen - offSet);
				}
				out.write(cache, 0, cache.length);
				i++;
				offSet = i * MAX_ENCRYPT_BLOCK;
			}
			byte[] decryptedData = out.toByteArray();
			out.close();
			return Base64.encodeBytes(decryptedData);
		} catch (InvalidKeyException | NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException
				| BadPaddingException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * @Title: RSADecode
	 * @Description: 将字符串解密
	 * @param key
	 * @param encodedText
	 * @return String
	 */
	public static String RSADecode(PrivateKey key, String encodedText) {
		try {
			byte[] b = Base64.decode(encodedText);
			int inputLen = b.length;
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			int offSet = 0;
			byte[] cache;
			int i = 0;
			Cipher cipher = Cipher.getInstance(KEY_ALGORITHM);
			cipher.init(Cipher.DECRYPT_MODE, key);
			// 对数据分段解密
			while (inputLen - offSet > 0) {
				if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
					cache = cipher.doFinal(b, offSet, MAX_DECRYPT_BLOCK);
				} else {
					cache = cipher.doFinal(b, offSet, inputLen - offSet);
				}
				out.write(cache, 0, cache.length);
				i++;
				offSet = i * MAX_DECRYPT_BLOCK;
			}
			byte[] decryptedData = out.toByteArray();
			out.close();
			return new String(decryptedData);
		} catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException | IllegalBlockSizeException
				| BadPaddingException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * @Title: getRSAPrivateKeyAsNetFormat
	 * @Description: 将Java私钥转化为.Net格式
	 * @param privateKey
	 * @return String
	 */
	public static String getRSAPrivateKeyAsNetFormat(String privateKey) {
		try {
			StringBuffer buff = new StringBuffer(1024);

			PKCS8EncodedKeySpec pvkKeySpec = new PKCS8EncodedKeySpec(getPrivateKey(privateKey).getEncoded());
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			RSAPrivateCrtKey pvkKey = (RSAPrivateCrtKey) keyFactory.generatePrivate(pvkKeySpec);

			buff.append("<RSAKeyValue>");
			buff.append(
					"<Modulus>" + Base64.encodeBytes(removeMSZero(pvkKey.getModulus().toByteArray())) + "</Modulus>");
			buff.append("<Exponent>" + Base64.encodeBytes(removeMSZero(pvkKey.getPublicExponent().toByteArray()))
					+ "</Exponent>");
			buff.append("<P>" + Base64.encodeBytes(removeMSZero(pvkKey.getPrimeP().toByteArray())) + "</P>");
			buff.append("<Q>" + Base64.encodeBytes(removeMSZero(pvkKey.getPrimeQ().toByteArray())) + "</Q>");
			buff.append("<DP>" + Base64.encodeBytes(removeMSZero(pvkKey.getPrimeExponentP().toByteArray())) + "</DP>");
			buff.append("<DQ>" + Base64.encodeBytes(removeMSZero(pvkKey.getPrimeExponentQ().toByteArray())) + "</DQ>");
			buff.append("<InverseQ>" + Base64.encodeBytes(removeMSZero(pvkKey.getCrtCoefficient().toByteArray()))
					+ "</InverseQ>");
			buff.append("<D>" + Base64.encodeBytes(removeMSZero(pvkKey.getPrivateExponent().toByteArray())) + "</D>");
			buff.append("</RSAKeyValue>");
			return buff.toString();
		} catch (Exception e) {
			System.err.println(e);
			return null;
		}
	}

	/**
	 * @Title: getRSAPublicKeyAsNetFormat
	 * @Description: 将Java公钥转化为.Net格式
	 * @param encodedPublicKey
	 * @return String
	 */
	public static String getRSAPublicKeyAsNetFormat(String publicKey) {
		try {
			StringBuffer buff = new StringBuffer(1024);
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			RSAPublicKey pukKey = (RSAPublicKey) keyFactory
					.generatePublic(new X509EncodedKeySpec(getPublicKey(publicKey).getEncoded()));
			buff.append("<RSAKeyValue>");
			buff.append(
					"<Modulus>" + Base64.encodeBytes(removeMSZero(pukKey.getModulus().toByteArray())) + "</Modulus>");
			buff.append("<Exponent>" + Base64.encodeBytes(removeMSZero(pukKey.getPublicExponent().toByteArray()))
					+ "</Exponent>");
			buff.append("</RSAKeyValue>");
			return buff.toString();
		} catch (Exception e) {
			System.err.println(e);
			return null;
		}
	}

	/**
	 * @Title: removeMSZero
	 * @Description: JAVA和.Net密钥转化算法
	 * @param data
	 * @return byte[]
	 */
	private static byte[] removeMSZero(byte[] data) {
		byte[] temp;
		int len = data.length;
		if (data[0] == 0) {
			temp = new byte[data.length - 1];
			System.arraycopy(data, 1, temp, 0, len - 1);
		} else
			temp = data;

		return temp;
	}

	public static void main(String[] args) {
		int width = 835;
		int height = 400;
		int w = (Toolkit.getDefaultToolkit().getScreenSize().width - width) / 2;
		int h = (Toolkit.getDefaultToolkit().getScreenSize().height - height) / 2;
		JFrame frame = new JFrame("RSA生成工具");
		frame.setFont(new Font("宋体", Font.PLAIN, 12));
		frame.setLocation(w, h);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setResizable(false);
		// 文本标签
		JLabel labPublicKeyJava = new JLabel("公钥(Java)", JLabel.CENTER);
		labPublicKeyJava.setFont(new Font("宋体", Font.PLAIN, 12));
		labPublicKeyJava.setOpaque(true);
		labPublicKeyJava.setBackground(Color.GRAY);
		labPublicKeyJava.setForeground(Color.GREEN);

		JLabel labPublicKeyNet = new JLabel("公钥(.Net)", JLabel.CENTER);
		labPublicKeyNet.setFont(new Font("宋体", Font.PLAIN, 12));
		labPublicKeyNet.setOpaque(true);
		labPublicKeyNet.setBackground(Color.GRAY);
		labPublicKeyNet.setForeground(Color.GREEN);

		JLabel labPrivateKeyJava = new JLabel("私钥(Java)", JLabel.CENTER);
		labPrivateKeyJava.setFont(new Font("宋体", Font.PLAIN, 12));
		labPrivateKeyJava.setOpaque(true);
		labPrivateKeyJava.setBackground(Color.GRAY);
		labPrivateKeyJava.setForeground(Color.BLUE);

		JLabel labPrivateKeyNet = new JLabel("私钥(.Net)", JLabel.CENTER);
		labPrivateKeyNet.setFont(new Font("宋体", Font.PLAIN, 12));
		labPrivateKeyNet.setOpaque(true);
		labPrivateKeyNet.setBackground(Color.GRAY);
		labPrivateKeyNet.setForeground(Color.BLUE);

		JLabel labCipher = new JLabel("密文", JLabel.CENTER);
		labCipher.setFont(new Font("宋体", Font.PLAIN, 12));
		labCipher.setOpaque(true);
		labCipher.setBackground(Color.GRAY);
		labCipher.setForeground(Color.BLUE);

		JLabel labSource = new JLabel("原文", JLabel.CENTER);
		labSource.setFont(new Font("宋体", Font.PLAIN, 12));
		labSource.setOpaque(true);
		labSource.setBackground(Color.GRAY);
		labSource.setForeground(Color.BLUE);

		final JLabel labMsg = new JLabel();
		labMsg.setHorizontalAlignment(JLabel.CENTER);
		labMsg.setFont(new Font("宋体", Font.PLAIN, 14));
		labMsg.setOpaque(true);
		labMsg.setForeground(Color.RED);

		// 按钮
		JButton btn = new JButton("单击按钮生成Java和.Net格式的公钥和私钥");
		btn.setFont(new Font("宋体", Font.PLAIN, 12));
		JButton btnEn = new JButton("加密(采用分段加密，不限长度)");
		btnEn.setFont(new Font("宋体", Font.PLAIN, 12));
		JButton btnDe = new JButton("解密(采用分段解密，不限长度)");
		btnDe.setFont(new Font("宋体", Font.PLAIN, 12));
		// 文本框
		final JTextField tfPublicKeyJava = new JTextField();
		final JTextField tfPublicKeyNet = new JTextField();
		final JTextField tfPrivateKeyJava = new JTextField();
		final JTextField tfPrivateKeyNet = new JTextField();
		final JTextField tfCipher = new JTextField();
		final JTextField tfSource = new JTextField();

		// 面板
		JPanel panel = new JPanel();
		panel.add(labPublicKeyJava);
		panel.add(labPrivateKeyJava);
		panel.add(labPublicKeyNet);
		panel.add(labPrivateKeyNet);
		panel.add(labCipher);
		panel.add(labSource);
		panel.add(labMsg);

		panel.add(tfPublicKeyJava);
		panel.add(tfPublicKeyNet);
		panel.add(tfPrivateKeyJava);
		panel.add(tfPrivateKeyNet);
		panel.add(tfCipher);
		panel.add(tfSource);

		panel.add(btn);
		panel.add(btnEn);
		panel.add(btnDe);

		frame.setContentPane(panel);
		panel.setLayout(null);

		labPublicKeyJava.setBounds(726, 20, 80, 25);
		tfPublicKeyJava.setBounds(25, 20, 700, 25);

		labPublicKeyNet.setBounds(726, 60, 80, 25);
		tfPublicKeyNet.setBounds(25, 60, 700, 25);

		labPrivateKeyJava.setBounds(726, 100, 80, 25);
		tfPrivateKeyJava.setBounds(25, 100, 700, 25);

		labPrivateKeyNet.setBounds(726, 140, 80, 25);
		tfPrivateKeyNet.setBounds(25, 140, 700, 25);

		labCipher.setBounds(726, 180, 80, 25);
		tfCipher.setBounds(25, 180, 700, 25);

		labSource.setBounds(726, 220, 80, 25);
		tfSource.setBounds(25, 220, 700, 25);

		btn.setBounds(25, 260, 299, 25);
		btnEn.setBounds(325, 260, 239, 25);
		btnDe.setBounds(565, 260, 240, 25);

		labMsg.setBounds(25, 300, 780, 25);
		frame.setSize(width, height);
		frame.setVisible(true);

		btn.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				labMsg.setText(null);
				Map<String, Object> map = generateKeyBytes();
				String publicKey = publicKeyToString((RSAPublicKey) map.get(PUBLIC_KEY));
				String privateKey = privateKeyToString((RSAPrivateKey) map.get(PRIVATE_KEY));

				tfPublicKeyJava.setText(publicKey);
				tfPublicKeyNet.setText(getRSAPublicKeyAsNetFormat(publicKey));
				tfPrivateKeyJava.setText(privateKey);
				tfPrivateKeyNet.setText(getRSAPrivateKeyAsNetFormat(privateKey));
			}
		});

		btnDe.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				labMsg.setText(null);
				String decryptText = tfCipher.getText();
				String keyText = tfPrivateKeyJava.getText();
				if (decryptText == null || "".equals(decryptText)) {
					labMsg.setText("密文不能为空");
				} else if (keyText == null || "".equals(keyText)) {
					labMsg.setText("Java私钥不能为空");
				} else {
					tfSource.setText(RSADecode(getPrivateKey(keyText), decryptText));
				}
			}
		});

		btnEn.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				labMsg.setText(null);
				String sourceText = tfSource.getText();
				String keyText = tfPublicKeyJava.getText();
				if (sourceText == null || "".equals(sourceText)) {
					labMsg.setText("原文不能为空");
				} else if (keyText == null || "".equals(keyText)) {
					labMsg.setText("Java公钥不能为空");
				} else {
					tfCipher.setText(RSAEncode(getPublicKey(keyText), sourceText));
				}
			}
		});
	}
}