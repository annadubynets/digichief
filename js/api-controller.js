var APIHelper = APIHelper || {};
APIHelper.url = "https://3hj4hcrvxb.execute-api.us-east-2.amazonaws.com/default";
APIHelper.signUpEndpoint = '/digichief-signup';
APIHelper.helpUsEndpoint = '/digichief-helpus';

//APIHelper.url = 'http://127.0.0.1:3000/digichief-signup'

APIHelper.postSignUp = function(data) {
    return $.ajax({
        url: APIHelper.url + APIHelper.signUpEndpoint,
        crossDomain: true,
        method: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    });
}

APIHelper.postHelpUs = function(data) {
    return $.ajax({
        url: APIHelper.url + APIHelper.helpUsEndpoint,
        crossDomain: true,
        method: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    });
}




var SignUpController = SignUpController || {}


SignUpController.submitHandler = function(e) {
    e.preventDefault();

    var recaptchaCode = grecaptcha.getResponse();
    if (!recaptchaCode) {
        $('.recaptcha-desc').addClass('text-error');
    }
    

    if ($(e.target).valid()) {
        if (!recaptchaCode) {
            return;
        }
        
        var formData = new FormData(e.target);
        var formDataValues = Object.fromEntries(formData.entries());
        console.log(formDataValues);

        ModalUtils.showLoader();

        APIHelper.postSignUp(formDataValues).then(function() {
            window.location.href = "signing-up.html";
        }).fail(function (err) {
            console.log(err);
            ModalUtils.hideLoader();
            ModalUtils.showError(err);
            grecaptcha.reset();
        });
    }
}



var HelpUsController = HelpUsController || {}

HelpUsController.submitHandler = function(e) {
    e.preventDefault();

    var recaptchaCode = grecaptcha.getResponse();
    if (!recaptchaCode) {
        $('.recaptcha-desc').addClass('text-error');
    }

    if ($(e.target).valid()) {
        if (!recaptchaCode) {
            return;
        }
        
        var formData = new FormData(e.target);
        var formDataValues = Object.fromEntries(formData.entries());
        console.log(formDataValues);

        ModalUtils.showLoader();

        APIHelper.postHelpUs(formDataValues).then(function() {
            ModalUtils.hideLoader();
            ModalUtils.showThankYou();
        }).fail(function (err) {
            console.log(err);
            ModalUtils.hideLoader();
            ModalUtils.showError(err);
            grecaptcha.reset();
        });
    }
}



var ModalUtils = ModalUtils || {};
ModalUtils.initialized = false;

ModalUtils.setup = function() {
    if (ModalUtils.initialized) {
        return;
    }

    var errorMessage = `
        <div id="error-modal" style="display: none;" title="Error occurred">
            <p>
            :-( Sorry, unexpected error occurred.</p>
            <p>Please, contact our dev team at <a href="mailto:development@digichief.com">development@digichief.com</a>
            </p>
        </div>`;
    $('body').append($(errorMessage));

    var loaderMessage = `
        <div id="loader-modal" style="display: none;" title="Processing Your Request">
            <p>
            Please, wait...
            </p>
            <style>
                [aria-describedby="loader-modal"] .ui-dialog-titlebar-close {
                    display: none;
                }
            </style>
        </div>`;
    $('body').append($(loaderMessage));


    var thankYouMessage = `
        <div id="thank-you-modal" style="display: none;" title="Success">
            <p>
                Thank you, your request has been submitted.
            </p>
        </div>`;
    $('body').append($(thankYouMessage));

    ModalUtils.initialized = true;
}

ModalUtils.showError = function() {
    ModalUtils.setup();
    $("#error-modal").dialog({
        modal: true,
        width: 375,
        buttons: {
            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}

ModalUtils.showThankYou = function() {
    ModalUtils.setup();
    $("#thank-you-modal").dialog({
        modal: true,
        width: 375,
        buttons: {
            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}

ModalUtils.showLoader = function() {
    ModalUtils.setup();
    $("#loader-modal").dialog({
        closeOnEscape: false,
        modal: true,
        width: 375,
        // open: function(event, ui) {
        //     $(".ui-dialog-titlebar-close").hide();
        // }
    });
}

ModalUtils.hideLoader = function() {
    $("#loader-modal").dialog("destroy");
}