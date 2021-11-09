define([
    'js/lib/vanilla-plugin',
    'js/lib/mutation-observer',
    'underscore'
], function(JSComponent, MutationObserver, _) {
    'use strict';

    /**
     * ScrollbarFix
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     */
    return JSComponent.extend({
        _init: function(){
            this._super();
            document.documentElement.style
                .setProperty('--scrollbar-width', (window.innerWidth - document.body.clientWidth) + "px");
        },
        _bind: function(){
            this._super();
            // throttle method prevents event overlaps
            var onResize = _.throttle( this._init.bind(this), 100, false );

            var mutationObserver = new MutationObserver(onResize);
            mutationObserver.observe(document.body, {
                attributes: true,
                childList: false,
                subtree: false
            });
        }
    });
});