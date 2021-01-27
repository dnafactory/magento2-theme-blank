/**
 * This mixin adds the ability to define the carousel's breakpoints by their tag names:
 * as, for instance: "xxs", "xs", "sm", "md", "lg" or "xl"
 */
define([
    'js/lib/dna-utilities',
    'js/lib/dna-responsive'
], function(utilities, responsive) {
    'use strict';

    var _bpAbsoluteValue = (bp) => responsive.getBreakpoint(bp).replace('px','');
    /**
     * @mixin
     */
    var mixin = {
        /**
         * It also provides a default responsive config
         */
        responsiveDefaults: {
            [_bpAbsoluteValue('xs')]:{"items":2},
            [_bpAbsoluteValue('sm')]:{"items":3, "nav":false,"controls":true},
            [_bpAbsoluteValue('md')]:{"items":4 },
        },
        initialize: function(options, element){
            if (utilities.isEmpty(options.responsive)){
                // sets the default responsive configuration if there isn't one
                options.responsive = this.responsiveDefaults;
            } else if (options.responsive){
                // manually fetches and maps bp tags with their relative values
                options.responsive = this.fetchBreakpoints(options.responsive)
            }
            // this hack is needed to provide the right configuration to the related instance
            this._super({options: options}, element);
        },
        /**
         * given a responsive config, it maps every bp tag with it's value in px
         * @param responsive
         * @returns {[]}
         */
        fetchBreakpoints: function(responsive){
            var processed = [];
            Object.keys(responsive).forEach(key => {
                if(isNaN(key)){
                    try {
                        processed[this.bpAbsoluteValue(key)] = responsive[key];
                    }catch(ex){
                        console.error(ex);
                    }
                }else{
                    processed[key] = responsive[key];
                }
            });
            return processed;
        },
        bpAbsoluteValue: _bpAbsoluteValue
    };

    return function(targetWidget){
        return targetWidget.extend(mixin);
    }
});