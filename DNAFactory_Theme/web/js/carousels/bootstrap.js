/**
 * Just a custom bootstrap's carousel implementation for dnaCarousel
 * @see DNAFactory_Theme/js/dna-carousel.js
 */
define([
    'DNAFactory_Theme/js/dna-carousel',
    'jquery',
    'bs.carousel'
], function(BaseCarousel, $){

    return BaseCarousel.extend({
        _instantiate(){
            $(element).carousel(this.options);
            return $(element);
        },
        /**
         * Toggles the play/autoplay state
         * @returns {*}
         */
        play(){
            return this._super().carousel('cycle');
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this._super().carousel('pause');
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this._super().carousel(n);
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            this.destroyInstance();
            return this._super().carousel(this.options);
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            return this._super().carousel('dispose');
        },
        /**
         * Retrieves the current carousel instance status
         * @returns {*}
         */
        getInstanceStatus(){
            return this._super().data('bs.carousel');
        }
    });

});