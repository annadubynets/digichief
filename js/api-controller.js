var APIHelper = APIHelper || {};
APIHelper.url = "https://3hj4hcrvxb.execute-api.us-east-2.amazonaws.com/default/digichief-signup"; //"https://end3zz3y41xhtav.m.pipedream.net"

//APIHelper.url = 'http://127.0.0.1:3000/digichief-signup'

APIHelper.postSignUp = function(data) {
    return $.ajax({
        url: APIHelper.url,
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

        APIHelper.postSignUp(formDataValues).then(function() {
            window.location.href = "signing-up.html";
        }).fail(function (err) {
            console.log(err);
            SignUpController.showError(err);
            grecaptcha.reset();
        });
    }
}

SignUpController.showError = function() {
    $( "#dialog-message" ).dialog({
        modal: true,
        width: 375,
        buttons: {
            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}