package com.frontend.Action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.frontend.Manager.SakilaManager;
import com.frontend.Model.Film;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;

public class SakilaAction extends ActionSupport {
	
	private SakilaManager sakilaManager;
	String jsonResponse;
	private String title;
	private Integer releaseYear;
	private String specialFeatures;
	private int language;
	private String director;
	private String description;
	private String rating;
	
	public String[] getDeletedPkId() {
		return deletedPkId;
	}

	public void setDeletedPkId(String[] deletedPkId) {
		this.deletedPkId = deletedPkId;
	}

	private String pkId;
	private String query;
	private String[] deletedPkId;
	
	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public String getPkId() {
		return pkId;
	}

	public void setPkId(String pkId) {
		this.pkId = pkId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getReleaseYear() {
		return releaseYear;
	}

	public void setReleaseYear(Integer releaseYear) {
		this.releaseYear = releaseYear;
	}

	public String getSpecialFeatures() {
		return specialFeatures;
	}

	public void setSpecialFeatures(String specialFeatures) {
		this.specialFeatures = specialFeatures;
	}

	public int getLanguage() {
		return language;
	}

	public void setLanguage(int language) {
		this.language = language;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getSakilaData() {
		
		try {
			String query=getQuery();
			if(!(StringUtils.isNotBlank(query))) {
			
				System.out.println("Inside fetch if");
				List<Film> result=new ArrayList<>();
				Map<String,Object>finalResult=new HashMap<>();
				List<Film> rows=sakilaManager.getData(null);
				Integer count=sakilaManager.getCount();
				finalResult.put("success", true);
				finalResult.put("count", count);
				finalResult.put("rows", rows);
				Gson json=new Gson();
				String finalResponse=json.toJson(finalResult);
				setJsonResponse(finalResponse);
			}
			else {
				System.out.println("Inside fetch else");
				String queryString=getQuery();
				List<Film> result=new ArrayList<>();
				Map<String,Object>finalResult=new HashMap<>();
				List<Film> rows=sakilaManager.getData(queryString);
				Integer count=sakilaManager.getCount();
				finalResult.put("success", true);
				finalResult.put("count", count);
				finalResult.put("rows", rows);
				Gson json=new Gson();
				String finalResponse=json.toJson(finalResult);
				setJsonResponse(finalResponse);
			}
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public String addOrUpdateFilm() {
		Map<String,Object>finalResult=new HashMap<>();
		try {
			sakilaManager.saveOrUpdateFilm(getTitle(), getReleaseYear(), getSpecialFeatures(), getLanguage(), getDirector(), getDescription(), getRating(),getPkId());
			finalResult.put("success", true);
			Gson json=new Gson();
			String finalResponse=json.toJson(finalResult);
			setJsonResponse(finalResponse);
			return SUCCESS;
		}catch(Exception e) {
			e.printStackTrace();
			return ERROR;
			
		}
	}
	
	public String deleteFilm() {
		try {
			String []ids=getDeletedPkId();
			for(int i=0;i<ids.length;i++) {
				if(ids[i]!=null) {
					sakilaManager.deleteFilm(Integer.valueOf(ids[i]));
					
				}
			}
			return SUCCESS;
		}catch(Exception e) {
			e.printStackTrace();
			return ERROR;
		}
	}

	public SakilaManager getSakilaManager() {
		return sakilaManager;
	}

	public void setSakilaManager(SakilaManager sakilaManager) {
		this.sakilaManager = sakilaManager;
	}

	public String getJsonResponse() {
		return jsonResponse;
	}

	public void setJsonResponse(String jsonResponse) {
		this.jsonResponse = jsonResponse;
	}

}
