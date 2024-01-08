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
        alert('Email successfully sent!');
        Swal.fire({
            title: 'Success!',
            text: 'Email successfully sent!',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        alert('Error sending email!');
        Swal.fire({
            title: 'Error!',
            text: 'Failed to send email: ' + error.text,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.log('FAILED...', error);
    });
}