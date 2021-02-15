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

            require([options.component], (component) => {
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
             return (item == null);
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
             return (!input.isAutofilled && this.isEmpty(input.value));
         },
         /**
          * Returns the input type of a given HTMLElement
          * @param input
          * @returns {boolean}
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
          */
         attachEvents(element, events, handler){
             this.cycleItems(events, (event) => element.addEventListener(event, handler, false));
         },
         /**
          * Removes multiple event listeners from a single HTML element on the events given as a space separated string
          * @param element
          * @param events
          * @param handler
          */
         removeEvents(element, events, handler){
             this.cycleItems(events, (event) => element.removeEventListener(event, handler, false));
         },
         /**
          * Returns the value of a css var, if it was defined in the current DOM
          * @param varName
          * @param defaultValue
          * @returns {string}
          */
         getCssVar(varName, defaultValue = null){
             var value = getComputedStyle(document.body)
                 .getPropertyValue(`--${varName}`)?? (defaultValue);
             return this.isEmpty(value)? value : value.trim();
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
         }
    };

});
