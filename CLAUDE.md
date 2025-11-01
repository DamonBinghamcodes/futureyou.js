# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FutureYou.js is a minimal, aesthetic-first landing page for a brand that blends fitness, mindset, technology, streetwear culture, and high-performance lifestyle. The design inspiration comes from brands like Hidden.NY, Run Attire, and Apple's web design.

This is a "Coming Soon" landing page designed to build brand anticipation and gather emails for a waitlist, emphasizing mystery, high-performance culture, and aesthetic ambition.

**PROJECT STATUS**: Active development completed - Ready for production deployment

## Current Implementation Status

### ✅ Completed Features
- **Landing Page Core**: Fully functional HTML/CSS/JS implementation
- **Scrolling Newsline Banner**: Tech-glitch styled infinite scrolling banner with classified messaging
- **Responsive Design**: Mobile-first approach with comprehensive breakpoints (280px to 1440px+)
- **Countdown Timer**: JavaScript-powered countdown to March 3, 2026
- **Progress Bar**: Animated progress tracking to launch date (percentage only)
- **Email Collection**: Integrated Mailchimp embedded forms with Apple-inspired design
- **Instagram Integration**: Two account links (@futureyou.rsrchdpt, @futureyou.psd) with profile pictures
- **Instagram Browser Compatibility**: Specialized fixes for Instagram's in-app browser
- **iOS Optimizations**: Safari and WebKit specific enhancements
- **Background Animation**: Pulsing gradient background effect

