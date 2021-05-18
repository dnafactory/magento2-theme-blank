define([
    "underscore",
    "jquery",
    "amShopbyFilterAbstract",
    "mage/translate"
], function (_, $) {
    'use strict';

    $.widget('mage.amShopbyApplyFilters', {
        showButtonClick: false,
        showButtonContainer: '.am_shopby_apply_filters',
        showButton: 'am-show-button',
        oneColumnFilterWrapper: '#narrow-by-list',
        isMobile: window.innerWidth < 768,

        renderShowButton: function (e, element) {},

        getShowButtonType: function (element) {},

        setShowButton: function (top, left, leftPosition) {},

        changePositionOnScroll: function (buttonTop, buttonLeft, leftPosition) {},

        removeShowButton: function () {},

        showButtonCounter: function (count) {
            var items = $('.' + $.mage.amShopbyApplyFilters.prototype.showButton + ' > .am-items'),
                button = $('.' + $.mage.amShopbyApplyFilters.prototype.showButton + ' > .am-button');

            items.removeClass('-loading');

            count = parseInt(count);
            if (count > 1) {
                items.html(count + ' ' + $.mage.__('Items'));
                button.prop('disabled', false);
            } else if (count === 1) {
                items.html(count + ' ' + $.mage.__('Item'));
                button.prop('disabled', false);
            } else {
                items.html(count + ' ' + $.mage.__('Items'));
                button.prop('disabled', true);
            }
        },

        applyShowButtonForSwatch: function () {}
    });
});
