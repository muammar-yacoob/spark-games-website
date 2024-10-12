function updateSeasonalBanner() {
    const banners = {
        'winter': ['12', '01'],
        'lunar-new-year': ['01', '02'],
        'spring': ['03', '04', '05'],
        'may-madness': ['05'],
        'summer': ['06', '07', '08'],
        'back-to-school': ['08', '09'],
        'autumn': ['09', '10'],
        'halloween': ['10'],
        'black-friday': ['11'],
        'holiday': ['12']
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