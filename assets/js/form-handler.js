document.addEventListener('DOMContentLoaded', function() {
    // Check if the URL contains a success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
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
    }
});