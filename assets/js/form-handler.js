const serviceID = 'service_rzijtbs';
const templateID = 'template_msg1xrm';
const publicKey = 'API_KEY_PLACEHOLDER';

emailjs.init(publicKey);

function sendEmail(event, form) {
    event.preventDefault();
    
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
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            sendEmail(e, this);
        });
    }
});