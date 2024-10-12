function updateSeasonalBanner() {
    const banners = {
        'winter': ['12', '01'],
        'spring': ['03', '04', '05'],
        'summer': ['06', '07', '08'],
        'halloween': ['09', '10', '11'],
        'halloween': ['10'],
        'blackfriday': ['11'],
    };

    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    let season = 'default';
    for (const [key, months] of Object.entries(banners)) {
        if (months.includes(month)) {
            season = key;
            break;
        }
    }

    document.getElementById('seasonal-ad').src = `images/AffiliateBanners/${season}.png`;
}

document.addEventListener('DOMContentLoaded', updateSeasonalBanner);