define([
    'js/lib/vanilla-plugin',
    'underscore',
    'domReady!'
], function(JSComponent, _){
    'use strict';

    /**
     * DOMListener
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Re-run component initialization on DOM updates
     */
    return JSComponent.extend({
        defaults:{
           options: {
               debounceTime: 500,
               observeItems: {
                   childList: true,
                   subtree: true
               }
           }
        },
        /**
         * @private
         */
        _bind(){
            this._super();

            var body = document.querySelector('body'),
                // We're debouncing the callback here, to avoid multiple unwanted calls
                debouncedUpdate = _.debounce(this._update.bind(this), this.options.debounceTime, false),
                mutationObserver = new MutationObserver(debouncedUpdate);
            // Starts listening for changes in the root HTML element of the page.
            mutationObserver.observe(body, this.options.observeItems);
        },
        _update: function (mutations) {
            document.dispatchEvent(new CustomEvent('dna.DOMUpdated', mutations));
            this._init();
        }
    });

});