define([
    'jquery',
    'js/lib/dna-responsive'
], function($, responsive) {
    'use strict';

    /**
     * @mixin
     */
    var mixin = {
        options:{
            maxWidth: responsive.getBreakpoint('sm')
        }
    };

    return function(targetWidget){
        $.widget('dnafactory.responsiveAccordion', targetWidget, mixin); // the widget alias should be like for the target widget

        return $.dnafactory.responsiveAccordion;
    }
});