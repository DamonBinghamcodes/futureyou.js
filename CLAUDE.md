# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FutureYou.js is a minimal, aesthetic-first landing page for a brand that blends fitness, mindset, technology, streetwear culture, and high-performance lifestyle. The design inspiration comes from brands like Hidden.NY, Run Attire, and Apple's web design.

This is a "Coming Soon" landing page designed to build brand anticipation and gather emails for a waitlist, emphasizing mystery, high-performance culture, and aesthetic ambition.

**PROJECT STATUS**: Active development completed - Ready for production deployment

## Current Implementation Status

### ✅ Completed Features
- **Landing Page Core**: Fully functional HTML/CSS/JS implementation
- **Responsive Design**: Mobile-first approach with comprehensive breakpoints (280px to 1440px+)
- **Countdown Timer**: JavaScript-powered countdown to March 3, 2026
- **Progress Bar**: Animated progress tracking to launch date
- **Email Collection**: Integrated Mailchimp embedded forms with Apple-inspired design
- **Instagram Integration**: Two account links (@futureyou.rsrch, @futureyou.psd) with profile pictures
- **Instagram Browser Compatibility**: Specialized fixes for Instagram's in-app browser
- **iOS Optimizations**: Safari and WebKit specific enhancements
- **Background Animation**: Pulsing gradient background effect

### 🎨 Design Implementation
- **Visual Theme**: Neon green (#92e692) on gradient background
- **Apple-Inspired Email Form**: Glass-morphism, blur effects, cubic-bezier animations
- **Professional Typography**: -apple-system font stack
- **Responsive Instagram Links**: Profile pictures, icons, and handles
- **Optimized Spacing**: Compact layout fitting single screen without scrolling

## Technical Architecture

### Current Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Email Backend**: Mailchimp embedded forms integration
- **Styling**: Mobile-first responsive CSS with extensive media queries
- **Animations**: CSS animations with reduced-motion accessibility support

### Key Files Structure
```
├── index.html          # Main HTML structure with Mailchimp integration
├── styles.css          # Comprehensive responsive styling (2000+ lines)
├── script.js           # JavaScript functionality and Instagram browser fixes
├── public/
│   ├── gradient-background.png  # Animated background image
│   ├── futureyou-black.png     # Brand logo
│   ├── rsrch-profile.jpg       # Instagram profile picture
│   └── psd-profile.jpg         # Instagram profile picture
└── CLAUDE.md           # This documentation file
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
- **Breakpoints**: 12 different responsive breakpoints
- **Device-Specific**: iPhone SE (320px) to 4K displays (1440px+)
- **Orientation Support**: Portrait and landscape optimizations
- **Accessibility**: Reduced motion support and WCAG compliance

## Brand Identity & Design Direction

- **Visual Theme**: Neon green gradient (#92e692) on dark background
- **Aesthetic**: Minimal, high-performance, Apple-inspired streetwear
- **Tone**: Cryptic, exclusive, future-focused with "early access" messaging
- **Target Audience**: Fitness/lifestyle enthusiasts who appreciate premium aesthetics

## Key Components Detail

### 1. Hero Section
- **Background**: Animated pulsing gradient (gradient-background.png)
- **Brand Logo**: SVG-quality PNG with responsive sizing
- **Countdown Timer**: Real-time countdown to March 3, 2026
- **Progress Bar**: Animated progress tracking from July 15, 2025 to March 3, 2026 launch date

### 2. Email Capture System
- **Mailchimp Integration**: Embedded forms with server-side processing
- **Apple-Style Design**: Glass-morphism, blur effects, smooth animations
- **Text**: "Enter your email below to unlock early access. Access Code will be sent in October."
- **Responsive Layout**: Horizontal on desktop, stacked on mobile
- **Success/Error Handling**: Styled feedback messages

### 3. Social Media Footer
- **Instagram Accounts**: @futureyou.rsrch and @futureyou.psd
- **Profile Integration**: Real profile pictures with fallback avatars
- **External Link Handling**: Instagram app deep-linking with browser fallbacks
- **Responsive Sizing**: Progressive scaling from 280px to 1440px+ screens

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

### Browser Compatibility
- **Modern Browsers**: Chrome, Safari, Firefox, Edge (ES6+ support)
- **Mobile Safari**: iOS-specific optimizations and webkit fixes
- **Instagram Browser**: Custom handling for in-app WebView
- **Accessibility**: Screen reader support and keyboard navigation

## Recent Development Work

### Instagram Browser Fixes (Latest Session)
- **Issue**: Links not working in Instagram's in-app browser
- **Solution**: Multi-method external link opening with deep-linking
- **Cursor Positioning**: Fixed email input cursor appearing in middle of placeholder
- **Layout Optimization**: Reduced spacing between email form and Instagram links
- **Responsive Refinement**: Enhanced media queries for social link sizing

### Apple-Style Email Form Enhancement
- **Design Upgrade**: From basic form to Apple-inspired glass-morphism
- **Animation System**: Cubic-bezier transitions and hover effects
- **Input Management**: Dynamic text alignment and focus states
- **Mailchimp Integration**: Seamless server-side email processing

### Spacing and Layout Optimization
- **Compact Design**: All content fits on single screen without scrolling
- **Gap Reduction**: Minimized space between email form and Instagram links
- **Responsive Scaling**: Progressive sizing across all device types
- **Visual Hierarchy**: Balanced spacing maintaining design aesthetics

## Deployment Ready Features

### Production Considerations
- **Email Collection**: Fully functional Mailchimp integration
- **Error Handling**: Graceful fallbacks for all external dependencies
- **Performance**: Optimized for fast loading on all devices
- **SEO Ready**: Proper meta tags and semantic HTML structure

### Quality Assurance Completed
- **Cross-Browser Testing**: Verified across major browsers
- **Device Testing**: Tested on various screen sizes and orientations
- **Instagram Compatibility**: Verified link functionality in Instagram browser
- **Accessibility**: Keyboard navigation and screen reader support

## Future Enhancement Opportunities

### Potential Improvements
- **Backend Integration**: Custom email processing API
- **Analytics**: User interaction tracking and conversion metrics
- **A/B Testing**: Multiple design variants for optimization
- **Social Proof**: Real-time follower count integration
- **Progressive Web App**: Offline capability and app-like experience

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
- Apple-style animations are defined in styles.css (lines 179-1170)
- Input state management is handled in script.js (lines 616-725)
- Responsive breakpoints ensure proper display on all devices

### Responsive Design Maintenance
- Mobile-first approach: start with 320px base styles
- Use progressive enhancement for larger screens
- Test all breakpoints, especially 375px, 390px, and 430px for mobile
- Instagram browser requires additional CSS overrides

This project represents a production-ready landing page with advanced responsive design, Instagram browser compatibility, and professional email collection system integrated with Mailchimp.