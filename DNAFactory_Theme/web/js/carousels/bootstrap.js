/**
 * Just a custom bootstrao's carousel implementation for dnaCarousel
 * @see DNAFactory_Theme/js/dna-carousel.js
 */
define([
    'uiClass',
    'jquery',
    'bs.carousel'
], function(uiClass, $){

    return uiClass.extend({
        defaults: {
            slider: null,
            options: {}
        },
        initialize: function(options, element){
            this._super(options, element);
            this.slider = $(element);
            this.slider.carousel(this.options);
        },

        /**
         * It gets the current carousel implementation
         * @returns {*}
         */
        getInstance(){
            return this.slider;
        },
        /**
         * Toggles the play/autoplay state
         * @returns {*}
         */
        play(){
            return this.getInstance().carousel('cycle');
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this.getInstance.carousel('pause');
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this.getInstance().carousel(n);
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            this.destroyInstance();
            return this.slider.carousel(this.options);
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            return this.getInstance().carousel('dispose');
        },
        /**
         * Rebuild the current carousel instance
         * @returns {*}
         */
        rebuildInstance(){
            return this.refreshInstance();
        },
        /**
         * Retrieves the current carousel instance status
         * @returns {*}
         */
        getInstanceStatus(){
            return this.getInstance().data('bs.carousel');
        }
    });

});