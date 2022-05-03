
// kindly Ignore for milestone 1 evaluation
Ext.ns("sakila.frontend")
sakila.frontend.createLanguageStore=Ext.create('Ext.data.Store',{
	fields:[{
		name:'Language',
		type:'string'
	},{
		name:'language_id',
		type:'int'
	}],
	data:[{Language:'English',language_id:1},
		{Language:'Hindi',language_id:2},
		{Language:'French',language_id:3},
		{Language:'Espaniol',language_id:4}]
	
})

sakila.frontend.createFeaturesStore=Ext.create('Ext.data.Store',{
	fields:[{
		name:'specialFeatures',
		type:'string'
	}],
	data:[{specialFeatures:'Commentaries'},
		{specialFeatures:'Deleted Scenes'},
		{specialFeatures:'Behind the Scenes'},
		{specialFeatures:'Trailers'}]
	
})

sakila.frontend.createRatingStore=Ext.create('Ext.data.Store',{
	fields:[{
		name:'rating',
		type:'string'
	}],
	data:[{rating:'PG'},
		   {rating:'G'},
		   {rating:'PG-13'},
		   {rating:'R'},
		   {rating:'NC-17'}]
})

sakila.frontend.createAddPanel=function(){
	var formPanel=Ext.create('Ext.form.Panel',{
		title:'Add Form',
		buttonAlign:'center',
		height:250,		
		itemId:'searchForm',
		items:[
			{
				xtype:'container',
				margin:'25 0 10 10',
				layout:'column',
				items:[{
					xtype:'textfield',
					fieldLabel:'Movie Name',
					margin:'0 0 0 250',
					itemId:'movieSearch'
				},{
					xtype:'textfield',
					padding:'0 0 10 10',
					itemId:'director',
					fieldLabel:'Director Name',
					labelWidth:'20%',		
					margin:'0 0 0 150',
					itemId:'directorSearch'
				}]
			},{
				xtype:'container',
				margin:'25 0 10 10',
				layout:'column',
				items:[{
					xtype:'datefield',
					fieldLabel:'Release Year',
					margin:'0 0 0 250',
					itemId:'dateSearch',
					format:'Y'
				},
				{
					xtype:'combobox',
					fieldLabel:'Language',
					itemId:'lang_form',
					margin:'0 0 0 150',
					store:sakila.frontend.createLanguageStore,
					displayField:'Language',
					valueField:'language_id',
					itemId:'languageSearch'
				}]
			}
		],
		buttons:[{
			text:'Search',
			handler:function(){
				
				var queryString=" "
				
				if(Ext.ComponentQuery.query("#movieSearch")[0].getValue()!=undefined && Ext.ComponentQuery.query("#movieSearch")[0].getValue()!=null && Ext.ComponentQuery.query("#movieSearch")[0].getValue()!="")
					queryString=queryString+" f.title= "+ `'${Ext.ComponentQuery.query("#movieSearch")[0].getValue()}'`
				
				if(Ext.ComponentQuery.query("#directorSearch")[0].getValue()!=undefined && Ext.ComponentQuery.query("#directorSearch")[0].getValue()!=null && Ext.ComponentQuery.query("#directorSearch")[0].getValue()!=""){
					
					if(queryString.includes('title'))
						queryString=queryString+" AND f.director= "+`'${Ext.ComponentQuery.query("#directorSearch")[0].getValue()}'`
					else
						queryString=queryString+" f.director="+`'${Ext.ComponentQuery.query("#directorSearch")[0].getValue()}'`
				}
				
				if(Ext.ComponentQuery.query("#dateSearch")[0].getValue()!=undefined && Ext.ComponentQuery.query("#dateSearch")[0].getValue()!=null && Ext.ComponentQuery.query("#dateSearch")[0].getValue()!=""){
					
					if(queryString.includes('director'))
						queryString=queryString+" AND f.releaseYear="+`'${Ext.ComponentQuery.query("#dateSearch")[0].getRawValue()}'`
					else
						queryString=queryString+" f.releaseYear="+`'${Ext.ComponentQuery.query("#dateSearch")[0].getRawValue()}'`
				}
				
				if(Ext.ComponentQuery.query("#languageSearch")[0].getValue()!=undefined && Ext.ComponentQuery.query("#languageSearch")[0].getValue()!=null && Ext.ComponentQuery.query("#languageSearch")[0].getValue()!=""){
					
					if(queryString.includes('releaseYear'))
						queryString=queryString+" AND f.language.languageId= "+Ext.ComponentQuery.query("#languageSearch")[0].getValue()
					else
						queryString=queryString+" f.language.languageId= "+Ext.ComponentQuery.query("#languageSearch")[0].getValue()
				}
				
				console.log(queryString)
				Ext.Ajax.request({
					url:'http://localhost:8080/frontend_spring/fetchData.action',
					params:{
						query:queryString
					},
					success:function(result,response){
						var reply=Ext.decode(result.responseText)
						var rows=reply.rows
						sakila.frontend.createGridStore.loadData(rows)
						Ext.ComponentQuery.query("#searchForm")[0].reset()
						
					},
					failure:function(result,response){
						sakila.frontend.createGridStore.reload()
					}
					
				})
				
							
				
			}
			},{
				text:'Cancel',
				handler:function(){
					sakila.frontend.createGridStore.reload()
					
				}
		}]
	})
	return formPanel
}
sakila.frontend.createAddFormPanel=function(title,year,features,language,director,description,rating,language_id){
	var addFormPanel=Ext.create('Ext.window.Window',{
		title:'Add Film',
		height:370,
		width:'450',
		itemId:'addOrEditFormWindow',
		buttonAlign:'center',
		items:[{
			xtype:'panel',
			height:370,
			width:'450',
			itemId:'addOrEditForm',
			items:[{
			xtype:'textfield',
			margin:'10 0 0 20',
			fieldLabel:'Title',
			value:title!=null?title:""
		},{
			xtype:'numberfield',
			margin:'10 0 0 20',
			fieldLabel:'Release Year',
			value:year!=null?year:""
		},{
			xtype:'combobox',
			margin:'10 0 0 20',
			fieldLabel:'Special Features',
			multiSelect:true,
			store:sakila.frontend.createFeaturesStore,
			displayField:'specialFeatures',
			valueField:'specialFeatures',
			value:features!=null?features:""
			
		},
		{
			xtype:'combobox',
			margin:'10 0 0 20',
			fieldLabel:'Rating',
			multiSelect:true,
			store:sakila.frontend.createRatingStore,
			displayField:'rating',
			valueField:'rating',
			value:rating!=null?rating:""
		}
		,{
			xtype:'combobox',
			margin:'10 0 0 20',
			fieldLabel:'Language',
			itemId:'lang_form',
			store:sakila.frontend.createLanguageStore,
			displayField:'Language',
			valueField:'language_id',
			value:language_id!=null?language_id:""
			
			
		},{
			xtype:'textfield',
			margin:'10 0 0 20',
			fieldLabel:'Director Name',
			value:director!=null?director:""
		},{
			xtype:'textfield',
			margin:'10 0 0 20',
			fieldLabel:'Description',
			value:description!=null?description:""
		}]
		}],
		buttons:[{
			text:'Save',
			handler:function(){
				var specialFeaturesArray=Ext.ComponentQuery.query("#addOrEditForm")[0].items.items[2].getValue()
				var specialFeaturesString=""
				for(var i=0;i<specialFeaturesArray.length;i++){
					specialFeaturesString=specialFeaturesString+specialFeaturesArray[i]
					specialFeaturesString=specialFeaturesString+","
				}
				specialFeaturesString=specialFeaturesString.substring(0,specialFeaturesString.length-1)
				Ext.Ajax.request({
					url:'http://localhost:8080/frontend_spring/saveOrUpdateFilm.action',
					method:'POST',
					params:{
						title:Ext.ComponentQuery.query("#addOrEditForm")[0].items.items[0].getValue(),
						releaseYear:Ext.ComponentQuery.query("#addOrEditForm")[0].items.items[1].getValue(),
						specialFeatures:specialFeaturesString,
						rating:Ext.ComponentQuery.query("#addOrEditForm")[0].items.items[3].getValue(),
						language:Ext.ComponentQuery.query("#addOrEditForm")[0].items.items[4].getValue(),
						director:Ext.ComponentQuery.query("#addOrEditForm")[0].items.items[5].getValue(),
						description:Ext.ComponentQuery.query("#addOrEditForm")[0].items.items[6].getValue(),
						pkId:Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection().length==1?Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['filmId']:null
						
					},
					success:function(result,response){
						var reply=Ext.decode(result.responseText)
						if(reply.success)
							Ext.Msg.alert("Alert","Data Saved Sucessfully")
						else
							Ext.Msg.alert("Alert","Data Not Saved")
						
						Ext.ComponentQuery.query("#addOrEditFormWindow")[Ext.ComponentQuery.query("#addOrEditFormWindow").length-1].close()
						sakila.frontend.createGridStore.reload()
						Ext.ComponentQuery.query("#EditBtn")[Ext.ComponentQuery.query("#EditBtn").length-1].setDisabled(true)
						
					},
					failure:function(result,response){
						Ext.Msg.alert("Alert","Data Not Saved")
						Ext.ComponentQuery.query("#addOrEditFormWindow")[Ext.ComponentQuery.query("#addOrEditFormWindow").length-1].close()
						sakila.frontend.createGridStore.reload()
						Ext.ComponentQuery.query("#EditBtn")[Ext.ComponentQuery.query("#EditBtn").length-1].setDisabled(true)
					}
				})
			}
		},{
			text:'cancel',
			handler:function(){
				Ext.ComponentQuery.query("#addOrEditFormWindow")[Ext.ComponentQuery.query("#addOrEditFormWindow").length-1].close()
				sakila.frontend.createGridStore.reload()
				Ext.ComponentQuery.query("#EditBtn")[Ext.ComponentQuery.query("#EditBtn").length-1].setDisabled(true)
			}
		}]
	}).show()
	
}
sakila.frontend.createGridStore=Ext.create('Ext.data.Store',{
		extends:Ext.data.Model,
		fields:[{
			name:'filmId',
			type:'int'
		},{
			name:'title',
			type:'string'
		},{
			name:'releaseYear',
			type:'int'
		},{
			name:'description',
			type:'string'
		},{
			name:'languageDisplay',
			type:'string'
		},{
			name:'director',
			type:'string'
		},{
			name:'rating',
			type:'string'
		},{
			name:'specialFeatures',
			type:'string'
		}],
		itemId:'stores',
		proxy:{
			url:'http://localhost:8080/frontend_spring/fetchData.action',
			extraParams:{
				query:null
			},
			reader:{
				type:'json',
				rootProperty:'rows',
				totalProperty:'count'
			},
			type: 'ajax',
			method:'POST',
			
			
		},
		autoLoad: false,
		loading:true,
	})
	
