document.addEventListener('DOMContentLoaded', function() {
    fetch('/config.json')
        .then(response => response.json())
        .then(config => {
            var form = document.querySelector('.formspree-ajax');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    var formData = new FormData(form);
                    
                    fetch(config.formspreeEndpoint, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    }).then(response => response.json())
                    .then(data => {
                        if (data.ok) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Message sent successfully! Thank you for contacting us.',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            });
                            form.reset();
                        } else {
                            throw new Error('Form submission failed');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to send message. Please try again later or contact us directly at: support@spark-games.co.uk',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
                });
            }
        });
});