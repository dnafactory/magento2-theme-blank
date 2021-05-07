define([
    'uiComponent',
    'ko',
    'jquery',
    'toggleAdvanced'
], function (Component, ko, $) {
    'use strict';

    var activeFilters = ko.observableArray(),
        activeFiltersCount = ko.computed(function() {
            return activeFilters().reduce( (count, filter) => count + filter.values.length ,0);
        }),
        getFilter = function(code){
            return ko.computed({
                read: function () {
                    return this().find(element => element.code === code);
                }
            }, this);
        }.bind(activeFilters),
        _updateActiveFilters = function(data){
            if(data && data.code) {
                activeFilters.remove( filter => filter.code === data.code );
                activeFilters.push(data);
            }
        };

    $(document).on('shopby_layer:status', (event, data) => _updateActiveFilters(data));

    return Component.extend({
        defaults: {
            toggleSelector: '[data-toggle="filters"]',
            closeTrigger: '[data-close="filters"]',
            filtersContainer: '#filter-menu',
            activeClass: 'active filters-active -am-noscroll',
            expandedClass: 'expanded',
            menuActive: false,
            activeFilters: activeFilters,
            activeFiltersCount: activeFiltersCount,
            getFilter: getFilter
        },

        initialize: function(){
            this._super();

            // inizializza i trigger per il menu dei filtri
            this._initTriggers('body');

            $(document)
                .on('shopby_update:complete', () => {
                    // inizializza eventuali trigger presenti all'interno del markup aggiunto
                    this._initTriggers(this.filtersContainer);
                    // applica i bindings ko al markup appena aggiunto
                    this._applyBindings(document.querySelector(this.filtersContainer));
                });
        },

        _initTriggers: function(container){
            if(this.toggleSelector.length) {
                $(this.toggleSelector, container).toggleAdvanced({
                    selectorsToggleClass: this.activeClass,
                    baseToggleClass: this.expanded,
                    toggleContainers: `${this.filtersContainer}, body`
                });
                if(this.closeTrigger.length)
                    $(this.closeTrigger).on('click', () => {
                        $(`${this.toggleSelector}.active`).click();
                    });
            }
        },

        _applyBindings(element){
            element && ko.applyBindings(this, element);
        }
    });
});
