/**
 * @author    Amasty Team
 * @copyright Copyright (c) Amasty Ltd. ( http://www.amasty.com/ )
 * @package   Amasty_Shopby
 */
define([
    "jquery",
    "mage/utils/wrapper",
    "productListToolbarForm"
], function ($, wrapper) {
    'use strict';

    const mixin = {
        afterChangeContentExternal: function (productList) {
            this._super(productList);
            $(document).trigger('shopby_update:complete', productList);
        },
        initAjax: function () {
            var self = this;
            self._super();
            /**
             * Fix per il sorting con parametri multipli
             */
            if ($.mage.productListToolbarForm) {
                $.mage.productListToolbarForm.prototype.changeUrl = wrapper.wrapSuper(
                    $.mage.productListToolbarForm.prototype.changeUrl,
                    function (paramName, paramValue, defaultValue) {
                        if(paramName === this.options.direction && paramValue === defaultValue){
                            defaultValue+='!';
                        }
                        this._super(paramName, paramValue, defaultValue);
                    })
            }
        },
        /**
         * Fix per il sorting con parametri multipli
         */
        getNewClearUrl: function (param, value) {
            var paramData = $.mage.productListToolbarForm.prototype.getUrlParams();

            var urlPaths = this.options.clearUrl.replace(/&amp;/g, '&').split('?'),
                baseUrl = urlPaths[0],
                replaced = false;

            if(paramData[param]){
                replaced = true;
                if (value !== '') {
                    paramData[param] = value;
                } else {
                    delete paramData[param];
                }
            }

            if (!replaced && value != '') {
                paramData[param] = value;
            }

            paramData = $.param(paramData);

            return window.decodeURIComponent(baseUrl + (paramData.length ? '?' + paramData : ''));
        }
    };

    return function(target){
        $.widget('mage.amShopbyAjax', target, mixin);
        return $.mage.amShopbyAjax;
    }
});
