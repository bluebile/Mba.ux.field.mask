Ext.define('Mba.ux.Field.MaskPasswordField', {
	extend : 'Ext.field.Password',
	xtype: 'maskpasswordfield',

    mixins: [
        'Mba.ux.field.mask.Mask'
    ]
});
