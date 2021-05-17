define([
    'uiComponent',
    'ko',
    'mage/storage',
], function (Component, ko, storage) {
    'use strict';


    var vm = {
        base_currency_symbol: '',
        cachedCurrency: ko.observable(''),
        loading: false,
    }
    vm.currency = ko.pureComputed(function(){
        if(!this.cachedCurrency().length && !this.loading){
            this.loading = true;
            storage.get('/rest/all/V1/directory/currency').done( (data) => {
                this.cachedCurrency(data);
                this.loading = false;
            });
        }
        return this.cachedCurrency();
    }, vm);

    vm.symbol = ko.pureComputed(function(){
        if(this.base_currency_symbol.length > 0)
            return this.base_currency_symbol;

        const currency = this.currency();
        return (currency)? currency.base_currency_symbol : this.base_currency_symbol;
    }, vm);

    return Component.extend(vm);

});
