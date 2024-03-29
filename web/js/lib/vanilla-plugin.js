define([
    'uiClass',
    'js/lib/dna-utilities'
], function(Class, utilities) {
    'use strict';


    /**
     * VanillaPlugin
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     *     Base vanilla js Plugin Class
     *     It can be used to extend a jQuery UI Widget or a Magento Component and yet it does not need libraries or
     *     frameworks to work as it is. Useful for components that need fast rendering, such as inputs.
     */
    return Class.extend({
        /**
         * defaults
         * @property _autogenerated | class autogeneration lock. Used to build instances in different scopes
         * @property element        | the root HTMLelement associated to the component
         * @property options        | container for component specific options
         * @property children       | Children's registry: a list of child-components that will be instantiated automatically.
         *                          | A child-component could be another instance of VanillaPlugin, an uiComponent
         *                          | or a jQuery Widget.
         *                          | Each child should be an object with these properties defined:
         *                          | - [*] component: path or alias of js component to instantiate
         *                          | - element: the DOM's element associated to the instance
         *                          | - options: an object containing all specific settings for the instance
         *                          | - children: his own children list
         *                          |
         *                          | [*] are required
         */
        defaults:{
            _autogenerated: false,
            element: document,
            options: {},
            children: {},
            instances: []
        },
        /**
         * Initialize the component with requested options, binding it to specified DOM element.
         * Eventually starts the component lifecycle.
         * @param options
         * @param element
         * @returns {*}
         */
        initialize: function(options, element){
            if(!element){
                if(!options){
                    options = {};
                }else if(typeof options !== "object"){
                    element = options;
                    options = {};
                }else if(options.element){
                    element = options.element;
                }
            }
            if (options.component)
                this._autogenerated = true;

            element =  (typeof element === "string")? document.querySelectorAll(element) : element;
            this._super(options);
            if(this._autogenerated)
                this.options = options;
            this.element = element || this.element;

            this._create();
            this._bind();
            this._init();

            return this;
        },

        /**
         * First step of the lifecycle. Extend to provide a before-init setup
         * @private
         */
        _create: function(){ /* Extend */ },

        /**
         * Extend to define component initialization
         * @private
         */
        _init: function(){
            this._loadChildren();
        },

        /**
         * Extend to provide element bindings
         * @private
         */
        _bind: function(){ /* Extend */ },

        /**
         * Fetch and instantiates each child component
         * @private
         */
        _loadChildren(){
            for (let [key, value] of Object.entries(this.children)){
                if(value && value.component) {
                    // check if there are any device restrictions
                    if(value.allowedDevice && navigator){
                        var reg = new RegExp(value.allowedDevice);
                        if (!reg.test(navigator.userAgent))
                            continue;
                    }
                    // Normalize options bag for jQuery widget instances
                    var options = Object.assign({},
                        (value.options)?
                            Object.assign(value, value.options)
                            : value
                    );
                    // For each child, replace his config definition with their instances
                    this.instances[key]=[];
                    if(options.element && typeof options.element === "string") {
                        // Query selector scoped components
                        document.querySelectorAll(options.element)
                            .forEach(element => {
                                this._loadChild(key, options, element);
                            });
                    }else{
                        // Document scoped component
                        this._loadChild(key, options, document);
                    }
                }
            }
        },
        /**
         * Loads a single component and push it to the children's registry
         * @param key
         * @param options
         * @param element
         * @private
         */
        _loadChild(key, options, element){
            if(!utilities.hasData(element, key) ||
                (!utilities.isUndefined(options.skipLock) && utilities.getBooleanValue(options.skipLock) === true)) {
                utilities.setData(element, key, true);
                utilities.loadModule(
                    options,
                    element,
                    (instance) => {
                        this.instances[key].push(instance);
                    });
            }
        }
    });
});
