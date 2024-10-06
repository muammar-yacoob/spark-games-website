document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            // Show SweetAlert
            Swal.fire({
                title: 'Sending...',
                text: 'Please wait while we send your message.',
                icon: 'info',
                showConfirmButton: false,
                allowOutsideClick: false
            });

            // Use FormData to easily get form data
            const formData = new FormData(form);

            // Send the form data using fetch
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => response.json())
              .then(data => {
                  if (data.ok) {
                      // Success
                      Swal.fire({
                          title: 'Success!',
                          text: 'Message sent successfully! Thank you for contacting us.',
                          icon: 'success',
                          confirmButtonText: 'Cool'
                      });
                      form.reset(); // Clear the form
                  } else {
                      // Error
                      throw new Error('Form submission failed');
                  }
              })
              .catch(error => {
                  console.error('Error:', error);
                  Swal.fire({
                      title: 'Error!',
                      text: 'Failed to send message. you can still email me directly at <a href="mailto:support@spark-games.co.uk">support@spark-games.co.uk</a>',
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
              });
        });
    }
});