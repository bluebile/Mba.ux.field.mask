Ext.define('Mba.ux.Field.SpecialCharacterField', {
	extend : 'Mba.ux.Field.MaskTextField',
	xtype: 'specialcharacterfield',
	
	config: {
		mascara: true,
		matchValue: /[0-9a-z\.\,\-\/\s]/,
		component : {
			pattern : '[0-9a-z\.\,\-\/\s]*'
        }	
	},
	
	initialize : function() {
		var me = this;
		this.element.dom.onkeypress = function(e) {
			var charCode = (event.which) ? event.which : event.keyCode;
			return!(!(charCode == 32) && !(charCode >= 44 && charCode <= 57) && !(charCode >= 65 && charCode <= 90) && !(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122));
		};
		this.callParent();
	},
	
	formatar: function(valor) {
		if (this.getMascara() === true) {
			valor = valor.replace(/[^0-9a-z\.\,\-\/\s]/gi, "");
		} else {
			valor = this.callParent([valor]);
		}		
		return valor;
	}
});
