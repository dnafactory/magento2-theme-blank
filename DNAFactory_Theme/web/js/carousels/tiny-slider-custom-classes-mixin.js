/**
 * A simple Mixin to decorate tiny-slider's markup
 */
define([
    'js/lib/dna-utilities',
], function(utilities){
    'use strict';

    var mixin = {
        defaults: {
           options: {
               outerWrapperClass: '',
               middleWrapperClass: '',
               innerWrapperClass: '',
           }
        },
        initialize: function(options, element){
            this._super(options, element);
            this._manageCustomClasses();
            return this;
        },
        _manageCustomClasses(){
            var instance = this.getInstanceStatus(),
                containerId = instance.container.id;
            this._addCustomClasses(document.querySelector(`#${containerId}-ow`), this.options.outerWrapperClass + ' dna-carousel');
            this._addCustomClasses(document.querySelector(`#${containerId}-mw`), this.options.middleWrapperClass);
            this._addCustomClasses(document.querySelector(`#${containerId}-iw`), this.options.innerWrapperClass);
        },
        _addCustomClasses(element, classes) {
            if(!utilities.isEmpty(classes))
                utilities.addClasses(element, classes)
        }
    };

    return function(baseWidget){
        return baseWidget.extend(mixin);
    }
});