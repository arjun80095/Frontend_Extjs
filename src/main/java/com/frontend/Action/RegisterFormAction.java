package com.frontend.Action;

import com.opensymphony.xwork2.ActionSupport;
import java.util.*;
import java.sql.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Map;

import com.frontend.Manager.RegisterFormManager;
import com.google.gson.Gson;


public class RegisterFormAction extends ActionSupport {
	
	private String userName;
	private String email;
	private String password;
	private RegisterFormManager frontendManager;
	String jsonResponse;
	private static final long serialVersionUID = 1L;
	
	
	public RegisterFormManager getFrontendManager() {
		return frontendManager;
	}
	public void setFrontendManager(RegisterFormManager frontendManager) {
		this.frontendManager = frontendManager;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	public String RegisterUser(){
		
		//PrintWriter out = response.getWriter();
		try {
			System.out.println("Entered Servlet");
			String user=getUserName();
			String email= getEmail();
			String password=getPassword();
			Gson json=new Gson();
			boolean duplicate=frontendManager.addRegisterForm(user, email, password);
			Map<String,Object> responseData=new HashMap<>();
			responseData.put("Success", true);
			responseData.put("Duplicates", duplicate);
			String finalResponse=json.toJson(responseData);
			setJsonResponse(finalResponse);	
		}catch(Exception e) {
			e.printStackTrace();
			
		}
		return SUCCESS;
		
	}
	public String getJsonResponse() {
		return jsonResponse;
	}
	public void setJsonResponse(String jsonResponse) {
		this.jsonResponse = jsonResponse;
	}

}
