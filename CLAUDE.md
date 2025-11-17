# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FutureYou.js is a minimal, aesthetic-first landing page for a brand that blends fitness, mindset, technology, streetwear culture, and high-performance lifestyle. The design inspiration comes from brands like Hidden.NY, Run Attire, and Apple's web design.

This is a "Coming Soon" landing page designed to build brand anticipation and gather emails for a waitlist, emphasizing mystery, high-performance culture, and aesthetic ambition.

**PROJECT STATUS**: Active development completed - Ready for production deployment

## Current Implementation Status

### ✅ Completed Features
- **Landing Page Core**: Fully functional HTML/CSS/JS implementation
- **Scrolling Newsline Banner**: Tech-glitch styled infinite scrolling banner with classified messaging (REMOVED in latest version)
- **Responsive Design**: Mobile-first approach with comprehensive breakpoints (280px to 2560px+ covering all modern displays)
- **Countdown Timer**: JavaScript-powered countdown to March 3, 2026
- **Progress Bar**: Animated progress tracking to launch date (percentage only)
- **Email Collection**: Integrated Mailchimp embedded forms with Apple-inspired design
- **Instagram Integration**: Two account links (@futureyou.rsrchdpt, @futureyou.psd) with custom profile pictures
- **Instagram Browser Compatibility**: Specialized fixes for Instagram's in-app browser
- **iOS Optimizations**: Safari and WebKit specific enhancements
- **Background Animation**: Pulsing gradient background effect
- **Ultra-Responsive**: Enhanced breakpoints for 1920px (Full HD) and 2560px (2K/QHD) displays

