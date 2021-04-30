var APIHelper = APIHelper || {};
APIHelper.url = "https://end3zz3y41xhtav.m.pipedream.net"

APIHelper.postSignUp = function(data) {
    return $.ajax({
        url: APIHelper.url,
        method: 'POST',
        data: data
    });
}

var SignUpController = SignUpController || {}


SignUpController.submitHandler = function(e) {
    e.preventDefault();

    if ($(e.target).valid()) {
        var recaptchaCode = grecaptcha.getResponse();
        var formData = new FormData(e.target);
        var formDataValues = Object.fromEntries(formData.entries());
        console.log(formDataValues);

        APIHelper.postSignUp(formDataValues).then(function() {
            window.location.href = "signing-up.html";
        }).fail(function () {

        });
    }

    
}