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

// Email form elements - commented out for now
// const emailForm = document.getElementById('emailForm');
// const emailInput = document.getElementById('emailInput');
// const successMessage = document.getElementById('successMessage');

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

// Email form functionality - commented out for now
/*
// Email form submission handler
function handleEmailSubmission(event) {
    event.preventDefault(); // Prevent default form submission
    
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!isValidEmail(email)) {
        showErrorMessage('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission (replace with actual backend integration)
    submitEmail(email);
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to submit email (mock implementation)
function submitEmail(email) {
    // Show loading state
    const submitButton = document.querySelector('.submit-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'SUBMITTING...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Clear form and show success message
        emailInput.value = '';
        showSuccessMessage();
        
        // Store email in localStorage (for demo purposes)
        storeEmail(email);
        
        // In a real application, you would send this to your backend:
        // fetch('/api/waitlist', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email: email })
        // })
        
    }, 1500); // 1.5 second delay to simulate network request
}

// Function to show success message
function showSuccessMessage() {
    successMessage.classList.add('show');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Function to show error message
function showErrorMessage(message) {
    // Create temporary error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    
    // Insert after email form
    emailForm.parentNode.insertBefore(errorDiv, successMessage);
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Function to store email in localStorage
function storeEmail(email) {
    let emails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
    if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem('waitlistEmails', JSON.stringify(emails));
    }
}
*/

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

// Initialize the application
function init() {
    // Initialize video playback
    initializeVideo();
    
    // Start countdown timer
    updateCountdown(); // Initial call
    
    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Initialize and update follower count
    updateFollowerCount();
    
    // Update follower count every 5 minutes (300000ms)
    setInterval(updateFollowerCount, 300000);
    
    // Add event listener for email form - commented out for now
    // emailForm.addEventListener('submit', handleEmailSubmission);
    
    // Add typing effect on page load (optional)
    // addTypingEffect();
    
    // Add some interactive animations
    addInteractiveAnimations();
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
    
    // Add focus effects to email input - commented out for now
    /*
    emailInput.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    emailInput.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
    */
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