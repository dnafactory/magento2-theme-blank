define([
    'js/lib/vanilla-plugin',
], function(JSComponent) {
    'use strict';

    /**
     * CustomFile
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Applies boostrap styles and functionalities to a file input
     */
    return JSComponent.extend({
        _bind: function(){
            this._super();
            this.element.addEventListener('change', () => this.updateInfo(), false);
        },
        /**
         * Manually updates input's label content
         */
        updateInfo: function(){
            var fileName = this.element.value.split("\\").pop();
            document.querySelectorAll(`.custom-file-label[for=${this.element.id}]`)
                .forEach(element => {
                    element.classList.add("selected");
                    element.innerHTML = fileName;
                });
        }
    });
});