define([
    'jquery',
    'underscore',
    'js/lib/dna-utilities',
    'jquery-ui-modules/widget'
], function($, _, utilities){
    'use strict';

    /**
     * dnafactory.qtyUtils
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Just a simple jQuery UI Widget that adds basic controls to qty fields
     */
    $.widget('dnafactory.qtyUtils', {
        plus: null,                             /* handles the plus button/component                                  */
        minus: null,                            /* handles the minus button/component                                 */
        runner: null,                           /* handles the adder timer (used to adjust value on mouse hold)       */
        options:{
            buttonTag: 'span',                  /* used to generate button elements if there's no one defined
                                                *  in markup                                                          */
            containerClass: 'qu-wrapper',       /* classes to apply to element's parent                               */
            buttonClass: 'qu-button',           /* base classes to apply to (or search for) adjust
                                                *  buttons (plus/minus)                                               */
            plusButtonClass: 'qu-button-plus',  /* classes to apply to (or search for) plus button                    */
            minusButtonClass: 'qu-button-minus',/* classes to apply to (or search for) minus button                   */
            disabledClass: 'disabled',          /* classes to apply to disabled buttons                               */
            resetButtonClass: false,            /* classes to apply to minus button when reset state is reached       */
            min: 0,                             /* input's minimum value. The HTML's attribute will have precedence   */
            max: false,                         /* input's maximum value. The HTML's attribute will have precedence   */
            step: 1,                            /* input's step value. The HTML's attribute will have precedence      */
            throttle: 100                       /* time (in ms) between value changes (by step) when adjusting on
                                                *  mouse hold                                                         */
        },
        /**
         * Setup and initialization
         * @private
         */
        _init: function(){
            this.element.parent().addClass(this.options.containerClass);
            this.options.step = parseInt(utilities.nullishCoalescingValue(this.element.attr('step'), this.options.step));
            this.options.min = parseInt(utilities.nullishCoalescingValue(this.element.attr('min'), this.options.min));
            this.options.max = utilities.nullishCoalescingValue(this.element.attr('max'), this.options.max);
            // Retrieve or generate buttons
            this.minus  = this._bindButton(this.options.minusButtonClass, this.options.step * -1);
            this.plus = this._bindButton(this.options.plusButtonClass, this.options.step);

            // Init state based on current value
            this._checkValue();
            // Check current state on each value change
            this.element.on('change', (event) => { this._checkValue() });
        },
        /**
         * Retrieve or generate a control button
         * @param buttonClass
         * @param step
         * @returns {*}
         * @private
         */
        _bindButton(buttonClass, step){
            const selector = this._buildSelector(buttonClass);
            var button = $(selector, this.element.parent());
            // If there's no valid element, it'll generate one
            if(!button.length){
                button = $(`<${this.options.buttonTag}/>`,{
                    "class": `${this.options.buttonClass} ${buttonClass}`,
                    tabindex: "0",
                    "data-role": "button"
                });
                button.insertAfter(this.element);
            }
            let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
            return button
                .data('step', step)
                .on(touchEvent, (event) => {
                    var evt = event || window.event;
                    if ("buttons" in evt && evt.buttons !== 1) {
                        return false;
                    }
                    // Keep focus on the input
                    event.preventDefault();
                    this.element.focus();
                    // Update value immediately
                    this.updateValue(step);
                });
        },
        /**
         * Adjusts input's value by adding 'step' and then fires a 'change' event
         * @param step
         */
        updateValue(step){
            const actualValue = _.isEmpty(this.element.val())?
                0 : parseInt(this.element.val());
            this.element.val(actualValue + step);
            this.element.change();
        },
        /**
         * Adjusts classes and values accordingly to current value and boundaries
         * @private
         */
        _checkValue(){
            const value = (!_.isEmpty(this.element.val()))?
                parseInt(this.element.val()) : this.options.min;
            if(this.options.max && value > parseInt(this.options.max))
                this.element.val(this.options.max);                         // value exceeds the maximum
            else if(value < this.options.min)
                this.element.val(this.options.min);                         // value exceeds the minimum

            if(this.options.resetButtonClass){
                // if reset button is enabled, checks it's status
                const reset = ((value - this.options.step) <= 0);
                if(reset)
                    this.minus.removeClass(this.options.minusButtonClass)
                        .addClass(this.options.resetButtonClass);
                else
                    this.minus.removeClass(this.options.resetButtonClass)
                        .addClass(this.options.minusButtonClass);
            }
            // Eventually, applies the 'disabled' classes
            this.minus.toggleClass(this.options.disabledClass, (value <= this.options.min));
            if(this.options.max)
                this.plus.toggleClass(this.options.disabledClass, (value >= this.options.max));
        },
        /**
         * Builds a CSS selector string by a space separated classes one
         * @param classes
         * @returns {string}
         * @private
         */
        _buildSelector(classes){
            return `.${this.options.buttonClass.trim().replace(/\s+/g,".")}`
                + `.${classes.trim().replace(/\s+/g,".")}`;
        }
    });

    return $.dnafactory.qtyUtils;
});
