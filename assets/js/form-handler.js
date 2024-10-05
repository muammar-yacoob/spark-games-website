document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
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
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Message sent successfully! Thank you for contacting us.',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                } else {
                    alert('Message sent successfully! Thank you for contacting us.');
                }
                form.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to send message. Please try again later or contact us directly at: support@spark-games.co.uk',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    alert('Failed to send message. Please try again later or contact us directly at: support@spark-games.co.uk');
                }
            });
        });
    }
});