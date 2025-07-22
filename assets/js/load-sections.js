document.addEventListener('DOMContentLoaded', function() {
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
    
    // Load team content from JSON
    async function loadTeamContentFromJSON() {
        try {
            // Load team data directly
            const response = await fetch('team.json');
            const data = await response.json();
            
            // Render team members in the team-content div
            const teamContentDiv = document.getElementById('team-content');
            if (teamContentDiv) {
                renderTeamMembersForIndex(data.team, teamContentDiv);
            }
        } catch (error) {
            console.error('Error loading team content:', error);
        }
    }
    
    // Function to render team members for index.html
    function renderTeamMembersForIndex(teamMembers, container) {
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
                    <button class="apply-button" onclick="window.openModal && window.openModal(this)" data-job-title="${member.role}" data-job-type="${member.jobType || 'Full-time • Remote'}">
                        <i class="fas fa-rocket"></i>
                        Apply Now
                    </button>
                </div>` : '';
            
            // Vacancy banner if isVacancy is true
            const vacancyBanner = member.isVacancy ? 
                '<div class="vacancy-banner" style="position: absolute; top: -10px; right: -10px; width: 110px; height: 110px; z-index: 10; pointer-events: none;">\n' +
                '  <img src="images/Team/vacancy_banner.png" alt="Coming soon!" style="width: 100%; height: 100%; object-fit: contain; display: block;">\n' +
                '</div>' : '';
            
            return `
                <div class="team-member">
                    ${vacancyBanner}
                    <div class="member-avatar-wrapper">
                        <div class="avatar-glow"></div>
                        <img src="${member.avatar}" alt="${member.role}" class="member-avatar">
                    </div>
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                    <p class="member-quote">${member.quote}</p>
                    <p class="member-show">- ${member.show}</p>
                    <div class="member-skills">
                        ${skillTags}
                    </div>
                    ${applyButton}
                </div>
            `;
        }).join('');
        
        container.innerHTML = `<div class="team-grid">${teamGrid}</div>`;
    }
    
    loadTeamContentFromJSON();
});

function updateSeasonalBanner() {
    // Your existing updateSeasonalBanner function here
}