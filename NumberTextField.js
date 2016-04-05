Ext.define('Mba.ux.Field.NumberTextField', {
	extend : 'Mba.ux.Field.MaskTextField',
	xtype: 'numbertextfield',
	
	config: {
		mascara: true,
		matchValue: /[0-9]/,
		MAX_LENGTH:null,
		component : {
			pattern : '[0-9]*',
			type: 'tel'
//			type: 'number'
        },
        listeners: {
	        keyup: function( textfield, e, eOpts ) {
	            var me=this;
	            var value = textfield.getValue()+'';
	            var length = value.length;
	            var maxlength = me.config.MAX_LENGTH;

	            if( maxlength != null ){
	                if (length > maxlength) {
	                    textfield.setValue(value.substring(0, maxlength));
	                    return false;
	                }
	            }
	        }
	    }
	},
	
	initialize : function() {
		var me = this;
		this.element.dom.onkeypress = function(e) {
			var charCode = (event.which) ? event.which : event.keyCode;
			return !((charCode > 31 && (charCode < 48 || charCode > 57)) || me.getComponent().getValue().length >= me.getMaxLength());
		};
		this.callParent();
	},
	
	formatar: function(valor) {
		if (this.getMascara() === true) {
			valor = valor.replace(/[^0-9]/g, "");
		} else {
			valor = this.callParent([valor]);
		}
		
		return valor;
	}

});
