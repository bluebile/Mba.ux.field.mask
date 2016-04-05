# Plugin Sencha para Campos de Formulários
+ Mba.ux.Field.Select - Campo Select nativo
+ Mba.ux.Field.Cpf - Campo Texto para CPF

### Exemplo -  Mba.ux.Field.Select com Stores

```js
    ...
    config: {
         items:[{
            xtype: 'mba_selectfield',
            label: 'Dropdown:',
            store: {
                storeId: 'NomeDaStore',
                value: 'chave',
                text: 'nome'
            }
        }]
    }
    ...
```

O campo 'value' e o campo 'text' são relativos ao option que será carregado no select:
Os valores serão substituídos:

```html
<option value = '{value}' >{text}</option>
```


### Exemplo -  Mba.ux.Field.Select com Option

```js
    ...
    config: {
         items:[{
            xtype: 'mba_selectfield',
            label: 'Dropdown:',
            options: [{
                value: 1,
                text: 'Opção 1'
            }, {
                value: 2,
                text: 'Opção 2'
            }, {
                value: 3,
                text: 'Opção 3'
            }]
        }]
    }
    ...
```



### Exemplo -  Mba.ux.Field.Cpf
```js
    ...
    config: {
         items:[{
            xtype: 'mba_cpffield',
            label: 'CPF:',
            options: {
                mask: true
            }
        }]
    }
    ...
```


## Contato

<info@bluebile.com>
