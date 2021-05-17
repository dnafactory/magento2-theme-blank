/**
 * @author    Amasty Team
 * @copyright Copyright (c) Amasty Ltd. ( http://www.amasty.com/ )
 * @package   Amasty_Shopby
 */
define([
    "jquery"
], function ($) {
    'use strict';

    const mixin = {
        afterChangeContentExternal: function (productList) {
            this._super(productList);
            $(document).trigger('shopby_update:complete', productList);
        },
    };

    return function(target){
        $.widget('mage.amShopbyAjax', target, mixin);
        return $.mage.amShopbyAjax;
    }
});
