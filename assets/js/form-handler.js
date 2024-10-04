document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        Swal.fire({
            title: 'Success!',
            text: 'Email successfully sent! Thank you for your message.',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
        form.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to send email. Please try again later or contact us directly at: support@spark-games.co.uk',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
});