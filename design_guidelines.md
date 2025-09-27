# Civic Report App Design Guidelines

## Design Approach
**Selected Approach:** Design System (Material Design)
**Justification:** This is a utility-focused government application where trust, accessibility, and usability are paramount. Material Design provides clear hierarchy, established patterns for form-heavy interfaces, and excellent mobile responsiveness essential for civic engagement.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 220 45% 25% (Deep Navy Blue - conveys trust and authority)
- Dark Mode: 220 30% 85% (Light Blue-Gray)

**Secondary Colors:**
- Light Mode: 45 65% 55% (Warm Orange - for alerts and important actions)
- Dark Mode: 45 45% 70% (Muted Orange)

**Status Colors:**
- Success: 140 60% 45% (Green for resolved cases)
- Warning: 30 85% 55% (Amber for pending items)
- Error: 355 75% 55% (Red for urgent issues)

### B. Typography
**Primary Font:** Inter (Google Fonts)
- Headings: 600 weight
- Body text: 400 weight
- Labels: 500 weight
- Button text: 500 weight

**Sizes:** Use Material Design type scale (12px, 14px, 16px, 20px, 24px, 32px)

### C. Layout System
**Spacing Units:** Consistently use Tailwind units of 2, 4, 6, and 8
- Micro spacing: p-2, m-2 (8px)
- Standard spacing: p-4, m-4 (16px)
- Section spacing: p-6, m-6 (24px)
- Large spacing: p-8, m-8 (32px)

### D. Component Library

**Navigation:**
- Fixed top navigation bar with portal identification
- Breadcrumb navigation for multi-step processes
- Bottom navigation for mobile (Home, Reports, Profile, Logout)

**Forms:**
- Material Design outlined text fields
- Floating labels for all inputs
- File upload zones with drag-and-drop styling
- Radio buttons for report categories
- Dropdowns for area/ward selection

**Data Display:**
- Card-based layout for report items
- Status badges with appropriate colors
- Progress indicators for case tracking
- Data tables for department/counsellor views

**Buttons:**
- Primary: Filled buttons for main actions
- Secondary: Outlined buttons for secondary actions
- Text buttons for navigation links

**Overlays:**
- Modal dialogs for report details
- Bottom sheets for mobile actions
- Snackbars for feedback messages

### E. Portal-Specific Design

**Civilian Portal:**
- Card-based dashboard with quick action buttons
- Step-by-step report submission wizard
- Visual category selection with icons
- Media upload preview areas

**Ward Counsellor Portal:**
- Dashboard with metrics cards (pending, resolved, total cases)
- Timeline view for case progress
- Filterable report lists with status indicators

**Department Portal:**
- Table-heavy interface for report review
- Validation controls (Approve/Reject buttons)
- Detailed report viewer with media gallery

### F. Multilingual Considerations
- Text expansion space (30% extra for Hindi translations)
- Right-to-left text support ready
- Language switcher in top navigation
- Culturally appropriate icons and imagery

### G. Mobile Optimization
- Touch-friendly button sizes (minimum 44px)
- Thumb-zone navigation placement
- Simplified forms with progressive disclosure
- Voice recording interface optimized for mobile

## Images
No large hero images required. Use:
- Small illustrative icons for report categories
- Government/civic themed illustrations for empty states
- Profile placeholder images for user accounts
- Status icons throughout the interface

The design prioritizes functionality and accessibility over visual impact, ensuring all citizens can effectively interact with civic services regardless of their technical expertise or device capabilities.