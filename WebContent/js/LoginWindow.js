Ext.ns("training.frontend")
training.frontend.validations=Ext.define('Override.form.field.VTypes',{
	override: 'Ext.form.field.VTypes',
	passwordMatch:function(value,field){
		var originalPassword=Ext.ComponentQuery.query("#originalPwd")[0].getValue()
		return (value===originalPassword)
	},
	passwordMatchText:"Passwords Do Not Match",
})
training.frontend.createpanel=function(){
	var panel=Ext.create('Ext.form.Panel',{
		align:'center',
		itemId:'RegisterForm',
		width:'400',
		height: 300,
		buttonAlign:'center',
		bodyStyle:'background-color:f5eeee;',
		items:[{
			xtype:'textfield',
			width:300,
			//maxlength:10,
			margin:'10 0 0 10',
			inputWrapCls:'',
			itemId:'TextRegister',
			emptyText:'User Name',
			triggerWrapCls:'border:none;',
			fieldStyle:'background-color:f5eeee;',
			style:'border: 0; border-bottom: 1px solid red;'
		},{
			xtype:'textfield',
			emptyText:'Email Address',
			vtype:'email',
			margin:'10 0 0 10',
			width:300,
			inputWrapCls:'',
			fieldStyle:'background-color:f5eeee;',
			triggerWrapCls:'border:none; width:800px;',
			style:'border: 0; border-bottom: 1px solid red;'
		},{
			xtype:'textfield',
			itemId:'originalPwd',
			emptyText:'Password',
			allowBlank:true,
			width:300,
			margin:'10 0 0 10',
			inputWrapCls:'width:800px;',
			fieldStyle:'background-color:f5eeee;',
			triggerWrapCls:'border:none; width:800px;',
			style:'border: 0; border-bottom: 1px solid red;'
		},{
			xtype:'textfield',
			emptyText:'Confirm Password',
			validation : false,
			allowBlank:true,
			margin:'10 0 0 10',
			width:300,
			vtype:'passwordMatch',
			inputWrapCls:'width:800px;',
			fieldStyle:'background-color:f5eeee;',
			triggerWrapCls:'border:none; width:800px;',
			style:'border: 0; border-bottom: 1px solid red;'
		},{
			xtype:'button',
			text:'Register Me',
			style:'background-color:#550404; color:black;',
			width:'100',
			height:40,
			margin:'10 0 0 10',
			handler:function(){
				
				if(Ext.ComponentQuery.query("#RegisterForm")[0].items.items[2].getValue()!=Ext.ComponentQuery.query("#RegisterForm")[0].items.items[3].getValue())
					Ext.Msg.alert("Passwords Do Not Match","Passwords Do Not Match")
				else{
					Ext.Msg.alert("Submitted Data","User Name :"+Ext.ComponentQuery.query("#RegisterForm")[0].items.items[0].getValue()
				+"\n"+" Email is : "+ Ext.ComponentQuery.query("#RegisterForm")[0].items.items[1].getValue()+"\n"+
				" Password is : "+Ext.ComponentQuery.query("#RegisterForm")[0].items.items[2].getValue())	
				}
				
			}
		}],
		
		
	})
	return panel
}


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport',{
		align:'center',
		height:800,
		margin:'150 0 0 450',
		renderTo:Ext.getBody(),
		items:training.frontend.createpanel()
	})
	
})