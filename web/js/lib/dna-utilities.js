define(['underscore'], function(_) {
    'use strict';

    /**
     * Utilities
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     * Base vanilla js Utilities
     */
    return {
        /**
         * Used to check if an HTML element is focused
         * @param element
         * @returns {boolean}
         */
        hasFocus: function (element){
            return document.hasFocus() && (element === document.activeElement);
        },
        /**
         * Dynamically loads and instantiates js modules in asynchronous way.
         * @param options
         * @param element
         * @param onModuleLoad
         */
        loadModule: function(options, element, onModuleLoad){
            if(!options.component) return;

            requirejs([options.component], (component) => {
                if(!component) return;
                var instance = component;
                if(this.isFunction(component)) {
                    instance = component(options, element);
                }
                if(this.isFunction(onModuleLoad))
                    onModuleLoad(instance);
            });
        },
        /**
         * Checks if a given value is a Function
         * @param functionToCheck
         * @returns {boolean}
         */
        isFunction: function(functionToCheck) {
            return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
        },
        /**
         * Checks if a given value is undefined
         * @param item
         * @returns {boolean}
         */
        isUndefined: function(item){
            return (item == null || false);
        },
        /**
         * Checks if a given value is empty
         * @param item
         * @returns {boolean}
         */
        isEmpty: function(item){
            return (this.isUndefined(item) || item === "");
        },
        /**
         * Checks if a given value is a boolean
         * @param item
         * @returns {boolean}
         */
        isBoolean: function(item){
            return (!this.isUndefined(item) && typeof item == 'boolean');
        },
        /**
         *
         * @param value
         * @returns {boolean}
         */
        getBooleanValue(value){
            return (this.isBoolean(value))? value : !!JSON.parse(value);
        },
        /**
         * Checks if a given HTML input is empty or has a value defined
         * @param input
         * @returns {boolean}
         */
        isControlEmpty(input){
            // Hack for select inputs: isAutofilled is always true after the first user selection
            return (
                !(input.isAutofilled && this.getInputType(input) !== 'select') &&
                (!this.isInputAutofilled(input) && this.isEmpty(input.value))
            );
        },
        /**
         * Returns the input type of a given HTMLElement
         * @param input
         * @returns {string}
         */
        getInputType(input){
            var type = input.tagName.toLowerCase();
            if(type === 'input')
                type = input.getAttribute('type');
            return type;
        },
        /**
         * Cycle a space separated string and executes a callback for each item
         * @param items
         * @param callback
         */
        cycleItems(items, callback){
            items.split(' ').forEach( classItem => callback(classItem));
        },
        /**
         * Adds multiple css classes (as a space separated string) to a single HTML element
         * @param element
         * @param classes
         */
        addClasses(element, classes){
            this.cycleItems(classes, classItem => element.classList.add(classItem));
        },
        /**
         * Removes multiple css classes (as a space separated string) from a single HTML element
         * @param element
         * @param classes
         */
        removeClasses(element, classes){
            this.cycleItems(classes,classItem => element.classList.remove(classItem));
        },
        /**
         * Toggles multiple css classes (as a space separated string) to a single HTML element.
         * Supports 'force' parameter.
         * @param element
         * @param classes
         * @param force
         */
        toggleClasses(element, classes, force){
            this.cycleItems(classes,classItem => element.classList.toggle(classItem, force));
        },
        /**
         * Attach multiple event listeners to a single HTML element on the events given as a space separated string
         * @param element
         * @param events
         * @param handler
         * @param options
         */
        attachEvents(element, events, handler, options = false){
            this.cycleItems(events, (event) => element.addEventListener(event, handler, options));
        },
        /**
         * Removes multiple event listeners from a single HTML element on the events given as a space separated string
         * @param element
         * @param events
         * @param handler
         * @param options
         */
        removeEvents(element, events, handler, options = false){
            this.cycleItems(events, (event) => element.removeEventListener(event, handler, options));
        },
        getCssValue(element, property, defaultValue = null){
            var value = this.nullishCoalescingValue(
                (element.currentStyle ? element.currentStyle.getPropertyValue(property) :
                    getComputedStyle(element, null).getPropertyValue(property)),
                defaultValue
            );
            return this.isEmpty(value)? value : value.trim();
        },
        /**
         * Returns the value of a css var, if it was defined in the current DOM
         * @param varName
         * @param defaultValue
         * @returns {string}
         */
        getCssVar(varName, defaultValue = null){
            return this.getCssValue(document.body, `--${varName}`, defaultValue);
        },
        /**
         * Sets a value in the dataset of an element
         * @param element
         * @param key
         * @param data
         * @returns {string|undefined|boolean}
         */
        setData(element, key, data){
            if(!this.isUndefined(element.dataset)){
                element.dataset[key] = JSON.stringify(data);
                return element.dataset[key];
            }
            return false;
        },
        /**
         * Returns a value stored in the dataset of an element
         * @param element
         * @param key
         * @returns {any|boolean}
         */
        getData(element, key){
            return (!this.isUndefined(element.dataset) && !this.isEmpty(element.dataset[key]))?
                JSON.parse(element.dataset[key])
                : null;
        },
        /**
         * Check if an element contains specific data in his dataset
         * @param element
         * @param key
         * @returns {boolean}
         */
        hasData(element, key){
            return !this.isEmpty(this.getData(element, key));
        },

        /**
         * Act as the Nullish coalescing operator (??)
         * returns its right-hand side operand when its left-hand side operand is null or undefined,
         * and otherwise returns its left-hand side operand.
         * @param a
         * @param b
         * @returns {*}
         */
        nullishCoalescingValue(a, b){
            return (!this.isUndefined(a))? a : b;
        },

        /**
         *
         * @param element
         * @returns {boolean}
         */
        isVisible(element){
            return this.getCssValue(element, 'display') !== 'none';
        },

        /**
         *
         * @param input
         * @returns {boolean|*}
         */
        isInputAutofilled(input){
            return (this.testElementFeature(input,':-internal-autofill-selected') || this.testElementFeature(input, ':-webkit-autofill'));
        },

        /**
         *
         * @param element
         * @param feature
         * @returns {boolean|*}
         */
        testElementFeature(element, feature){
            try{
                return element.matches(feature);
            }catch(ex){
                return false;
            }
        }
    };

});
