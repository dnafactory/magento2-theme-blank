define([
    "jquery",
    "mage/template",
    'text!Amasty_Shopby/template/slider-value.html',
    "Magento_Directory/js/currency-data",
], function ($, template, valueTpl, currency) {
    'use strict';

    const mixin = {
        _create: function(){
            this._super();
            this._checkIfEnabled();
            currency().symbol.subscribe((newValue) => this._triggerUpdate());
        },
        _getFilterValue: function(field, form){
            var item = null;
            if(field.value.length > 0) {
                item = {};
                var fromTo = field.value.split("-"),
                    from = fromTo[0],
                    to = fromTo[1],
                    unit = currency().symbol();
                item.value = item.label = template(valueTpl, {
                    data: {
                        from: from,
                        to: to,
                        unit: unit
                    }
                });
            }
            return item;
        },
        _checkIfEnabled(){
            if(this.options.max - this.options.min <= this.options.step)
                this.slider.slider("disable");
            else
                this.slider.slider("enable");
        }
    };


    return function(target){
        $.widget('mage.amShopbyFilterSlider', $.mage.amShopbyFilterSlider, mixin);
    }
});
