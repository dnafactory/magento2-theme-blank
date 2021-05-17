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
            disabled: false
        },
        afterCreate: function(){
            this.toggleEnabled(!this.options.disabled);
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
        }
    });

    return $.mage.toggleAdvanced;
});
