// assets/js/seasonal-banner.js

function updateSeasonalBanner() {
    try {
        const banners = [
            { name: 'winter', months: [12, 1] },
            { name: 'lunar-new-year', months: [2] },
            { name: 'spring', months: [3, 4] },
            { name: 'may-madness', months: [5] },
            { name: 'summer', months: [6, 7] },
            { name: 'back-to-school', months: [8] },
            { name: 'halloween', months: [9, 10] },
            { name: 'black-friday', months: [11] },
            { name: 'holiday', months: [12] }
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
            console.log("Loading banner:", `images/AffiliateBanners/${season}.png`);
        } else {
            console.error("Seasonal ad element not found");
        }
    } catch (error) {
        console.error("Error in updateSeasonalBanner:", error);
    }
}

function initSeasonalBanner() {
    updateSeasonalBanner();
    if (typeof fadeInAdBanner === 'function') {
        fadeInAdBanner();
    } else {
        console.error("fadeInAdBanner function not found");
    }
}

// Call this function when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSeasonalBanner);
} else {
    initSeasonalBanner();
}

// Immediate call for debugging
updateSeasonalBanner();