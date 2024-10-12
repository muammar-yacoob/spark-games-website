function updateSeasonalAd() {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    
    // Default banner
    let adImage = 'images/AffiliateBanners/Default-Affiliate.png';

    const seasons = [
        { name: 'New Year Sale', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [0, 1], end: [0, 15] },
        { name: 'Lunar New Year', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [1, 1], end: [1, 15] },
        { name: 'Spring Sale', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [2, 15], end: [3, 15] },
        { name: 'Easter Sale', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [3, 1], end: [3, 30] },
        { name: 'May Madness', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [4, 1], end: [4, 31] },
        { name: 'Summer Sale', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [5, 15], end: [6, 15] },
        { name: 'Unity Anniversary', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [7, 1], end: [7, 15] },
        { name: 'Back to School', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [8, 15], end: [8, 31] },
        { name: 'Autumn Sale', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [9, 1], end: [9, 30] },
        { name: 'Halloween Sale', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [9, 15], end: [10, 3] },
        { name: 'Black Friday', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [10, 20], end: [11, 3] },
        { name: 'Holiday Sale', image: 'images/AffiliateBanners/Halloween-Sale.png', start: [11, 15], end: [0, 15] },
    ];

    for (const season of seasons) {
        const [startMonth, startDay] = season.start;
        const [endMonth, endDay] = season.end;
        
        if (
            (month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay) ||
            (startMonth > endMonth && (month > startMonth || month < endMonth))
        ) {
            adImage = season.image;
            break;
        }
    }

    const adElement = document.getElementById('seasonal-ad');
    if (adElement) {
        adElement.src = adImage;
        adElement.alt = `Unity Asset Store ${seasons.find(s => s.image === adImage)?.name || 'Sale'}`;
    }
}

document.addEventListener('DOMContentLoaded', updateSeasonalAd);