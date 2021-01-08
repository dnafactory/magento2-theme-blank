define([
    'js/theme/inputs/focusable',
    'js/lib/dna-utilities'
], function(CustomInput, utilities) {
    'use strict';

    /**
     * CustomSelect
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Applies boostrap styles and functionalities to an HTML select
     */
    return CustomInput.extend({
        defaults:{
            options:{
                type: "select",
                focusClass: "focus",
                openedClass: "open"
            },
            opened: false
        },
        _bind: function(){
            // Toggles opened state while interacting with the element
            this.element.addEventListener('mousedown', () => this.toggleOpened());

            // Switches off opened state when needed
            utilities.attachEvents(this.element, 'mouseup focusout', () => this.toggleOpened(false));
            utilities.attachEvents(document, 'mouseup focusout', () => this.toggleOpened(false));

            this._super();
        },
        toggleOpened(force){
            var opened = (utilities.isBoolean(force))? force : !this.opened;
            if(opened !== this.opened) {
                this.opened = opened;
                utilities.toggleClasses(this.container, this.options.openedClass, this.opened);
                this.element.dispatchEvent(new CustomEvent(this.opened? 'open' : 'close'));
            }

        },
        /**
         * Overrides CustomInput default one as we don't need the same DOM manipulations
         * @private
         */
        _init(){
            this._super();
            this.element.classList.add('custom-select');
        }
    });
});