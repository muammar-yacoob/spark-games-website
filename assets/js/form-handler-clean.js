const EMAILJS_PUBLIC_KEY = 'API_KEY_PLACEHOLDER';
const serviceID = 'service_rzijtbs';
const templateID = 'template_msg1xrm';

const MESSAGES = {
    EMAIL_JS_INIT_SUCCESS: 'EmailJS initialized',
    EMAIL_JS_INIT_ERROR: 'EmailJS library not loaded. Please check your internet connection and try again.',
    EMAIL_SEND_SUCCESS: 'Email successfully sent! Thank you for your message.',
    EMAIL_SEND_ERROR: 'Failed to send email. Please try again later or contact us directly at:',
    CONTACT_EMAIL: 'support@spark-games.co.uk'
};

const CONTACT_LINK = `<a href="mailto:${MESSAGES.CONTACT_EMAIL}" style="color: #00ccff;">${MESSAGES.CONTACT_EMAIL}</a>`;

function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log(MESSAGES.EMAIL_JS_INIT_SUCCESS);
    } else {
        console.error(MESSAGES.EMAIL_JS_INIT_ERROR);
    }
}

// Global function for careers application modal
window.openModal = function(button) {
    try {
        const modal = document.getElementById('application-modal');
        const modalJobTitle = document.getElementById('modal-job-title');
        const jobPositionInput = document.getElementById('job-position-input');
        
        if (!modal || !modalJobTitle || !jobPositionInput) {
            console.error('Modal elements not found');
            return;
        }
        
        // Check if button has data attributes (for team page)
        if (button.hasAttribute('data-job-title')) {
            const jobTitle = button.getAttribute('data-job-title');
            const jobType = button.getAttribute('data-job-type');
            const memberAvatar = button.getAttribute('data-member-avatar');
            const memberName = button.getAttribute('data-member-name');
            
            modalJobTitle.textContent = jobTitle;
            jobPositionInput.value = `${jobTitle} (${jobType})`;
            
            // Show team member info if available
            const modalMemberInfo = document.getElementById('modal-member-info');
            const modalDefaultInfo = document.getElementById('modal-default-info');
            const modalMemberName = document.getElementById('modal-member-name');
            const modalHeader = document.getElementById('modal-header');
            
            if (memberAvatar && memberName && modalMemberInfo && modalDefaultInfo && modalMemberName) {
                modalMemberName.textContent = memberName;
                modalMemberInfo.style.display = 'flex';
                modalDefaultInfo.style.display = 'none';
                
                // Set the team member's avatar as background of the modal header
                if (modalHeader) {
                    modalHeader.style.backgroundImage = `url('${memberAvatar}')`;
                    modalHeader.style.backgroundSize = 'cover';
                    modalHeader.style.backgroundPosition = 'top right';
                    modalHeader.style.backgroundRepeat = 'no-repeat';
                }
            } else {
                const modalJobTitleDefault = document.getElementById('modal-job-title-default');
                if (modalJobTitleDefault) modalJobTitleDefault.textContent = jobTitle;
                if (modalMemberInfo) modalMemberInfo.style.display = 'none';
                if (modalDefaultInfo) modalDefaultInfo.style.display = 'block';
                if (modalHeader) modalHeader.style.backgroundImage = 'none';
            }
            
            modal.classList.add('active');
            modal.style.display = 'flex';
            modal.style.zIndex = '9999';
            document.body.style.overflow = 'hidden';
            return;
        }
        
        // Fall back to job posting structure (for careers page)
        const posting = button.closest('.job-posting');
        if (posting) {
            const jobTitle = posting.querySelector('h3');
            const jobType = posting.querySelector('div[style*="color: #9bf1ff"]');
            
            if (jobTitle && jobType) {
                modalJobTitle.textContent = jobTitle.textContent;
                jobPositionInput.value = `${jobTitle.textContent} (${jobType.textContent})`;
                
                modal.classList.add('active');
                modal.style.display = 'flex';
                modal.style.zIndex = '9999';
                document.body.style.overflow = 'hidden';
            }
        }
    } catch (error) {
        console.error('Error in openModal:', error);
    }
};

// Rest of the file continues with email handling and form validation...