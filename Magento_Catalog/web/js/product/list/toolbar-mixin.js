/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'underscore'
], function ($, _) {
    'use strict';

    const mixin = {

        paramsBag: {},
        options: {
            orderDirectionControl: '[data-role="order-direction-switcher"]',
        },

        _fetchParamsBag: function(element){
            const params = [
                "direction",
                "order",
                "limit",
                "page"
            ]
            _.each(params, value => {
                if($(element).is(`[data-${value}]`)){
                    this.paramsBag[this.options[value]] = $(element).data(value);
                }
            });
        },

        /**
         * @param {jQuery.Event} event
         * @private
         */
        _processLink: function (event) {
            this._fetchParamsBag(event.currentTarget);
            this._super(event);
        },

        /**
         * @param {jQuery.Event} event
         * @private
         */
        _processSelect: function (event) {
            this._fetchParamsBag(event.currentTarget);
            this._super(event);
        },

        /**
         * @private
         */
        getUrlParams: function () {
            var params = this._super();
            _.each(this.paramsBag, (value, key) => {
                params[key] = value;
            });
            return params;
        }

    };

    return function(target){
        $.widget('mage.productListToolbarForm', target, mixin);
        return $.mage.productListToolbarForm;
    }
});
