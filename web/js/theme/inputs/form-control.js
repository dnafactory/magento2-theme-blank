define([
    'js/lib/vanilla-plugin',
    'js/lib/dna-utilities'
], function(JSComponent, utilities) {
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
            label: null,
            gid: null
        },
        /**
         * On component's creation, we need to find or create element's container and label
         * @private
         */
        _create(){
            this._super();
            this.gid = this._getOrGenerateUniqueId();

            this.container = this.element.parentElement;

            this.element.setAttribute('id', this.gid);

            this._getOrGenerateLabel();

            this.element.classList.add('handled-input');
        },

        _getOrGenerateUniqueId(){
            if (!utilities.isEmpty(this.element.id))
                return this.element.id;

            const nameId = utilities.isEmpty(this.element.name)?
                Math.random().toString(36).substr(2, 9)
                : this.element.name.replace(/[^\w\s]/gi, '');
            return `custom_${nameId}`;
        },

        _getOrGenerateLabel(){
            var label = document.querySelector(utilities.sanitizeForQuerySelector(`label[for="${this.gid}"]`));
            if(utilities.isEmpty(label)) {
                label = document.createElement('label');
                label.setAttribute('for', this.gid);
                this.element.after(label);
                this.element.hasAttribute('placeholder')
                label.textContent = this.element.getAttribute('placeholder');
                label.style.display = 'none';
            }
            this.label = label;
        }
    });
});
