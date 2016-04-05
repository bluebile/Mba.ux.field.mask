Ext.define('Mba.ux.Field.TextField', {
    override: 'Ext.field.Text',
    xtype: 'cap-textfield',

    config: {
    	autoCorrect : false,
    	autoComplete : false,
    	
        listeners: {
            change: 'aplicarUpperCase',
            focus: 'onFocus',
            blur: 'onBlur',
            initialize: 'onInitializeText',
            paste: 'onPaste'
        }
    },

    onHideKeyboard: function () {
        if (Ext.application.focusedField != null) {
            Ext.application.focusedField.blur();
        }
        Ext.application.focusedField = null;
    },

    onPaste: function (e) {
        //permite o copiar e colar apenas para browsers
        if (Ext.os.is('Android') || Ext.os.is('WindowsPhone') || Ext.os.is.iOS) {
            e.preventDefault();
        }
    },

    onInitializeText: function () {
        var me = this;
        window.addEventListener('native.hidekeyboard', me.onHideKeyboard);
    },

    aplicarUpperCase: function (field, newValue, oldValue) {
        field.setValue(newValue);
    },
    onFocus: function () {
		
    	if ( this.isFocado ) {
//    		console.log('onFocus, field ja estava focado');
    		return;
    	}
    	
    	if ( this.bodyElement.dom.classList ) {
           this.bodyElement.dom.classList.add('focused');
    	}
        Ext.application.focusedField = this;
        
        this.isFocado = true;
        
//		console.log('onFocus, field focado... callparent');
        
        this.callParent();
    },
    onBlur: function () {
    	
    	if ( ! this.isFocado ) {
//    		console.log('onBlur, field nao estava focado');
    		return;
    	}
    	
    	if ( this.bodyElement.dom.classList ) {
            this.bodyElement.dom.classList.remove('focused');
    	}
        Ext.application.focusedField = null;
        
        // POG para corrigir problema do IOS de clicar em um campo em uma area vazia 
        // com o teclado aberto e clicar no textfield novamente, comentado por ser
        // muito agressiva, mas nao foi encontrada outra alternativa
        // Bug do Sencha Touch, nao resolvido:
        // https://www.sencha.com/forum/showthread.php?275803-Textfield-blur-bug-on-IOS
        if ( Ext.os.is.iOS ) {
        	var input = this.element.dom.getElementsByTagName('input')[0]; 
            input.setAttribute('readonly', 'readonly');
            setTimeout(function() {
            	input.removeAttribute('readonly');
            }, 700);
        }
        
        this.isFocado = false;
        
//        console.log('onBlur, field blur... callparent');
        
        this.callParent();
    }

});
