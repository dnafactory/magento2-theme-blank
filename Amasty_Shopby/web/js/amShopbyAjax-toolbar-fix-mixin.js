/**
 * @author    Amasty Team
 * @copyright Copyright (c) Amasty Ltd. ( http://www.amasty.com/ )
 * @package   Amasty_Shopby
 */
define([
    "jquery",
    "underscore",
    "productListToolbarForm"
], function ($, _) {
    'use strict';

    const mixin = {
        paramsBag: {},

        initAjax: function () {
            var self = this;
            this._super();

            if ($.mage.productListToolbarForm) {
                //change page limit
                $.mage.productListToolbarForm.prototype.changeUrl = function (paramName, paramValue, defaultValue) {
                    // Workaround to prevent double method call
                    if (self.blockToolbarProcessing) {
                        return;
                    }
                    self.blockToolbarProcessing = true;
                    setTimeout(function () {
                        self.blockToolbarProcessing = false;
                    }, 300);

                    var paramData = {};

                    paramData[paramName] = paramValue;

                    self.paramsBag = $.extend(self.paramsBag, this.getUrlParams(), paramData);

                    _.each(self.paramsBag, (item, itemName) => {
                        self.options.clearUrl = self.getNewClearUrl(itemName, item);
                    });

                    //add ajax call
                    $.mage.amShopbyFilterAbstract.prototype.prepareTriggerAjax(null, null, null, true);
                };
            }
        },
    };

    return function(target){
        $.widget('mage.amShopbyAjax', target, mixin);
        return $.mage.amShopbyAjax;
    }
});
