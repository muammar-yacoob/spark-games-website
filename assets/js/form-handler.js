const EMAILJS_PUBLIC_KEY = 'API_KEY_PLACEHOLDER';
const serviceID = 'service_rzijtbs';
const templateID = 'template_msg1xrm';

const MESSAGES = {
    EMAIL_JS_INIT_SUCCESS: 'EmailJS initialized',
    EMAIL_JS_INIT_ERROR: 'EmailJS library not loaded. Please check your internet connection and try again.',
    EMAIL_SEND_SUCCESS: 'Email successfully sent! Thank you for your message.',
    EMAIL_SEND_ERROR: 'Failed to send email. Please try again later or contact us directly at:',
    CONTACT_EMAIL: 'support@spark-games.co.uk'
};

const CONTACT_LINK = `<a href="mailto:${MESSAGES.CONTACT_EMAIL}" style="color: #00ccff;">${MESSAGES.CONTACT_EMAIL}</a>`;

function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log(MESSAGES.EMAIL_JS_INIT_SUCCESS);
    } else {
        console.error(MESSAGES.EMAIL_JS_INIT_ERROR);
    }
}

function sendEmail(event) {
    event.preventDefault();
    
    if (typeof emailjs === 'undefined') {
        showMessage('Error', `${MESSAGES.EMAIL_SEND_ERROR} ${CONTACT_LINK}`);
        return;
    }

    const form = event.target;
    const templateParams = {
        user_name: form.user_name.value,
        user_email: form.user_email.value,
        message: form.message.value
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            showMessage('Success', MESSAGES.EMAIL_SEND_SUCCESS);
            form.reset();
        })
        .catch(function(error) {
            console.error('Failed to send email:', error);
            showMessage('Error', `${MESSAGES.EMAIL_SEND_ERROR} ${CONTACT_LINK}`);
        });
}

function showMessage(title, message) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: title,
            html: message,
            icon: title.toLowerCase(),
            confirmButtonText: 'OK',
            background: '#19191a',
            color: '#fff',
            customClass: {
                popup: 'swal2-dark',
                confirmButton: 'swal2-dark'
            }
        });
    } else {
        alert(`${title}: ${message}`);
    }
}

function setupFormListener() {
    document.addEventListener('submit', function(event) {
        if (event.target.id === 'contact-form') {
            sendEmail(event);
        }
    });
}

initEmailJS();
document.addEventListener('DOMContentLoaded', setupFormListener);