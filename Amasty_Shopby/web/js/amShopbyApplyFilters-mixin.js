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
        }
    };

    return function(target){
        $.widget('mage.amShopbyApplyFilters', $.mage.amShopbyApplyFilters, mixin);

        return $.mage.amShopbyApplyFilters;
    }

});
