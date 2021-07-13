/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'underscore',
], function ($, _) {
    'use strict';

    const mixin = {
        options: {
            qtyThrottle: 500
        },
        /** @inheritdoc */
        _create: function () {
            var items, i;

            items = $.find('[data-role="cart-item-qty"]');
            const debouncedQtyChange = _.debounce((e) => {
                if(e.target.value !== $(e.target).data('base-value')) {
                    if (e.target.value > 0)
                        this._runQtyUpdate();
                    else
                        this._runDeleteProduct($(e.target).parents('.cart.item'));
                }
            }, this.options.qtyThrottle);

            for (i = 0; i < items.length; i++) {
                $(items[i])
                    .data('base-value', items[i].value)
                    .on('change', debouncedQtyChange);
            }
        },
        _runQtyUpdate(){
            $(this.options.emptyCartButton).attr('name', 'update_cart_action_temp');
            $(this.options.updateCartActionContainer)
                .attr('name', 'update_cart_action').attr('value', 'update_qty');
            if ($(this.options.updateCartActionContainer).parents('form').length > 0) {
                $(this.options.updateCartActionContainer).parents('form').submit();
            }
        },
        _runDeleteProduct(element){
            $(element).find('.action-delete').click();
        }
    };

    return function(widget){
        $.widget('mage.shoppingCart', widget, mixin);

        return $.mage.shoppingCart;
    }
});
