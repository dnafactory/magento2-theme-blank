/**
 * Conserva lo stato dei filtri al momento del caricamento della pagina e tiene traccia dei cambiamenti applicati agli
 * input relativi ai filtri.
 */
define([
    'uiComponent',
    'ko',
    'jquery',
    'toggleAdvanced'
], function (Component, ko, $) {
    'use strict';

    const vm = {
        /**
         * Gli activeFilters contengono lo stato attuale del filter layer
         * */
        activeFilters: ko.observableArray(),
        /**
         *  I currentFilters contengono le modifiche apportate al filter layer non ancora applicate
         * */
        currentFilters: ko.observableArray(),

        defaults: {
            toggleSelector: '[data-toggle="filters"]',
            filtersContainer: '#filter-menu',
            activeClass: 'active filters-active',
            expandedClass: 'expanded',
            productsCount: ko.observable(0)
        },
        isLoading: ko.observable(false),
        isExpanded: ko.observable(false),

        initialize: function(){
            this._super();

            // inizializza i trigger per il menu dei filtri
            this._initTriggers('body');


            /*this.isLoading.subscribe( (newValue) => {
                $(this.toggleSelector).each( (i,toggle) => {
                    if($(toggle).data('mageToggleAdvanced'))
                        $(toggle).toggleAdvanced("toggleEnabled",!newValue);
                });
            });*/

            $(document)
                .on('shopby_count:update', (event, count) => {
                    this.productsCount(parseInt(count));
                })
                /*.on('shopby_update:start', () => {
                    this.isLoading(true);
                })*/
                .on('amshopby:submit_filters', () => {
                    this.isLoading(true);
                    this.currentFilters.removeAll();
                })
                .on('shopby_update:complete', () => {
                    this.isLoading(false);
                    this.productsCount(0);
                    // inizializza eventuali trigger presenti all'interno del markup aggiunto
                    this._initTriggers(this.filtersContainer);

                    this._toggleTriggers(this.isExpanded());
                    // applica i bindings ko al markup appena aggiunto
                    this._applyBindings(document.querySelector(this.filtersContainer));
                    this.isLoading(false);
                });
        },

        _initTriggers: function(container){
            if(this.toggleSelector.length) {
                $(this.toggleSelector, container).toggleAdvanced({
                    selectorsToggleClass: this.activeClass,
                    baseToggleClass: '',
                    toggleContainers: `${this.filtersContainer}, body`,
                    isToggled: this.isExpanded()
                }).on('toggle', (event, state) => this.isExpanded(state));
            }
        },

        _toggleTriggers(state){
            $(this.toggleSelector).each((index, item) => {
                if($(item).data('mageToggleAdvanced')) {
                    if (state)
                        $(item).toggleAdvanced("toggleOn");
                    else
                        $(item).toggleAdvanced("toggleOff");
                }else{
                    $(item).remove();
                }
            });
        },

        _applyBindings(element){
            element && ko.applyBindings(this, element);
        },

        _updateActiveFilters: function(data, filters){
            if(data && data.code) {
                filters.remove( filter => filter.code === data.code );
                filters.push(data);
            }
        },
        _copyFilters: function(from, to){
            to.removeAll();
            from.each(item => to.push(item));
        }
    };
    vm.activeFiltersCount = ko.pureComputed(function() {
        return this.activeFilters().reduce( (count, filter) => count + filter.values.length ,0);
    }, vm);

    vm.currentFiltersCount = ko.pureComputed(function(){
        return this.currentFilters().reduce( (count, filter) => count + filter.values.length ,0);
    }, vm);

    vm.getFilter = function(code){
        return ko.pureComputed(function () {
            return this.currentFilters().find(element => element.code === code);
        }, this);
    }.bind(vm);

    $(document)
        .on('shopby_layer:status', (event, data) => {
            vm._updateActiveFilters(data, vm.activeFilters);
            vm._copyFilters(vm.activeFilters, vm.currentFilters);
        })
        .on('shopby_layer:update', (event, data) => vm._updateActiveFilters(data, vm.currentFilters));

    return Component.extend(vm);
});
