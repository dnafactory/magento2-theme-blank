var config = {
    map: {
        "Amasty_Shopby/js/filters/manager": {
            toggleAdvanced: "Amasty_Shopby/js/filters/toggle"
        },
        "*":{
            filterManager: 'Amasty_Shopby/js/filters/manager',
            filterAccordion: "Amasty_Shopby/js/filters/accordion",
            amShopbyApplyFiltersCount: 'Amasty_Shopby/js/amShopbyApplyFilters-count'
        }
    },
    config: {
        mixins:{
            "Amasty_Shopby/js/amShopby":{
                "Amasty_Shopby/js/amShopby-mixin": true,
                "Amasty_Shopby/js/amShopbyFilterSlider-mixin": true,
                "Amasty_Shopby/js/amShopbyFilterFromTo-mixin": true,
                "Amasty_Shopby/js/amShopbyFilterSearch-mixin": true
            },
            "Amasty_Shopby/js/amShopbyAjax":{
                "Amasty_Shopby/js/amShopbyAjax-url-history-fix-mixin": false,
                "Amasty_Shopby/js/amShopbyAjax-mixin": true
            },
            "Amasty_Shopby/js/amShopbyApplyFilters":{
                "Amasty_Shopby/js/amShopbyApplyFilters-mixin": true
            },
            "Amasty_Shopby/js/amShopbyApplyFilters-count":{
                "Amasty_Shopby/js/amShopbyApplyFilters-mixin": true
            }
        }
    }
};
