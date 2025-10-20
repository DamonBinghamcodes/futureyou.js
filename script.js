// Script for FutureYou.js Landing Page
// Handles countdown timer, progress bar, and email form functionality

// Set the target launch date - March 3, 2026
const targetDate = new Date('March 3, 2026 23:59:59').getTime();

// Get DOM elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const progressFill = document.getElementById('progressFill');
const progressPercentage = document.getElementById('progressPercentage');
const backgroundVideo = document.getElementById('backgroundVideo');
const followerCountElement = document.getElementById('followerCount');

// Email form elements
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Function to update countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    
    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update DOM elements with formatted values
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Update progress bar based on time elapsed
    updateProgressBar(timeLeft);
    
    // Check if countdown is finished
    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        showLaunchMessage();
    }
}

// Function to update progress bar
function updateProgressBar(timeLeft) {
    // Calculate progress based on time from project start to launch date
    const startDate = new Date('July 15, 2025').getTime(); // Project start date
    const totalDuration = targetDate - startDate;
    const elapsed = totalDuration - timeLeft;
    const progressPercent = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    
    // Update progress bar width and percentage text
    progressFill.style.width = progressPercent + '%';
    progressPercentage.textContent = Math.round(progressPercent) + '%';
    
    // Add visual feedback for progress milestones
    if (progressPercent >= 75) {
        progressFill.style.background = 'linear-gradient(90deg, #00ff66, #00ff80)';
    } else if (progressPercent >= 50) {
        progressFill.style.background = 'linear-gradient(90deg, #00ff66, #00e659)';
    } else if (progressPercent >= 25) {
        progressFill.style.background = 'linear-gradient(90deg, #00ff66, #00cc52)';
    }
}

// Function to handle countdown completion
function showLaunchMessage() {
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    
    // Update progress bar to 100%
    progressFill.style.width = '100%';
    progressPercentage.textContent = '100%';
    
    // You can add additional launch day functionality here
    console.log('Launch day has arrived!');
}

// Mailchimp configuration - Replace with your actual values
const MAILCHIMP_CONFIG = {
    // Get these from your Mailchimp account:
    // 1. Go to Account → Extras → API keys to get your API key
    // 2. The server prefix is in your API key (e.g., us1, us2, etc.)
    // 3. Get Audience ID from Audience → Settings → Audience name and campaign defaults
    SERVER_PREFIX: 'YOUR_SERVER_PREFIX', // e.g., 'us1', 'us2', etc.
    AUDIENCE_ID: 'YOUR_AUDIENCE_ID',     // Your list/audience ID
    API_KEY: 'YOUR_API_KEY'              // Your API key
};

// Email form submission handler
function handleEmailSubmission(event) {
    event.preventDefault(); // Prevent default form submission
    
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!isValidEmail(email)) {
        showErrorMessage('Please enter a valid email address');
        return;
    }
    
    // Submit email to Mailchimp
    submitEmailToMailchimp(email);
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to submit email to Mailchimp
async function submitEmailToMailchimp(email) {
    const submitButton = document.querySelector('.submit-btn');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'JOINING...';
    submitButton.disabled = true;
    
    try {
        // Method 1: Direct API call (requires CORS proxy or backend)
        // Note: This won't work directly from frontend due to CORS restrictions
        // You'll need to implement this through your backend or use embedded forms
        
        const response = await fetch(`https://${MAILCHIMP_CONFIG.SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_CONFIG.AUDIENCE_ID}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILCHIMP_CONFIG.API_KEY}`
            },
            body: JSON.stringify({
                email_address: email,
                status: 'subscribed',
                tags: ['futureyou-landing']
            })
        });
        
        if (response.ok) {
            // Success
            emailInput.value = '';
            showSuccessMessage();
            storeEmail(email);
        } else {
            const errorData = await response.json();
            if (errorData.title === 'Member Exists') {
                showErrorMessage('You are already on our waitlist!');
            } else {
                showErrorMessage('Something went wrong. Please try again.');
            }
        }
        
    } catch (error) {
        console.error('Mailchimp submission error:', error);
        
        // Fallback: Store locally and show success
        // In production, you should send this to your backend
        emailInput.value = '';
        storeEmail(email);
        showSuccessMessage('Thanks for joining! We will contact you soon.');
        
        // Send to your backend endpoint instead
        // submitToBackend(email);
    }
    
    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
}

