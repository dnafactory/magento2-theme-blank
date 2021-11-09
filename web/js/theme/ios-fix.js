define([
    'js/lib/vanilla-plugin',
    'js/lib/mutation-observer',
    'underscore'
], function(JSComponent, MutationObserver, _){
    'use strict';


    return JSComponent.extend({
        defaults: {
            options: {
                lockOnClassName: '_has-modal _has-popup -am-noscroll'
            },
            scrollY: window.scrollY,
            locked: false
        },
        _bind: function(){
            this._super();
            window.addEventListener("resize", this.syncHeight, false);
            let onElementChange = _.debounce( this._onMutation.bind(this), 500, false ),
                mutationObserver = new MutationObserver(onElementChange);
            mutationObserver.observe(this.element, {
                childList: false,
                subtree: false,
                attributes: true,
                attributeFilter: ['class']
            });
        },
        syncHeight: function() {
            document.documentElement.style.setProperty(
                "--window-inner-height",
                `${window.innerHeight}px`
            );
        },
        _onMutation: function(mutations){
            mutations.forEach(mutation => {
                if(mutation.attributeName === "class")
                    this._toggleScrollLock();
            });
        },
        _toggleScrollLock: function(){
            let toLock = this.options.lockOnClassName.split(' ')
                .some(className => this.element.classList.contains(className));

            if(toLock && !this.locked)
                this._lockScroll();
            else if(!toLock && this.locked)
                this._unlockScroll();
        },
        _lockScroll: function(){
            this.locked = true;
            this.scrollY = window.scrollY;
            document.documentElement.classList.add('ios-lock');
            document.body.scrollTo(0, this.scrollY);
        },
        _unlockScroll: function(){
            this.locked = false;
            document.documentElement.classList.remove('ios-lock');
            window.scrollTo(0, this.scrollY);
        }
    });
});
