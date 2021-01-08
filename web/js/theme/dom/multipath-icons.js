define([
    'js/lib/vanilla-plugin',
    'text!config/icons.json'
], function (JSComponent, icons) {
    'use strict';

    /**
     * Multipath Icons
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     This component generates multipath (and multicolor) icons paths by their styled css class, from a simple
     *     json configuration.
     */
    return JSComponent.extend({
        /**
         * Sets the default configuration parsing it from the `config/icons.json` file.
         * This options field accepts an object in which every key is a css classname and each value represents
         * the number of paths of witch it's composed.
         */
        defaults:{
            options: JSON.parse(icons)
        },
        _init(){
            this._super();
            for (let [key, value] of Object.entries(this.options)){
                document.querySelectorAll(`.${key}`).forEach(item => {
                    for (let i = 1; i <= value; i++){
                        var element = document.createElement("span");
                        element.classList.add(`path${i}`);
                        item.appendChild(element);
                    }
                });
            }
        }
    });
});