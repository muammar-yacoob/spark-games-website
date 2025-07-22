// Store quotes globally for typewriter effect
let memberQuotes = {};

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
        
        const teamGrid = sortedMembers.map((member, index) => {
            const skillTags = member.skills.map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('');
            
            const applyButton = member.isVacancy ? 
                `<div style="margin-top: 20px;">
                    <button class="apply-button" onclick="window.openModal && window.openModal(this)" data-job-title="${member.role}" data-job-type="${member.jobType || 'Full-time • Remote'}" data-member-avatar="${member.avatar}" data-member-name="${member.name}" style="background: #00d4ff; color: #000; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;" onmouseover="this.style.background='#9bf1ff'" onmouseout="this.style.background='#00d4ff'">
                        <i class="fas fa-rocket"></i>
                        Apply Now
                    </button>
                </div>` : '';
            
            // Vacancy banner if isVacancy is true
            const vacancyBanner = member.isVacancy ? 
                '<div class="vacancy-banner">\n' +
                '  <img src="images/Team/vacancy_banner.png" alt="Coming soon!" style="width: 100%; height: 100%; object-fit: contain; display: block;">\n' +
                '</div>' : '';
            
            // Store quotes for this member
            const quotes = member.quotes && Array.isArray(member.quotes) && member.quotes.length > 0 
                ? member.quotes 
                : member.quote 
                    ? [member.quote] 
                    : ["No quote available"];
            
            memberQuotes[index] = quotes;
            
            return `
                <div class="team-member" data-member-index="${index}">
                    ${vacancyBanner}
                    <div class="member-avatar-wrapper">
                        <div class="avatar-glow"></div>
                        <img src="${member.avatar}" alt="${member.role}" class="member-avatar">
                    </div>
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                    <p class="member-quote">
                        <span class="quote-text">${quotes[0]}</span>
                    </p>
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
        
        // Setup typewriter effect after rendering
        setTimeout(() => {
            setupTypewriterEffect();
        }, 100);
    }
    
    // Typewriter effect function
    function typewriterEffect(element, text, callback) {
        if (!element || !text) return;
        
        element.textContent = '';
        element.classList.add('typewriter');
        
        let i = 0;
        const typingSpeed = 20; // ms per character - faster typing
        
        function typeCharacter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Animation complete
                setTimeout(() => {
                    element.classList.remove('typewriter');
                    if (callback) callback();
                }, 1000); // Keep cursor for 1 second after typing
            }
        }
        
        typeCharacter();
    }
    
    // Setup hover event listeners for typewriter effect
    function setupTypewriterEffect() {
        console.log('Setting up typewriter effect...');
        const teamMembers = document.querySelectorAll('.team-member');
        console.log('Found team members:', teamMembers.length);
        
        teamMembers.forEach((member) => {
            const quoteElement = member.querySelector('.quote-text');
            const memberIndex = parseInt(member.getAttribute('data-member-index'));
            const quotes = memberQuotes[memberIndex];
            
            if (!quotes || !quoteElement) {
                console.log('No quotes or quote element found for member', memberIndex);
                return;
            }
            
            let currentQuoteIndex = 1; // Start at 1 since 0 is already shown
            let isTyping = false;
            let currentTimeout = null;
            
            member.addEventListener('mouseenter', () => {
                if (isTyping) return;
                
                // Clear any existing timeout
                if (currentTimeout) {
                    clearTimeout(currentTimeout);
                }
                
                isTyping = true;
                const currentQuote = quotes[currentQuoteIndex];
                
                // Start typewriter effect
                typewriterEffect(quoteElement, currentQuote, () => {
                    isTyping = false;
                    // Move to next quote for next hover
                    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                });
            });
            
            member.addEventListener('mouseleave', () => {
                // Just remove the typewriter class, keep the quote visible
                currentTimeout = setTimeout(() => {
                    quoteElement.classList.remove('typewriter');
                }, 100);
            });
        });
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