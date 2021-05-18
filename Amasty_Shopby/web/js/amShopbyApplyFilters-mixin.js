define([
    "jquery",
    "js/lib/dna-responsive"
], function ($, responsive) {
    'use strict';

    const mixin = {
        isMobile: function(){
            return window.innerWidth < parseInt(responsive.getBreakpoint("md"));
        },
        renderShowButton: function (e, element) {
            this._super(e, element);
            $('.' + $.mage.amShopbyApplyFilters.prototype.showButton + ' > .am-button').prop('disabled', false);
        },
        _create: function(){
            this.element.on('click', () => $(document).trigger('shopby_update:start'));
            this._super();
        },
        showButtonCounter: function (count) {
            $(document).trigger('shopby_count:update', count);
            this._super(count);
        },
    };

    return function(target){
        $.widget('mage.amShopbyApplyFilters', $.mage.amShopbyApplyFilters, mixin);

        return $.mage.amShopbyApplyFilters;
    }

});
