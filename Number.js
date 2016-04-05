Ext.define('Mba.ux.Field.Number', {
    extend: 'Ext.field.Text',
    xtype: 'mba_numberfield',
    config: {
        component: {
            type: 'number',
            pattern: '[0-9]*'
        },
        maxLength: 7,
        currentY: 0,
        listeners: {
            keyup: function (field) {
                if (Ext.os.is.iOS) {
                    var tamanho = field.getValue().length;
                    if (tamanho > 7) {
                        field.setValue(field.getValue().substr(0, tamanho - 1))
                        return;
                    }
                }
                field.formatAmount();
            }
        }
    },

    formatAmountNoDecimals: function (number) {
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(number)) {
            number = number.replace(rgx, '$1' + '.' + '$2');
        }
        return number;
    },

    formatAmount: function () {
        // remove all the characters except the numeric values
        var number = this.getValue() + '', x, x1;
        number = number.replace(/[^0-9]/g, '');

        // set the default value
        if (number.length === 0) {
            number = '0.00';
        } else if (number.length === 1) {
            number = '0.0' + number;
        } else if (number.length === 2) {
            number = '0.' + number;
        } else {
            number = number.substring(0, number.length - 2) + '.' + number.substring(number.length - 2, number.length);
        }

        // set the precision
        number = parseFloat(number);
        // only works with the "."
        number = number.toFixed(2);

        x = number.split(',');
        x1 = x[0];

        this.setValue(x1);
    }

});
