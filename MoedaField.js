Ext.define('Mba.ux.Field.MoedaField', {
    extend: 'Mba.ux.Field.NumberTextField',
    xtype: 'moedafield',

    config: {
         mascara: true
    },

    initialize: function() {
        this.callParent();
    },
    
    formatar: function(valor) {
        valor = valor.replace(/\D/gi, "");
        if(valor.length){
            valor = parseFloat(valor) / 100;
        }
        return Mba.ux.Field.Formatador.formatarValorMonetarioSimbolo(valor);
    },

    getValue: function() {
        var me = this;
        me._value = Mba.ux.Field.Formatador.desformatarValorMonetario(this.getComponent().getValue());
        return me._value;
    }

});