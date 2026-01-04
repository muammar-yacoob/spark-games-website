// assets/js/ad-banner-fade.js

function fadeInAdBanner() {
    setTimeout(function() {
        var adBanner = document.getElementById('ad-banner');
        if (adBanner) {
            adBanner.style.opacity = '1';
        }
    }, 1000); // Delay of 1 second (1000 milliseconds)
}

function hideAdBanner() {
    var adBanner = document.getElementById('ad-banner');
    if (adBanner) {
        adBanner.style.opacity = '0';
    }
}

// Initialize the ad banner fade functionality
function initAdBannerFade() {
    // Work with the existing navigation system
    $(window).on('hashchange', function() {
        hideAdBanner();
        setTimeout(fadeInAdBanner, 500);
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', initAdBannerFade);