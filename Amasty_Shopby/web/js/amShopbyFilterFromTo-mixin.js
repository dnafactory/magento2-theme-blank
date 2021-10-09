define([
    'jquery'
], function ($) {
    'use strict';

    const mixin = {
        options: {
            forceInteger: false
        },
        onChange: function(event){
            this._super(event);
            this.options.forceInteger && this._fixedToInteger();
        },
        onSyncChange: function(event, values){
            this._super(event, values);
            this.options.forceInteger && this._fixedToInteger();
        },
        _fixedToInteger: function(){
            this.from.val(Math.round(this.from.val()));
            this.to.val(Math.round(this.to.val()));
        }
    };


    return function(target){
        $.widget('mage.amShopbyFilterFromTo', $.mage.amShopbyFilterFromTo, mixin);
    }
});
