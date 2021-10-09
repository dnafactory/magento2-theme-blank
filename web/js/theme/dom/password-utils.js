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
        trigger: null,
        options:{
            triggerClass: 'pu-trigger',
            triggerClassHide: false,
            triggerEvent: 'click'
        },
        _init: function(){
            this.options.triggerClassHide = this.options.triggerClassHide || this.options.triggerClass;

            this.trigger = this.element.siblings('.password-utils');
            if(!this.trigger.length)
                this.trigger = $('<span/>',{
                    'class': `password-utils ${this.options.triggerClass}`
                });
            this.trigger.on(this.options.triggerEvent, this._togglePasswordVisibility.bind(this));
            this.element
                .addClass('handled')
                .parent().addClass('password-utils-container')
                .append(this.trigger);
        },
        _togglePasswordVisibility: function(event){
            const isPassword = this.element.is('[type=password]');
            this.element
                .toggleClass('password-shown', isPassword)
                .prop('type', (isPassword)? 'text':'password');
            this.trigger
                .toggleClass(this.options.triggerClass, !isPassword)
                .toggleClass(this.options.triggerClassHide, isPassword);
        }
    });

    return $.dnafactory.passwordUtils;
});
