// Store quotes globally for typewriter effect
let memberQuotes = {};

// Link type icons and labels
const linkTypes = {
    playstore: { icon: 'fab fa-google-play', label: 'Play Store', badge: true },
    appstore: { icon: 'fab fa-apple', label: 'App Store', badge: true },
    chrome: { icon: 'fab fa-chrome', label: 'Chrome Store' },
    github: { icon: 'fab fa-github', label: 'GitHub' },
    unity: { icon: 'fas fa-cube', label: 'Asset Store' },
    blender: { icon: 'fas fa-cube', label: 'Blender Market' },
    itch: { icon: 'fab fa-itch-io', label: 'itch.io' },
    website: { icon: 'fas fa-globe', label: 'Website' }
};

document.addEventListener('DOMContentLoaded', function() {
    updateSeasonalBanner();

    // Load products from JSON
    loadProductsFromJSON();

    // Load about content
    fetch('about-content.html')
        .then(response => response.text())
        .then(data => {
            const aboutContent = document.getElementById('about-content');
            if (aboutContent) aboutContent.innerHTML = data;
        })
        .catch(error => console.error('Error loading about content:', error));

    // Add placeholder immediately for team
    const teamContentDiv = document.getElementById('team-content');
    if (teamContentDiv) {
        teamContentDiv.innerHTML = '<p style="text-align: center; color: #9bf1ff;">Loading team members...</p>';
    }

    // Load team content from JSON
    setTimeout(() => {
        loadTeamContentFromJSON();
    }, 100);
});

// Load products from JSON file
async function loadProductsFromJSON() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // Render each category
        data.categories.forEach(category => {
            const contentDiv = document.getElementById(`${category.id}-content`);
            if (contentDiv) {
                renderCategoryContent(category, contentDiv);
            }
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Render category content
function renderCategoryContent(category, container) {
    if (!category.items || category.items.length === 0) {
        container.innerHTML = `
            <div class="empty-category">
                <i class="fas ${category.icon}"></i>
                <p>Coming soon...</p>
            </div>
        `;
        return;
    }

    const itemsHtml = category.items.map(item => renderProductCard(item, category.id)).join('');

    container.innerHTML = itemsHtml;
}

// Render standard product card
function renderProductCard(item, categoryId) {
    const primaryLink = Object.entries(item.links)[0];
    const linkUrl = primaryLink ? primaryLink[1] : '#';

    const linksHtml = Object.entries(item.links).map(([type, url]) => {
        const linkInfo = linkTypes[type] || { icon: 'fas fa-link', label: type };
        return `<a href="${url}" target="_blank" rel="noopener" class="product-link">
            <i class="${linkInfo.icon}"></i> ${linkInfo.label}
        </a>`;
    }).join('');

    return `
        <div class="product-card" id="${item.id}">
            <a href="${linkUrl}" target="_blank" rel="noopener" class="image-wrapper">
                <img src="${item.icon}" alt="${item.name}" loading="lazy">
            </a>
            <div class="content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="product-links">
                    ${linksHtml}
                </div>
            </div>
        </div>
    `;
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



        // Store quotes for this member
        const quotes = member.quotes && Array.isArray(member.quotes) && member.quotes.length > 0
            ? member.quotes
            : member.quote
                ? [member.quote]
                : ["No quote available"];

        memberQuotes[index] = quotes;

        const vacancyBanner = member.isVacancy ? '<div class="vacancy-banner"></div>' : '';

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

function updateSeasonalBanner() {
    // Your existing updateSeasonalBanner function here
}
