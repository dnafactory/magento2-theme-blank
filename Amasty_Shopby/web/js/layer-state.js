define([
    'uiComponent',
    'ko',
    'jquery',
    'toggleAdvanced'
], function (Component, ko, $) {
    'use strict';

    /** Gli activeFilters contengono lo stato attuale del filter layer */
    const activeFilters = ko.observableArray(),
        activeFiltersCount = ko.computed(function() {
            return activeFilters().reduce( (count, filter) => count + filter.values.length ,0);
        }),
        _updateActiveFilters = function(data, filters){
            if(data && data.code) {
                filters.remove( filter => filter.code === data.code );
                filters.push(data);
            }
        };

    /** I currentFilters contengono le modifiche apportate al filter layer non ancora applicate */
    const currentFilters = ko.observableArray(),
        currentFiltersCount = ko.computed(function(){
            return activeFiltersCount + currentFilters().reduce( (count, filter) => count + filter.values.length ,0);
        });

    const getFilter = function(code){
            return ko.computed({
                read: function () {
                    const active = activeFilters().find(element => element.code === code),
                        current = currentFilters().find(element => element.code === code);
                    return (active && current)? Object.assign(active, current) : active;
                }
            }, this);
        }.bind(this);


    $(document).on('shopby_layer:status', (event, data) => _updateActiveFilters(data, activeFilters));
    $(document).on('shopby_layer:update', (event, data) => _updateActiveFilters(data, currentFilters));

    return Component.extend({
        defaults: {
            toggleSelector: '[data-toggle="filters"]',
            filtersContainer: '#filter-menu',
            activeClass: 'active filters-active -am-noscroll',
            expandedClass: 'expanded'
        },
        test: function() {
            return this.activeFilters().reduce( (count, filter) => count + filter.values.length ,0);
        },
        activeFilters: activeFilters,
        activeFiltersCount: activeFiltersCount,
        currentFilters: currentFilters,
        currentFiltersCount: currentFiltersCount,
        getFilter: getFilter,
        isLoading: ko.observable(false),

        initialize: function(){
            this._super();

            // inizializza i trigger per il menu dei filtri
            this._initTriggers('body');

            $(document)
                .on('shopby_update:start', () => {
                    this.isLoading(true);
                    this.currentFilters.removeAll();
                    $(`${this.filtersContainer}, body`).toggleClass(this.activeClass, false);
                })
                .on('shopby_update:complete', () => {
                    this.isLoading(false);
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
                    baseToggleClass: '',
                    toggleContainers: `${this.filtersContainer}, body`
                });
            }
        },

        _applyBindings(element){
            element && ko.applyBindings(this, element);
        }
    });
});
