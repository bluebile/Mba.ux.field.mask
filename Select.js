Ext.define('Mba.ux.Field.Select', {
    extend: 'Ext.Decorator',
    xtype: 'mba_selectfield',
    isField: true,
    statics: {
        defaultItem: {
            value: null,
            text: 'SELECIONE'
        }
    },

    config: {
        label: null,
        labelAlign: 'left',
        labelWidth: '30%',
        labelWrap: false,
        required: false,
        name: null,
        readOnly: false,
        needForceLoad: false,
        form: null,
        options: [],
        store: null,
        defaultOption: {
            value: null,
            text: null
        }
    },

    initialize: function() {
        var me = this;

        me.callParent();

        this.selectComponent.dom.addEventListener('change',  Ext.Function.bind(this.onChange,this) , false);
    },

    onChange: function(me, value, startValue) {
        this.fireEvent('change', this, this.getValue(), startValue);
    },


    cachedConfig: {
        /**
         * @cfg {String} labelCls Optional CSS class to add to the Label element.
         * @accessor
         */
        labelCls: null,

        /**
         * @cfg {String} requiredCls The `className` to be applied to this Field when the {@link #required}
         * configuration is set to `true`.
         * @accessor
         */
        requiredCls: Ext.baseCSSPrefix + 'field-required',

        /**
         * @cfg {String} inputCls CSS class to add to the input element of this fields {@link #component}
         */
        inputCls: null
    },

    constructor: function()
    {
        Ext.apply(this.config.defaultOption, Mba.ux.Field.Select.defaultItem);
        this.callParent(arguments);
    },

    addOption: function(value, text, selected, index)
    {
        var optionDom = document.createElement('option');
        optionDom.text = text;
        optionDom.value = value;
        optionDom.selected = selected;
        if (this.selectComponent) {
            this.selectComponent.dom.add(optionDom, index);
        }
    },

    addOptions: function(options)
    {
        for (var idx = 0; idx < options.length; idx++) {
            var option = options[idx];
            this.addOption(option.value, option.text, option.selected);
        }
    },

    updateStore: function(store)
    {
        var me = this,
            valueIndex = 'id',
            textIndex = 'name';

        if (!store) {
            return;
        }

        if (Ext.isObject(store)) {

            if (!store.storeId) {
                throw 'StoreId e requerido';
            }

            if (!store.value) {
                throw 'Value e requerido';
            }

            if (!store.text){
                throw 'Text e requerido';
            }

            valueIndex = store.value;
            textIndex = store.text;
            store  = store.storeId;
        }

        store = Ext.getStore(store);

        if (!this.getNeedForceLoad()) {
            var callback = function(results) {
                var options = [];
                results.each(function(value, index) {
                    options.push({ value: value.get(valueIndex), text: value.get(textIndex) });
                });
                me.clearOptions();
                me.addOptions(options);
            };

            if (store.isLoaded()) {
                callback(store.getData());
            }

            store.on('load', function(results) {
                callback(results);
            });
        }

    },
    loadSelect: function()
    {
        var me = this,
            valueIndex = 'id',
            textIndex = 'name';

        if (!store) {
            return;
        }

        if (Ext.isObject(store)) {

            if (!store.storeId) {
                throw 'StoreId e requerido';
            }

            if (!store.value) {
                throw 'Value e requerido';
            }

            if (!store.text){
                throw 'Text e requerido';
            }

            valueIndex = store.value;
            textIndex = store.text;
            store  = store.storeId;
        }

        store = Ext.getStore(store);

        var callback = function(results) {
            var options = [];
            results.each(function(value, index) {
                options.push({ value: value.get(valueIndex), text: value.get(textIndex) });
            });
            me.clearOptions();
            me.addOptions(options);
        };
        if (store.isLoaded()) {
            callback(store.getData());
        }

    },
    getElementConfig: function()
    {
        var prefix = Ext.baseCSSPrefix;
        return {
            reference: 'element',
            className: 'x-field mba-selectfield',
            children: [
                {
                    reference: 'label',
                    cls: prefix + 'form-label',
                    children: [{
                        reference: 'labelspan',
                        tag: 'span'
                    }]
                },
                {
                    reference: 'innerElement',
                    cls: prefix + 'component-outer',
                    children: [{
                        reference: 'selectComponent',
                        tag: 'select'
                    }]
                }
            ]
        };
    },

    updateOptions: function(newOptions)
    {
        if (!Ext.isEmpty(newOptions)) {
            this.addOptions(newOptions);
        }
    },

    updateDefaultOption: function()
    {
        if (this.getDefaultOption()) {
            this.addOption(this.getDefaultOption().value, this.getDefaultOption().text, null, 0);
        }
    },

    updateLabel: function(newLabel)
    {
        var renderElement = this.renderElement,
            prefix = Ext.baseCSSPrefix;

        if (newLabel) {
            this.labelspan.setHtml(newLabel);
            renderElement.addCls(prefix + 'field-labeled');
        } else {
            renderElement.removeCls(prefix + 'field-labeled');
        }
    },

    updateLabelAlign: function(newLabelAlign, oldLabelAlign)
    {
        var renderElement = this.renderElement,
            prefix = Ext.baseCSSPrefix;

        if (newLabelAlign) {
            renderElement.addCls(prefix + 'label-align-' + newLabelAlign);

            if (newLabelAlign == 'top' || newLabelAlign == 'bottom') {
                this.label.setWidth('100%');
            } else {
                this.updateLabelWidth(this.getLabelWidth());
            }
        }

        if (oldLabelAlign) {
            renderElement.removeCls(prefix + 'label-align-' + oldLabelAlign);
        }
    },

    // @private
    updateLabelCls: function(newLabelCls, oldLabelCls)
    {
        if (newLabelCls) {
            this.label.addCls(newLabelCls);
        }

        if (oldLabelCls) {
            this.label.removeCls(oldLabelCls);
        }
    },

    // @private
    updateLabelWidth: function(newLabelWidth)
    {
        var labelAlign = this.getLabelAlign();

        if (newLabelWidth) {
            if (labelAlign == 'top' || labelAlign == 'bottom') {
                this.label.setWidth('100%');
            } else {
                this.label.setWidth(newLabelWidth);
            }
        }
    },

    // @private
    updateLabelWrap: function(newLabelWrap)
    {
        var cls = Ext.baseCSSPrefix + 'form-label-nowrap';

        if (!newLabelWrap) {
            this.addCls(cls);
        } else {
            this.removeCls(cls);
        }
    },

    /**
     * Updates the {@link #required} configuration.
     * @private
     */
    updateRequired: function(newRequired)
    {
        this.renderElement[newRequired ? 'addCls' : 'removeCls'](this.getRequiredCls());
    },

    /**
     * Updates the {@link #required} configuration
     * @private
     */
    updateRequiredCls: function(newRequiredCls, oldRequiredCls)
    {
        if (this.getRequired()) {
            this.renderElement.replaceCls(oldRequiredCls, newRequiredCls);
        }
    },

    updateName: function(newName)
    {
        this.updateFieldAttribute('name', newName);
    },

    updateForm: function(newForm)
    {
        this.updateFieldAttribute('form', newForm);
    },

    updateReadOnly: function(newReadOnly)
    {
        this.updateFieldAttribute('readonly', newReadOnly ? true : null);
    },

    updateNeedForceLoad: function(newNeedForceLoad)
    {
        this.updateFieldAttribute('needForceLoad', newNeedForceLoad ? true : null);
    },

    updateFieldAttribute: function(attribute, newValue)
    {
        var select = this.selectComponent;

        if (!Ext.isEmpty(newValue, true) && select != null) {
            select.dom.setAttribute(attribute, newValue);
        } else {
            select.dom.removeAttribute(attribute);
        }
    },

    updateId: function(newId)
    {
        this.updateFieldAttribute('id', newId);
    },

    updateItemId: function(newId)
    {
        this.updateFieldAttribute('id', newId);
    },

    replaceCls: function(oldCls, newCls, prefix, suffix)
    {
        // We could have just called {@link #removeCls} and {@link #addCls}, but that would mean {@link #updateCls}
        // would get called twice, which would have performance implications because it will update the dom.

        var cls = this.getCls(),
            array = (cls) ? cls.slice() : [],
            ln, i, cachedCls;

        prefix = prefix || '';
        suffix = suffix || '';

        //remove all oldCls
        if (typeof oldCls == 'string') {
            array = Ext.Array.remove(array, prefix + oldCls + suffix);
        } else if (oldCls) {
            ln = oldCls.length;
            for (i = 0; i < ln; i++) {
                array = Ext.Array.remove(array, prefix + oldCls[i] + suffix);
            }
        }

        //add all newCls
        if (typeof newCls == 'string') {
            array.push(prefix + newCls + suffix);
        } else if (newCls) {
            ln = newCls.length;

            //check if there is currently nothing in the array and we don't need to add a prefix or a suffix.
            //if true, we can just set the array value to the newCls property, because that is what the value will be
            //if false, we need to loop through each and add them to the array
            if (!array.length && prefix === '' && suffix === '') {
                array = newCls;
            } else {
                for (i = 0; i < ln; i++) {
                    cachedCls = prefix + newCls[i] + suffix;
                    if (array.indexOf(cachedCls) == -1) {
                        array.push(cachedCls);
                    }
                }
            }
        }

        this.setCls(array);
    },

    /**
     * Add or removes a class based on if the class is already added to the Component.
     *
     * @param {String} className The class to toggle.
     * @chainable
     */
    toggleCls: function(className, force)
    {
        var oldCls = this.getCls(),
            newCls = (oldCls) ? oldCls.slice() : [];

        if (force || newCls.indexOf(className) == -1) {
            newCls.push(className);
        } else {
            Ext.Array.remove(newCls, className);
        }

        this.setCls(newCls);

        return this;
    },

    /**
     * @private
     * Checks if the `cls` is a string. If it is, changed it into an array.
     * @param {String/Array} cls
     * @return {Array/null}
     */
    applyCls: function(cls)
    {
        if (typeof cls == 'string') {
            cls = [cls];
        }

        //reset it back to null if there is nothing.
        if (!cls || !cls.length) {
            cls = null;
        }

        return cls;
    },

    /**
     * @private
     * All cls methods directly report to the {@link #cls} configuration, so anytime it changes, {@link #updateCls}
     * will be called
     */
    updateCls: function(newCls, oldCls)
    {
        if (this.element && ((newCls && !oldCls) || (!newCls && oldCls) || newCls.length != oldCls.length ||
            Ext.Array.difference(newCls, oldCls).length > 0)) {
            this.element.replaceCls(oldCls, newCls);
        }
    },

    getValue: function()
    {
        if (this.selectComponent.dom[this.selectComponent.dom['selectedIndex']].attributes[0]) {
            return this.selectComponent.dom[this.selectComponent.dom['selectedIndex']].attributes[0].value;
        }
        return '';
    },

    getText: function() {
        var me = this,
            options = me.selectComponent.dom.options;

        for (var i = options.length - 1; i >= 0; i--) {
            if(options[i].selected)
                return options[i].text;
        };
    },

    setValue: function(value) {
        this.selectComponent.dom.value = value;
    },

    select: function(value)
    {
        if (Ext.isNumber(value)) {
            if (this.selectComponent.dom[value]) {
                this.selectComponent.dom[value].selected = true;
            }
        } else {
            this.setValue(value);
        }
    },

    /*
     * Seleciona exclusivamente pelo indice
     */
    selectByIndex: function(index) {

        var me = this;
        if (Ext.isNumber(index)) {
            if (me.selectComponent.dom[index]) {
                me.selectComponent.dom[index].selected = true;
            }
        }
    },

    /*
     * Seleciona exclusivamente pelo valor
     */
    selectByValue: function(value) {
        var me = this;
        me.setValue(value);
    },

    clearOptions: function() {
        var i;
        if (this.selectComponent) {
            for ( i = this.selectComponent.dom.options.length - 1; i >= 0; i--) {
                this.selectComponent.dom.remove(i);
            }
            this.updateDefaultOption();
        }
    },

    setData: function(data) {
        this.clearOptions();
        this.addData(data);
    },

    addData: function(data) {
        for (var i = 0; i < data.length; i++) {
            this.addOption(data[i].get('value'), data[i].get('text'));
        }
    }

});
