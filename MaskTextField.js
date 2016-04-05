Ext.define('Mba.ux.Field.MaskTextField', {
	extend : 'Ext.field.Text',
	xtype: 'masktextfield',
	
	config : {

		maxLength : 100,
		
		matchValue: /[0-9a-zA-Z]/,
		
		mascara: null
		
	},
	
	initialize : function() {
		this.callParent();
		if (this.getMascara()) {
			this.getMascara().length && this.setMaxLength(this.getMascara().length);
			this.addListener({
				scope : this,
				keyup : 'mascarar'
			});
		}
	},
	
	mascarar: function(campo, event) {
		campo.setValue(this.formatar(this.getComponent().getValue()));
	},
	
	formatar: function(valor) {
		return (this.getMascara() && this.getMascara().length) ? this.toPattern(valor, this.getMascara()): valor;
	},
	
	toPattern: function(value, opts) {
		var DIGIT = "9", ALPHA = "A", 
			index = 0, i,
			output = opts.split(""),
	        values = value.toString().replace(/[^0-9a-zA-Z]/g, "");
	        
	    for (i = 0; i < output.length; i++) {
	    	if (index >= values.length) {
	    		break;
	    	}
	    	
	    	if ((output[i] === DIGIT && values[index].match(/[0-9]/)) || (output[i] === ALPHA && values[index].match(/[a-zA-Z]/))) {
	    		output[i] = values[index++];
	    	} else if (output[i] === DIGIT || output[i] === ALPHA) {
	    		output = output.slice(0, i);
	    	}
	    }
		return output.join("").substr(0, i);
	},
	
	applyValue: function(valor) {
		if (!valor) {
			return null;
		}
		
		valor = valor.toString();
		return this.formatar(valor);
	},
	
	getValue: function() {
		var valor = this.callParent();
		var valorSemMascara = "";
		for (var index = 0; index < valor.length; index++) {
			var caracter = valor.substring(index, index+1);
			if (caracter.match(this.getMatchValue())) {
				valorSemMascara += caracter;
			}
		}
		return valorSemMascara;
	}

});
