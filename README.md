# Ayush Tripathi — Personal Portfolio

A personal portfolio website built with React, TypeScript, and Tailwind CSS, deployed on Vercel. It showcases my background, work experience, projects, live competitive-programming metrics, and includes an AI-powered chat interface.

---

## ✨ Features

- **About** — Hero section with profile photo, bio, and an infinite scrolling tech-stack marquee
- **Experience** — Timeline of work experience
- **Projects** — Cards fetched from a backend API with an expanded detail modal
- **System Nodes / Metrics** — Live stats pulled from GitHub, LeetCode, and Codeforces APIs, plus links to LinkedIn and Resume
- **Sponsor** — Wall of fame and sponsorship gateway
- **Contact** — Contact form
- **AI Chat** — Floating AI chat modal (triggered via the nav button)
- **Admin Dashboard** — Hidden admin route at `/sudo`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite v8 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/fierce-adventurer/ayushtripathi.git
cd ayushtripathi/frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file inside the `frontend/` directory:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

The production build is output to `frontend/dist/`.

### Preview Production Build Locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 📁 Project Structure

```
ayushtripathi/
├── frontend/
│   ├── public/              # Static assets (favicon, profile image, etc.)
│   ├── src/
│   │   ├── components/      # React components (one per section)
│   │   │   ├── AboutSection.tsx
│   │   │   ├── AgenticHero.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ChatModal.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── DashboardNav.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── MetricsSection.tsx
│   │   │   ├── ProfileSidebar.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── SponsorSection.tsx
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Root component & routing
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vercel.json          # Vercel SPA rewrite rules
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

---

## ☁️ Deployment

The site is deployed on **Vercel**. All routes are rewritten to `index.html` for client-side routing (configured in `frontend/vercel.json`).

To deploy manually:

1. Install the Vercel CLI: `npm i -g vercel`
2. From the `frontend/` directory, run: `vercel --prod`

Or connect the GitHub repository to a Vercel project for automatic deployments on every push.

---

## 📬 Contact

- **GitHub**: [fierce-adventurer](https://github.com/fierce-adventurer)
- **LinkedIn**: [ayush-tripathi](https://www.linkedin.com/in/ayush-tripathi)
- **LeetCode**: [ayushtripathi2005](https://leetcode.com/u/ayushtripathi2005/)
- **Codeforces**: [fierce-adventurer](https://codeforces.com/profile/fierce-adventurer)

---

## 📄 License

This project is licensed under the terms of the [LICENSE](LICENSE) file.
