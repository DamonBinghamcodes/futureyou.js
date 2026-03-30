// ===================================
// FUTUREYOU - Premium Art Gallery Landing Page
// Minimal JavaScript for form handling and interactions
// ===================================

// Instagram browser detection
function isInstagramBrowser() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return userAgent.indexOf('Instagram') > -1;
}

// Apply Instagram-specific fixes
if (isInstagramBrowser()) {
  document.body.classList.add('instagram-browser');
  console.log('Instagram browser detected');
}

// Typewriter effect
function typeWriter(element, text, speed = 100) {
  const cursor = document.querySelector('.cursor');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show text immediately if user prefers reduced motion
    element.textContent = text;
    if (cursor) cursor.classList.add('hide');
    return;
  }

  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Hide cursor after typing is complete
      setTimeout(() => {
        if (cursor) cursor.classList.add('hide');
      }, 1000);
    }
  }

  type();
}

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize typewriter effect
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    typeWriter(typewriterElement, 'A creative index.', 80);
  }

  // Get form elements
  const emailForm = document.getElementById('mc-embedded-subscribe-form');
  const emailInput = document.getElementById('mce-EMAIL');
  const submitBtn = document.getElementById('mc-embedded-subscribe');

  // Form submission handling
  if (emailForm && emailInput && submitBtn) {
    emailForm.addEventListener('submit', function(e) {
      // Check if email is valid before submitting
      if (emailInput.validity.valid) {
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Re-enable button after 3 seconds (in case of slow response)
        setTimeout(() => {
          if (submitBtn.disabled) {
            submitBtn.textContent = 'Subscribe';
            submitBtn.disabled = false;
          }
        }, 3000);
      }
    });

    // Input focus effects
    emailInput.addEventListener('focus', function() {
      this.style.textAlign = 'left';
    });

    emailInput.addEventListener('blur', function() {
      if (this.value === '') {
        this.style.textAlign = 'center';
      }
    });

    // Handle Instagram browser input alignment
    if (isInstagramBrowser()) {
      emailInput.addEventListener('click', function() {
        this.style.textAlign = 'left';
        this.style.setProperty('text-align', 'left', 'important');
        this.style.setProperty('-webkit-text-align-last', 'left', 'important');
        this.style.setProperty('text-align-last', 'left', 'important');
      });

      emailInput.addEventListener('touchstart', function() {
        this.style.textAlign = 'left';
        this.style.setProperty('text-align', 'left', 'important');
      });
    }
  }

  // Console signature
  console.log('%cFUTUREYOU', 'font-size: 24px; font-weight: bold; color: #0081fb;');
  console.log('%cA creative index', 'font-size: 14px; color: #333;');
  console.log('%cBuilt with premium minimalism', 'font-size: 12px; color: #999;');
});

// Prevent context menu (optional - can be removed if not desired)
document.addEventListener('contextmenu', function(e) {
  // Uncomment to disable right-click
  // e.preventDefault();
});


// Navbar time, date, and temperature status
document.addEventListener("DOMContentLoaded", function () {

  // These select the HTML elements we want to update
  const locationElement = document.getElementById("header-location");
  const dateElement = document.getElementById("header-date");
  const timeElement = document.getElementById("header-time");
  const tempElement = document.getElementById("header-temp");

  // This is your manual display location
  const readableLocation = "Gold Coast, Australia";

  // These are Gold Coast coordinates
  const latitude = -28.0167;
  const longitude = 153.4000;

  // This function updates the date and time every second
  function updateHeaderDateTime() {

    // This gets the current date and time from the user's device
    const now = new Date();

    // This formats the date like "Mar 30"
    const formattedDate = now.toLocaleDateString("en-AU", {
      month: "short",
      day: "numeric",
    });

    // This formats the time like "4:40 AM"
    const formattedTime = now.toLocaleTimeString("en-AU", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // This updates the text in the header
    locationElement.textContent = readableLocation;
    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
  }

  // This function fetches the current temperature from Open-Meteo
  async function updateTemperature() {
    try {
      // This requests current temperature data for Gold Coast
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
      );

      // This converts the response into JSON data
      const data = await response.json();

      // This reads the current temperature value from the API response
      const currentTemp = data.current.temperature_2m;

      // This updates the temperature text in the header
      tempElement.textContent = `${Math.round(currentTemp)}°C`;
    } catch (error) {
      // This shows fallback text if the API request fails
      tempElement.textContent = "--°C";

      // This logs the error in the browser console for debugging
      console.error("Weather fetch failed:", error);
    }
  }

  // This runs both functions once when the page loads
  updateHeaderDateTime();
  updateTemperature();

  // This updates time every second
  setInterval(updateHeaderDateTime, 1000);

  // This updates temperature every 10 minutes
  setInterval(updateTemperature, 600000);
});