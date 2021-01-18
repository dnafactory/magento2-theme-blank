define([
    'js/lib/dna-utilities'
], function(utilities) {
    'use strict';

    /**
     * Responsive
     * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
     * Base vanilla js Responsive Utilities
     * TODO: experimental feature
     */
    return {
        defaults: {
            xxxs: 0,
            xxs : '320px',
            xs  : '480px',
            sm  : '640px',
            md  : '768px',
            lg  : '1024px',
            xl  : '1440px'
        },
        getBreakpoint(bp){
            return utilities.getCssVar(`breakpoint-${bp}`, this.defaults[bp]);
        }
    }
});