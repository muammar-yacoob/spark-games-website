function updateSeasonalBanner() {
    try {
        const banners = [
            { name: 'new-year.gif', months: [1] },
            { name: 'valentine.png', months: [2] },
            { name: 'spring.png', months: [3, 4] },
            { name: 'may-madness.png', months: [5] },
            { name: 'summer.png', months: [6, 7] },
            { name: 'back-to-school.png', months: [8] },
            { name: 'halloween.png', months: [9, 10] },
            { name: 'black-friday.png', months: [11] },
            { name: 'unity-xmas.gif', months: [12] }
        ];

        const date = new Date();
        const currentMonth = date.getMonth() + 1; // getMonth() returns 0-11

        let season = 'default.png';
        for (const banner of banners) {
            if (banner.months.includes(currentMonth)) {
                season = banner.name;
                break;
            }
        }

        const adContainer = document.getElementById('seasonal-ad').parentElement;
        const fileExtension = season.split('.').pop().toLowerCase();
        const basePath = 'images/AffiliateBanners/';
        const fullPath = `${basePath}${season}`;

        // Remove existing content
        adContainer.innerHTML = '';

        // Create new element based on file type
        if (fileExtension === 'mp4') {
            const video = document.createElement('video');
            video.id = 'seasonal-ad';
            video.src = fullPath;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.style.width = '100%';
            video.style.maxWidth = '728px';
            video.style.height = 'auto';
            adContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.id = 'seasonal-ad';
            img.src = fullPath;
            img.alt = 'Unity Asset Store';
            img.style.width = '100%';
            img.style.maxWidth = '728px';
            img.style.height = 'auto';
            adContainer.appendChild(img);
        }

        console.log("Loading banner:", fullPath);
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