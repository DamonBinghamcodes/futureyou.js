// Script for FutureYou.js Landing Page
// Handles countdown timer, progress bar, and email form functionality

// Set the target launch date - October 31, 2025
const targetDate = new Date('October 31, 2025 23:59:59').getTime();

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
        
        // The CSS will handle the layout automatically
        // No need for complex JavaScript positioning
    }
}

// Initialize the application
function init() {
    // Initialize video playback
    initializeVideo();
    
    // Fix Instagram browser layout issues
    fixInstagramLayout();
    
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
        input.addEventListener('focus', function() {
            // Add a subtle glow animation
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        input.addEventListener('blur', function() {
            // Reset transition
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        // Add smooth typing animation
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.transform = 'translateY(-1px)';
            } else {
                this.style.transform = 'translateY(0)';
            }
        });
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
console.log('Launch Date: October 31, 2025');
console.log('Built with HTML, CSS, and JavaScript');