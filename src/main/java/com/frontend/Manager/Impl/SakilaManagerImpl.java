package com.frontend.Manager.Impl;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.frontend.Dao.SakilaDao;
import com.frontend.Manager.SakilaManager;
import com.frontend.Model.Film;
import com.frontend.Model.Language;

public class SakilaManagerImpl implements SakilaManager {
	
	private SakilaDao sakilaDao;
	
	private Language getLanguageForSave(int lang_id) {
		
		return sakilaDao.getLanguageForSave(lang_id);
	}
	
	public SakilaDao getSakilaDao() {
		return sakilaDao;
	}

	public void setSakilaDao(SakilaDao sakilaDao) {
		this.sakilaDao = sakilaDao;
	}

	public List<Film>getData(String query){
		
		List<Film>rows=sakilaDao.getData(query);
		return rows;
	}
	
	public Integer getCount() {
		
		Integer count=sakilaDao.getCount();
		return count;
		
	}

	@Override
	public void saveOrUpdateFilm(String title, Integer releaseYear, String specialFeatures, Integer language,
			String director, String description, String rating,String pkId) {
		
		Film saveData=new Film();
		saveData.setTitle(title);
		saveData.setReleaseYear(String.valueOf(releaseYear));
		saveData.setIsDeleted(0);
		saveData.setSpecialFeatures(specialFeatures);
		saveData.setDescription(description);
		saveData.setDirector(director);
		saveData.setRating(rating);
		Language languageData=getLanguageForSave(language);
		saveData.setLanguage(languageData);
		saveData.setRentalDuration(6);
		saveData.setRentalRate(5);
		saveData.setReplacementCost(10.89);
		SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		saveData.setLastUpdate(sdf3.format(timestamp));
		if(pkId.isEmpty()) {
			saveData.setFilmId(null);
		}else {
			saveData.setFilmId(Integer.valueOf(pkId));
		}
		sakilaDao.saveOrUpdateFilm(saveData);
		
	}

	@Override
	public void deleteFilm(Integer pkId) {
		// TODO Auto-generated method stub
		sakilaDao.deleteFilmDao(pkId);
		
	}

}
