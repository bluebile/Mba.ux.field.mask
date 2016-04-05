Ext.define('Mba.ux.Field.MaskTextField', {
	extend : 'Ext.field.Text',
	xtype: 'masktextfield',

    mixins: [
        'Mba.ux.field.mask.Mask'
    ]
});
