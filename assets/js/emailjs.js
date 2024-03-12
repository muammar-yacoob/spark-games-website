const serviceID = 'service_rzijtbs';
const templateID = 'template_msg1xrm';
const publicKey = 'jwNJhQlIxlOjwrDxU';

function sendEmail(event, form) {
    event.preventDefault();
    emailjs.sendForm(serviceID, templateID, form, publicKey)
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