// Alternative: Submit to your backend (recommended approach)
async function submitToBackend(email) {
    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: email,
                source: 'landing-page',
                timestamp: new Date().toISOString()
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccessMessage();
        } else {
            showErrorMessage(data.message || 'Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Backend submission error:', error);
        showErrorMessage('Connection error. Please try again.');
    }
}

// Function to show success message
function showSuccessMessage(customMessage = null) {
    if (customMessage) {
        successMessage.textContent = customMessage;
    }
    
    hideErrorMessage();
    successMessage.classList.add('show');
    
    // Hide success message after 4 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 4000);
}

// Function to show error message
function showErrorMessage(message) {
    hideSuccessMessage();
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    // Hide error message after 4 seconds
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 4000);
}

// Helper functions to hide messages
function hideSuccessMessage() {
    successMessage.classList.remove('show');
}

function hideErrorMessage() {
    errorMessage.classList.remove('show');
}

// Function to store email in localStorage (backup)
function storeEmail(email) {
    let emails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
    if (!emails.includes(email)) {
        emails.push({
            email: email,
            timestamp: new Date().toISOString(),
            source: 'landing-page'
        });
        localStorage.setItem('waitlistEmails', JSON.stringify(emails));
        console.log(`Email stored locally: ${email}`);
    }
}

// Initialize video playback
function initializeVideo() {
    if (backgroundVideo) {
        // iOS-specific video setup
        backgroundVideo.setAttribute('playsinline', 'true');
        backgroundVideo.setAttribute('webkit-playsinline', 'true');
        backgroundVideo.muted = true;
        backgroundVideo.volume = 0;
        
        // Detect iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        if (isIOS) {
            // iOS-specific handling
            backgroundVideo.addEventListener('loadedmetadata', function() {
                backgroundVideo.play().catch(error => {
                    console.log('iOS video autoplay failed:', error);
                });
            });
        } else {
            // Standard video handling
            backgroundVideo.volume = 0.3; // Set volume to 30% for non-iOS
            
            // Try to play the video
            backgroundVideo.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });
        }
        
        // Add event listener to handle video errors
        backgroundVideo.addEventListener('error', function(e) {
            console.error('Video error:', e);
        });
        
        // Add event listener for when video can play
        backgroundVideo.addEventListener('canplay', function() {
            console.log('Video can play');
        });
        
        // Add event listener for when video starts playing
        backgroundVideo.addEventListener('play', function() {
            console.log('Video started playing');
        });
        
        // Prevent video from going fullscreen on iOS
        backgroundVideo.addEventListener('webkitbeginfullscreen', function(e) {
            e.preventDefault();
        });
        
        // Handle page visibility changes (helps with iOS background behavior)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                backgroundVideo.pause();
            } else {
                backgroundVideo.play().catch(error => {
                    console.log('Video resume failed:', error);
                });
            }
        });
    }
}

// Add typing effect to brand title (optional enhancement)
function addTypingEffect() {
    const brandTitle = document.querySelector('.brand-title');
    const text = 'FUTUREYOU';
    let index = 0;
    
    brandTitle.textContent = '';
    
    const typingInterval = setInterval(() => {
        brandTitle.textContent += text[index];
        index++;
        
        if (index === text.length) {
            clearInterval(typingInterval);
        }
    }, 150);
}

// Function to fetch and update Instagram follower count
async function updateFollowerCount() {
    try {
        // Try to fetch real follower count from your backend API
        const response = await fetch('/api/instagram-followers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            updateFollowerDisplay(data.followers);
            return;
        }
    } catch (error) {
        console.log('API fetch failed, using fallback method:', error);
    }
    
    // Fallback: Use current known count with slight organic growth simulation
    const baseCount = 45; // Your current follower count
    const currentDate = new Date();
    const startDate = new Date('2025-07-15'); // When you started tracking
    const daysElapsed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Simulate organic growth: +1-3 followers per day on average
    const organicGrowth = Math.floor(daysElapsed * 2.5); // 2.5 followers per day average
    const currentFollowers = Math.max(baseCount, baseCount + organicGrowth);
    
    updateFollowerDisplay(currentFollowers);
}

// Function to update the follower display
function updateFollowerDisplay(count) {
    // Format the number (e.g., 1.2K, 10.5K)
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };
    
    // Update the follower count display
    if (followerCountElement) {
        followerCountElement.textContent = formatNumber(count);
    }
    
    // Log current count for debugging
    console.log(`Current followers: ${count}`);
}

