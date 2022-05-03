package com.frontend.Dao;

import java.util.List;

import com.frontend.Model.Film;
import com.frontend.Model.Language;

public interface SakilaDao {
	
	List<Film>getData(String query);

	Integer getCount();
	
	Language getLanguageForSave(int lang_id);
	
	void saveOrUpdateFilm(Film data); 
	void deleteFilmDao(Integer pkId);

}
