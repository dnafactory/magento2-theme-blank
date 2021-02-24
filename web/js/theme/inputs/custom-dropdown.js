define([
    'jquery',
    'js/theme/inputs/custom-select',
    'js/lib/dna-utilities',
    'js/theme/inputs/dropdown-modal',
    'underscore'
], function($,select, utilities, dropdown, _) {
    'use strict';

    return select.extend({
        triggerElement: null,
        dialogElement: null,
        init: false,
        defaults: {
            options: {
                labelTemplate: "<span class='dropdown-label'>%label%</span>%selected%",
                valueTemplate: "<span class=\"value\">%text%</span>",
                optionTemplate: "<li><span class=\"item\">%text%</span></li>",
                closeOnSelect: true,
                containerClass: "dna-dropdown-widget",
                defaultDialogClass: "dna-dropdown-dialog flex-column",
                parentClass: "active _show",
                dialogContentClass:"active _show",
                closeOnClickOutside: true,
                closeOnMouseLeave: false,
                closeOnEscape: true,
                modal: false,
                bodyClass: "_has-modal dropdown"
            }
        },
        /**
         * Generates the required HTML control items
         * @private
         */
        _create(){
            this._super();

            this.triggerElement = $('<span/>', { class: "action toggle", "data-toggle":"dropdown", "aria-haspopup":true });
            this.dialogElement = $('<ul/>', { class: "dna-dropdown modal-content", "data-target": "dropdown" });

            this._generateOptionList();

            this.options.containerClass && $(this.container).addClass(this.options.containerClass);
        },

        /**
         * Binds some required event handlers
         * @private
         */
        _bind(){
            this._super();
            // We need a custom mutationObserver to track any visibility changes in the original select
            const debouncedUpdate = _.debounce(this.syncVisibility.bind(this), 200, false),
                debouncedOptionListRecreate = _.debounce(this._generateOptionList.bind(this), 200, false),
                attributeMutationObserver = new MutationObserver(debouncedUpdate),
                optionsMutationObserver = new MutationObserver(debouncedOptionListRecreate);
            // Starts listening for changes in the root HTML element of the page.
            attributeMutationObserver.observe(this.element, {
                childList: false,
                subtree: false,
                attributes: true,
                attributeFilter: ['style','class','disabled']
            });

            optionsMutationObserver.observe(this.element, {
                childList: true,
                subtree: false,
                attributes: false
            });


            // Option selection's handlers
            $(this.element).on('change', this.checkValue.bind(this));

            // Simulates the select focus (in/out) when user interacts with the ui widget
            $(this.container)
                .on('dropdownmodalopen', () => { this.label.classList.add(this.options.focusClass) } )
                .on('dropdownmodalclose', () => { this.label.classList.remove(this.options.focusClass) });
        },

        /**
         * Init the component, instantiating the dropdownDialog widget
         * @private
         */
        _init(){
            this._super();

            // retrieves the current infos and applies the right styles
            this.updateControls();

            // Initial value setup
            this.checkValue();

            // Visually hides the original select so it's still usable even if it's invisible
            this._visuallyHide(this.element);
            $(this.element).before(this.triggerElement);

            // Widget initialization
            dropdown($.extend(this.options, {
                'appendTo': this.container,
                'triggerTarget': this.triggerElement[0],
                'title': this._generateModalTitle()
            }), this.dialogElement[0]);
            this.init = true;
        },
        /**
         * Updates control item's infos, such as the control label's content.
         */
        updateControls(){
            if(this.options.labelTemplate)
                $(this.label).hide();
            const label = this._getCurrentLabel();
            this.triggerElement
                .addClass(this.element.getAttribute('class'));
            // Updates content only if there's any actual change to avoid DOM update loops
            this.triggerElement.html(label);
            this.updateModalTitle(this._generateModalTitle());

            this.syncVisibility();
        },
        /**
         * Take tracks of any visibility change on the original select
         */
        syncVisibility(){
            this.triggerElement.css('display', () => $(this.element).is(':visible')? '' : 'none');
            this.container.classList.toggle('disabled', this.element.disabled);
            _.isFunction(this.toggleLabelClass) && this.toggleLabelClass();
        },
        /**
         * Runs whenever the user selects an option
         * @param e
         * @private
         */
        _onOptionSelected(e){
            $(this.element)
                .val($(e.target).data('value'));
            if ("createEvent" in document) {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                this.element.dispatchEvent(evt);
            } else
                this.element.fireEvent("onchange");

            if(this.options.closeOnSelect)
                this.close();
        },

        /**
         * Applies the right css classes and infos, accordingly to the current selection
         */
        checkValue(){
            $('[data-value]', this.dialogElement).each( (i, option) => {
                $(option).toggleClass('selected', (this._trimValue(this.element.value) === `${$(option).data('value')}`));
            });

            this.updateControls();
        },
        /**
         * Generates the current label accordingly to the options and the current selection.
         * It uses labelTemplate to generate the label and valueTemplate to generate the selected value(s) markup
         * @returns {string|string}
         * @private
         */
        _getCurrentLabel(){
            var suffix = "";
            if(!utilities.isControlEmpty(this.element)){
                const selectedOptions = this.element.selectedOptions;
                for(var i = 0; i < selectedOptions.length; i++) {
                    suffix += (this.options.valueTemplate)?
                        this.options.valueTemplate.replaceAll('%text%',selectedOptions[0].textContent) :
                        `<span>${selectedOptions[0].textContent}</span>`;
                }
            }
            return (this.options.labelTemplate)?
                this.options.labelTemplate
                    .replaceAll('%label%', this.label.textContent.trim())
                    .replaceAll('%selected%', suffix)
                : suffix;
        },
        _generateModalTitle(){
            return (utilities.isControlEmpty(this.element))?
                this.label.textContent.trim() : this.triggerElement.html();
        },
        _generateOptionElement(option){
            return this.options.optionTemplate
                .replaceAll('%text%', option.textContent);
        },
        _trimValue(value){
            return utilities.isEmpty(value)? "-" : value;
        },
        /**
         * Visually hides an element
         * @param element
         * @private
         */
        _visuallyHide(element){
            $(element).css({'opacity':'0', 'position':'absolute', 'left':0, 'right':0, 'top':0, 'bottom':0, 'z-index':'-1' });
        },
        /**
         * Just an adapter function to open
         */
        open(){
            (this.init) && this.dialogElement.dropdownModal("open");
        },
        close(){
            this.init && this.dialogElement.dropdownModal("close");
        },
        updateModalTitle(title){
            this.init && this.dialogElement.dropdownModal("option", "title", title);
        },
        _generateOptionList(){
            $('[data-value]', this.dialogElement)
                .off('click', this._onOptionSelected.bind(this))
                .remove();
            // Generates the option-list's mirror element
            $('option', this.element).each( (i, option) => {
                const element = $(this._generateOptionElement(option));
                element.attr('data-value', this._trimValue(option.value));
                element.toggleClass('disabled', option.disabled);
                this.dialogElement.append(element);
            });
            $('[data-value]', this.dialogElement).on('click', this._onOptionSelected.bind(this));
        }
    });
});
