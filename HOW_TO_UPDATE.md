# 📘 Maintenance & Content Update Guide

Welcome to the **Content & Project Update Guide** for the **Malak Hamdy Personal Portfolio Website**.

This document is designed for designers, developers, or anyone maintaining this website in the future. It explains exactly how to add new portfolio projects, update existing data, edit skills, modify contact details, update the CV, and publish changes without breaking the design or JavaScript interactivity.

---

## 📑 Table of Contents
1. [Architecture Overview & Quick Reference](#1-architecture-overview--quick-reference)
2. [Adding a New Portfolio Project](#2-adding-a-new-portfolio-project)
3. [Editing or Removing an Existing Project](#3-editing-or-removing-an-existing-project)
4. [Creating a New Filter Category](#4-creating-a-new-filter-category)
5. [Updating Personal & Contact Information](#5-updating-personal--contact-information)
6. [Updating Skills & Progress Bars](#6-updating-skills--progress-bars)
7. [Updating the CV / Resume](#7-updating-the-cv--resume)
8. [Updating Bio, Goals, FAQ & Process](#8-updating-bio-goals-faq--process)
9. [Image & Asset Guidelines](#9-image--asset-guidelines)
10. [Local Testing & Deployment Checklist](#10-local-testing--deployment-checklist)
11. [Troubleshooting Common Issues](#11-troubleshooting-common-issues)

---

## 1. Architecture Overview & Quick Reference

The website is built with lightweight, zero-build vanilla web technologies:
- **`index.html`**: The entire single-page markup, content cards, and modal templates.
- **`css/style.css`**: Custom animations, keyframes, scrollbar styling, dot patterns, and print rules.
- **`js/main.js`**: Vanilla JS logic (modal population, category filtering, scroll animations, form validation, copy-to-clipboard, text CV generation).
- **`assets/`**: Images, mockups, SVGs, and profile photos.

### 🗺️ Content Location Cheat Sheet

| What do you want to update? | File(s) to edit | Where to look |
|---|---|---|
| **Portfolio projects** (images, descriptions, tags) | `index.html` | Section `#portfolio` (`.portfolio-card`) |
| **New project images/mockups** | `assets/` | Save images here (JPG, PNG, SVG, WebP) |
| **Email or Phone Number** | `index.html` + `js/main.js` | Section `#contact`, footer, plus `cvText` in `js/main.js` |
| **Skill percentages & descriptions** | `index.html` + `js/main.js` | Section `#skills` (`data-percent`), CV modal, & `js/main.js` |
| **Visual / Printable CV** | `index.html` | Div `#cv-modal` |
| **Downloadable `.txt` CV** | `js/main.js` | Variable `cvText` (~line 241) |
| **About Bio & Highlights** | `index.html` | Section `#about` |
| **Future Goals Quote & Milestones** | `index.html` | Section `#goals` |
| **FAQ items** | `index.html` | FAQ section (`.faq-item`) |
| **Profile Photos** | `assets/` | `personal_photo.jpg` & `malak-profile.jpg` |

---

## 2. Adding a New Portfolio Project

Each portfolio item consists of two parts:
1. **The visible card** on the homepage grid.
2. **The `data-*` attributes** embedded on the card element that automatically populate the interactive **Lightbox Modal** when a user clicks the card.

### Step 1: Add your project image
1. Export your mockup or project graphic at **4:3 aspect ratio** (e.g. `800×600px` or `1200×900px`).
2. Optimize the file size (under `500 KB` recommended) using tools like [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app).
3. Save it in the `assets/` directory (e.g., `assets/project-newbrand.png`).

### Step 2: Add the project card HTML in `index.html`
Open `index.html`, locate `<section id="portfolio">`, and find the project grid `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">`.

Paste this template at the position where you want the project to appear:

```html
<!-- Project: YOUR PROJECT TITLE -->
<div class="portfolio-card group bg-[#FAFAFC] rounded-3xl border border-[#ECE8F0] overflow-hidden card-hover-lift cursor-pointer reveal-on-scroll delay-100 flex flex-col hover:border-[#5B1363]/40"
     data-category="social"
     data-category-name="Social Media Design"
     data-title="Social Media Campaign - Brand Name"
     data-desc="Write a full description of the project here. Explain the goal, your creative approach, the visual palette used, and what makes the design impactful."
     data-img="assets/project-newbrand.png"
     data-tools="Canva, Color Theory, Layout Grid"
     data-role="Visual Designer & Content Creator">
  
  <!-- Image Thumbnail Preview -->
  <div class="relative overflow-hidden aspect-[4/3] bg-[#F5EEF7] flex items-center justify-center">
    <img src="assets/project-newbrand.png" alt="Brand Name Project Preview" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
    <div class="absolute inset-0 bg-[#5B1363]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <span class="px-4 py-2 rounded-full bg-white text-[#5B1363] text-xs font-bold shadow-lg">
        View Project Details ↗
      </span>
    </div>
  </div>

  <!-- Card Body Preview -->
  <div class="p-6 flex-1 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-[#ECE8F0] text-[#5B1363]">
          Social Media Design
        </span>
      </div>
      <h3 class="font-serif text-lg font-bold text-[#222222] group-hover:text-[#5B1363] transition-colors">
        Brand Name Campaign Kit
      </h3>
      <p class="text-xs text-[#555555] mt-2 line-clamp-2">
        A short one-line teaser summary shown directly on the grid card.
      </p>
    </div>

    <!-- Card Footer -->
    <div class="mt-4 pt-4 border-t border-[#ECE8F0] flex items-center justify-between text-xs text-[#555555]">
      <span>Canva • Carousel</span>
      <span class="font-bold text-[#5B1363] group-hover:translate-x-1 transition-transform">→</span>
    </div>
  </div>
</div>
```

### 🔍 Explaining the `data-*` Attributes (Modal Wiring)

| Attribute | What it does | Example |
|---|---|---|
| `data-category` | Used by the filter tabs (`social`, `branding`, `story`, etc.). Must match a filter button! | `data-category="social"` |
| `data-category-name` | Category title displayed in the popup modal | `data-category-name="Social Media Design"` |
| `data-title` | Full project title shown in the popup modal | `data-title="Aura Botanicals Carousel Kit"` |
| `data-desc` | Full case-study or project description in the modal | `data-desc="A full social media campaign..."` |
| `data-img` | Path to the high-resolution image loaded in the modal | `data-img="assets/project-branding.svg"` |
| `data-tools` | Software or methodologies used | `data-tools="Canva, Adobe Photoshop, Color Theory"` |
| `data-role` | Malak's role on the project | `data-role="Lead Visual Designer"` |

> [!TIP]
> The JavaScript lightbox modal automatically reads all `data-*` attributes dynamically without writing any new JavaScript! As long as you provide these attributes on `.portfolio-card`, clicking the card will instantly show the lightbox with your new content.

---

## 3. Editing or Removing an Existing Project

### To Edit a Project:
1. Search for the project title in `index.html` (e.g., `Aura Botanicals`).
2. Update the text, image `src`, or any of the `data-*` attributes.
3. Save `index.html` and refresh your browser.

### To Temporarily Hide a Project:
Add the CSS class `hidden` to the `.portfolio-card` container or wrap it in an HTML comment (`<!-- ... -->`):
```html
<!--
<div class="portfolio-card ...">
  ...
</div>
-->
```

### To Delete a Project:
Remove the entire `<div class="portfolio-card ..."> ... </div>` block and delete its unused image from `assets/` to keep the repository tidy.

---

## 4. Creating a New Filter Category

Currently, there are three filter categories: `social`, `branding`, and `story`.
If you want to add a new category (e.g., `print` or `video`):

### Step 1: Add the filter button in `index.html`
Locate the filter tabs around line 668 in `index.html`:
```html
<div class="mt-6 md:mt-0 flex flex-wrap gap-2">
  <button class="portfolio-filter-btn ..." data-filter="all">All</button>
  <button class="portfolio-filter-btn ..." data-filter="social">Social Media</button>
  <button class="portfolio-filter-btn ..." data-filter="branding">Branding</button>
  <button class="portfolio-filter-btn ..." data-filter="story">Visual Story</button>
  
  <!-- NEW CATEGORY BUTTON -->
  <button class="portfolio-filter-btn px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-[#555555] border border-[#ECE8F0] hover:bg-[#F5EEF7] hover:text-[#5B1363] transition-all duration-200" data-filter="print">
    Print & Editorial
  </button>
</div>
```

### Step 2: Tag cards with the new category
On any cards you want to belong to this new filter, set:
```html
data-category="print"
```

The vanilla filtering logic in `js/main.js` automatically pairs `data-filter="print"` with all elements having `data-category="print"`. No script changes needed!

---

## 5. Updating Personal & Contact Information

To maintain consistency across the entire website, update contact info in these designated spots:

### A. Email Address
1. **Contact Section Cards** (`index.html` around line 1166 & 1173):
   - Text display: `hamdymalakhamdy2@gmail.com`
   - Mailto link: `href="mailto:hamdymalakhamdy2@gmail.com"`
   - Copy button: `data-copy="hamdymalakhamdy2@gmail.com"`
2. **CV Modal Header** (`index.html` around line 1415):
   - Replace in `<p class="text-xs text-[#555555] mt-1">... hamdymalakhamdy2@gmail.com ...</p>`
3. **Text CV Generator** (`js/main.js` around line 243):
   - Replace `Email: hamdymalakhamdy2@gmail.com`

### B. Phone & WhatsApp Number
1. **Contact Section Cards** (`index.html` around line 1196 & 1203):
   - Text display: `+20 15 58698887`
   - WhatsApp URL: `href="https://wa.me/201558698887"` *(Note: use international format without `+` or spaces)*
   - Copy button: `data-copy="+201558698887"`
2. **CV Modal Header** (`index.html` around line 1415):
   - Replace in `<p class="text-xs text-[#555555] mt-1">... +20 15 58698887</p>`
3. **Text CV Generator** (`js/main.js` around line 244):
   - Replace `WhatsApp: +20 15 58698887`

### C. Adding Social Media Links (Behance, Instagram, LinkedIn)
In `index.html` inside `<section id="contact">`, you can add links to your social profiles.
Here is a ready-to-use social button template:

```html
<!-- Instagram / Behance Link Button -->
<a href="https://instagram.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" 
   class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FAFAFC] border border-[#ECE8F0] text-xs font-semibold text-[#222222] hover:text-[#5B1363] hover:border-[#5B1363]/40 transition-all">
  <svg class="w-4 h-4 text-[#5B1363]" fill="currentColor" viewBox="0 0 24 24">
    <!-- SVG Icon path here -->
  </svg>
  <span>Instagram</span>
  <span class="text-[#5B1363]">↗</span>
</a>
```

---

## 6. Updating Skills & Progress Bars

Skills are presented in `<section id="skills">` in `index.html`. The progress bars use an interactive intersection observer that animates the bar to its specified percentage when the user scrolls into view.

### How a Skill Card is structured:
```html
<div class="bg-white p-6 rounded-3xl border border-[#ECE8F0] shadow-sm hover:border-[#5B1363]/40 transition-all card-hover-lift">
  <div class="flex items-center justify-between mb-2">
    <span class="text-sm font-bold text-[#222222]">Canva Pro</span>
    <span class="text-xs font-bold text-[#5B1363]">85%</span>
  </div>
  <div class="w-full bg-[#ECE8F0] h-2.5 rounded-full overflow-hidden">
    <!-- MUST SET data-percent MATCHING THE NUMBER ABOVE -->
    <div class="skill-bar-fill h-full bg-[#5B1363] rounded-full w-0" data-percent="85%"></div>
  </div>
  <p class="text-[11px] text-[#555555] mt-2">
    Proficient in layouts, typography selection, social post templates, animations, and export formats.
  </p>
</div>
```

> [!IMPORTANT]
> When changing a skill percentage, **update both**:
> 1. The visible text label: `<span class="text-xs font-bold text-[#5B1363]">90%</span>`
> 2. The data attribute: `data-percent="90%"` (this controls the animated bar width in CSS/JS).
> Also remember to update the corresponding percentage in `js/main.js` (`cvText`) and the `#cv-modal` in `index.html`!

---

## 7. Updating the CV / Resume

The website offers two CV formats:
1. **Visual / Printable Modal** (opened when clicking "Download CV" or "View CV"). Users can view it on screen and click **Print / PDF** to save as an official styled document.
2. **Plain-Text `.txt` Download** for quick ATS submissions or raw text sharing.

### A. Updating the Visual / Printable CV
Open `index.html` and navigate to `<div id="cv-modal">` (around line 1398):
- **Header**: Name, title, contact details, and location.
- **Profile Summary**: Edit paragraph in `<div>...<p>...</p></div>`.
- **Areas of Interest**: Edit or add badges in `<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">`.
- **Technical Skills & Tools**: Edit the list items `<li>...</li>`.
- **Languages & Location**: Edit the footer strip of the modal.

### B. Updating the Plain-Text CV
Open `js/main.js` and locate `const cvText = ...` around line 241:
```javascript
const cvText = `MALAK HAMDY - CREATIVE DESIGNER & CONTENT CREATOR
Location: Alexandria, Egypt
Email: hamdymalakhamdy2@gmail.com
WhatsApp: +20 15 58698887
Portfolio: https://malakhamdy.design
...
`;
```
Edit any line in the template literal. When users click **"Download .txt"**, this updated text file will be generated and downloaded dynamically.

### C. (Optional) Replacing with a Direct PDF File Download
If Malak designs an official PDF CV (e.g., exported from Canva or InDesign):
1. Place the PDF in `assets/` (e.g. `assets/Malak_Hamdy_CV.pdf`).
2. In `index.html`, you can replace the button behavior with a direct download link:
```html
<a href="assets/Malak_Hamdy_CV.pdf" download="Malak_Hamdy_CV.pdf" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#5B1363] text-white hover:bg-[#450D4B] shadow-sm transition-all duration-300">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
  </svg>
  Download PDF CV
</a>
```

---

## 8. Updating Bio, Goals, FAQ & Process

### A. About Bio & Stats (`#about`)
- Located at line ~289 in `index.html`.
- Bio paragraphs highlight Malak's background in Alexandria, focus on digital storytelling, and creative values.
- Metric badges (e.g., *100% Passion & Commitment*, *Continuous Learner*, *Open for Work*) can be adjusted directly in the markup.

### B. Future Goals & Milestones (`#goals`)
- Located at line ~927 in `index.html`.
- To update the inspirational quote, edit the `<blockquote>` text.
- To update the 3 milestone cards (*Short-Term Focus*, *Mid-Term Goal*, *Long-Term Vision*), edit the titles and bullet points in this section.

### C. Adding or Modifying FAQ Items
- Located around line ~1064 in `index.html`.
- Each FAQ item uses the `.faq-item` wrapper:

```html
<!-- Single FAQ Item -->
<div class="faq-item bg-white rounded-2xl border border-[#ECE8F0] overflow-hidden transition-all duration-200 hover:border-[#5B1363]/40">
  <button type="button" class="faq-trigger w-full flex items-center justify-between p-6 text-left focus:outline-none" aria-expanded="false">
    <span class="text-sm sm:text-base font-bold text-[#222222]">
      What is your question here?
    </span>
    <div class="faq-icon ml-4 shrink-0 w-8 h-8 rounded-full bg-[#FAFAFC] border border-[#ECE8F0] flex items-center justify-center text-[#5B1363] transition-transform duration-300">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </button>
  <div class="faq-answer hidden px-6 pb-6 pt-2 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-[#ECE8F0]">
    Write the detailed answer here. The accordion will automatically toggle when clicked!
  </div>
</div>
```

The accordion script in `js/main.js` automatically binds to all `.faq-item` elements and manages smooth opening/closing.

---

## 9. Image & Asset Guidelines

To keep the website blazing fast and visually sharp:

| Asset Type | Recommended Dimensions | Recommended Formats | Maximum File Size |
|---|---|---|---|
| **Personal Profile Photo** | `800×800px` (1:1 square) or `1000×1200px` | JPG, WebP | `< 300 KB` |
| **Portfolio Project Mockup** | `1200×900px` (4:3 ratio) | WebP, JPG, SVG | `< 450 KB` |
| **Icons / Vector Badges** | Native SVG scale | SVG | `< 30 KB` |
| **Social / OpenGraph Share Image** | `1200×630px` (1.91:1 ratio) | JPG, PNG | `< 500 KB` |

### Replacing the Profile Photo:
1. Crop Malak's new photo cleanly.
2. Save it as `assets/personal_photo.jpg` (or update the filename in `index.html` at the hero image `<img src="assets/personal_photo.jpg" ...>`).
3. If changing the filename, also update the OpenGraph preview tag:
   ```html
   <meta property="og:image" content="assets/new_photo.jpg">
   ```

---

## 10. Local Testing & Deployment Checklist

### Pre-Deployment Quality Checklist
Before publishing your updates, verify the following:
- [ ] **Open in Browser**: Double-click `index.html` or run with VS Code Live Server.
- [ ] **Test Project Modals**: Click each project card on the homepage. Does the modal open? Does it show the correct image, title, and tools?
- [ ] **Test Filter Tabs**: Click *All*, *Social Media*, *Branding*, etc. Do the right cards show and hide smoothly?
- [ ] **Test CV Modal & Actions**: Click "Download CV". Test both "Print / PDF" and "Download .txt".
- [ ] **Test Contact Form**: Submit an empty form to check validation; submit valid info to see the toast notification.
- [ ] **Test Mobile Responsive View**: Open Browser DevTools (`F12`), toggle mobile device mode, and test the hamburger menu drawer.

### How to Deploy Updates
Because this site consists of static files with no build process required, deployment is immediate:

1. **GitHub Pages (Free)**:
   - Commit your changes:
     ```bash
     git add .
     git commit -m "Update portfolio projects and contact details"
     git push origin main
     ```
   - In GitHub repository settings, set Pages source to the `main` branch.
2. **Netlify or Vercel (Free)**:
   - Connect the GitHub repository or drag-and-drop the project folder directly onto the Netlify/Vercel dashboard.
3. **Traditional Web Hosting (cPanel / FTP)**:
   - Upload `index.html`, `css/`, `js/`, and `assets/` directly into the `public_html/` root folder.

---

## 11. Troubleshooting Common Issues

### ❓ Issue 1: "The Project Lightbox Modal opens, but the text is blank or shows previous project info."
- **Cause**: One of the `data-*` attributes (`data-title`, `data-desc`, `data-tools`, etc.) is missing or mistyped on the `.portfolio-card` container.
- **Fix**: Verify that all 6 data attributes (`data-category`, `data-category-name`, `data-title`, `data-desc`, `data-img`, `data-tools`, `data-role`) exist on the card div.

### ❓ Issue 2: "A project disappears when I click a filter button."
- **Cause**: The card's `data-category` does not match the button's `data-filter`.
- **Fix**: Check spelling. For example, if the button has `data-filter="social"`, the card must have `data-category="social"`.

### ❓ Issue 3: "The skill bar doesn't animate or stays empty."
- **Cause**: The `data-percent` attribute was omitted or lacks the `%` symbol.
- **Fix**: Ensure the fill element looks like: `<div class="skill-bar-fill ... w-0" data-percent="85%"></div>`.

### ❓ Issue 4: "My new image looks stretched or distorted."
- **Cause**: The image has an incompatible aspect ratio.
- **Fix**: Ensure your thumbnail has an aspect ratio close to **4:3** (e.g., 1200×900 or 800×600). The CSS uses `object-cover`, which crops evenly if the ratio is preserved.

---

*Need further adjustments or new feature implementations? Refer to the main [README.md](file:///d:/Educational_Content/DEPI/FREELANCING/Mockup%20Projects/malak_hamdy/README.md) or open an issue.*
