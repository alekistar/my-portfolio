# 🚀 Professional Portfolio Website

A stunning, modern portfolio website built with React, featuring smooth animations, dark/light theme toggle, and a complete professional presentation.

## ✨ Features

### 🎨 Modern Design
- **Dark Mode by Default** with seamless light/dark theme toggle
- **Vibrant Color Scheme** with gradient effects
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** - looks perfect on all devices
- **Custom Scrollbar** with gradient styling

### 📱 Sections Included

1. **Hero Section**
   - Bold headline showcasing Full-Stack Web Developer
   - Animated floating cards
   - CTA buttons: "Hire Me" and "View Services"
   - Professional statistics display

2. **Services Section**
   - Static Website Development - $150
   - Dynamic Website Development - $400
   - Deployment & Hosting:
     - Static websites: $8/month
     - Dynamic websites: $15/month
   - Beautiful pricing cards with hover effects

3. **Skills Section**
   - Web Development (Frontend & Backend)
   - Hosting & Deployment
   - AI & Machine Learning
   - Writing & Content Writing
   - Video Editing
   - Graphic Design
   - Social Media Management
   - Animated skill bars showing proficiency levels

4. **About Me Section**
   - Professional story
   - Co-curricular activities:
     - Sports: Hockey
     - Music: Piano, Saxophone, Drum Set
   - Key stats and achievements

5. **Tools & Technologies**
   - Frontend: JavaScript, HTML5, CSS3, Tailwind, React
   - Backend: Node.js, Python
   - Databases: MongoDB, PostgreSQL
   - Tools: GitHub, Vercel, Figma
   - Organized by categories with icon displays

6. **Contact Section**
   - Professional contact form
   - Multiple contact methods:
     - Email
     - Phone
     - WhatsApp
     - Instagram
     - LinkedIn
     - GitHub
   - Social media links with hover effects

7. **Footer**
   - Social links
   - Quick navigation
   - Copyright information
   - Scroll to top button

### 🎭 Animations & Effects

- **Scroll-based animations** - elements fade in as you scroll
- **Hover effects** on all interactive elements
- **Smooth page transitions**
- **Floating animations** on hero cards
- **Gradient text effects**
- **Card hover lift effects**
- **Icon rotation on hover**
- **Progress bar animations**

## 🛠️ Technologies Used

- **React 18** - UI library
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Vite** - Build tool
- **CSS3** - Styling with custom properties
- **Context API** - Theme management

## 🎯 Customization Guide

### Update Personal Information

1. **Contact Information** ([Contact.jsx](src/components/Contact.jsx)):
   ```jsx
   // Line 55-62: Update email
   href="mailto:your.email@example.com"
   
   // Line 64-71: Update phone
   href="tel:+1234567890"
   
   // Lines 47-53: Update social media URLs
   ```

2. **Social Links** (Update in both [Contact.jsx](src/components/Contact.jsx) and [Footer.jsx](src/components/Footer.jsx)):
   - WhatsApp: Replace `https://wa.me/1234567890` with your number
   - Instagram: Replace `https://instagram.com/yourusername`
   - LinkedIn: Replace `https://linkedin.com/in/yourprofile`
   - GitHub: Replace `https://github.com/yourusername`

3. **Footer** ([Footer.jsx](src/components/Footer.jsx)):
   ```jsx
   // Line 89: Update copyright name
   Made with <FiHeart /> by Your Name
   ```

4. **About Section** ([About.jsx](src/components/About.jsx)):
   - Customize the personal story (lines 40-60)
   - Update statistics (lines 67-80)

5. **Services Pricing** ([Services.jsx](src/components/Services.jsx)):
   - Modify prices and features (lines 10-40)

### Theme Colors

Edit gradient colors in any component CSS file:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Popular color combinations:
- Purple/Blue: `#667eea, #764ba2`
- Pink/Red: `#f093fb, #f5576c`
- Cyan/Blue: `#4facfe, #00f2fe`
- Green/Teal: `#43e97b, #38f9d7`

### SEO Optimization

The portfolio is SEO-ready with:
- Semantic HTML structure
- Meta descriptions in [index.html](index.html)
- Fast loading times
- Mobile-responsive design
- Proper heading hierarchy

## 🚀 Deployment

### Deploy to Netlify (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://www.netlify.com/)
   - Drag & drop the `dist` folder
   - OR connect your Git repository for continuous deployment

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

### Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   "homepage": "https://yourusername.github.io/portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## 📦 Scripts

```bash
npm start      # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## 🎨 Component Structure

```
src/
├── components/
│   ├── Navbar.jsx & Navbar.css
│   ├── Hero.jsx & Hero.css
│   ├── Services.jsx & Services.css
│   ├── Skills.jsx & Skills.css
│   ├── About.jsx & About.css
│   ├── Tools.jsx & Tools.css
│   ├── Contact.jsx & Contact.css
│   └── Footer.jsx & Footer.css
├── context/
│   └── ThemeContext.jsx
├── App.jsx
├── App.css
└── index.css
```

## 🌟 Key Features Checklist

- ✅ Dark/Light theme toggle
- ✅ Smooth scroll navigation
- ✅ Responsive mobile design
- ✅ Contact form
- ✅ Social media integration
- ✅ Professional animations
- ✅ SEO optimized
- ✅ Fast loading
- ✅ Modern UI/UX
- ✅ Pricing display
- ✅ Skills showcase
- ✅ About section
- ✅ Tools & tech stack

## 🎓 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 License

This portfolio template is free to use and customize for your personal portfolio.

## 🤝 Support

For issues or questions:
1. Check the component files for inline comments
2. Review this README
3. Ensure all dependencies are installed
4. Check browser console for errors

---

**Made with ❤️ using React + Framer Motion**

🚀 **Your portfolio is ready to impress!** Just customize the personal details and deploy.
