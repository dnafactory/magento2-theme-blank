/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([], function () {
    'use strict';

    const mixin = {
        /**
         * @return {*}
         */
        isFullMode: function () {
            return !!this.getTotals();
        }
    }
    return function(target){
        return target.extend(mixin);
    }
});
