Ext.define('Mba.ux.Field.TextOnlyField', {
	extend : 'Mba.ux.Field.MaskTextField',
	xtype: 'textonlyfield',

	config: {
		mascara: true,
		matchValue: /^[a-z\u00E0-\u00FC\s]+$/i,
		component : {
			pattern : '/^[a-z\u00E0-\u00FC\s]+$/i'
        }
	},

	initialize : function() {
// Retirado o keypress porque seria complicado colocar o keycode
// dos caracteres especiais
//		var me = this;
//		this.element.dom.onkeypress = function(e) {
//			var charCode = (event.which) ? event.which : event.keyCode;
//			return!(!(charCode == 32) && !(charCode >= 44 && charCode <= 57) && !(charCode >= 65 && charCode <= 90) && !(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122));
//		};
		this.callParent();
	},

	formatar: function(valor) {
		if (this.getMascara() === true) {
			valor = valor.replace(/[^a-z\u00E0-\u00FC\s]+$/i, "");
		} else {
			valor = this.callParent([valor]);
		}
		return valor;
	}
});
