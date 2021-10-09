define([
    "jquery",
    "mage/template",
    'text!Amasty_Shopby/template/slider-value.html',
    "Amasty_Shopby/js/amShopby"
], function ($, template, valueTpl) {
    'use strict';

    const mixin = {
        _init: function(){
            this._super();
            this._triggerReset();

            // Notifica un reset dello stato del filtro, quando questo viene applicato/cancellato in Ajax
            $(document).on('shopby_update:complete', () => this._triggerReset());
        },
        /**
         * Lancia un evento che notifica un set/reset dello stato del filtro
         * @private
         */
        _triggerReset(){
            $(document).trigger('shopby_layer:status', this.getFilterState());
        },
        /**
         * Lancia un evento che notifica un aggiornamento di stato del filtro
         * @private
         */
        _triggerUpdate(){
            $(document).trigger('shopby_layer:update', this.getFilterState());
        },
        /**
         *
         * @param link
         * @param clearFilter
         */
        apply: function (link, clearFilter) {
            this._super(link, clearFilter);
            this._triggerUpdate();
        },

        /**
         * Colleziona i dati relativi all'attuale stato del filtro, a partire dal form che lo contiene
         * @returns {null|{code: *, values: *[], label: (*|Window.jQuery), labels: *[]}}
         */
        getFilterState: function(){
            const self = this,
                form = $(this.element).closest('form');
            if(form.length){
                const code = form.attr('data-amshopby-filter-request-var') || form.attr('data-amshopby-filter'),
                    label = $('.label', this.element).text(),
                    fields = form.serializeArray(),
                    values = [];
                var labels = [];
                $.each( fields, function( i, field ) {
                    var item = self._getFilterValue(field, form);
                    if(item)
                        values.push(item.value) && labels.push(item.label);

                });
                return {
                    code: code,
                    label: label,
                    values: values,
                    labels: labels
                }
            }
            return null;
        },

        /**
         * Colleziona valore e label dell'opzione del filtro specificata in input
         * @param field
         * @param form
         * @returns {null}
         * @private
         */
        _getFilterValue: function(field, form){
            var item = null;
            if(field.value.length > 0) {
                item = {};
                var fromTo = field.value.split("-"),
                    from = fromTo[0],
                    to = fromTo[1],
                    unit = this.options.currencySymbol;
                item.value = item.label = template(valueTpl, {
                    data: {
                        from: from,
                        to: to,
                        unit: unit
                    }
                });
            }
            return item;
        }
    };


    return function(target){
        $.widget('mage.amShopbyFilterSlider', $.mage.amShopbyFilterSlider, mixin);
        return $.mage.amShopbyFilterSlider;
    }
});
