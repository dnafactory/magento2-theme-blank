define([
    'jquery',
    'jquery/ui'
], function($){

    $.widget('dnafactory.share', {
        options: {
            titleAttributeName: "share-title",
            textAttributeName: "share-text",
            urlAttributeName: "share-url"
        },

        _create: function () {
            var self = this;

            if (!window.navigator.canShare) {
                var text = this.element.attr(this.options.textAttributeName) + "   " + this.getUrl();
                this.element.wrap("<a href='mailto:?body=" + text + "'></a>");
                return;
            }
            this.element.css("dispaly", "block");


            this.element.click(function () {
                self.showShareScreen();
            });
        },

        showShareScreen: function () {
            var url = this.getUrl();

            var shareData = {
                title: this.element.attr(this.options.titleAttributeName),
                text: this.element.attr(this.options.textAttributeName),
                url: url,
            }

            if (window.navigator.canShare) {
                window.navigator.share(shareData);
            } else {
                console.warn(`Your system doesn't support sharing`);
            }
        },

        getUrl: function () {
            var url =  window.location.href;
            if (this.element.attr(this.options.urlAttributeName)) {
                url = this.element.attr(this.options.urlAttributeName);
            }
            return url;
        }
    });

    return $.dnafactory.share;
});
