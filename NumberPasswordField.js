Ext.define('Mba.ux.Field.NumberPasswordField', {
    extend : 'Mba.ux.Field.MaskPasswordField',
    xtype  : 'numberpasswordfield',

    config: {
		mascara: true,
		
		matchValue: /[0-9]/,
		
		component : {
			pattern : '[0-9]*',
            type: 'tel'
        }
	},

    initialize : function() {
		var me = this;
        this.callParent();
        //Adicionando a classe que transforma os digitos do input em 
        //"discos" para serem escondidos (como um comportamento normal de um campo password)
        //PS. usa a caracteristica de webkit, talvez não funcione em windows phone, testar
        this.getComponent().input.dom.classList.add('disk_password');
		this.element.dom.onkeypress = function(e) {
			var charCode = (event.which) ? event.which : event.keyCode;
			return !((charCode > 31 && (charCode < 48 || charCode > 57)) || me.getComponent().getValue().length >= me.getMaxLength());
		};
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