sakila.frontend.createGridPanel=function(){
	var gridpanel= Ext.create('Ext.grid.Panel',{
		title:'Sakila Grid Panel',
		scrollable:true,
		height:300,
		itemId:'gridPanel',
		header:true,
		header: {
            height: 40,
            padding: '2px'
        },
		dockedItems: [{
        xtype: 'pagingtoolbar',
        store: sakila.frontend.createGridStore,   // same store GridPanel is using
        dock: 'top',
        displayInfo: true,
		items:[{
		xtype:'button',
		iconCls: 'fa fa-plus-circle button-icon',
		text:'Add',
		handler:function(){
			sakila.frontend.createAddFormPanel(null,null,null,null,null,null)
		}	
	},
	{ xtype: 'tbseparator' 
	},
	{
		xtype:'button',
		text:'Edit',
		disabled:true,
		itemId:'EditBtn',
		handler:function(){
			console.log(Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['language'])
			sakila.frontend.createAddFormPanel(
			Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['title'],
			Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['releaseYear'],
			Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['specialFeatures'],
			Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['languageDisplay'],
			Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['director'],
			Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['description'],
			Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['rating'],
			Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[0].data['language'].languageId
			
			)
		}
	},{ xtype: 'tbseparator'
	},{
		xtype:'button',
		text:'delete',
		itemId:'DeleteBtn',
		disabled:true,
		handler:function(){
			var deletedArray=new Array();
			
			for(var i=0;i<Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection().length;i++){
				deletedArray.push(Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection()[i].data['filmId'])
			}
			Ext.Ajax.request({
					url:'http://localhost:8080/frontend_spring/deleteFilm.action',
					method:'POST',
					params:{
						deletedPkId:deletedArray
						
					},
					success:function(result,response){
						var reply=Ext.decode(result.responseText)
						if(reply.success)
							Ext.Msg.alert("Alert","Data Deleted Sucessfully")
						else
							Ext.Msg.alert("Alert","Data Not Deleted")
						
						
						sakila.frontend.createGridStore.reload()
						Ext.ComponentQuery.query("#DeleteBtn")[Ext.ComponentQuery.query("#DeleteBtn").length-1].setDisabled(true)
						
					},
					failure:function(result,response){
						Ext.Msg.alert("Alert","Data Not Deleted")
						
						sakila.frontend.createGridStore.reload()
						Ext.ComponentQuery.query("#DeleteBtn")[Ext.ComponentQuery.query("#DeleteBtn").length-1].setDisabled(true)
					}
				})
			
		}
		}
	]
    }],
		selModel:{
			selType:'checkboxmodel',
			mode:'MULTI',
			allowDeselect:true,
		},
		store:sakila.frontend.createGridStore.load(),
		columns:[{
			header:'Title',
			dataIndex:'title',
			width:"15%"
		},{
			header:'Description',
			dataIndex:'description',
			width:"20%"
		},{
			header:'Release Year',
			dataIndex:'releaseYear',
			width:"15%"
		},{
			header:'Language',
			dataIndex:'languageDisplay',
			width:"15%"
		},{
			header:'Director',
			dataIndex:'director',
			width:"10%"
		},{
			header:'Rating',
			dataIndex:'rating',
			width:"5%"
		},{
			header:'Special Feature',
			dataIndex:'specialFeatures',
			width:"20%"
		}],
		listeners:{
			'select':function(){
				if(Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection().length==1){
					Ext.ComponentQuery.query("#EditBtn")[Ext.ComponentQuery.query("#EditBtn").length-1].setDisabled(false)
				}else{
					Ext.ComponentQuery.query("#EditBtn")[Ext.ComponentQuery.query("#EditBtn").length-1].setDisabled(true)
				}
				
				if(Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection().length>=1){
					Ext.ComponentQuery.query("#DeleteBtn")[Ext.ComponentQuery.query("#DeleteBtn").length-1].setDisabled(false)
				}else{
					Ext.ComponentQuery.query("#DeleteBtn")[Ext.ComponentQuery.query("#DeleteBtn").length-1].setDisabled(true)
				}
				
			},
			'deselect':function(){
				if(Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection().length==1){
					Ext.ComponentQuery.query("#EditBtn")[Ext.ComponentQuery.query("#EditBtn").length-1].setDisabled(false)
				}else{
					Ext.ComponentQuery.query("#EditBtn")[Ext.ComponentQuery.query("#EditBtn").length-1].setDisabled(true)
				}
				
				if(Ext.ComponentQuery.query("#gridPanel")[0].getSelectionModel().getSelection().length>=1){
					Ext.ComponentQuery.query("#DeleteBtn")[Ext.ComponentQuery.query("#DeleteBtn").length-1].setDisabled(false)
				}else{
					Ext.ComponentQuery.query("#DeleteBtn")[Ext.ComponentQuery.query("#DeleteBtn").length-1].setDisabled(true)
				}
			}
		}
		
	})
	return gridpanel
}

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport',{
		align:'center',
		height:800,
		renderTo:Ext.getBody(),
		items:[sakila.frontend.createAddPanel(),sakila.frontend.createGridPanel()]
	})
	
})