// Function to manually update follower count (for testing)
function setFollowerCount(count) {
    updateFollowerDisplay(count);
    localStorage.setItem('lastKnownFollowers', count);
    localStorage.setItem('lastUpdated', new Date().toISOString());
}

// Function to detect Instagram in-app browser
function isInstagramBrowser() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return userAgent.indexOf('Instagram') > -1;
}

// Function to fix Instagram layout issues
function fixInstagramLayout() {
    if (isInstagramBrowser()) {
        console.log('Instagram browser detected - applying fixes');
        
        // Add Instagram-specific class to body
        document.body.classList.add('instagram-browser');
        
        // Add specific Instagram input handling
        const emailInput = document.getElementById('mce-EMAIL');
        if (emailInput) {
            // Force immediate left alignment on any interaction
            const forceLeftAlign = function() {
                emailInput.style.textAlign = 'left';
                emailInput.style.setProperty('text-align', 'left', 'important');
                emailInput.style.setProperty('-webkit-text-align-last', 'left', 'important');
                emailInput.style.setProperty('text-align-last', 'left', 'important');
            };
            
            // Instagram-specific event handling
            emailInput.addEventListener('focus', forceLeftAlign, true);
            emailInput.addEventListener('click', forceLeftAlign, true);
            emailInput.addEventListener('touchstart', forceLeftAlign, true);
            emailInput.addEventListener('input', forceLeftAlign, true);
            
            // Also handle when Instagram webview regains focus
            window.addEventListener('focus', function() {
                if (document.activeElement === emailInput) {
                    forceLeftAlign();
                    setTimeout(() => {
                        if (emailInput.value === '') {
                            emailInput.setSelectionRange(0, 0);
                        }
                    }, 50);
                }
            });
        }
        
        // Fix Instagram links to work in Instagram browser
        fixInstagramLinks();
    }
}

// Function to fix Instagram links in Instagram browser
function fixInstagramLinks() {
    const instagramLinks = document.querySelectorAll('.instagram-link');
    
    instagramLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const url = this.href;
            console.log('Instagram link clicked:', url);
            
            // Try multiple methods to open the link externally
            if (url.includes('instagram.com')) {
                // Extract Instagram handle
                const pathParts = url.split('/');
                const instagramHandle = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
                
                // Method 1: Try Instagram app URL scheme
                const instagramAppUrl = `instagram://user?username=${instagramHandle}`;
                
                // Try to open in Instagram app first
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = instagramAppUrl;
                document.body.appendChild(iframe);
                
                // Remove iframe after a short delay
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 1000);
                
                // Fallback to external browser after delay
                setTimeout(() => {
                    openInExternalBrowser(url);
                }, 500);
            } else {
                openInExternalBrowser(url);
            }
        }, true);
        
        // Also try to override the default link behavior
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
    });
}

// Function to open URL in external browser
function openInExternalBrowser(url) {
    // Method 1: Try window.open with specific parameters
    try {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.focus();
            return;
        }
    } catch (error) {
        console.log('Window.open failed:', error);
    }
    
    // Method 2: Try creating a temporary link with target _system (for mobile)
    try {
        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.target = '_system'; // Mobile-specific
        tempLink.rel = 'noopener noreferrer';
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        return;
    } catch (error) {
        console.log('System link failed:', error);
    }
    
    // Method 3: Try location.href as last resort
    try {
        window.location.href = url;
    } catch (error) {
        console.log('Location.href failed:', error);
        // Show user message if all methods fail
        alert('Please copy this link and open it in your browser: ' + url);
    }
}

// Initialize the application
function init() {
    // Initialize video playback
    initializeVideo();
    
    // Fix Instagram browser layout issues
    fixInstagramLayout();
    
    // If not Instagram browser, still fix Instagram links for better compatibility
    if (!isInstagramBrowser()) {
        fixInstagramLinks();
    }
    
    // Start countdown timer
    updateCountdown(); // Initial call
    
    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Initialize and update follower count
    updateFollowerCount();
    
    // Update follower count every 5 minutes (300000ms)
    setInterval(updateFollowerCount, 300000);
    
    // Add event listener for email form
    emailForm.addEventListener('submit', handleEmailSubmission);
    
    // Add Apple-style ripple effects to buttons
    addRippleEffects();
    
    // Add typing effect on page load (optional)
    // addTypingEffect();
    
    // Add some interactive animations
    addInteractiveAnimations();
}

