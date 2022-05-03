Ext.ns("training.frontend.RegisterForm")

training.frontend.RegisterForm.createPanel=function(){
	
	var win=Ext.create('Ext.panel.Panel',{
		
		align:'center',
		width:'500',
		height: 400,
		items:[{
			xtype:'fieldset',
			style:'font-size:15; text-align:center',
			html:'<span><b>Hyderabad Readiness Program</b>&nbsp &nbsp<img src=data:image/png;base64,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 class=clipart height=60 width=180></img></span>',
			height:70
			
		},{
			xtype:'fieldset',
			items: training.frontend.RegisterForm.createFormPanel()
		}]
	})
	return win
	
}

training.frontend.RegisterForm.validations=Ext.define('Override.form.field.VTypes',{
	override: 'Ext.form.field.VTypes',
	passwordMatch:function(value,field){
		var originalPassword=Ext.ComponentQuery.query("#originalPwd")[0].getValue()
		return (value===originalPassword)
	},
	passwordMatchText:"Passwords Do Not Match",
})


training.frontend.RegisterForm.createFormPanel=function(){
	var panel=Ext.create('Ext.form.Panel',{
		width:'400',
		height: 300,
		itemId:'RegisterForm',
		buttonAlign:'center',
		items:[{
			xtype:'textfield',
			width:300,
			fieldLabel:'User Name',
			emptyText:'User Name',
			margin:'20 0 0 120',
		    itemId:'TextRegister',
		},{
			xtype:'textfield',
			fieldLabel:'Email Address',
			emptyText:'Email Address',
			vtype:'email',
			margin:'10 0 0 120',
			width:300,
		},{
			xtype:'textfield',
			itemId:'originalPwd',
			fieldLabel:'Password',
			emptyText:'Password',
			allowBlank:true,
			width:300,
			margin:'10 0 0 120',
		},{
			xtype:'textfield',
			fieldLabel:'Confirm Password',
			emptyText:'Confirm Password',
			validation : false,
			allowBlank:true,
			margin:'10 0 0 120',
			width:300,
			vtype:'passwordMatch',
		},
		{
			xtype:'button',
			text:'Register',
			margin:'50 0 0 200',
			width:'100',
			height:40,
			handler:function(){
				
				if(Ext.ComponentQuery.query("#RegisterForm")[0].items.items[2].getValue()!=Ext.ComponentQuery.query("#RegisterForm")[0].items.items[3].getValue())
					Ext.Msg.alert("Passwords Do Not Match","Passwords Do Not Match")
				else{
					
					Ext.Ajax.request({
						url:'http://localhost:8080/frontend_spring/registerData.action',
						method:'post',
						params:{
							userName:Ext.ComponentQuery.query("#RegisterForm")[0].items.items[0].getValue(),
							email:Ext.ComponentQuery.query("#RegisterForm")[0].items.items[1].getValue(),
							password:Ext.ComponentQuery.query("#RegisterForm")[0].items.items[2].getValue()
						},
						success: function (result, response) {
                        //console.log(result.responseText)
						var reply=Ext.decode(result.responseText)
						if(reply.Duplicates){
							Ext.Msg.alert("Invalid Response","User Already Registered")
							Ext.ComponentQuery.query("#RegisterForm")[0].reset()
							}
						else{
							Ext.Msg.alert("Success","User Saved Successfully")
							Ext.ComponentQuery.query("#RegisterForm")[0].reset()
							
						}
							
                    },
                    failure: function (name, response) {
                  
                    }
					})
					
				}
			}
		}],
		
	})
	return panel;
}


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport',{
		align:'center',
		height:800,
		margin:'100 0 0 350',
		renderTo:Ext.getBody(),
		items:training.frontend.RegisterForm.createPanel()
	})
	
})