# Portfolio — Modern Developer Showcase

A premium, single-page portfolio with a Studio Ghibli-inspired aesthetic—calm, magical, and nature-first while staying tech-forward.

---

## 🚀 Quick Start

### Option 1: Direct Open (Fastest)
1. Navigate to `frontend` folder
2. Double-click `index.html`
3. Opens in your default browser

### Option 2: Local Server (Recommended)
```bash
cd frontend
python -m http.server 8000
```
Then open: http://localhost:8000

---

## ✨ Features

- **Hero Section**: Fog layers, poetic headline, scroll indicator
- **Projects Showcase**: 6 sample cards with filters (All/Mobile/Web/Full-Stack), hover effects, modal details
- **Skills Constellation**: Floating orb layout grouped by category
- **Experience Timeline**: Vertical timeline with glowing milestones
- **About Section**: Editorial two-column layout
- **Contact CTA**: Poetic call-to-action with glowing button
- **Theme Toggle**: Dark (default) and light modes with smooth transitions
- **Atmospheric Effects**: Glassmorphism, film grain, particles, ambient glows

---

## 🎨 Customization Guide

### 1. Personal Information (2 minutes)

**File: `frontend/index.html`**

- **Line 29**: Update navbar initial
  ```html
  <div class="nav-left">R</div>
  <!-- Change to your initial or name -->
  ```

- **Line 287**: Update contact email
  ```html
  <a href="mailto:hello@example.com" ...>
  <!-- Change to your email -->
  ```

### 2. Projects (5 minutes)

**File: `frontend/js/projects-data.js`**

Edit the `projectsData` array with your projects:

```javascript
{
   id: 1,
   title: "Your Project Name",
   category: "Mobile Development", // For filtering
   shortDesc: "Brief one-line description",
   fullDesc: "Detailed description with impact, technologies, and achievements",
   tags: ["Flutter", "Firebase", "REST API"],
   image: "assets/projects/your-image.jpg",
   demoUrl: "https://your-demo-link.com",
   githubUrl: "https://github.com/yourusername/project",
   features: [
      "Key feature 1",
      "Key feature 2",
      "Key feature 3"
   ],
   year: "2024",
   role: "Full-Stack Developer"
}
```

**Project Images:**
- Place in `frontend/assets/projects/`
- Recommended size: 1200×900px (4:3 ratio)
- Optimize to < 500KB
- Don't have images? Beautiful placeholders show automatically

**Available Categories:**
- Mobile Development
- Full-Stack Development
- Web Application
- Mobile & AI
- IoT & Web
- Data Analytics

### 3. Skills (2 minutes)

**File: `frontend/index.html` (around line 161-203)**

Add/modify skill orbs:

```html
<div class="skill-orb" data-category="mobile">
   <span class="skill-icon">📱</span>
   <span class="skill-name">Your Skill</span>
</div>
```

**Popular Icons:**
- 📱 Mobile | ⚙️ Backend | 🔗 APIs | 🏛️ Architecture
- ☁️ Cloud | ⚛️ React | 🗄️ Database | 🛠️ Tools
- 🐍 Python | 🔥 Firebase | 🎨 Design

### 4. Experience (2 minutes)

**File: `frontend/index.html` (around line 205-242)**

Update timeline items:

```html
<div class="timeline-item">
   <div class="timeline-dot"></div>
   <div class="timeline-content glass-card">
      <span class="timeline-year">2024 – Present</span>
      <h3>Your Position/Technology</h3>
      <p>What you did and achieved.</p>
   </div>
</div>
```

### 5. About Section (2 minutes)

**File: `frontend/index.html` (around line 244-276)**

Update your story and values list.

### 6. Colors & Branding

**File: `frontend/css/variables.css`**

Customize the color palette:

```css
--primary: #your-color;
--secondary: #your-color;
--accent: #your-color;
--glow: #your-color;
```

---

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── assets/
│   │   ├── projects/         # Project screenshots
│   │   └── figures/          # SVG figures
│   ├── css/
│   │   ├── variables.css     # Color palette & design tokens
│   │   ├── base.css          # Base styles & resets
│   │   ├── layout.css        # Layout utilities
│   │   ├── components.css    # Reusable components
│   │   └── sections.css      # Section-specific styles
│   ├── js/
│   │   ├── projects-data.js  # Projects data
│   │   ├── projects.js       # Projects logic & modal
│   │   ├── theme.js          # Dark/light theme toggle
│   │   ├── scroll.js         # Scroll animations
│   │   └── main.js           # Particles & main effects
│   └── index.html            # Main HTML file
└── README.md
```

---

## 🚢 Deployment

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Enable on `main` branch
3. Set root directory to `/` or `/frontend`

### Netlify
1. Drag-drop the `frontend` folder
2. Or connect GitHub repo with root = `frontend`

### Vercel
1. Import GitHub repo
2. Set root directory to `frontend`
3. Deploy

---

## 💡 Pro Tips

### Writing Project Descriptions
- **Focus on impact and results**
  - ❌ "Built an app with Flutter"
  - ✅ "Built a mobile app serving 50,000+ users with 4.8★ rating"

- **Include metrics**
  - User numbers
  - Performance improvements
  - Revenue impact
  - Awards or recognition

### Image Best Practices
1. Use mockup generators for mobile apps
2. Screenshot best UI screens
3. Use Figma for polished presentations
4. Compress with [TinyPNG](https://tinypng.com/)

### Keep It Updated
- Add new projects regularly
- Update skills as you learn
- Refresh experience section
- Test on multiple devices

---

## 🔧 Troubleshooting

### Projects Not Showing?
- Check browser console (F12) for errors
- Verify `projects-data.js` loads before `projects.js`
- Ensure valid JSON syntax (commas, brackets)

### Modal Not Opening?
- Check that project IDs are unique
- Verify click handlers are attached
- Test in browser dev tools

### Images Not Loading?
- Verify file paths match exactly
- Check files exist in `/frontend/assets/projects/`
- Confirm correct extensions (.jpg, .png)

### Styles Missing?
- Verify CSS links in `index.html`
- Hard-refresh cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check file paths are correct

### Particles Not Animating?
- Confirm JavaScript is enabled
- Try disabling browser extensions
- Check console for errors

---

## 🎯 Checklist

### Initial Setup
- [ ] Update name/initial in navbar
- [ ] Change contact email
- [ ] Add your projects to `projects-data.js`
- [ ] Update skills section
- [ ] Modify experience timeline
- [ ] Personalize about section

### Polish
- [ ] Add project screenshots
- [ ] Update demo and GitHub links
- [ ] Test all filters work
- [ ] Verify modal displays properly
- [ ] Test theme toggle
- [ ] Check mobile responsiveness

### Pre-Launch
- [ ] Test in different browsers
- [ ] Verify all links work
- [ ] Optimize images
- [ ] Clear placeholder content
- [ ] Update meta tags for SEO
- [ ] Test on mobile devices

---

## 📱 Mobile Responsiveness

The portfolio is fully responsive:
- Cards stack on mobile
- Modal adapts to small screens
- Touch-friendly interactions
- Optimized for all device sizes

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid & Flexbox
- **Vanilla JavaScript** - No frameworks or dependencies
- **Canvas API** - Particle effects
- **CSS Variables** - Easy theming

---

## 📄 License

Free for personal portfolio use. A credit/link is appreciated but not required.

---

## 🌿 Design Inspiration

Built with inspiration from Studio Ghibli's serene forests and modern SaaS polish—blending nature's calm with technical excellence.

---

**Ready to launch?** Update the content, add your projects, and show the world what you've built! ✨
