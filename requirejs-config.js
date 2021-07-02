var config = {
    map:{
        "*":{
            "dna.responsive": "js/lib/dna-responsive",
            "share": 'js/theme/share'
        }
    },
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