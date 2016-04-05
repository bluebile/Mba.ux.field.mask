Ext.define('Mba.ux.Field.LowerTextField', {
	extend: 'Ext.field.Text',
	xtype: 'lowertextfield',
	
	config: {
		component: {
            cls: 'x-component-outer x-input-el-lower'
        }
    },
    
	habilitarUpperCase: Ext.emptyFn,
	
	aplicarUpperCase: Ext.emptyFn

});
