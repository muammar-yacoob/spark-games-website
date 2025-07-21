document.addEventListener('DOMContentLoaded', function() {
    updateSeasonalBanner();
    
    // Load all content sections
    const sections = ['games', 'tools', 'about', 'contact', 'careers'];
    
    sections.forEach(section => {
        fetch(`${section}-content.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById(`${section}-content`).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${section} content:`, error));
    });
});

function updateSeasonalBanner() {
    // Your existing updateSeasonalBanner function here
}