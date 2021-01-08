define([
    'js/theme/inputs/form-control',
    'js/lib/dna-utilities'
], function(JSComponent, utilities) {
    'use strict';

    /**
     * CustomFocusable
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Applies some extra classes to an HTML input when is on focus
     *
     * options:
     * - focusClass: string  | style class applied on focus
     */
    return JSComponent.extend({
        defaults:{
            options : {
                focusClass: 'focus'
            },
            container: null,
            label: null
        },
        _bind: function(){
            this.element.addEventListener('focusin', () => this._toggleFocus(), false);
            this.element.addEventListener('focusout', () => this._toggleFocus(), false);
            this._super();
        },
        /**
         * On component's init we can add css classes
         * @private
         */
        _init: function(){
            var tagName = utilities.getInputType(this.element);

            this.container.classList.add(`field-${tagName}`);
            this.label.classList.add(`label-${tagName}`);

            this._super();
        },
        _toggleFocus: function(){
            utilities.toggleClasses(this.container, this.options.focusClass, utilities.hasFocus(this.element));
            utilities.toggleClasses(this.label, this.options.focusClass, utilities.hasFocus(this.element));
        }
    });
});