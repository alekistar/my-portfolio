# 🌌 Alex Opiyo Odhiambo — Portfolio

A polished, animation-rich portfolio built to showcase modern engineering craft: continuous name animation, dark/light themes, motion-first UX, and a conversion-ready contact flow.

## 🚀 Live & Project Links
- Production: Pending (Netlify ready)
- Repo: [alekistar/codespaces-react](https://github.com/alekistar/codespaces-react)

## ✨ Highlights
- Framer Motion animations (hero, cards, name characters, scroll reveals)
- Dark/light theme toggle with persistence
- Responsive layout tuned for mobile-first viewing
- Professionally structured sections: Hero, Services, Skills, About, Tools, Contact, Footer
- Formspree-powered contact form (Form ID: `xwvorzbe`)
- Socials wired: LinkedIn, GitHub, Instagram (@its_official_lex_P)

## 🛠 Tech Stack
- React 18 + Vite
- Framer Motion, React Icons
- CSS (hand-crafted, no UI frameworks)
- Context API for theming

## 📦 Getting Started
```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build in /dist
npm run preview  # preview production build locally
```

## 🌐 Deploy to Netlify (CI from GitHub)
1) Connect repo on Netlify → New site from Git → pick `alekistar/codespaces-react`.
2) Build command: `npm run build`
3) Publish directory: `dist`
4) Deploy. For a name.com domain:
	- A record: `@` → `75.2.60.5`
	- CNAME: `www` → your Netlify subdomain
5) Enable HTTPS in Netlify.

## 🎯 What Employers Should Notice
- **Interaction polish:** continuous hero-name wave, staggered reveals, hover micro-interactions.
- **UX focus:** clear CTAs (“Hire Me”, “View Services”), pricing cards, social proof stats.
- **Performance discipline:** Vite build, lean CSS, no heavy UI frameworks.
- **Maintainability:** componentized structure, theme context, clear file organization.

## 🧭 Personalization Map
- Name animation: [src/components/AnimatedName.jsx](src/components/AnimatedName.jsx)
- Hero stats: [src/components/Hero.jsx](src/components/Hero.jsx)
- Services/pricing: [src/components/Services.jsx](src/components/Services.jsx)
- About copy/stats: [src/components/About.jsx](src/components/About.jsx)
- Contact/socials/Formspree ID: [src/components/Contact.jsx](src/components/Contact.jsx) and [src/components/Footer.jsx](src/components/Footer.jsx)

## ✅ Production Checklist
- [ ] Update domain in Netlify
- [ ] Verify Formspree emails (Form ID `xwvorzbe`)
- [ ] Test contact form success path
- [ ] Run `npm run build` (passes)

## 📄 License
Personal portfolio project. You may reference structure/ideas; keep attribution appreciated.
