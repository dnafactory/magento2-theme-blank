define(function() {
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
          * Checks if a given value is a boolean
          * @param item
          * @returns {boolean}
          */
         isBoolean: function(item){
             return (!this.isUndefined(item) && typeof item == 'boolean');
         },
         /**
          * Checks if a given HTML input is empty or has a value defined
          * @param input
          * @returns {boolean}
          */
         isControlEmpty(input){
             return (input.isAutofilled || this.isUndefined(input.value) || input.value === '');
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
         getCssVar(varname){
             return getComputedStyle(document.body)
                 .getPropertyValue(`--${varname}`);
         }
    };

});