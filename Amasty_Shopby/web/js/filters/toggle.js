/**
 * Estende il toggleAdvanced di magento, aggiungendo la possibilità di abilitare/disabilitare l'elemento, ad esempio
 * in fase di caricamento ajax.
 */

define([
    'jquery',
    'toggleAdvanced'
], function ($) {
    'use strict';

    $.widget('mage.toggleAdvanced', $.mage.toggleAdvanced, {
        options:{
            disabled: false,
            isToggled : false
        },
        isToggled: function(){
            return this.options.isToggled;
        },
        afterCreate: function(){
            this.toggleEnabled(!this.options.disabled);
            this._toggleSelectors(this.isToggled());
        },
        /**
         * Binding Click event
         *
         * @protected
         */
        _onClick: function () {
            if(!this.options.disabled)
                this._super();
        },
        toggleEnabled(force){
            this.options.disabled = (force !== undefined)? !force : !this.options.disabled;
            if(this.element.is('button'))
                this.element.prop('disabled', this.options.disabled);
            else
                this.element.toggleClass('disabled', this.options.disabled);
        },
        enable: function(){
            this.toggleEnabled(true);
        },
        disable: function(){
            this.toggleEnabled(false);
        },

        /**
         * Method responsible for hiding and revealing specified DOM elements
         * If data-toggle-selectors attribute is present - toggle will be done on these selectors
         * Otherwise we toggle the class on clicked element
         *
         * @protected
         * @override
         */
        _toggleSelectors: function (force) {
            this.element.toggleClass(this.options.baseToggleClass, force);
            if (this.options.toggleContainers) {
                $(this.options.toggleContainers).toggleClass(this.options.selectorsToggleClass, force);
            } else {
                this.element.toggleClass(this.options.baseToggleClass, force);
            }
            const toggled = (force !== undefined)? force : this._testToggled();
            if(this.isToggled() !== toggled){
                this.options.isToggled = toggled;
                this.element.trigger('toggle', toggled);
            }
        },
        _testToggled: function(){
            if(this.options.baseToggleClass.length)
                return this.element.is('.'+this.options.baseToggleClass.trim().replace(/\s/g,'.'));
            else if(this.options.toggleContainers.length && this.options.selectorsToggleClass.length){
                return $(this.options.toggleContainers).is('.'+this.options.selectorsToggleClass.trim().replace(/\s/g,'.'));
            }else
                return false;
        },
        toggleOn: function(){
            this._toggleSelectors(true);
        },
        toggleOff: function(){
            this._toggleSelectors(false);
        }
    });

    return $.mage.toggleAdvanced;
});
