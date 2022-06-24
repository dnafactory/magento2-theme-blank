define([
    'uiComponent',
    'knockout',
    'Magento_Checkout/js/model/step-navigator',
    'underscore'
], function (Component, ko, stepNavigator, _) {
    'use strict';

    return Component.extend({
        defaults: {
            cartUrl: window.checkoutConfig.cartUrl,
            firstStep: ko.computed(function(){ return !stepNavigator.isProcessed('shipping')})
        },
        goBack: function(){
            if(!this.firstStep()) {
                stepNavigator.navigateTo('shipping');
            }else{
                this.goToCart();
            }
        },
        goToCart: function(){
            window.location.href = this.cartUrl;
        }
    });
});