### 🎨 Design Implementation
- **Visual Theme**: Neon green (#92e692) on gradient background
- **Brand Logo**: Green FY tree logo (futureyou-logo-green.png) at full viewport size
- **Apple-Inspired Email Form**: Glass-morphism, blur effects, cubic-bezier animations, black button
- **Professional Typography**: -apple-system font stack throughout
- **Compact Instagram Links**: Minimal, optimized sizing (reduced by 30%)
- **Clean Minimalist Aesthetic**: Removed scrolling banner for simplified, focused design
- **Optimized Spacing**: Flexbox layout preventing overlap, footer anchored at bottom

## Technical Architecture

### Current Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Email Backend**: Mailchimp embedded forms integration
- **Styling**: Mobile-first responsive CSS with extensive media queries (2477 lines)
- **Animations**: CSS animations with reduced-motion accessibility support
- **Layout**: Flexbox with space-between for proper footer positioning

### Key Files Structure
```
├── index.html                    # Main HTML structure with Mailchimp integration
├── styles.css                    # Comprehensive responsive styling (2477 lines)
├── script.js                     # JavaScript functionality and Instagram browser fixes
├── public/
│   ├── gradient-background.png      # Animated background image
│   ├── futureyou-logo-green.png     # Main brand logo (green FY tree)
│   ├── futureyou-rsrchdpt-logo.png  # Research department Instagram profile
│   ├── psd-profile.jpg              # PSD Instagram profile picture
│   ├── FutureYouRSRCHDPT-LOGO.gif   # Animated logo variant
│   ├── IMG_2890.JPG                 # Instagram profile picture
│   └── 278C98B4-34FB-49D4-BA76-EB8330E0E921.PNG  # Instagram profile picture
└── CLAUDE.md                     # This documentation file
```

## Advanced Features Implemented

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
- **Breakpoints**: 20+ different responsive breakpoints covering all modern devices
- **Device-Specific**: iPhone SE (280px) to 2K/QHD displays (2560px+)
- **Enhanced Coverage**: Added 900px, 1366px, 1920px, 2560px breakpoints
- **Orientation Support**: Portrait and landscape optimizations
- **Accessibility**: Reduced motion support and WCAG compliance
- **All Components Scaled**: Logo, countdown, progress bar, email signup, Instagram links

## Brand Identity & Design Direction

- **Visual Theme**: Neon green (#92e692) on gradient background
- **Logo**: Green FY tree with bonsai aesthetic, full screen prominence
- **Aesthetic**: Minimal, clean, high-performance, Apple-inspired sophistication
- **Tone**: Exclusive, future-focused, mysterious with countdown to launch
- **Color Scheme**: Black and white with neon green accents for modern contrast
- **Target Audience**: Fitness/lifestyle enthusiasts who appreciate premium aesthetics and exclusivity

## Key Components Detail

### 1. Hero Section
- **Background**: Animated pulsing gradient background
- **Brand Logo**: Green FY tree logo, full viewport sizing (100vw/100vh with object-fit contain)
- **Countdown Timer**: Real-time countdown to March 3, 2026 (reduced by 30% from original)
- **Progress Bar**: Animated progress tracking with percentage display only (reduced by 30% from original)

### 2. Email Capture System
- **Mailchimp Integration**: Embedded forms with server-side processing
- **Apple-Style Design**: Glass-morphism, blur effects, smooth animations
- **Color Scheme**: Black submit button with white text (changed from green)
- **Size**: Reduced by 30% across all breakpoints from original design
- **Responsive Layout**: Horizontal on desktop, vertical on mobile
- **Success/Error Handling**: Styled feedback messages

### 3. Social Media Footer
- **Instagram Accounts**: @futureyou.rsrchdpt and @futureyou.psd
- **Profile Images**: futureyou-rsrchdpt-logo.png for rsrchdpt, psd-profile.jpg for psd
- **External Link Handling**: Instagram app deep-linking with browser fallbacks
- **Size**: Reduced by 30% across all breakpoints from original design
- **Optimized Sizing**:
  - Base mobile: 70px min-width, 0.455rem font, 14px profile pics
  - Desktop (1440px+): 105px min-width, 0.595rem font, 19.6px profile pics
  - Full HD (1920px+): 126px min-width, 0.714rem font, 23.52px profile pics
  - 2K/QHD (2560px+): 147px min-width, 0.833rem font, 27.44px profile pics
- **Footer Positioning**: Flexbox with margin-top: auto, stays at bottom without overlap

## Development Guidelines

### Mobile-First Responsive Design
- **Base**: 280px emergency fallback minimum width
- **Mobile Breakpoints**: 320px (iPhone SE), 375px, 390px (iPhone 13/14/15), 430px (iPhone Pro Max), 481px
- **Tablet Breakpoints**: 768px (iPad portrait), 900px (landscape tablets/small laptops)
- **Desktop Breakpoints**: 1024px, 1200px, 1366px (standard laptop), 1440px
- **Large Display Breakpoints**: 1920px (Full HD), 2560px (2K/QHD)
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

### November 2025 Session - Comprehensive Responsive Design Optimization
1. **Removed Scrolling Newsline Banner**:
   - Removed the tech-glitch scrolling banner from top of page
   - Simplified design for cleaner aesthetic

2. **Logo Sizing Overhaul**:
   - Changed from fixed pixel sizing to viewport units (100vw/100vh)
   - Logo now scales to full screen width on all devices
   - Uses object-fit: contain to maintain aspect ratio

3. **Component Size Adjustments**:
   - Countdown timer: Initially halved, then increased by 30%
   - Progress bar: Initially halved, then increased by 30%
   - Email signup: Initially halved, then reduced by additional 30%, changed to black
   - Instagram links: Reduced by 30% to match email signup

4. **Enhanced Responsive Breakpoints**:
   - Added 900px breakpoint for landscape tablets and small laptops
   - Added 1366px breakpoint for standard laptop resolution
   - Added 1920px breakpoint for Full HD displays (1.2x scale from 1440px)
   - Added 2560px breakpoint for 2K/QHD displays (1.4x scale from 1440px)
   - CSS file grew from ~2000 lines to 2477 lines

5. **Instagram Profile Updates**:
   - Research department: Updated to futureyou-rsrchdpt-logo.png
   - PSD account: Updated to psd-profile.jpg

6. **Complete Responsive Coverage**:
   - All components (logo, countdown, progress, email, Instagram) scale proportionally
   - 20+ media queries covering 280px to 2560px+ displays
   - Smooth transitions between all breakpoints
   - Optimized for all modern devices and screen sizes

### November 2025 Session - Previous Updates
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

5. **Progress Bar Text Removal**:
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
- Mobile-first approach: start with 280px emergency fallback, 320px base styles
- Use progressive enhancement for larger screens
- Test all breakpoints, especially 320px, 375px, 390px, and 430px for mobile
- Test new breakpoints: 900px, 1366px, 1920px, 2560px for modern displays
- Instagram browser requires additional CSS overrides
- Footer uses flexbox, not absolute positioning
- All components scale proportionally across 20+ breakpoints

### Layout Architecture
- main-container: display: flex, flex-direction: column, justify-content: space-between
- hero-section: flex: 1, centers content vertically
- footer: position: relative, margin-top: auto, anchors to bottom
- This ensures content never overlaps and footer always stays at bottom

### Component Sizing Guidelines
- Logo: 100vw/100vh viewport units with object-fit: contain
- Countdown/Progress: Base sizes with 1.3x multiplier from original halved sizes
- Email signup: Black button, reduced by 30% twice (0.7 × 0.7 = 0.49x original)
- Instagram links: Reduced by 30% to match email signup (0.7x)

This project represents a production-ready landing page with ultra-responsive design (280px to 2560px+), clean minimalist aesthetic, Instagram browser compatibility, and professional email collection system integrated with Mailchimp. Features comprehensive breakpoint coverage for all modern devices from iPhone SE to 2K/QHD displays.
