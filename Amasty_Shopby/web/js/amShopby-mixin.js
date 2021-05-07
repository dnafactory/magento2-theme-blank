define([
    "jquery",
    "Amasty_Shopby/js/layer-state"
], function ($) {
    'use strict';

    const abstractMixin = {
        _init: function(){
            this._super();
            $(document).trigger('shopby_layer:status', this.getFilterState());
        },

        apply: function (link, clearFilter) {
            this._super(link, clearFilter);
            $(document).trigger('shopby_layer:status', this.getFilterState());
        },

        getFilterState: function(){
            const self = this,
                form = $(this.element).closest('form');
            if(form.length){
                const code = form.attr('data-amshopby-filter-request-var'),
                    label = $('.label', this.element).text(),
                    fields = form.serializeArray(),
                    values = [];
                var labels = [];
                $.each( fields, function( i, field ) {
                    field.value.length && values.push(field.value);
                    if(self.widgetName !== 'amShopbyFilterSlider') {
                        var input = $(`[value=${field.value}]`, form),
                            label = $('.label', input.parent()).text();
                        labels.push(label);
                    } else {
                        labels = values;
                    }
                });
                return {
                    code: code,
                    label: label,
                    values: values,
                    labels: labels
                }
            }
            return null;
        }
    };


    return function(target){
        $.widget('mage.amShopbyFilterAbstract', $.mage.amShopbyFilterAbstract, abstractMixin);
    }
});
