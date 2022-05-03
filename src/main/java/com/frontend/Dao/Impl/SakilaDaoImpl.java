package com.frontend.Dao.Impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.frontend.Dao.SakilaDao;
import com.frontend.Model.Film;
import com.frontend.Model.Language;
import com.frontend.Model.RegisterUser;

public class SakilaDaoImpl implements SakilaDao {
	
	
	private Session createSession() {
		
		Configuration config = new Configuration();
	    config.configure();
	    SessionFactory sessionFactory = config.buildSessionFactory();
	    return sessionFactory.openSession();
	    
	}

	public List<Film> getData(String queryStringSearch){
		
		try {
			
			String queryString="From Film f WHERE f.isDeleted=0 ";
			if(queryStringSearch==null) {
				Query query=createSession().createQuery(queryString);
				List<Film> result=query.list();
				return result;
			}else {
				queryString=queryString+" AND "+queryStringSearch;
				System.out.println(queryString);
				Query query=createSession().createQuery(queryString);
				List<Film> result=query.list();
				return result;
				
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Integer getCount() {
		try {
			String queryString="From Film";
			Query query=createSession().createQuery(queryString);
			List<Film> result=query.list();
			return result.size();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Language getLanguageForSave(int lang_id){
		
		try {
			String queryString="From Language where languageId = :lang_id";
			Query query=createSession().createQuery(queryString);
			query.setParameter("lang_id", lang_id);
			List<Language> result=query.list();
			Language finalResult=null;
			for(Language l:result) {
				finalResult=l;
			}
			return finalResult;
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void saveOrUpdateFilm(Film data) {
		// TODO Auto-generated method stub
		try {
			Session session=createSession();
			session.beginTransaction();
			session.saveOrUpdate(data);
			session.getTransaction().commit();
			session.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void deleteFilmDao(Integer pkId) {
		// TODO Auto-generated method stub
		try {
			
			Session session=createSession();
			session.beginTransaction();
			String queryString="From Film where filmId=:filmPkId";
			Query query=session.createQuery(queryString);
			query.setParameter("filmPkId", pkId);
			List<Film> filmOutput=query.list();
			Film finalFilm=filmOutput.get(0);
			session.getTransaction().commit();
			session.close();
			finalFilm.setIsDeleted(1);
			Session session2=createSession();
			session2.beginTransaction();
			session2.saveOrUpdate(finalFilm);
			session2.getTransaction().commit();
			session2.close();
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}
}
