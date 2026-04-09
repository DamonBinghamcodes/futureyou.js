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

  // Mailchimp AJAX submission — no redirect
  function initMailchimpForm(form) {
    if (!form) return;
    const emailInput = form.querySelector('[name="EMAIL"]');
    const submitBtn = form.querySelector('[type="submit"]');
    const errorEl = form.querySelector('#mce-error-response');
    const successEl = form.querySelector('#mce-success-response');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!emailInput || !emailInput.validity.valid) {
        emailInput.focus();
        return;
      }

      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      // Build JSONP URL — Mailchimp requires /post-json endpoint
      const url = form.action.replace('/post?', '/post-json?');
      const params = new URLSearchParams(new FormData(form));
      const callbackName = 'mc_cb_' + Date.now();
      params.set('c', callbackName);

      const script = document.createElement('script');
      script.src = url + '&' + params.toString();

      window[callbackName] = function(response) {
        delete window[callbackName];
        document.head.removeChild(script);

        submitBtn.textContent = 'Subscribe';
        submitBtn.disabled = false;

        if (response.result === 'success') {
          if (successEl) { successEl.textContent = response.msg; successEl.style.display = 'block'; }
          if (errorEl) errorEl.style.display = 'none';
          emailInput.value = '';
        } else {
          const msg = response.msg ? response.msg.replace(/^\d+ - /, '') : 'Something went wrong. Please try again.';
          if (errorEl) { errorEl.textContent = msg; errorEl.style.display = 'block'; }
          if (successEl) successEl.style.display = 'none';
        }
      };

      document.head.appendChild(script);
    });

    // Input focus alignment
    if (emailInput) {
      emailInput.addEventListener('focus', function() { this.style.textAlign = 'left'; });
      emailInput.addEventListener('blur', function() { if (!this.value) this.style.textAlign = 'center'; });

      if (isInstagramBrowser()) {
        ['click', 'touchstart'].forEach(function(evt) {
          emailInput.addEventListener(evt, function() {
            this.style.setProperty('text-align', 'left', 'important');
          });
        });
      }
    }
  }

  // Init all Mailchimp forms on the page
  document.querySelectorAll('form[name="mc-embedded-subscribe-form"]').forEach(initMailchimpForm);

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

// Menu Overlay (Hamburger Menu)
/* ====== Menu Toggle ====== */
(function () {
  const menuBtn = document.querySelector('.menuBtn');
  const overlay = document.getElementById('menuOverlay');
  if (!menuBtn || !overlay) return;
  const overlayInner = overlay.querySelector('.menuOverlay__inner');
  const closeBtn = overlay.querySelector('.menuClose');
  const menuLinks = overlay.querySelectorAll('[data-close-menu]');

  function openMenu() {
    overlay.classList.add('isOpen');
    overlay.setAttribute('aria-hidden', 'false');
    menuBtn.classList.add('isActive');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('noScroll');
  }

  function closeMenu() {
    overlay.classList.remove('isOpen');
    overlay.setAttribute('aria-hidden', 'true');
    menuBtn.classList.remove('isActive');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('noScroll');
  }

  menuBtn.addEventListener('click', function () {
    overlay.classList.contains('isOpen') ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);

  overlay.addEventListener('click', function (e) {
    if (!overlayInner.contains(e.target)) closeMenu();
  });

  menuLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ====== Dynamic Year ====== */
  var year = new Date().getFullYear();
  var yearEl = document.getElementById('year');
  var yearFooterEl = document.getElementById('yearFooter');
  if (yearEl) yearEl.textContent = year;
  if (yearFooterEl) yearFooterEl.textContent = year;
})();

/* ====== Archive Page Hamburger Menu ====== */
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const mobileClose = document.getElementById('mobile-menu-close');

  if (!hamburger || !mobileMenu || !mobileOverlay) return;

  function openHamburger() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
  }

  function closeHamburger() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.contains('open') ? closeHamburger() : openHamburger();
  });

  mobileOverlay.addEventListener('click', closeHamburger);
  if (mobileClose) mobileClose.addEventListener('click', closeHamburger);
})();