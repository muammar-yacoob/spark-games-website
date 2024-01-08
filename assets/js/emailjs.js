const serviceID = 'service_rzijtbs';
const templateID = 'template_msg1xrm';
const publicKey = 'nzkw5r6_a36Y9MEeI';

function sendEmail(event) {
    event.preventDefault();
    console.log("Sending message...");
    var form = document.getElementById('contact-form');
    var formData = new FormData(form);

    // Log the form data for debugging
    for(var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    // Send the form data using EmailJS
    emailjs.sendForm(serviceID, templateID, form, publicKey)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        Swal.fire({
            title: 'Success!',
            text: 'Email successfully sent! Thank you for your message.',
            icon: 'success',
            confirmButtonText: 'Cool'
            // ,timer: 3000
        });
        console.log('Timer ended');
        form.reset();
    })
    .catch(function(error) {
        console.log('FAILED...', error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to send email. Please try again Tomorrow.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
}
