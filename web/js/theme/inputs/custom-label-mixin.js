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
            utilities.attachEvents(this.element,"focusin input focusout click change close autofill", () => this.toggleLabelClass());
        },
        _create: function(){
            this._super();
            // Reset placeholder content
            this._checkPlaceholder();

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
            this.label.classList.toggle('disabled', this.element.disabled);
        },
        _checkPlaceholder(){
            if(utilities.getBooleanValue(utilities.getCssVar('label-as-placeholder'))){
                requirejs(['jquery'], ($) => {
                    // Check if control is in a fieldset
                    var fieldset = $(this.element).closest('fieldset');
                    if(fieldset.length && !$(this.label).is(':visible')){
                        // if it's a labeled fieldset which has a legend element
                        if( $('> legend', fieldset).length ){
                            var legend = $('> legend', fieldset).get(0);
                            this.label.classList.forEach(value => legend.classList.add(value));
                            this.label = legend;
                        }
                    }
                });
                if (utilities.getInputType(this.element) === 'select') {
                    if (this.element.options.length > 0 && this.element.options[0].value === "")
                        this.element.options[0].textContent = "";
                }
            }
        }
    };

    return function(Component){
        return Component.extend(mixin);
    }
});