var config = {
    paths: {
        'config':'js/config'
    },
    deps: [
        'js/theme'
    ],
    config: {
        mixins:{
            "js/theme/inputs/focusable":{
                "js/theme/inputs/custom-label-mixin": true
            }
        }
    }
};