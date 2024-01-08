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
        console.log(pair[0]+ ': '+ pair[1]);
    }

    // Send the form data using EmailJS
    emailjs.sendForm(serviceID, templateID, form, publicKey)
    .then(function(response) {
        Swal.fire({
            title: 'Success!',
            text: 'Email successfully sent!',
            icon: 'success',
            confirmButtonText: 'Cool',
            timer: 5000 // Alert will close after 5 seconds
        });
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        Swal.fire({
            title: 'Error!',
            text: 'Failed to send email: ' + error.text,
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 5000 // Alert will close after 5 seconds
        });
        console.log('FAILED...', error);
    });
}