define([
    'js/lib/vanilla-plugin',
    'underscore'
], function(JSComponent, _) {
    'use strict';

    /**
     * ScrollbarFix
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     */
    return JSComponent.extend({
        _init: function(){
            this._super();
            document.documentElement.style
                .setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
        },
        _bind: function(){
            this._super();
            // debounce method prevents event overlaps
            var onResize = _.debounce( this._init.bind(this), 250, false );
            window.addEventListener("resize", onResize, false);
            document.addEventListener('dna.DOMUpdated', onResize, false);
        }
    });
});