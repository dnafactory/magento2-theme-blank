define([
    'jquery',
    'jquery-ui-modules/widget'
], function($){
    'use strict';

    /**
     * dnafactory.searchUtils
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Just a simple jQuery UI Widget that adds basic controls to search typed fields
     */
    $.widget('dnafactory.searchUtils', {
        /**
         * Options
         * @property triggerClass       | single or multiple css classes that will be used as trigger button's default
         * @property triggerClassClear  | single or multiple css classes that will replace the trigger's default ones
         *                              | when toggled. Set `false` to use the same as triggerClasses.
         * @property triggerEvent       | the event that will trigger the visibility toggle.
         */
        options:{
            triggerClass: 'su-trigger',
            triggerClassBase: false,
            triggerClassClear: false
        },
        _init: function(){
            $(this.element)
                .on('input change', event => this._onInput(event))
                .each((index, element) => {
                    var trigger = $(element).siblings('.search-utils');
                    if(!trigger.length)
                        trigger = $('<span/>',{
                       'class': `search-utils ${this.options.triggerClass}`
                    });
                    trigger.on('click', event => this._clearValue(event, element));
                    $(element)
                        .addClass('handled')
                        .parent().addClass('search-utils-container')
                        .append(trigger);
                    this._checkState(element, trigger);
                });
        },
        _checkState: function (input, trigger){
            const isVoid = (input.value === "");

            if(this.options.triggerClassBase)
                trigger.toggleClass(this.options.triggerClassBase, isVoid)
            if(this.options.triggerClassClear)
                trigger.toggleClass(this.options.triggerClassClear, !isVoid);
        },
        _onInput: function(event){
            const input = event.target,
                trigger = $(input).siblings('.search-utils');

            this._checkState(input, trigger);
        },
        _clearValue: function(event, target){
            $(target)
                .val("")
                .trigger('input');
            this.element.focus();
        }
    });

    return $.dnafactory.searchUtils;
});
