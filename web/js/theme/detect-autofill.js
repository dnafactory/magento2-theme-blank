define([
    'js/lib/vanilla-plugin',
    'domReady!'
    ], function(JSComponent){
    'use strict';

    /**
     * @see https://gist.github.com/jonathantneal/d462fc2bf761a10c9fca60eb634f6977
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Simple component to intercept autofills in every browser
     */
    return JSComponent.extend({
        defaults:{
            element: document,
            mozFilterMatch: /^grayscale\(.+\) brightness\((1)?.*\) contrast\(.+\) invert\(.+\) sepia\(.+\) saturate\(.+\)$/
        },
        _bind: function(){
            this._super();
            this.element.addEventListener('animationstart', (event) => this.onAnimationStart(event));
            this.element.addEventListener('input', (event) => this.onInput(event));
            this.element.addEventListener('transitionstart', (event) => this.onTransitionStart(event));
        },
        onAnimationStart: function(event) {
            // detect autofills in Chrome and Safari by:
            //   - assigning animations to :-webkit-autofill, only available in Chrome and Safari
            //   - listening to animationstart for those specific animations
            if (event.animationName === 'onautofillstart') {
                // during autofill, the animation name is onautofillstart
                this.autofill(event.target)
            } else if (event.animationName === 'onautofillcancel') {
                // during autofill cancel, the animation name is onautofillcancel
                this.cancelAutofill(event.target)
            }
        },
        onInput: function(event) {
            if ('data' in event) {
                // input events with data may cancel autofills
                this.cancelAutofill(event.target)
            } else {
                // input events without data are autofills
                this.autofill(event.target)
            }
        },
        onTransitionStart: function(event) {
            // detect autofills in Firefox by:
            //   - listening to transitionstart, only available in Edge, Firefox, and Internet Explorer
            //   - checking filter style, which is only changed in Firefox
            const mozFilterTransition =
                event.propertyName === 'filter' &&
                getComputedStyle(event.target).filter.match(this.mozFilterMatch)

            if (mozFilterTransition) {
                if (mozFilterTransition[1]) {
                    // during autofill, brightness is 1
                    this.autofill(event.target)
                } else {
                    // during autofill cancel, brightness is not 1
                    this.cancelAutofill(event.target)
                }
            }
        },
        autofill: function(target) {
            if (!target.isAutofilled) {
                target.isAutofilled = true
                target.setAttribute('autofilled', '')
                target.dispatchEvent(new CustomEvent('autofill', { bubbles: true }))
            }
            this._unbind();
        },

        cancelAutofill: function(target) {
            if (target.isAutofilled) {
                target.isAutofilled = false
                target.removeAttribute('autofilled')
                target.dispatchEvent(new CustomEvent('autofillcancel', { bubbles: true }))
            }
            this._unbind();
        },
        _unbind: function(){
            this.element.removeEventListener('animationstart', (event) => this.onAnimationStart(event));
            this.element.removeEventListener('input', (event) => this.onInput(event));
            this.element.removeEventListener('transitionstart', (event) => this.onTransitionStart(event));
        }
    });
});
