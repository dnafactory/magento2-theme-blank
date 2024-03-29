define([
    'js/lib/dna-utilities'
], function(utilities) {
    'use strict';

    /**
     * Applies classes and adds functionalities to use input's labels as placeholders
     * @mixin
     */
    var mixin = {
        defaults: {
            options: {
                /**
                 * @param string notEmptyLabelClass: class applied to the label when the associated input is not empty
                 */
                notEmptyLabelClass: "not-empty"
            }
        },
        _bind: function(){
            this._super();
            //window.addEventListener('autofill', () => this.toggleLabel)
            // We need to check input's status on every DOM change
            utilities.attachEvents(this.element,"focusin input focusout click change close autofill", this.toggleLabelClass.bind(this));
        },
        _create: function(){
            this._super();

            if(this.container.classList.contains('control-icon')) {
                this.label.parentElement.classList.add('field-icon');
                this.label.parentElement.classList.toggle('reverse', this.container.classList.contains('reverse'));
            }
        },
        _init: function(){
            this._super();
            // On init, it checks the input's current status
            this.toggleLabelClass();
        },
        /**
         * Toggles the notEmptyLabelClass class based on input state
         * @param force
         */
        toggleLabelClass(force){
            this.label.classList.toggle(
                this.options.notEmptyLabelClass,
                (utilities.isBoolean(force)) ? force : !utilities.isControlEmpty(this.element)
            );
            this.container.classList.toggle(
                this.options.notEmptyLabelClass,
                (utilities.isBoolean(force)) ? force : !utilities.isControlEmpty(this.element)
            );
            this.label.classList.toggle('disabled', this.element.disabled);
        },

        _getOrGenerateLabel(){
            var fieldset = this.element.closest('fieldset.field');
            if(utilities.getBooleanValue(utilities.getCssVar('label-as-placeholder')) && fieldset){
                // if it's a labeled fieldset which has a legend element
                var legend = fieldset.querySelector(':scope > legend');
                if( legend && utilities.isVisible(legend) ){
                    this.label = legend;
                }else{
                    this._super();
                }
                if (utilities.getInputType(this.element) === 'select') {
                    if (this.element.options.length > 0 && this.element.options[0].value === "")
                        this.element.options[0].textContent = "";
                }
            } else{
              return this._super();
            }
        }
    };

    return function(Component){
        return Component.extend(mixin);
    }
});
