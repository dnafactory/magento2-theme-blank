/**
 * @author Luigi Ambra
 * General purpose share component
 */
define([
    'uiClass'
], function(Component){
    'use strict';

    return Component.extend({
        defaults: {
            titleAttributeName: "share-title",
            textAttributeName: "share-text",
            urlAttributeName: "share-url",
            title: null,
            text: null,
            url: null
        },
        initialize: function(options, element){
            this._super();

            this.title = this.title || element.getAttribute(this.titleAttributeName);
            this.text = this.text || element.getAttribute(this.textAttributeName);
            this.url = this.url || element.getAttribute(this.urlAttributeName) || window.location.href

            element.addEventListener('click', () => this.showShareScreen());
        },
        showShareScreen: function(){
            if (!window.navigator.canShare) {
                console.warn(`Your system doesn't support sharing`);
                window.location.href = `mailto:?body=${this.text} ${this.url}`
            }else{
                window.navigator.share({
                    title: this.title,
                    text: this.text,
                    url: this.url
                });
            }
        }
    });
});
