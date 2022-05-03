package com.frontend.Manager.Impl;

import com.frontend.Dao.RegisterFormDao;
import com.frontend.Manager.RegisterFormManager;

public class RegisterFormManagerImpl implements RegisterFormManager {
	
	private RegisterFormDao frontendDao;

	public boolean addRegisterForm(String user, String email, String Password) {
		
		boolean duplicates= frontendDao.addRegisterForm(user, email, Password);
		return duplicates;
	}

	public RegisterFormDao getFrontendDao() {
		return frontendDao;
	}

	public void setFrontendDao(RegisterFormDao frontendDao) {
		this.frontendDao = frontendDao;
	}

	}
