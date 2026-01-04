// Store quotes globally for typewriter effect
let memberQuotes = {};

// Store badge SVGs
const storeBadges = {
    playstore: `<svg viewBox="0 0 135 40" width="120" height="36">
        <rect width="135" height="40" rx="5" fill="#000"/>
        <path d="M47.418 10.24c0 .87-.26 1.56-.78 2.07-.59.62-1.35.93-2.29.93-.9 0-1.66-.31-2.29-.94-.63-.63-.95-1.39-.95-2.29s.32-1.66.95-2.29c.63-.63 1.39-.94 2.29-.94.45 0 .88.09 1.29.26.41.17.74.41.98.7l-.55.55c-.4-.48-.95-.72-1.72-.72-.65 0-1.22.23-1.7.68-.48.45-.72 1.04-.72 1.76s.24 1.31.72 1.76c.48.45 1.05.68 1.7.68.7 0 1.28-.23 1.74-.68.3-.3.47-.71.51-1.24h-2.25v-.76h3.01c.03.17.04.33.04.48z" fill="#fff"/>
        <path d="M52.038 7.54h-2.8v1.91h2.52v.76h-2.52v1.91h2.8v.78h-3.58v-6.13h3.58v.77z" fill="#fff"/>
        <path d="M55.468 12.9h-.78v-5.36h-1.71v-.77h4.2v.77h-1.71v5.36z" fill="#fff"/>
        <path d="M60.388 12.9v-6.13h.78v6.13h-.78z" fill="#fff"/>
        <path d="M64.578 12.9h-.78v-5.36h-1.71v-.77h4.2v.77h-1.71v5.36z" fill="#fff"/>
        <path d="M73.688 12.12c-.62.63-1.38.94-2.28.94s-1.66-.31-2.28-.94c-.62-.63-.93-1.39-.93-2.29s.31-1.66.93-2.29c.62-.63 1.38-.94 2.28-.94s1.66.31 2.28.94c.62.63.94 1.39.94 2.29s-.32 1.66-.94 2.29zm-3.96-.53c.46.46 1.02.69 1.68.69s1.22-.23 1.68-.69c.46-.46.69-1.05.69-1.76s-.23-1.3-.69-1.76c-.46-.46-1.02-.68-1.68-.68s-1.22.23-1.68.68c-.46.46-.68 1.05-.68 1.76s.22 1.3.68 1.76z" fill="#fff"/>
        <path d="M75.898 12.9v-6.13h.95l2.94 4.77v-4.77h.78v6.13h-.81l-3.08-4.95v4.95h-.78z" fill="#fff"/>
        <path d="M68.135 21.75c-2.43 0-4.41 1.84-4.41 4.39s1.98 4.39 4.41 4.39 4.41-1.84 4.41-4.39-1.98-4.39-4.41-4.39zm0 7.06c-1.33 0-2.48-1.1-2.48-2.67s1.15-2.67 2.48-2.67 2.48 1.1 2.48 2.67-1.15 2.67-2.48 2.67zm-9.63-7.06c-2.43 0-4.41 1.84-4.41 4.39s1.98 4.39 4.41 4.39 4.41-1.84 4.41-4.39-1.98-4.39-4.41-4.39zm0 7.06c-1.33 0-2.48-1.1-2.48-2.67s1.15-2.67 2.48-2.67 2.48 1.1 2.48 2.67-1.15 2.67-2.48 2.67zm-11.46-5.71v1.86h4.46c-.13 1.04-.48 1.81-1.02 2.35-.65.65-1.67 1.36-3.44 1.36-2.74 0-4.89-2.21-4.89-4.95s2.15-4.95 4.89-4.95c1.48 0 2.56.58 3.36 1.33l1.31-1.31c-1.11-1.07-2.59-1.88-4.67-1.88-3.76 0-6.92 3.06-6.92 6.82s3.16 6.82 6.92 6.82c2.03 0 3.56-.67 4.75-1.91 1.23-1.23 1.61-2.96 1.61-4.36 0-.43-.03-.83-.1-1.17h-6.26zm46.83 1.45c-.37-.99-1.49-2.81-3.78-2.81-2.27 0-4.16 1.79-4.16 4.39 0 2.46 1.87 4.39 4.38 4.39 2.02 0 3.19-1.24 3.68-1.95l-1.51-1.01c-.5.74-1.19 1.23-2.17 1.23s-1.68-.45-2.13-1.33l5.87-2.43-.18-.48zm-5.99 1.47c-.05-1.7 1.32-2.57 2.3-2.57.77 0 1.42.38 1.64.93l-3.94 1.64zm-4.78 4.25h1.93v-12.85h-1.93v12.85zm-3.16-7.5h-.07c-.44-.52-1.27-1-2.33-1-2.21 0-4.24 1.95-4.24 4.45s2.03 4.38 4.24 4.38c1.06 0 1.89-.48 2.33-1.01h.07v.64c0 1.7-.91 2.61-2.37 2.61-1.19 0-1.93-.86-2.24-1.59l-1.68.7c.49 1.19 1.8 2.64 3.92 2.64 2.28 0 4.21-1.34 4.21-4.62v-7.96h-1.84v.76zm-2.24 6.13c-1.33 0-2.44-1.12-2.44-2.65s1.11-2.69 2.44-2.69 2.37 1.14 2.37 2.69-1.04 2.65-2.37 2.65zm25.42-11.53h-4.62v12.85h1.93v-4.87h2.69c2.13 0 4.24-1.55 4.24-4.05s-2.11-3.93-4.24-3.93zm.05 6.28h-2.74v-4.46h2.74c1.44 0 2.25 1.19 2.25 2.23 0 1.02-.81 2.23-2.25 2.23zm11.9-1.87c-1.39 0-2.84.61-3.44 1.96l1.71.71c.37-.71 1.05-.94 1.77-.94 1.01 0 2.03.6 2.05 1.67v.13c-.35-.2-1.1-.5-2.03-.5-1.86 0-3.75 1.02-3.75 2.93 0 1.74 1.53 2.87 3.25 2.87 1.31 0 2.04-.59 2.49-1.28h.07v1.01h1.86v-5c0-2.31-1.73-3.56-3.98-3.56zm-.24 7.14c-.64 0-1.53-.32-1.53-1.11 0-1.01 1.11-1.4 2.07-1.4.86 0 1.26.19 1.78.44-.15 1.22-1.19 2.07-2.32 2.07zm10.91-6.86l-2.21 5.6h-.07l-2.29-5.6h-2.08l3.44 7.84-1.96 4.36h2.01l5.31-12.2h-2.15zm-17.42 8.27h1.93v-12.85h-1.93v12.85z" fill="#fff"/>
        <path d="M10.435 7.54c-.29.3-.46.76-.46 1.34v22.24c0 .58.17 1.04.46 1.34l.07.07 12.46-12.46v-.29l-12.46-12.46-.07.07z" fill="#32bbff"/>
        <path d="M27.135 24.22l-4.15-4.15v-.29l4.15-4.15.09.05 4.92 2.8c1.41.8 1.41 2.1 0 2.9l-4.92 2.8-.09.04z" fill="#fadc04"/>
        <path d="M27.225 24.17l-4.24-4.24-12.53 12.53c.47.49 1.23.55 2.1.06l14.67-8.35" fill="#ed3939"/>
        <path d="M27.225 15.83l-14.67-8.35c-.87-.49-1.63-.43-2.1.06l12.53 12.53 4.24-4.24z" fill="#79d6b5"/>
    </svg>`,
    appstore: `<svg viewBox="0 0 135 40" width="120" height="36">
        <rect width="135" height="40" rx="5" fill="#000"/>
        <path d="M30.128 19.784c-.03-3.223 2.639-4.791 2.761-4.864-1.511-2.203-3.853-2.504-4.676-2.528-1.967-.207-3.875 1.177-4.877 1.177-1.022 0-2.565-1.157-4.228-1.123-2.14.033-4.142 1.272-5.24 3.196-2.266 3.923-.576 9.688 1.595 12.859 1.086 1.553 2.355 3.287 4.016 3.226 1.625-.067 2.232-1.036 4.193-1.036 1.943 0 2.513 1.036 4.207.997 1.744-.028 2.842-1.56 3.89-3.127 1.255-1.78 1.759-3.533 1.779-3.623-.041-.014-3.387-1.291-3.42-5.154zM26.928 10.306c.874-1.093 1.472-2.58 1.306-4.089-1.265.056-2.847.875-3.758 1.944-.806.942-1.526 2.486-1.34 3.938 1.421.106 2.88-.717 3.792-1.793z" fill="#fff"/>
        <path d="M53.645 31.504h-2.271l-1.244-3.909h-4.324l-1.185 3.909h-2.211l4.284-13.308h2.646l4.305 13.308zm-3.89-5.549l-1.125-3.475c-.119-.355-.342-1.191-.671-2.507h-.04c-.131.566-.342 1.402-.632 2.507l-1.105 3.475h3.573z" fill="#fff"/>
        <path d="M64.662 26.588c0 1.632-.441 2.922-1.323 3.869-.792.85-1.775 1.274-2.948 1.274-1.264 0-2.172-.454-2.725-1.362h-.04v5.055h-2.132v-10.37c0-1.026-.027-2.079-.079-3.159h1.875l.119 1.521h.04c.711-1.146 1.79-1.718 3.238-1.718 1.133 0 2.077.447 2.83 1.343.755.896 1.145 2.074 1.145 3.547zm-2.172.078c0-.934-.212-1.704-.632-2.31-.461-.632-1.08-.948-1.856-.948-.526 0-1.004.176-1.431.523-.428.35-.708.807-.839 1.373-.066.264-.099.48-.099.65v1.6c0 .698.214 1.287.642 1.768.428.48.984.721 1.668.721.803 0 1.428-.31 1.875-.928.448-.619.672-1.441.672-2.449z" fill="#fff"/>
        <path d="M75.699 26.588c0 1.632-.441 2.922-1.324 3.869-.792.85-1.774 1.274-2.948 1.274-1.263 0-2.172-.454-2.724-1.362h-.04v5.055h-2.132v-10.37c0-1.026-.027-2.079-.079-3.159h1.875l.119 1.521h.04c.71-1.146 1.789-1.718 3.238-1.718 1.132 0 2.076.447 2.83 1.343.753.896 1.145 2.074 1.145 3.547zm-2.172.078c0-.934-.211-1.704-.631-2.31-.461-.632-1.078-.948-1.856-.948-.527 0-1.004.176-1.432.523-.428.35-.707.807-.838 1.373-.065.264-.099.48-.099.65v1.6c0 .698.214 1.287.64 1.768.428.48.984.721 1.668.721.803 0 1.428-.31 1.876-.928.448-.619.672-1.441.672-2.449z" fill="#fff"/>
        <path d="M88.039 27.772c0 1.132-.393 2.053-1.182 2.764-.867.777-2.074 1.165-3.625 1.165-1.432 0-2.58-.276-3.446-.829l.494-1.777c.934.566 1.962.85 3.08.85.803 0 1.428-.182 1.877-.544.448-.362.672-.848.672-1.454 0-.54-.186-.996-.553-1.364-.369-.369-.98-.711-1.836-1.028-2.33-.855-3.494-2.107-3.494-3.756 0-1.093.405-1.99 1.215-2.693.808-.703 1.883-1.054 3.22-1.054 1.198 0 2.193.209 2.988.631l-.533 1.738c-.742-.408-1.58-.612-2.514-.612-.75 0-1.336.185-1.756.553-.355.329-.533.73-.533 1.205 0 .526.203.961.612 1.303.355.315 1 .658 1.934 1.027 1.145.461 1.986 1 2.521 1.618.535.619.849 1.39.859 2.257z" fill="#fff"/>
        <path d="M95.088 23.508h-2.35v4.659c0 1.185.414 1.777 1.244 1.777.381 0 .697-.033.947-.099l.059 1.619c-.42.157-.973.236-1.658.236-.842 0-1.5-.257-1.975-.77-.473-.514-.711-1.376-.711-2.587v-4.837h-1.4v-1.6h1.4v-1.757l2.094-.631v2.389h2.35v1.601z" fill="#fff"/>
        <path d="M105.691 26.627c0 1.475-.422 2.686-1.264 3.633-.882.975-2.055 1.461-3.516 1.461-1.408 0-2.529-.467-3.365-1.401-.836-.935-1.254-2.112-1.254-3.534 0-1.487.43-2.705 1.293-3.652.862-.948 2.024-1.422 3.484-1.422 1.408 0 2.541.467 3.396 1.402.818.907 1.226 2.078 1.226 3.513zm-2.212.069c0-.885-.189-1.644-.574-2.277-.447-.766-1.086-1.148-1.914-1.148-.857 0-1.508.383-1.955 1.148-.385.634-.572 1.405-.572 2.317 0 .885.189 1.644.572 2.276.461.766 1.105 1.148 1.936 1.148.814 0 1.453-.39 1.914-1.168.396-.645.593-1.412.593-2.296z" fill="#fff"/>
        <path d="M112.621 23.783c-.211-.039-.436-.059-.672-.059-.75 0-1.33.283-1.738.85-.355.5-.533 1.132-.533 1.895v5.035h-2.131l.02-6.574c0-1.106-.027-2.113-.08-3.021h1.857l.078 1.836h.059c.225-.631.58-1.139 1.066-1.52.475-.342.99-.514 1.541-.514.197 0 .375.014.533.039v1.033z" fill="#fff"/>
        <path d="M122.156 26.252c0 .382-.025.703-.078.967h-6.396c.025.948.334 1.673.928 2.173.539.447 1.236.671 2.092.671.947 0 1.811-.151 2.588-.454l.334 1.48c-.908.395-1.98.593-3.217.593-1.488 0-2.656-.438-3.506-1.313-.848-.875-1.273-2.05-1.273-3.524 0-1.447.395-2.652 1.186-3.613.828-1.026 1.947-1.539 3.355-1.539 1.383 0 2.43.513 3.139 1.539.563.815.848 1.823.848 3.02zm-2.033-.553c.014-.632-.125-1.178-.414-1.639-.369-.593-.936-.889-1.699-.889-.697 0-1.264.289-1.697.869-.355.461-.566 1.014-.631 1.658h4.441z" fill="#fff"/>
        <path d="M49.05 10.009c0 1.177-.353 2.063-1.058 2.658-.66.553-1.593.83-2.8.83-.6 0-1.114-.025-1.544-.078v-6.56c.553-.092 1.151-.138 1.8-.138 1.145 0 2.008.255 2.588.766.644.566.966 1.378 1.014 2.522z" fill="#fff"/>
        <path d="M54.91 11.037c0 .738-.211 1.343-.632 1.817-.441.487-1.027.73-1.758.73-.704 0-1.265-.233-1.682-.7-.418-.468-.627-1.057-.627-1.768 0-.743.215-1.353.646-1.827.432-.474 1.013-.711 1.742-.711.704 0 1.271.233 1.698.7.41.454.613 1.039.613 1.759z" fill="#fff"/>
        <path d="M62.784 8.442l-1.503 4.809h-.967l-.623-2.107c-.158-.526-.289-1.049-.392-1.569h-.019c-.098.533-.223 1.056-.375 1.569l-.662 2.107h-.978l-1.415-4.809h1.078l.543 2.298c.131.533.241 1.052.328 1.559h.02c.085-.435.217-.952.397-1.549l.681-2.308h.858l.652 2.258c.158.553.287 1.085.387 1.599h.03c.072-.5.181-1.032.328-1.599l.583-2.258h1.049z" fill="#fff"/>
        <path d="M68.17 13.251h-1.047v-2.756c0-.849-.322-1.273-.967-1.273-.316 0-.572.116-.769.349-.196.233-.295.506-.295.822v2.858h-1.047v-3.434c0-.423-.013-.882-.039-1.375h.917l.049.751h.029c.131-.234.321-.426.573-.578.295-.177.627-.266.994-.266.461 0 .844.149 1.149.446.381.362.571.902.571 1.619l-.118 2.837z" fill="#fff"/>
        <path d="M71.398 13.251h-1.047v-7.023h1.047v7.023z" fill="#fff"/>
        <path d="M77.484 11.037c0 .738-.211 1.343-.631 1.817-.441.487-1.027.73-1.758.73-.704 0-1.265-.233-1.682-.7-.418-.468-.627-1.057-.627-1.768 0-.743.214-1.353.646-1.827.431-.474 1.012-.711 1.742-.711.704 0 1.27.233 1.697.7.409.454.613 1.039.613 1.759z" fill="#fff"/>
        <path d="M82.62 13.251h-.938l-.078-.543h-.029c-.322.434-.782.651-1.38.651-.447 0-.807-.144-1.078-.434-.244-.263-.366-.593-.366-.986 0-.592.247-1.043.742-1.354.495-.311 1.19-.463 2.085-.456v-.088c0-.621-.327-.931-.981-.931-.465 0-.875.117-1.228.349l-.216-.69c.436-.271.975-.405 1.612-.405 1.228 0 1.843.648 1.843 1.943v1.728c0 .468.023.841.07 1.118l.042.098z" fill="#fff"/>
        <path d="M88.358 13.251h-.927l-.049-.76h-.029c-.297.579-.808.868-1.533.868-.578 0-1.059-.228-1.44-.681-.382-.454-.573-1.032-.573-1.738 0-.752.206-1.364.617-1.837.397-.44.88-.66 1.445-.66.646 0 1.089.215 1.326.645h.02v-2.86h1.049v5.707c0 .483.014.927.044 1.316h.05z" fill="#fff"/>
        <text x="44" y="9" fill="#fff" font-size="4.5" font-family="Arial, sans-serif">Coming Soon</text>
    </svg>`
};

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

    const isMobileApps = category.id === 'mobile-apps';

    const itemsHtml = category.items.map(item => {
        if (isMobileApps) {
            return renderMobileAppCard(item, category.id);
        }
        return renderProductCard(item, category.id);
    }).join('');

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

// Render mobile app card with store badges
function renderMobileAppCard(item, categoryId) {
    const shareUrl = `https://spark-games.co.uk/apps/${item.id}.html`;

    let badgesHtml = '';

    if (item.links.playstore) {
        badgesHtml += `<a href="${item.links.playstore}" target="_blank" rel="noopener" class="store-badge" aria-label="Get it on Google Play">${storeBadges.playstore}</a>`;
    }

    if (item.links.appstore) {
        badgesHtml += `<a href="${item.links.appstore}" target="_blank" rel="noopener" class="store-badge" aria-label="Download on the App Store">${storeBadges.appstore}</a>`;
    }

    return `
        <div class="product-card app-card-modern" id="${item.id}">
            <div class="app-icon-wrapper">
                <img src="${item.icon}" alt="${item.name}" class="app-icon" loading="lazy">
            </div>
            <div class="app-info">
                <h3>${item.name}
                    <a href="${shareUrl}" class="share-btn-inline" title="Share this app" target="_blank">
                        <i class="fas fa-share-alt"></i>
                    </a>
                </h3>
                <p>${item.description}</p>
                <div class="store-badges">
                    ${badgesHtml}
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