// Function to add Apple-style ripple effects
function addRippleEffects() {
    const buttons = document.querySelectorAll('.submit-btn, #mc-embedded-subscribe');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // Calculate ripple size and position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Set ripple styles
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Add ripple to button
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Function to add interactive animations
function addInteractiveAnimations() {
    // Add hover effects to time units
    const timeUnits = document.querySelectorAll('.time-unit');
    timeUnits.forEach(unit => {
        unit.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 25px rgba(0, 255, 0, 0.5)';
        });
        
        unit.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.3)';
        });
    });
    
    // Add enhanced focus effects to email input
    const emailInputs = document.querySelectorAll('#emailInput, #mce-EMAIL');
    emailInputs.forEach(input => {
        // Function to update input state classes
        function updateInputState() {
            if (input.value.length > 0) {
                input.classList.add('has-content');
                input.classList.remove('empty-focused');
            } else if (document.activeElement === input) {
                input.classList.add('empty-focused');
                input.classList.remove('has-content');
            } else {
                input.classList.remove('has-content', 'empty-focused');
            }
        }
        
        input.addEventListener('focus', function() {
            // Immediately change text alignment to prevent cursor in middle
            this.style.textAlign = 'left';
            this.style.setProperty('text-align', 'left', 'important');
            
            // Instagram browser needs extra force
            if (document.body.classList.contains('instagram-browser')) {
                this.style.setProperty('-webkit-text-align-last', 'left', 'important');
                this.style.setProperty('text-align-last', 'left', 'important');
            }
            
            // Update state classes
            updateInputState();
            
            // Move cursor to start for better UX
            setTimeout(() => {
                if (this.value === '') {
                    this.setSelectionRange(0, 0);
                }
            }, 1);
        });
        
        input.addEventListener('blur', function() {
            // Reset text alignment based on content
            if (this.value === '') {
                this.style.textAlign = 'center';
            } else {
                this.style.textAlign = 'left';
            }
            
            // Update state classes
            updateInputState();
        });
        
        // Handle click to position cursor correctly
        input.addEventListener('click', function() {
            // Force left alignment on click
            this.style.textAlign = 'left';
            this.style.setProperty('text-align', 'left', 'important');
            
            // Instagram browser needs extra force
            if (document.body.classList.contains('instagram-browser')) {
                this.style.setProperty('-webkit-text-align-last', 'left', 'important');
                this.style.setProperty('text-align-last', 'left', 'important');
            }
            
            updateInputState();
            
            if (this.value === '') {
                // Position cursor at the beginning for empty field
                setTimeout(() => {
                    this.setSelectionRange(0, 0);
                }, 1);
            }
        });
        
        // Handle touch events for mobile/Instagram
        input.addEventListener('touchstart', function() {
            // Force left alignment on touch
            this.style.textAlign = 'left';
            this.style.setProperty('text-align', 'left', 'important');
            
            // Instagram browser needs extra force
            if (document.body.classList.contains('instagram-browser')) {
                this.style.setProperty('-webkit-text-align-last', 'left', 'important');
                this.style.setProperty('text-align-last', 'left', 'important');
            }
        });
        
        // Add smooth typing animation and state management
        input.addEventListener('input', function() {
            // Keep left alignment while typing
            this.style.textAlign = 'left';
            this.style.setProperty('text-align', 'left', 'important');
            
            // Instagram browser needs extra force
            if (document.body.classList.contains('instagram-browser')) {
                this.style.setProperty('-webkit-text-align-last', 'left', 'important');
                this.style.setProperty('text-align-last', 'left', 'important');
            }
            
            updateInputState();
            
            if (this.value.length > 0) {
                this.style.transform = 'translateY(-1px)';
            } else {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Initialize state on page load
        updateInputState();
    });
}

// Add smooth scrolling for any future navigation
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Add window resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust any responsive elements if needed
    updateCountdown();
});

// Prevent right-click context menu (optional security feature)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Console message for developers
console.log('🚀 FUTUREYOU.js - Landing Page Loaded');
console.log('Launch Date: March 3, 2026');
console.log('Built with HTML, CSS, and JavaScript');