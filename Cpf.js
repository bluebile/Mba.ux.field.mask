Ext.define('Mba.ux.Field.Cpf', {
    extend: 'Ext.field.Text',
    xtype: 'mba_cpffield',
    config: {
        label: 'CPF:',
        mask: true,
        listeners: {
            initialize: function() {
                var value = this.getValue();
                if(value != "") {
                    this.setValue(this.formatMask());
                }

                this.setMaxLength(14);
            },
            blur: function(scope, ev) {
                if (!this. validate()) {
                    if (ev) {
                        ev.stopPropagation();
                    }
                    this.fireEvent('errorValidate', this);
                }
            },
            keyup: function() {
                if (this.getMask()) {
                    this.setValue(this.formatMask());
                }
            }
        }
    },

    formatMask: function()
    {
        var cpf = this.getValue().toString();

        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1-$2');

        return cpf;
    },

    validate: function()
    {
        var strCPF = this.getValue().toString(),
            sum = 0, rest;

        if (this.getMask()) {
            strCPF = strCPF.replace(/\D/g, '');
        }

        if (strCPF == '00000000000') {
            return false;
        }

        for (var i = 1; i <= 9; i++) {
            sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        rest = (sum * 10) % 11;

        if ((rest == 10) || (rest == 11)) {
            rest = 0;
        }
        if (rest != parseInt(strCPF.substring(9, 10))) {
            return false;
        }

        sum = 0;
        for (var i = 1; i <= 10; i++) {
            sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }
        rest = (sum * 10) % 11;

        if ((rest == 10) || (rest == 11)) {
            rest = 0;
        }

        if (rest != parseInt(strCPF.substring(10, 11))) {
            return false;
        }

        return true;
    }
});
