define([
    'jquery'
], function ($) {
    'use strict';

    const mixin = {
        _create: function () {
            var self = this;
            var $items = $(this.options.itemsSelector + " .item, " + this.options.itemsSelector + " .am-swatch-link");
            $(self.element).on('input', function () {
                self.search(this.value, $items);
            });
        },
    };


    return function(target){
        $.widget('mage.amShopbyFilterSearch', $.mage.amShopbyFilterSearch, mixin);
    }
});
