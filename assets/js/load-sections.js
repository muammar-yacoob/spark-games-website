document.addEventListener('DOMContentLoaded', function() {
    console.log('=== load-sections.js: DOMContentLoaded ===');
    updateSeasonalBanner();
    
    // Load all content sections
    const sections = ['projects', 'about'];
    
    sections.forEach(section => {
        fetch(`${section}-content.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById(`${section}-content`).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${section} content:`, error));
    });
    
    // Add placeholder immediately
    const teamContentDiv = document.getElementById('team-content');
    if (teamContentDiv) {
        console.log('Found team-content div, adding placeholder...');
        teamContentDiv.innerHTML = '<p style="text-align: center; color: #9bf1ff;">Loading team members...</p>';
    } else {
        console.error('team-content div not found on page load!');
    }
    
    // Load team content from JSON
    async function loadTeamContentFromJSON() {
        console.log('=== loadTeamContentFromJSON called ===');
        try {
            // Load team data directly
            console.log('Fetching team.json...');
            const response = await fetch('team.json');
            console.log('Team.json response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Team data loaded:', data);
            
            // Render team members in the team-content div
            const teamContentDiv = document.getElementById('team-content');
            console.log('team-content div found:', !!teamContentDiv);
            
            if (teamContentDiv) {
                renderTeamMembersForIndex(data.team, teamContentDiv);
            } else {
                console.error('team-content div not found!');
            }
        } catch (error) {
            console.error('Error loading team content:', error);
            const teamContentDiv = document.getElementById('team-content');
            if (teamContentDiv) {
                teamContentDiv.innerHTML = '<p style="color: #ff6b6b;">Error loading team data. Please refresh the page.</p>';
            }
        }
    }
    
    // Function to render team members for index.html
    function renderTeamMembersForIndex(teamMembers, container) {
        console.log('renderTeamMembersForIndex called with', teamMembers.length, 'members');
        console.log('Container element:', container);
        
        // Sort to show vacancies first
        const sortedMembers = [...teamMembers].sort((a, b) => {
            if (a.isVacancy && !b.isVacancy) return -1;
            if (!a.isVacancy && b.isVacancy) return 1;
            return 0;
        });
        
        const teamGrid = sortedMembers.map(member => {
            const skillTags = member.skills.map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('');
            
            const applyButton = member.isVacancy ? 
                `<div style="margin-top: 20px;">
                    <button class="apply-button" onclick="window.location.href='careers.html'" style="background: #9bf1ff; color: #000; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-rocket"></i>
                        Apply Now
                    </button>
                </div>` : '';
            
            // Vacancy banner if isVacancy is true
            const vacancyBanner = member.isVacancy ? 
                '<div class="vacancy-banner">\n' +
                '  <img src="images/Team/vacancy_banner.png" alt="Coming soon!" style="width: 100%; height: 100%; object-fit: contain; display: block;">\n' +
                '</div>' : '';
            
            // Pick first quote for simplicity (no typewriter effect)
            let selectedQuote = "No quote available";
            if (member.quotes && Array.isArray(member.quotes) && member.quotes.length > 0) {
                selectedQuote = member.quotes[0];
            } else if (member.quote) {
                selectedQuote = member.quote;
            }
            
            return `
                <div class="team-member">
                    ${vacancyBanner}
                    <div class="member-avatar-wrapper">
                        <div class="avatar-glow"></div>
                        <img src="${member.avatar}" alt="${member.role}" class="member-avatar">
                    </div>
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                    <p class="member-quote">"${selectedQuote}"</p>
                    <p class="member-show">- ${member.show}</p>
                    <div class="member-skills">
                        ${skillTags}
                    </div>
                    ${applyButton}
                </div>
            `;
        }).join('');
        
        container.innerHTML = `<div class="team-grid">${teamGrid}</div>`;
        console.log('Team content rendered successfully!');
    }
    
    // Call the function with a slight delay to ensure DOM is ready
    setTimeout(() => {
        console.log('Attempting to load team content...');
        loadTeamContentFromJSON();
    }, 100);
});

function updateSeasonalBanner() {
    // Your existing updateSeasonalBanner function here
}