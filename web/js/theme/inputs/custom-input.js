define([
    'js/theme/inputs/focusable',
    'js/lib/dna-utilities'
], function(JSComponent, utilities) {
    'use strict';

    /**
     * CustomInput
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Applies boostrap styles and functionalities to an HTML input
     *
     * options:
     * - type: string        | HTML input type es. checkbox
     * - focusClass: string  | style class applied on focus
     */
    return JSComponent.extend({
        defaults:{
            options : {
                type: null,
            }
        },
        _init(){
            if(!this.options.type)
                return;

            utilities.addClasses(this.container, `custom-control custom-${this.options.type}`);
            this.element.classList.add('custom-control-input');
            utilities.addClasses(this.label, `custom-control-label`);
            this._super();
        }
    });
});