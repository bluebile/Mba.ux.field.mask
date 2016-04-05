Ext.define('Mba.ux.Field.CheckboxField', {
    extend: 'Ext.field.Checkbox',
    xtype: 'checkboxfield',
    config: {
    	labelWidth : 'auto',
    	groupName: null,
    	headerGroup: false,
    	//cls : 'marcador',
    	listeners : {
    		change : function( checkboxFld, newValue, oldValue, eOpts  ) {
   	         if ( checkboxFld.isChecked() ) {
   	        	 checkboxFld.addCls('checked');
   	         } else {
   	        	 checkboxFld.removeCls('checked');
   	         }
   	         
   	         if(checkboxFld.getGroupName() != null){
   	        	 if(checkboxFld.isHeaderGroup()){
   	        		 checkboxFld._onCheckboxGroupChange( checkboxFld, newValue, oldValue, eOpts  );
   	        	 }else{
   	        		 checkboxFld._onCheckboxItemChange( checkboxFld, newValue, oldValue, eOpts  );
   	        	 }
   	         }
   	         
   	         var onCheckboxChange = checkboxFld.getOnCheckboxChange();
   	         if ( onCheckboxChange ) {
   	        	 onCheckboxChange( checkboxFld, newValue, oldValue, eOpts  );
   	         }
    		}
    	},
    	
    	onCheckboxChange : function ( checkboxFld, newValue, oldValue, eOpts ) {
    		//console.log( "onCheckboxChange chamado! " + checkboxFld.isChecked() );
    		//console.log( checkboxFld );
    	}
    },
    
    setOnCheckboxChange: function(funcao) {
    	this.onCheckboxChange = funcao;
    },
    
    getOnCheckboxChange : function () {
    	return this.onCheckboxChange;
    },
    setGroupName: function(nome) {
		this.groupName = nome;
	},
	
	getGroupName : function () {
		return this.groupName;
	},
	
	isHeaderGroup : function(){
		return this.headerGroup;
	},
	
	setHeaderGroup : function(value) {
		this.headerGroup = value;
		
		if ( value ) {
			this.addCls('headerGroup');
		} else {
			this.removeCls('headerGroup');
		}
		
	},
	
	_onCheckboxGroupChange: function( checkbox , newValue, oldValue, eOpts ){
	    var items = checkbox.up().getInnerItems();
	    var groupName = checkbox.getGroupName();
	    
	    checkbox.removeCls('partialChecked');
	    
	    for(var i = 0; i < items.length; i++){
	    	
	    	var innerItem = items[i];
	    	
	    	if(innerItem && innerItem.getId() != checkbox.getId()){
	    		
	    		var innerGroupName = innerItem.getGroupName();
	    		if(innerGroupName.indexOf(groupName) > -1){
	    			this._markCheckboxPreventDefaults( innerItem , newValue );
	    		}
	    	}
	    	
	    }
    },
    
	_onCheckboxItemChange: function( checkbox , newValue, oldValue, eOpts ){
	    var items = checkbox.up().getInnerItems();
	    var groupName = checkbox.getGroupName();
	    var groupCheckbox = null;
	    var checkedItens = 0;
	    var uncheckedItens = 0;
	    
	    for(var i = 0; i < items.length; i++){
	    	var innerItem = items[i];
	    	if(innerItem){
	    		var innerGroupName = innerItem.getGroupName();
	    		
	    		if( innerGroupName == groupName ){ 
	    			if(innerItem.isHeaderGroup()){ //checkbox do grupo
	    				groupCheckbox = innerItem;
	    				continue;
	    			}
			    	if(innerItem.isChecked()){
			    		checkedItens++;
			    	}else{
			    		uncheckedItens++;
			    	}
	    		}
	    	}
	    }
	    this._markCheckboxPreventDefaults( groupCheckbox , checkedItens > 0 );
	    if( checkedItens > 0 && uncheckedItens > 0 ){
	    	groupCheckbox.addCls('partialChecked');
	    }
	    
    },
    
    _markCheckboxPreventDefaults : function (checkbox, checked){
    	checkbox.suspendEvents();
    	checkbox.removeCls('partialChecked');
    	if(checked){
	    		checkbox.check();
	    		checkbox.addCls('checked');
	    }else{
	    		checkbox.uncheck();
	    		checkbox.removeCls('checked');
	    }
		checkbox.resumeEvents(true);
    }
    
});



