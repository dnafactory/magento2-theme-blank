define([
], function(){
    'use strict';

    /**
     * Simply returns the actual MutationObserver implementation
     * @type {{prototype: MutationObserver, new(callback: MutationCallback): MutationObserver}|*|null}
     */
    const MutationObserver = window.MutationObserver ||  window.WebKitMutationObserver ||  window.MozMutationObserver
                            || global.jsMutationObserver || null;
    if(!MutationObserver){
        console.error("Mutation Observer is not supported by your browser or device");
    }
    return MutationObserver;
});
