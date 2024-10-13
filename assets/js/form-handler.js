// The public key placeholder will be replaced during deployment
const EMAILJS_PUBLIC_KEY = 'API_KEY_PLACEHOLDER';
const serviceID = 'service_rzijtbs';
const templateID = 'template_msg1xrm';

function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialized');
    } else {
        console.error('EmailJS library not loaded. Please check your internet connection and try again.');
    }
}

function sendEmail(event) {
    event.preventDefault();
    console.log('Send email function called');

    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not initialized. Unable to send email.');
        showMessage('Error', 'Unable to send email. Please try again later or contact us directly.');
        return;
    }

    const form = event.target;
    const templateParams = {
        user_name: form.user_name.value,
        user_email: form.user_email.value,
        message: form.message.value
    };

    console.log('Sending email with params:', templateParams);

    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showMessage('Success', 'Email successfully sent! Thank you for your message.');
            form.reset();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            showMessage('Error', 'Failed to send email. Please try again later or contact us directly.');
        });
}

function showMessage(title, message) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: title,
            text: message,
            icon: title.toLowerCase(),
            confirmButtonText: 'OK'
        });
    } else {
        alert(title + ': ' + message);
    }
}

function attachFormListener() {
    const form = document.getElementById('contact-form');
    if (form) {
        console.log('Contact form found, adding event listener');
        form.addEventListener('submit', sendEmail);
    } else {
        console.log('Contact form not found in the DOM');
    }
}

initEmailJS();
document.addEventListener('DOMContentLoaded', attachFormListener);
window.attachFormListener = attachFormListener;