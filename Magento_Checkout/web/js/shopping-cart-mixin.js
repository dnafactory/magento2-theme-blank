/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'Magento_Ui/js/modal/confirm',
    'underscore',
    'mage/translate'
], function ($, confirm, _) {
    'use strict';

    const mixin = {
        options: {
            qtyThrottle: 500,
            deleteItemConfirmMessage: true
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
                        this.removeProduct(e.target);
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
        removeProduct(target){
            var self = this,
                item = $(target).parents('.cart.item');
            if(this.options.deleteItemConfirmMessage) {
                confirm({
                    content: $.mage.__('Are you sure you want to remove this item from your shopping cart?'),
                    actions: {
                        /**
                         * Confirmation modal handler to execute clear cart action
                         */
                        confirm: function () {
                            self._runRemoveProduct(item)
                        },
                        cancel: function () {
                            $(target).val($(target).data("base-value"));
                        }
                    }
                });
            }else{
                this._runRemoveProduct(item);
            }
        },
        _runRemoveProduct(element){
            $(element).find('.action-delete').click();
        }
    };

    return function(widget){
        $.widget('mage.shoppingCart', widget, mixin);

        return $.mage.shoppingCart;
    }
});
