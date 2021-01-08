define([
    'jquery',
    'jquery-ui-modules/widget'
], function($){
    'use strict';

    /**
     * dnafactory.passwordUtils
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Just a simple jQuery UI Widget that adds a visibility toggle for password typed fields
     */
    $.widget('dnafactory.passwordUtils', {
        /**
         * Options
         * @property triggerClass       | single or multiple css classes that will be used as trigger button's default
         * @property triggerClassHide   | single or multiple css classes that will replace the trigger's default ones
         *                              | when toggled. Set `false` to use the same as triggerClasses.
         * @property triggerEvent       | the event that will trigger the visibility toggle.
         */
        options:{
            triggerClass: 'pu-trigger',
            triggerClassHide: false,
            triggerEvent: 'click'
        },
        _init: function(){
            this.triggerClassHide = this.triggerClassHide?? this.triggerClass;
            $(this.element)
                .each((index, element) => {
                    var trigger = $('<span/>',{
                       'class': `password-utils ${this.options.triggerClass}`
                    }).on(this.options.triggerEvent, event => this._togglePasswordVisibility(event, element));
                    $(element)
                        .addClass('handled')
                        .parent().addClass('password-utils-container')
                        .append(trigger);
                });
        },
        _togglePasswordVisibility: function(event, target){
            var element = $(target),
                trigger = $(event.target),
                isPassword = element.is('[type=password]');
            element
                .toggleClass('password-shown', isPassword)
                .attr('type', (isPassword)? 'text':'password');
            trigger
                .toggleClass(this.options.triggerClass, !isPassword)
                .toggleClass(this.options.triggerClassHide, isPassword);
        }
    });

    return $.dnafactory.passwordUtils;
});