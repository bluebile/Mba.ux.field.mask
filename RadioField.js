Ext.define('Mba.ux.Field.RadioField', {
    extend: 'Ext.field.Radio',
    xtype: 'radiofield',
    config: {
    	labelWidth : 'auto',
    	//cls : 'marcador',
    	listeners : {
    		change : function( radioFld, event, obj) {
    	         if ( radioFld.isChecked() ) {
    	        	 radioFld.addCls('checked');
    	         } else {
    	        	 radioFld.removeCls('checked');
    	         }
    	         
    		}
    	}
    }
});