// assets/js/seasonal-banner.js

function updateSeasonalBanner() {
    const banners = [
        { name: 'winter', months: [12, 1] },         // Winter: December to January
        { name: 'lunar-new-year', months: [2] },     // Lunar New Year: February
        { name: 'spring', months: [3, 4] },          // Spring: March to April
        { name: 'may-madness', months: [5] },        // May Madness: May
        { name: 'summer', months: [6, 7] },          // Summer: June to July
        { name: 'back-to-school', months: [8] },     // Back to School: August
        { name: 'halloween', months: [9, 10] },      // Halloween: September to October
        { name: 'black-friday', months: [11] },      // Black Friday: November
        { name: 'holiday', months: [12] }            // Holiday: December
    ];

    const date = new Date();
    const currentMonth = date.getMonth() + 1; // getMonth() returns 0-11

    let season = 'default';
    for (const banner of banners) {
        if (banner.months.includes(currentMonth)) {
            season = banner.name;
            break;
        }
    }

    const seasonalAd = document.getElementById('seasonal-ad');
    if (seasonalAd) {
        seasonalAd.src = `images/AffiliateBanners/${season}.png`;
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateSeasonalBanner();
    fadeInAdBanner();
});

//make fully transparent when the page loads
document.addEventListener('DOMContentLoaded', function() {
    hideAdBanner();
});