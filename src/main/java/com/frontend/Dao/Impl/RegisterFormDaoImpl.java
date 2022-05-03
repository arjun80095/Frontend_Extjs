package com.frontend.Dao.Impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

import com.frontend.Model.RegisterUser;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.frontend.Dao.RegisterFormDao;

public class RegisterFormDaoImpl implements RegisterFormDao {
	
	private SessionFactory sessionFactory;
	

		
	private Session createSession() {
		
		Configuration config = new Configuration();
	    config.configure();
	    SessionFactory sessionFactory = config.buildSessionFactory();
	    return sessionFactory.openSession();
	    
	}


	public boolean addRegisterForm(String user, String email, String Password) {
		
		try {
			boolean duplicate=false;
			String queryString="From RegisterUser";
			Query query=createSession().createQuery(queryString);
			List<RegisterUser> result=query.list();
			for(RegisterUser i:result) {
				String test=i.getEmail();
				if(test.equals(email))
					duplicate=true;
			}
			if(duplicate) {
				System.out.print("Entered Duplicate ");
				return true;
			}else {
				System.out.print("Inserting new ");
				RegisterUser insertquery=new RegisterUser();
				insertquery.setEmail(email);
				insertquery.setPassword(Password);
				insertquery.setUserName(user);
				Session session=createSession();
				session.beginTransaction();
				session.save(insertquery);
				session.getTransaction().commit();
				session.close();
				
			}
			
			
		}
		catch(Exception e) {
			
			e.printStackTrace();
		}
		return false;

		
	}
}
