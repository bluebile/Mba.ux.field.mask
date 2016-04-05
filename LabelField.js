Ext.define('Mba.ux.Field.LabelField', {
    extend: 'Ext.field.Field',
    xtype: 'labelfield',
  
    config: {
    	
    	isField: true,
    	
	    value: '',
	    
	    renderSelectors: {fieldEl: '.x-form-labelfield'},
	    
	    renderTpl: [
	        '<tpl if="label">',
	            '<div class="x-form-label"><span>{label}</span></div>',
	        '</tpl>',
	        '<div class="x-form-label x-form-labelfield" style="font-weight: normal;width:100%; text-align:left"><span style="font-weight: normal !important;">{value}</span></div>'
	   ]
    },
    
    setValue:function(val) {
        this.value = val;
        // if(this.rendered){
        this.setHtml('<span style="font-weight: normal !important;">' + val + '</span>');
        //}
        return this;
    }
    
});
