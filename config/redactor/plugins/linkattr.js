(function(t) {
    t.add('plugin', 'linkattr', {

        translations: {
            en: {
                linkAttr: 'Attribute(s)',
                linkAttrValue: 'Value',
                linkAttrTrue: 'True',
                linkAttrFalse: 'False',
            },
        },

        init: function(app) {
            this.app = app;
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.selection = app.selection;
            this.opts = app.opts;
            this.attrName = '';
            this.attributes = {};
        },


        /**
         * listen for when the link module changes or inserts new links
         */
        onlink: {

            // on 'changed' passes a regular browser DOM object
            changed: function(e) {
                if( this.opts.linkAttrs ) {
                    for ( const [name, value] of Object.entries(this.attributes) ) {
                        if( value && value != 'false' ) {
                            e[0].setAttribute( name, value );
                        } else {
                            e[0].removeAttribute( name );
                        }
                    };
                }
            },

            // but on 'inserted' passes a Redactor DOM object
            // https://imperavi.com/redactor/docs/api-services/dom/#s-dom
            inserted: function(e) {
                if( this.opts.linkAttrs ) {
                    var element = e.first();
                    for ( const [name, value] of Object.entries(this.attributes) ) {
                        if( value && value != 'false' ) {
                            element.attr( name, value );
                        } else {
                            element.removeAttr( name );
                        }
                    };
                }
            }
        },

        
        /**
         * listen for when the link modal opens
         */
        onmodal: {
            link: {
                open: function (modal, form) {
                    if( this.opts.linkAttrs ) {
                        this.$modal = modal;
                        this.$form = form;
                        this._setup();
                        this._populateExisting();
                    }
                }
            }
        },


        /**
         * setup the attribute options <select> in the link module modal
         */
        _setup: function () {            
            if (0 === (e = this.$modal.find("#redactor-link-attrs")).length)
            {
                var wrapper = t.dom('<div id="redactor-link-attr-wrapper" class="form-item" style="display: grid; grid-template-columns: repeat(2,1fr); column-gap: 1rem;" />');
                var fi      = t.dom('<div>');
                var lb      = t.dom('<label for="redactor-link-attrs">' + this.lang.get('linkAttr') + '</label>');
                
                var se  = t.dom('<select id="redactor-link-attrs" name="attr"></select>');
                var opt = t.dom("<option value=''></option>");
                se.append(opt);

                this.opts.linkAttrs.forEach(function(element) {
                    opt = t.dom(`<option value='${element.attr}'>${element.label}</option>`);
                    se.append(opt);
                });
               
                se.on("change", this._onChangeAttrSelect.bind(this));
                
                fi.append(lb).append(se);
                wrapper.append(fi);

                // try to place the field before the new tab target checkbox
                var $target = this.$form.find('div.form-item-target')
                if( $target ) {
                    $target.before(wrapper)
                } else {
                    this.$modal.getBody().children().first().append(wrapper);
                }
            }
        },


        /**
         * find any existing attributes in the selected link
         */
        _populateExisting: function() {
            var currentLink = this._getCurrent();

            // empty the attributes hash and fill it with values from the selected link
            var attributes = {};
            if( currentLink ) {
                this.opts.linkAttrs.forEach(function(element) {
                    attributes[element.attr] = currentLink.getAttribute(element.attr) ?? null
                });
            }

            this.attributes = attributes;
        },

        /**
         * update the editable fields any time the attr <select> changes
         */
         _onChangeAttrSelect: function(i)
         {
            var data = this.$form.getData();

            // if we're already displaying a field to edit an attribute value, remove it
            var $lastInput = this.$form.find('div#redactor-link-attr-val');
            if( $lastInput ) { $lastInput.remove() }

            // create a new edit field
            if( data.attr )
            {   
                var wrapper = t.dom('<div id="redactor-link-attr-val" />');
                var label   = t.dom('<label for="redactor-link-attr-value">' + this.lang.get('linkAttrValue') + '</label>');

                // get the input field
                var input = this._createInputField( data.attr );
                
                //wrapper.append(name).append(value);
                wrapper.append(label).append(input);

                this.$form.find('div#redactor-link-attr-wrapper').append(wrapper);
            }
            
            this.attrName = data.attr ?? '';
        },


        /**
         * update the value of the data-attribute selected
         */
         _onChangeAttrValue: function(i) {
            var data = this.$form.getData();
            this.attributes[this.attrName] = data.attrValue ?? '';
        },


        /**
         * find the first currently selected link in the editor (if one exists).
         */
        _getCurrent: function () {
            return this.selection.getInlinesAllSelected({ tags: ["a"] })[0];
        },


        /**
         * Create the right kind of input field for an attribute
         */
        _createInputField: function ( attr ) {
            
            var attrType    = 'text';
            var attrOpts    = [];
            var startingVal = this.attributes[attr] ?? '';

            // lang
            var lang = this.lang;

            // find the details for the type of attribute we need to build an input for
            this.opts.linkAttrs.forEach(function(element) {
                if( element.attr == attr ) {
                    attrType = element.type ?? 'text';
                    if( attrType == 'boolean' ) {
                        attrOpts = [
                            { 'name' : lang.get('linkAttrTrue'),  'value': "true"  },
                            { 'name' : lang.get('linkAttrFalse'), 'value': "false" }
                        ];
                    }

                    if( attrType == 'enum' && 'options' in element ) {
                        attrOpts = element.options;
                    }
                }
            });
           
            var input;
            
            // simple text inputs
            if( attrType == 'text' || !attrOpts.length ) {
                input = t.dom('<input type="text" id="redactor-link-attr-value" name="attrValue" value="' + startingVal + '">');
            
            // selects & booleans
            } else {
                input = t.dom('<select id="redactor-link-attr-value" name="attrValue"></select>');
                attrOpts.forEach(function(element) {
                    opt = t.dom(`<option value='${element.value}'>${element.name}</option>`);
                    if( element.value == startingVal || ( attrType == 'boolean' && element.value == 'false' && startingVal == '' ) ) {
                        opt = t.dom(`<option value='${element.value}' selected>${element.name}</option>`);
                    }
                    
                    input.append(opt);
                });
            }
            
            // set onchange event
            input.on("change", this._onChangeAttrValue.bind(this));                

            return input;
        }
    });
})(Redactor);