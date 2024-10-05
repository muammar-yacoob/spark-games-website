document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    const data = new FormData(form);
    const action = form.getAttribute('action');

    fetch(action, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        console.log('Success:', data);
        Swal.fire({
            title: 'Success!',
            text: 'Message sent successfully! Thank you for contacting us.',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
        form.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to send message. Please try again later or contact us directly at: support@spark-games.co.uk',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
});