### 🎨 Design Implementation
- **Visual Theme**: Neon green (#92e692) on gradient background
- **Brand Logo**: Green FY tree logo (futureyou-logo-green.png)
- **Apple-Inspired Email Form**: Glass-morphism, blur effects, cubic-bezier animations
- **Professional Typography**: -apple-system font stack with Courier New for newsline
- **Compact Instagram Links**: Minimal, optimized sizing (50-70% smaller than original)
- **Tech Glitch Effects**: RGB split, chromatic aberration, and neon glow effects
- **Optimized Spacing**: Flexbox layout preventing overlap, footer anchored at bottom

## Technical Architecture

### Current Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Email Backend**: Mailchimp embedded forms integration
- **Styling**: Mobile-first responsive CSS with extensive media queries (2000+ lines)
- **Animations**: CSS animations with reduced-motion accessibility support
- **Layout**: Flexbox with space-between for proper footer positioning

### Key Files Structure
```
├── index.html          # Main HTML structure with Mailchimp integration
├── styles.css          # Comprehensive responsive styling (2100+ lines)
├── script.js           # JavaScript functionality and Instagram browser fixes
├── public/
│   ├── gradient-background.png      # Animated background image
│   ├── futureyou-logo-green.png    # Main brand logo (green FY tree)
│   ├── FutureYouRSRCHDPT-LOGO.gif  # Animated logo variant
│   ├── IMG_2890.JPG                # Instagram profile picture
│   └── 278C98B4-34FB-49D4-BA76-EB8330E0E921.PNG  # Instagram profile picture
└── CLAUDE.md           # This documentation file
```

## Advanced Features Implemented

### Scrolling Newsline Banner (NEW)
- **Infinite Scroll**: Seamless 360-degree loop with no visible reset
- **Tech Glitch Effects**: RGB chromatic aberration, opacity flickers, skew distortion
- **Message**: "CLASSIFIED :: ACCESS RESTRICTED :: PASSCODE REQUIRED :: JOIN THE WAITLIST :: UNLOCK YOUR FUTURE ::"
- **Styling**: Monospace font, neon green text, black semi-transparent background with green borders
- **Speed**: 15-second loop for fast scrolling
- **Accessibility**: Reduced motion support (slower scroll, no glitch effects)
- **Implementation**: 4 text copies with translateX(-50%) for seamless looping

### Instagram Browser Compatibility
- **Detection**: JavaScript function to identify Instagram's in-app browser
- **Link Fixes**: Multiple fallback methods for external link navigation
- **Layout Optimizations**: Specialized CSS for Instagram WebView
- **Input Handling**: Cursor positioning fixes for email input fields

### Apple-Inspired Email Design
- **Glass-morphism Effects**: Backdrop filters and translucent backgrounds
- **Advanced Animations**: Cubic-bezier transitions and hover states
- **Responsive Form Layout**: Horizontal on desktop, vertical on mobile
- **Input State Management**: Dynamic text alignment and placeholder handling

### Comprehensive Responsive Design
- **Breakpoints**: 12 different responsive breakpoints
- **Device-Specific**: iPhone SE (320px) to 4K displays (1440px+)
- **Orientation Support**: Portrait and landscape optimizations
- **Accessibility**: Reduced motion support and WCAG compliance

## Brand Identity & Design Direction

- **Visual Theme**: Neon green (#92e692) on gradient background
- **Logo**: Green FY tree with bonsai aesthetic
- **Aesthetic**: Minimal, high-performance, tech-glitch, classified/mysterious
- **Tone**: Cryptic, exclusive, future-focused with "passcode required" messaging
- **Target Audience**: Fitness/lifestyle enthusiasts who appreciate premium aesthetics and exclusivity

## Key Components Detail

### 1. Scrolling Newsline Banner
- **Position**: Top of page, full-width
- **Animations**:
  - Scroll: 15s linear infinite
  - Glitch: 3s infinite with RGB split
  - Slice glitch: 5s/7s layered effects
- **Typography**: Courier New monospace, uppercase, wide letter-spacing
- **Colors**: Neon green (#92e692) on rgba(0,0,0,0.85)

### 2. Hero Section
- **Background**: Animated pulsing gradient background
- **Brand Logo**: Green FY tree logo, responsive sizing (300px base, down to 160px mobile)
- **Countdown Timer**: Real-time countdown to March 3, 2026
- **Progress Bar**: Animated progress tracking with percentage display only

### 3. Email Capture System
- **Mailchimp Integration**: Embedded forms with server-side processing
- **Apple-Style Design**: Glass-morphism, blur effects, smooth animations
- **Responsive Layout**: Horizontal on desktop, vertical on mobile
- **Success/Error Handling**: Styled feedback messages

### 4. Social Media Footer
- **Instagram Accounts**: @futureyou.rsrchdpt and @futureyou.psd
- **Profile Integration**: Green FY tree logo for rsrchdpt, custom profile pic for psd
- **External Link Handling**: Instagram app deep-linking with browser fallbacks
- **Optimized Sizing**:
  - Base mobile: 100px min-width, 0.65rem font, 20px profile pics
  - Desktop (1440px+): 150px min-width, 0.85rem font, 28px profile pics
- **Footer Positioning**: Flexbox with margin-top: auto, stays at bottom without overlap

## Development Guidelines

### Mobile-First Responsive Design
- **Base**: 320px (iPhone SE) minimum width
- **Breakpoints**: 375px, 390px, 430px, 481px, 768px, 1024px, 1200px, 1440px
- **Instagram Compatible**: Specialized handling for Instagram WebView
- **iOS Optimized**: Safari-specific CSS and JavaScript enhancements

### Performance Optimizations
- **Image Optimization**: Compressed assets with appropriate sizing
- **CSS Efficiency**: Optimized selectors and consolidated styles
- **JavaScript**: Minimal DOM manipulation with efficient event handling
- **Loading**: Fade-in animation with preload considerations
- **will-change**: Applied to animated elements for GPU acceleration

### Browser Compatibility
- **Modern Browsers**: Chrome, Safari, Firefox, Edge (ES6+ support)
- **Mobile Safari**: iOS-specific optimizations and webkit fixes
- **Instagram Browser**: Custom handling for in-app WebView
- **Accessibility**: Screen reader support and keyboard navigation

## Recent Development Work

### November 2025 Session - Major Updates
1. **Logo Update**:
   - Changed from futureyou-black.png to futureyou-logo-green.png
   - Updated brand logo and @futureyou.rsrchdpt profile picture
   - Reduced logo sizes across all breakpoints (25% smaller)

2. **Instagram Links Optimization**:
   - Reduced sizes by 50-70% across all breakpoints
   - Base: 100px min-width (from 140px)
   - Profile pics: 20px (from 32px)
   - Icons: 14px (from 20px)
   - Gap: 0.5rem (from 1rem)

3. **Footer Positioning Fix**:
   - Changed from position: absolute to relative
   - Implemented flexbox layout with space-between
   - Added margin-top: auto to footer
   - Eliminated all overlap issues

4. **Spacing Optimization**:
   - Brand logo margin: 1rem (from 2rem)
   - Countdown margin: 1rem (from 2rem)
   - Progress section margin: 1rem (from 1.5rem)
   - Email section margin: 0rem (from 0.5rem)
   - Removed duplicate CSS rules

5. **Scrolling Newsline Banner** (NEW FEATURE):
   - Added infinite scrolling tech-glitch banner
   - Message: "CLASSIFIED :: ACCESS RESTRICTED :: PASSCODE REQUIRED :: JOIN THE WAITLIST :: UNLOCK YOUR FUTURE ::"
   - 15-second scroll loop with seamless 360-degree looping
   - RGB chromatic aberration glitch effects
   - 4 text copies for perfect seamless loop
   - Fully responsive with reduced-motion support

6. **Progress Bar Text Removal**:
   - Removed descriptive text below progress bar
   - Now shows percentage only for cleaner look

### Previous Development Sessions

#### Instagram Browser Fixes
- **Issue**: Links not working in Instagram's in-app browser
- **Solution**: Multi-method external link opening with deep-linking
- **Cursor Positioning**: Fixed email input cursor appearing in middle of placeholder
- **Layout Optimization**: Reduced spacing between email form and Instagram links
- **Responsive Refinement**: Enhanced media queries for social link sizing

#### Apple-Style Email Form Enhancement
- **Design Upgrade**: From basic form to Apple-inspired glass-morphism
- **Animation System**: Cubic-bezier transitions and hover effects
- **Input Management**: Dynamic text alignment and focus states
- **Mailchimp Integration**: Seamless server-side email processing

## Deployment Ready Features

### Production Considerations
- **Email Collection**: Fully functional Mailchimp integration
- **Error Handling**: Graceful fallbacks for all external dependencies
- **Performance**: Optimized for fast loading on all devices
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **Animation Performance**: GPU-accelerated with will-change properties

### Quality Assurance Completed
- **Cross-Browser Testing**: Verified across major browsers
- **Device Testing**: Tested on various screen sizes and orientations
- **Instagram Compatibility**: Verified link functionality in Instagram browser
- **Accessibility**: Keyboard navigation, screen reader support, reduced-motion
- **Layout Stability**: No content overlap, footer anchored properly

## Future Enhancement Opportunities

### Potential Improvements
- **Backend Integration**: Custom email processing API
- **Analytics**: User interaction tracking and conversion metrics
- **A/B Testing**: Multiple design variants for optimization
- **Social Proof**: Real-time follower count integration
- **Progressive Web App**: Offline capability and app-like experience
- **Dynamic Newsline**: JavaScript-powered message rotation

### Technical Debt
- **CSS Optimization**: Consolidate similar responsive rules
- **JavaScript Modules**: Modularize code for better maintainability
- **Image Optimization**: Implement WebP format with fallbacks
- **Performance Monitoring**: Add Core Web Vitals tracking

## Notes for Developers

### Working with the Newsline Banner
- Banner positioned at top of main-container, before hero section
- 4 identical text copies required for seamless 360-degree loop
- Animation translateX(-50%) moves exactly 2 copies (half the track)
- When animation resets, copies 3-4 appear where 1-2 started
- Glitch effects use pseudo-elements (::before, ::after) for layered RGB split
- Reduced-motion users get slower scroll (60s) with no glitch effects

### Working with Instagram Browser
- Always test Instagram link functionality in actual Instagram app
- Use the `isInstagramBrowser()` detection function for conditional logic
- Implement multiple fallback methods for external link navigation
- Apply Instagram-specific CSS classes for layout fixes

### Email Form Customization
- Mailchimp form ID and action URL are configured in index.html
- Apple-style animations defined in styles.css
- Input state management handled in script.js
- Responsive breakpoints ensure proper display on all devices

### Responsive Design Maintenance
- Mobile-first approach: start with 320px base styles
- Use progressive enhancement for larger screens
- Test all breakpoints, especially 375px, 390px, and 430px for mobile
- Instagram browser requires additional CSS overrides
- Footer uses flexbox, not absolute positioning

### Layout Architecture
- main-container: display: flex, flex-direction: column, justify-content: space-between
- hero-section: flex: 1, centers content vertically
- footer: position: relative, margin-top: auto, anchors to bottom
- This ensures content never overlaps and footer always stays at bottom

This project represents a production-ready landing page with advanced responsive design, tech-glitch aesthetics, infinite scrolling banner, Instagram browser compatibility, and professional email collection system integrated with Mailchimp.
