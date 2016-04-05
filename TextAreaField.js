Ext.define('Mba.ux.Field.TextAreaField', {
	override: 'Ext.field.TextArea',
	xtype: 'cap-textareafield',
	
	config: {
		listeners: {
		    //change: 'aplicarUpperCase'
		}
    },
    
	aplicarUpperCase: function(field, newValue, oldValue){
    	//field.setValue(newValue.toUpperCase());
    }

});
