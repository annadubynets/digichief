if ($("#needHelpForm").length > 0) {
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
}
if ($("#signUpForm").length > 0) {
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
}

if ($(".accordion").length > 0) {
    const accordion = document.querySelector('.accordion');
    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach((item) => {
        const title = item.querySelector('.accordion-title');

        title.addEventListener('click', (e) => {
            const opened_item = accordion.querySelector('.is-open');

            // Toggle current item
            toggle_item(item);

            // Close earlier opened item if exists
            if (opened_item && opened_item !== item) {
                toggle_item(opened_item);
            }


        });
    });

    const toggle_item = (item) => {
        const body = item.querySelector('.accordion-body');
        const content = item.querySelector('.accordion-content');

        if (item.classList.contains('is-open')) {
            body.removeAttribute('style');
            item.classList.remove('is-open');
        } else {
            body.style.height = body.scrollHeight + 'px';
            item.classList.add('is-open');
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu-item'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger-active');
        menu.classList.toggle('menu-active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger-active');
            menu.classList.toggle('menu-active');
        })
    })
})