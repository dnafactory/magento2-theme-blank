/**
 * Copyright © DNAFactory, Inc. All rights reserved.
 */

define([
    "jquery"
], function ($) {
    'use strict';

    var overlayDiv = '<div class="dropdown_overlay"></div>';
    var overlayDivClass = '.dropdown_overlay';

    $.widget('dnafactory.searchbar', {
        options: {
            /*Trigger*/
            formMini: '#search_mini_form',
            formMiniInput: '#search_mini_form #search',
            closeMiniSearch: '.button-close-mini-search',
            searchAutocompleteClass: '.searchsuite-autocomplete'
        },

        /**
         * @private
         */
        _create: function () {
            this.initObject();
            this.manageSearch();
        },

        /**
         * Init object will be used
         */
        initObject: function () {
            this.formMini = $(this.options.formMini);
            this.formMiniInput = $(this.options.formMiniInput);
            this.closeMiniSearch = $(this.options.closeMiniSearch);
        },

        manageSearch: function () {
            var self = this;

            this.formMiniInput.on('focusin', function (event) {
                blurred = false; //blur occurred

                if (self.canActiveSearch()) {
                    self.openSearch();
                }
            });

            this.formMiniInput.on('keyup', function (event) {
                blurred = false; //blur occurred

                if (self.canActiveSearch()) {
                    self.openSearch();
                } else {
                    self.closeSearch();
                }
            });

            this.closeMiniSearch.on('click', function () {
                self.formMiniInput.trigger('focusout');
            });

            /* manage blurred */
            var blurred = false;
            this.formMiniInput.on('focusout', function (event) {
                blurred = true; //blur occurred
            });
            $(document).on('click', 'body', function (event) {
                /* element clicked */
                var eC = $(event.target);
                if (eC.hasClass(self.options.searchAutocompleteClass)
                    || eC.closest(self.options.searchAutocompleteClass).length
                    || eC.hasClass(self.options.formMiniInput)
                    || eC.closest(self.options.formMiniInput).length) {
                    blurred = false; //blur occurred
                } else {
                    blurred = true; //blur occurred
                }

                if (blurred) {
                    self.closeSearch();
                    blurred = false;
                }
            });
        },

        canActiveSearch: function () {
            if (this.formMiniInput.val() !== '') {
                return true;
            }

            return false;
        },

        /**
         * Open search
         */
        openSearch: function () {
            this.formMini.addClass('search_is_active');
            $('body').addClass('searchautocomplete__active');

            var dropdownWrapper = this.formMini;

            if (dropdownWrapper.find(overlayDivClass).length <= 0) {
                dropdownWrapper.append(overlayDiv);
            }
            dropdownWrapper.find(overlayDivClass).css('top', 0);
            dropdownWrapper.find(overlayDivClass).fadeIn(300);
        },

        /**
         * Close search
         */
        closeSearch: function () {
            this.formMini.removeClass('search_is_active');
            $('body').removeClass('searchautocomplete__active');
            var dropdownWrapper = this.formMini;
            dropdownWrapper.find(overlayDivClass).fadeOut(300);
        }
    });

    return $.dnafactory.searchbar;
});