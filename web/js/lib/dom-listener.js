define([
    'js/lib/vanilla-plugin'
], function(JSComponent){
    'use strict';

    /**
     * DOMListener
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     It adds a listener to the DOM for the 'contentUpdated' event, which is used by Magento 2 ajax components
     */
    return JSComponent.extend({
        /**
         * @private
         */
        _bind(){
            var body = document.querySelector('body');
            this._bindToContentUpdated(body);
            if(this.element !== body)
                this._bindToContentUpdated(this.element);
        },
        /**
         * 'contentUpdated' events are triggered via jquery in the application.
         *  so jquery is loaded here asynchronously to prevent rendering slowdown.
         * @param element
         * @private
         */
        _bindToContentUpdated(element){
            require(['jquery'], ($) => {
                $(document).off('contentUpdated', element, (e) => this._init());
                $(document).on('contentUpdated', element, (e) => this._init());
            });
        }
    });

});