require(['jquery', 'domReady!', 'autofill'], function ($) {
    let input = null;
    let select = null;
    let textarea = null;
    input = $('input.input-text');
    select = $('select');
    textarea = $('textarea');

    function labelUp() {
        let that = $(this);
        let label = $(that.parentsUntil('.field').siblings('.label'));

        if (that.val() !== '') {
            return;
        }

        if (that.val() === '') {
            label.addClass('not-empty');
            return;
        }

        label.removeClass('not-empty');
    }

    function labelDown() {
        let that = $(this);
        let label = $(that.parentsUntil('.field').siblings('.label'));

        let autofill;
        try{
            // Fix per browser che non supportano :-webkit-autofill
            autofill = that.is(':-webkit-autofill');
        }catch(exception){
            autofill = false;
        }

        if (that.val() === '' && !autofill) {
            label.removeClass('not-empty');
        } else {
            label.addClass('not-empty');
        }
    }

    function onAutoComplete(){
        $('input.input-text, textarea, select').each(labelDown);
    }
    // Hotfix per autofill
    setTimeout(onAutoComplete, 200);
    $(window).on('autofill', onAutoComplete);

    $(document).on('focusin input blur click change', 'input.input-text', labelUp);
    $(document).on('focusin input blur click change', 'textarea', labelUp);
    $(document).on('focusin input blur change', 'select', labelUp);

    /*$(document).on('click', 'select', function () {
        let that = $(this);
        let control = $(that.closest('.control'));
        control.addClass('open');
    });*/

    //input.on('focusout', labelDown);
    $(document).on('focusout', 'input.input-text', labelDown);
    $(document).on('focusout', 'textarea', labelDown);
    $(document).on('focusout change', 'select', labelDown);
    /*$(document).on('focusout', 'select', function () {
        let that = $(this);
        let control = $(that.closest('.control'));
        control.removeClass('open');
    });*/

    input.trigger('focusout');
    select.trigger('focusout');

    select.closest('.control').addClass('field-select');
    textarea.closest('.control').addClass('field-textarea');
    textarea.closest('.control').siblings('.label').addClass('label-textarea');

    /*$('input[type="password"]')
        .closest('.control')
        .addClass('password-utils')
        .append('<div class="password-util"></div>');

    $(document).on('click', '.password-util', function() {
        let input = $(this).siblings('input');
        let control = $(this).closest('.control');
        let inputType = input.attr('type');
        if (inputType === 'password') {
            input.attr('type', 'text');
            control.addClass('password-shown');
            return;
        }

        control.removeClass('password-shown');
        input.attr('type', 'password');
    });*/
});
