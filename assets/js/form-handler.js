function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("API_KEY_PLACEHOLDER");
    } else {
        console.error('EmailJS library not loaded. Please check your internet connection and try again.');
    }
}

const serviceID = 'service_rzijtbs';
const templateID = 'template_msg1xrm';

function sendEmail(event, form) {
    event.preventDefault();
    
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not initialized. Unable to send email.');
        Swal.fire({
            title: 'Error!',
            text: 'Unable to send email. Please try again later or contact us directly at: support@spark-games.co.uk',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    const templateParams = {
        user_name: form.user_name.value,
        user_email: form.user_email.value,
        message: form.message.value
    };

    emailjs.send(serviceID, templateID, templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        Swal.fire({
            title: 'Success!',
            text: 'Email successfully sent! Thank you for your message.',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
        form.reset();
    })
    .catch(function(error) {
        console.log('FAILED...', error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to send email. Please try again Tomorrow or contact us directly at: support@spark-games.co.uk',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            sendEmail(e, this);
        });
    }
});