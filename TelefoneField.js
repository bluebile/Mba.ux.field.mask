Ext.define('Mba.ux.Field.TelefoneField', {
    extend : 'Mba.ux.Field.NumberTextField',
    xtype: 'telefonefield',

    config : {
        maxLength: 12,
        mascara: '(99) 99999-9999'
    },

    /**
     * Formata o campo dependendo da digitação do usuário
     *
     * @param campo
     */
    mascarar: function(campo) {
        var value = campo.getValue(),
            length = value.length;

        if (length == 10) {
            this.setMascara('(99) 9999-9999');
        } else if (length == 11) {
            this.setMascara('(99) 99999-9999');
        }

        campo.setValue(this.formatar(this.getComponent().getValue()));
    }
});
