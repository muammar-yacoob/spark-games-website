document.addEventListener('DOMContentLoaded', function() {
    // Check if the URL contains a success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success')) {
        Swal.fire({
            title: 'Success!',
            text: 'Message sent successfully! Thank you for contacting us.',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
    }
});