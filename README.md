<!-- @format -->

# Vardaan Srivastava's Portfolio

A modern, interactive portfolio showcasing engineering projects and skills. Built with React, TypeScript, and Tailwind CSS using the Mechfolio-Studio design system. Fully static and deployed on GitHub Pages.

## ✨ Features

- 📱 Responsive design (mobile, tablet, desktop)
- ⚡ Client-side routing with fast navigation
- 🎨 Modern dark theme with professional styling
- 📊 Dynamic projects with filtering
- 🏷️ Categorized skills showcase
- 📝 Markdown-based project descriptions
- 🔍 SEO optimized
- ⚙️ No build server required

## 🚀 Quick Start

### Development

```powershell
npm install
npm run dev
# Open http://localhost:5173
```

### Production Build

```powershell
npm run build
npm run preview
```

### Deploy

The `dist/` folder contains your complete static website. Deploy to GitHub Pages or any static hosting.

## 📁 Structure

```
res/                    # Your data and images
├── projects/          # All your projects
│   ├── 00_Reference_Example/
│   ├── 01_Travelling_Flame/
│   └── ...
├── skills/            # Skill icons
├── ach.md             # Achievements
└── PoR.md             # Experiences

client/               # React application
├── src/
│   ├── components/
│   ├── pages/
│   └── lib/data.ts   # Data loader
└── public/

docs/                 # Documentation
├── MIGRATION_COMPLETE.md
└── MIGRATION_STATUS.md

oldcode/              # Original HTML/CSS/JS backup
```

## 🛠️ Customization

**Update contact info**: Edit `client/src/lib/data.ts` getContactInfo()

**Change hero section**: Edit `client/src/components/Hero.tsx`

**Add/edit projects**: Create folders in `res/projects/` with `init.md` and `Details.md`

**Update skills**: Edit `res/skills/icons.json` and add icons to `res/skills/icons/`

## 📚 Documentation

- **[MIGRATION_COMPLETE.md](docs/MIGRATION_COMPLETE.md)** - Full migration details
- **[MIGRATION_STATUS.md](docs/MIGRATION_STATUS.md)** - Setup instructions

## 🎨 Stack

- **Frontend**: React 18, TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS, Shadcn/UI
- **Routing**: Wouter
- **Markdown**: react-markdown

## 📝 Project Format

Create projects in `res/projects/ProjectId/`:

**init.md**:

```
Project Title - Your Project
Project Brief - Short description
Project Image - image.jpg
Project Tags - Python, CAD, Embedded
Project Details - Details.md
```

**Details.md**: Full project description in Markdown (supports GitHub Flavored Markdown)

## 🚢 Deployment

**GitHub Pages**:

1. Build: `npm run build`
2. Push `dist/` folder to your repository
3. Configure Pages in repo settings

**Other Hosts**: Deploy the `dist/` folder to Vercel, Netlify, etc.

## 📄 License

Your portfolio, your rules!

---

**Last Updated**: December 16, 2025 | **Status**: ✅ Production Ready
