define([
    'jquery',
    'mage/dropdown',
], function($) {
    'use strict';

    $.widget('dna.dropdownModal', $.mage.dropdownDialog, {
        options:{
            createTitleBar: true,
            buttons: []
        },

        _create(){
            this.uiModalInner = $('<div/>',{ class:'modal-inner-wrap'})

            this.uiModal = $('<div/>',{ class:'dna-dropdown-modal'});

            this.uiModalInner.append(this.element);
            this.uiModal.append(this.uiModalInner);

            this.element = this.uiModal;

            this._super();
        },
        _createTitlebar(){
            this._super();

            if(this.options.createTitleBar)
                this.uiDialogTitlebar
                    .addClass('modal-header')
                    .prependTo(this.uiModalInner);
        },
        _createButtonPane(){
            this._super();
            this.uiDialogButtonPane
                .addClass('modal-footer')
                .appendTo(this.uiModalInner);
        },
        _title: function (title) {
            if (!this.options.title) {
                title.html("&#160;");
            }
            title.html(this.options.title);
        }
    });

    return $.dna.dropdownModal;
});
