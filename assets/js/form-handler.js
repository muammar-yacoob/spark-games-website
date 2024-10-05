document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.formspree-ajax');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var formData = new FormData(form);
            var formAction = 'https://formspree.io/f/FORMSPREE_API_KEY_PLACEHOLDER';  // Replace with your actual Formspree endpoint
            
            fetch(formAction, {
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