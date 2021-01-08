define([
    'js/lib/vanilla-plugin'
], function(JSComponent) {
    'use strict';

    /**
     * FormControl
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Adds some css classes and dom elements when needed,
     *     and generates an entity with a container, an input and a label
     *
     */
    return JSComponent.extend({
        defaults:{
            container: null,
            label: null
        },
        /**
         * On component's creation, we need to find or create element's container and label
         * @private
         */
        _create(){
            var id    = this.element.id,
                label = document.querySelector(`label[for=${id}]`);

            this.container = this.element.parentElement;

            if(!label) {
                label = document.createElement('label');
                label.setAttribute('for', id);
                this.element.hasAttribute('placeholder')
                    label.textContent = this.element.getAttribute('placeholder');
            }
            this.label = label;
            this._super();
        },
    });
});