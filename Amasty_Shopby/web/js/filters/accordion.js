/**
 * Collassa i filtri in mobile ed emette un evento alla chiusura
 */
define([
    'jquery',
    'accordion',
    'matchMedia',
    'js/lib/dna-responsive'
], function ($, accordion, mediaCheck, dnaResponsive) {

    const mixin = {
        options: {
           desktopFrom: 'md'
        },
        /**
         * @private
         */
        _create: function () {
            this._super();

            if(this.options.desktopFrom) {
                this._attachResponsiveFeatures();
            }
        },
        _attachResponsiveFeatures(){
            mediaCheck({
                media:`(min-width: ${dnaResponsive.getBreakpoint(this.options.desktopFrom)})`,
                entry: () => {
                    this._callCollapsible();
                },
                exit : () => {
                    this.deactivate();
                }
            });
        }
    }

    $.widget('dna.filterAccordion', accordion, mixin);

    return $.dna.filterAccordion;
});
