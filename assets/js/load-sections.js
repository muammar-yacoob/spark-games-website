// Store quotes globally for typewriter effect
let memberQuotes = {};

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
    
    // Add placeholder immediately
    const teamContentDiv = document.getElementById('team-content');
    if (teamContentDiv) {
        teamContentDiv.innerHTML = '<p style="text-align: center; color: #9bf1ff;">Loading team members...</p>';
    }
    
    // Load team content from JSON
    async function loadTeamContentFromJSON() {
        try {
            const response = await fetch('team.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const teamContentDiv = document.getElementById('team-content');
            
            if (teamContentDiv) {
                renderTeamMembersForIndex(data.team, teamContentDiv);
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
                `<div style="margin-top: 32px;">
                    <button class="apply-button" onclick="window.openModal && window.openModal(this)" data-job-title="${member.role}" data-job-type="${member.jobType || 'Full-time • Remote'}" data-member-avatar="${member.avatar}" data-member-name="${member.name}">
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
        const teamMembers = document.querySelectorAll('.team-member');
        
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
        loadTeamContentFromJSON();
    }, 100);
});

function updateSeasonalBanner() {
    // Your existing updateSeasonalBanner function here
}