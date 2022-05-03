package com.frontend.Manager;

import java.util.List;

import com.frontend.Model.Film;

public interface SakilaManager {

	List<Film> getData(String query);
	Integer getCount();
	void saveOrUpdateFilm(String title,Integer releaseYear,String specialFeatures,Integer language,String director,String description,String rating,String pkId);
	void deleteFilm(Integer pkId);
}
