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

function sendEmail(event) {
    event.preventDefault();
    
    if (typeof emailjs === 'undefined') {
        showMessage('Error', `${MESSAGES.EMAIL_SEND_ERROR} ${CONTACT_LINK}`);
        return;
    }

    const form = event.target;
    const isApplicationForm = form.id === 'application-form';
    
    // Handle application form with CV
    if (isApplicationForm) {
        const fileInput = form.querySelector('#cv-file');
        const file = fileInput?.files[0];
        
        if (!file) {
            showMessage('Error', 'Please attach your CV before submitting.');
            return;
        }
        
        // Check file size (reasonable limit for CVs)
        const maxSizeMB = 1.5;
        const fileSizeMB = file.size / (1024 * 1024);
        
        if (fileSizeMB > maxSizeMB) {
            showMessage('Error', `CV file is too large (${fileSizeMB.toFixed(1)}MB). Please compress your file to under ${maxSizeMB}MB.`);
            return;
        }
        
        // Convert file to base64 and send
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64 = e.target.result.split(',')[1];
            
            const templateParams = {
                user_name: form.full_name.value,
                user_email: form.email.value,
                message: form.message.value,
                job_position: form.job_position.value,
                portfolio: form.portfolio.value || 'Not provided',
                location: form.location.value || 'Not specified',
                cv_filename: file.name,
                cv_content: base64
            };

            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    showMessage('Success', 'Your application has been submitted successfully! We\'ll be in touch soon.');
                    form.reset();
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
                })
                .catch(function(error) {
                    console.error('Failed to send application:', error);
                    
                    // Check if it's a file size error from EmailJS
                    if (error.text && error.text.includes('Variables size limit')) {
                        showMessage('Error', `Your CV file is too large for our online form. Please email your application directly to ${CONTACT_LINK} with your CV attached.`);
                    } else {
                        showMessage('Error', `Failed to submit application. Please try again or email us directly at ${CONTACT_LINK}`);
                    }
                });
        };
        
        reader.readAsDataURL(file);
    } else {
        // Handle regular contact form
        const templateParams = {
            user_name: form.user_name.value,
            user_email: form.user_email.value,
            message: form.message.value
        };

        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                showMessage('Success', MESSAGES.EMAIL_SEND_SUCCESS);
                form.reset();
            })
            .catch(function(error) {
                console.error('Failed to send email:', error);
                showMessage('Error', `${MESSAGES.EMAIL_SEND_ERROR} ${CONTACT_LINK}`);
            });
    }
}


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

function setupFormListener() {
    document.addEventListener('submit', function(event) {
        if (event.target.id === 'contact-form' || event.target.id === 'application-form') {
            sendEmail(event);
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
            // Update the text in modal-member-info to show member name
            const memberInfoText = modalMemberInfo.querySelector('p');
            if (memberInfoText) {
                memberInfoText.textContent = `Join ${memberName}'s team!`;
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

// --- Application form word counter logic ---
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message');
    const wordCounter = document.getElementById('word-counter');
    const wordCountSpan = document.getElementById('word-count');
    const applicationForm = document.getElementById('application-form');
    if (messageInput && wordCounter && wordCountSpan && applicationForm) {
        const minWords = 5;
        const maxWords = 40;
        function countWords(str) {
            // Split by whitespace, filter out empty strings
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
});

initEmailJS();
document.addEventListener('DOMContentLoaded', setupFormListener);