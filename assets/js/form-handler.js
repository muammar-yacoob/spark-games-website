/**
 * Spark Games Form Handler v3.0
 * Uses Vercel serverless functions + Resend API (CORS-safe)
 * NO direct API calls from browser
 */

const CONTACT_EMAIL = 'support@spark-games.co.uk';
const HR_EMAIL = 'hr@spark-games.co.uk';
const CONTACT_LINK = `<a href="mailto:${CONTACT_EMAIL}" style="color: #00ccff;">${CONTACT_EMAIL}</a>`;
const HR_LINK = `<a href="mailto:${HR_EMAIL}" style="color: #00ccff;">${HR_EMAIL}</a>`;

function showMessage(title, message) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: title,
            html: message,
            icon: title.toLowerCase(),
            confirmButtonText: 'OK',
            background: '#19191a',
            color: '#fff',
            customClass: {
                popup: 'swal2-dark',
                confirmButton: 'swal2-dark'
            }
        });
    } else {
        alert(`${title}: ${message}`);
    }
}

async function submitForm(form) {
    
    // Check if we're in local development
    const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalHost) {
        // Local development - simulate success
        
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (form.id === 'application-form') {
            showMessage('Success', 'Your application has been submitted successfully! We\'ll be in touch soon. (Local development mode - form not actually sent)');
            
            // Close the modal
            const modal = document.getElementById('application-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Reset file upload UI
            const fileInfo = document.getElementById('file-info');
            if (fileInfo) {
                fileInfo.style.display = 'none';
            }
        } else {
            showMessage('Success', 'Your message has been sent successfully! Thank you for getting in touch. (Local development mode - form not actually sent)');
        }
        
        form.reset();
        return true;
    }
    
    // File validation for application forms with CV
    if (form.id === 'application-form') {
        const fileInput = form.querySelector('#cv-file');
        const file = fileInput?.files[0];
        
        if (!file) {
            showMessage('Error', 'Please attach your CV before submitting.');
            return false;
        }
        
        // CV file size limit: 3MB
        const maxSizeMB = 3;
        const fileSizeMB = file.size / (1024 * 1024);
        
        if (fileSizeMB > maxSizeMB) {
            showMessage('Error', `CV file is too large (${fileSizeMB.toFixed(1)}MB). Please compress your file to under ${maxSizeMB}MB.`);
            return false;
        }
    }
    
    const formData = new FormData(form);
    
    try {
        // Prepare data for Vercel serverless function
        const emailData = {
            formType: form.id === 'application-form' ? 'application' : 'contact',
            name: formData.get('name'),
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            message: formData.get('message'),
            job_position: formData.get('job_position'),
            portfolio: formData.get('portfolio'),
            location: formData.get('location')
        };
        
        // Handle file attachment for application forms
        if (form.id === 'application-form') {
            const fileInput = form.querySelector('#cv-file');
            const file = fileInput?.files[0];
            
            if (file) {
                // Convert file to base64
                const base64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.readAsDataURL(file);
                });
                
                emailData.cvFile = {
                    filename: file.name,
                    content: base64
                };
            }
        }
        
        
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            if (form.id === 'application-form') {
                showMessage('Success', 'Your application has been submitted successfully! We\'ll be in touch soon.');
                
                // Close the modal
                const modal = document.getElementById('application-modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Reset file upload UI
                const fileInfo = document.getElementById('file-info');
                if (fileInfo) {
                    fileInfo.style.display = 'none';
                }
            } else {
                showMessage('Success', 'Your message has been sent successfully! Thank you for getting in touch.');
            }
            
            form.reset();
            return true;
        } else {
            throw new Error(data.message || 'Email sending failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        const errorEmail = form.id === 'application-form' ? HR_LINK : CONTACT_LINK;
        showMessage('Error', `Failed to send message. Please try again or email us directly at ${errorEmail}`);
        return false;
    }
}

function setupFormListener() {
    document.addEventListener('submit', async function(event) {
        if (event.target.id === 'contact-form' || event.target.id === 'application-form') {
            event.preventDefault();
            await submitForm(event.target);
        }
    });
}

// Global function for careers application modal
window.openModal = function(button) {
    const modal = document.getElementById('application-modal');
    const modalJobTitle = document.getElementById('modal-job-title');
    const jobPositionInput = document.getElementById('job-position-input');
    
    if (!modal || !modalJobTitle || !jobPositionInput) {
        console.error('Modal elements not found:', {modal, modalJobTitle, jobPositionInput});
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
        const modalJobTitleDefault = document.getElementById('modal-job-title-default');
        const modalHeader = document.getElementById('modal-header');
        
        if (memberAvatar && memberName && modalMemberInfo && modalDefaultInfo) {
            // Keep the static welcoming message
            const memberInfoText = modalMemberInfo.querySelector('p');
            if (memberInfoText) {
                memberInfoText.textContent = "We'd love to have you aboard!";
            }
            modalMemberInfo.style.display = 'flex';
            modalDefaultInfo.style.display = 'none';
            
            // Set the team member's avatar as background of the modal header
            if (modalHeader) {
                modalHeader.style.backgroundImage = `url('${memberAvatar}')`;
                modalHeader.style.backgroundSize = 'auto 100%';
                modalHeader.style.backgroundPosition = 'top right';
                modalHeader.style.backgroundRepeat = 'no-repeat';
            }
        } else {
            modalJobTitleDefault.textContent = jobTitle;
            modalMemberInfo.style.display = 'none';
            modalDefaultInfo.style.display = 'block';
            
            // Clear background image for default state
            if (modalHeader) {
                modalHeader.style.backgroundImage = 'none';
            }
        }
        
        modal.classList.add('active');
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
            document.body.style.overflow = 'hidden';
        }
    }
};

// Word counter logic for application form
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message');
    const wordCounter = document.getElementById('word-counter');
    const wordCountSpan = document.getElementById('word-count');
    const applicationForm = document.getElementById('application-form');
    
    if (messageInput && wordCounter && wordCountSpan && applicationForm) {
        const minWords = 5;
        const maxWords = 40;
        
        function countWords(str) {
            return str.trim().split(/\s+/).filter(Boolean).length;
        }
        
        function updateWordCounter() {
            const words = countWords(messageInput.value);
            const remaining = maxWords - words;
            wordCountSpan.textContent = remaining >= 0 ? remaining : 0;
            wordCounter.innerHTML = `<span id="word-count">${remaining >= 0 ? remaining : 0}</span> words remaining (${minWords}-${maxWords} words required)`;
            
            if (words < minWords || words > maxWords) {
                wordCounter.style.color = '#ff6b6b';
                messageInput.setCustomValidity(`Please enter between ${minWords} and ${maxWords} words.`);
            } else {
                wordCounter.style.color = '#a1a1a1';
                messageInput.setCustomValidity('');
            }
        }
        
        messageInput.addEventListener('input', updateWordCounter);
        updateWordCounter();
        
        applicationForm.addEventListener('submit', function(e) {
            const words = countWords(messageInput.value);
            if (words < minWords || words > maxWords) {
                messageInput.reportValidity();
                e.preventDefault();
            }
        });
    }
    
    setupFormListener();
});