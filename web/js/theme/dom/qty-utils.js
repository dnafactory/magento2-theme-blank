define([
    'jquery',
    'js/lib/dna-utilities',
    'jquery-ui-modules/widget',
], function($, utilities){
    'use strict';

    /**
     * dnafactory.qtyUtils
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Just a simple jQuery UI Widget that adds basic controls to qty fields
     */
    $.widget('dnafactory.qtyUtils', {
        plus: null,
        minus: null,
        runner: null,
        options:{
            buttonTag: 'span',
            containerClass: 'qu-wrapper',
            buttonClass: 'qu-button',
            plusButtonClass: 'qu-button-plus',
            minusButtonClass: 'qu-button-minus',
            disabledClass: 'disabled',
            resetButtonClass: false,
            min: 0,
            max: false,
            step: 1
        },
        _init: function(){
            this.element.parent().addClass(this.options.containerClass);
            this.options.step = parseInt(this.element.attr('step')?? this.options.step);
            this.options.min = parseInt(this.element.attr('min')?? this.options.min);
            this.options.max = this.element.attr('max')?? this.options.max;
            this.minus  = this._bindButton(this.options.minusButtonClass, this.options.step * -1);
            this.plus = this._bindButton(this.options.plusButtonClass, this.options.step);
            this._checkValue();
            this.element.on('change', (event) => {
                this._checkValue()
            });
        },
        _bindButton(buttonClass, step){
            const selector = this._buildSelector(buttonClass);
            var button = $(selector, this.element.parent());
            if(!button.length){
                button = $(`<${this.options.buttonTag}/>`,{
                    "class": `${this.options.buttonClass} ${buttonClass}`,
                    tabindex: "0",
                    "data-role": "button"
                });
                button.insertAfter(this.element);
            }
            return button
                .data('step', step)
                .on('mousedown', (event) => {
                    this.element.focus();
                    event.preventDefault();
                    this.updateValue(step);
                    clearInterval(this.runner);
                    this.runner = setInterval(() => this.updateValue(step), 100);
                }).on('mouseup', () => {
                    clearInterval(this.runner);
                });
        },
        updateValue(step){
            const actualValue = utilities.isEmpty(this.element.val())?
                0 : parseInt(this.element.val());
            this.element.val(actualValue + step);
            this.element.change();
        },
        _checkValue(){
            const value = (!utilities.isEmpty(this.element.val()))?
                parseInt(this.element.val()) : this.options.min;
            if(value < this.options.min)
                this.element.val(this.options.min);
            else if(this.options.max && value > parseInt(this.options.max))
                this.element.val(this.options.max);
            else {
                if(this.options.resetButtonClass){
                    const reset = ((value - this.options.step) <= 0);
                    if(reset)
                        this.minus.removeClass(this.options.minusButtonClass)
                            .addClass(this.options.resetButtonClass);
                    else
                        this.minus.removeClass(this.options.resetButtonClass)
                            .addClass(this.options.minusButtonClass);
                }
                this.minus.toggleClass(this.options.disabledClass, (value <= this.options.min));
                if(this.options.max)
                    this.plus.toggleClass(this.options.disabledClass, (value >= this.options.max));
            }
        },
        _buildSelector(classes){
            return `.${this.options.buttonClass.trim().replace(/\s+/g,".")}`
                + `.${classes.trim().replace(/\s+/g,".")}`;
        }
    });

    return $.dnafactory.qtyUtils;
});
