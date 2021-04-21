$("#needHelpForm").validate({
    rules: {
        name: "required",
        email: {
            required: true,
            email: true
        },
        company: "required",
        category: "required",
        radio: "required",
    },
    messages: {
        name: "Name is required.",
        email: {
            required: "Email Address is required.",
            email: "Email Address is not valid. Email addresses should follow the format user@domain.com."
        },
        company: "Company is required.",
        category: "Category is required.",
        radio: "Please Choose at least one",
    },
    errorPlacement: function(error, element) {
        if (element.is(":radio")) {
            error.appendTo(('.assistance-error'));
        } else { // This is the default behavior 
            error.insertAfter(element);
        }
    }
});
$("#signUpForm").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        firstName: "required",
        lastName: "required",
        phone: "required",
        company: "required",
        companyWebsite: "required",
        industry: "required",
        findUs: "required",
    },
    messages: {
        email: {
            required: "Email Address is required.",
            email: "Email Address is not valid. Email addresses should follow the format user@domain.com."
        },
        firstName: "First Name is required.",
        lastName: "Last Name is required.",
        phone: "Phone is required.",
        company: "Company is required.",
        companyWebsite: "Company Website is required.",
        industry: "Please select an item in the list",
        findUs: "Please select an item in the list",
    }
});