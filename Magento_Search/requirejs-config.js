/**
 * DNAFactory
 */

var config = {
    map: {
        '*': {
            managerFormMini: 'Magento_Search/js/manager/form.mini'
        }
    },
    shim: {
        managerFormMini: {
            deps: [
                'jquery'
            ]
        }
    }
};
