/**
 * @author    Amasty Team
 * @copyright Copyright (c) Amasty Ltd. ( http://www.amasty.com/ )
 * @package   Amasty_Shopby
 */
define([
    "jquery",
    "mage/utils/wrapper"
], function ($, wrapper) {
    'use strict';

    const mixin = {
        paramsBag: {},

        initAjax: function () {
            var self = this;
            this._super();

            if(History && History.prototype.pushState){
                History.prototype.pushState = wrapper.wrap(History.prototype.pushState, (originalPushState, data, title, url) => {
                    if(self.options.clearUrl !== url){
                        originalPushState(data, title, url);
                    }
                });
            }
        },
    };

    return function(target){
        $.widget('mage.amShopbyAjax', target, mixin);
        return $.mage.amShopbyAjax;
    }
});
