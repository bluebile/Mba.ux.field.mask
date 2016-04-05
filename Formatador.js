Ext.define('Mba.ux.Field.Formatador', {
    
    statics: {
    	
    	formatarValorMonetarioSimbolo: function(valor) {
    		return  this.formatarValorMonetario(valor);
    	},
    
    	formatarValorMonetario : function(valor, moeda) {
    		
    		
    		return accounting.formatMoney(valor, moeda); 
    		
		},
		
		desformatarValorMonetario : function(valor) {
			
			return accounting.unformat(valor); 
		},
		
		
		formatarCNPJ : function(numero) {
			if (!numero) {
				return null
			};
			numero = numero.replace(/[^0-9]/g,'');
			if (numero.length < 14) {
				for (i=0; i = 14 - numero.length; i++) {
					numero = '0'+numero;
				};
			};
			return numero.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1.$2.$3/$4-"); 
		},
		
		
        formatarCEP : function(numero) {
			if (!numero) {
				return null
			};
			numero = numero.replace(/[^0-9]/g,'');
			return numero.replace(/(\d{5})/, "$1-");
		},
		
		formatarData : function(millissegundos, formato){
			 var dt = new Date();
			 if(!formato){
				 formato = 'd/m/Y';
			 }
			 dt.setTime( millissegundos );
		     return Ext.Date.format( dt, formato );
		}
    }
});
