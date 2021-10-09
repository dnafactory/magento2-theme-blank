define([
    'js/lib/vanilla-plugin',
    'jquery',
    'mage/calendar'
], function(JSComponent, $) {
    'use strict';

    return JSComponent.extend({
        _init: function(){
            this._super();
            $(this.element).calendar(this.options);
        }
    });
});
