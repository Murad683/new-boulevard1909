# Boulevard 1909 – Restaurant Website

A modern, minimalist, and fully responsive website for **Boulevard 1909**, a premium restaurant in Azerbaijan.  
Designed to highlight the brand’s atmosphere, cuisine, and location with a clean and elegant UI.

---

## 🌐 Live Demo

👉 **Vercel:** https://boulevard1909.vercel.app/

---

## 🧰 Tech Stack

- ⚛️ **React** (SPA architecture)
- 🟦 **TypeScript**
- ⚡ **Vite** – fast dev server & bundler
- 🎨 **Tailwind CSS**
- 🧩 **shadcn/ui** + **Radix UI** primitives
- 🧭 **React Router DOM** – client-side routing
- 🧪 **Zod**, **React Hook Form** – for typed & validated forms (where applicable)

---

## ✨ Features

- **Hero section** with strong brand identity and primary call-to-action  
- **About / Story** section introducing Boulevard 1909 and its concept  
- **Menu highlights** to showcase key dishes and categories  
- **Ambience / Atmosphere** focused layout (imagery, typography, spacing)  
- **Location & contact information** (address, map / directions, contact entry points)  
- **Call-to-action buttons** for booking, calling, or messaging  
- **Responsive design** – optimized for desktop, tablet, and mobile  
- **Modern UI** with generous whitespace, smooth spacing, and consistent components  

> Section names/content can be adapted as the restaurant’s real data evolves.

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/Murad683/new-boulevard1909.git
cd new-boulevard1909
2. Install dependencies
Using npm:

bash
Kodu kopyala
npm install
İstəsən bun və ya pnpm də istifadə edə bilərsən, amma npm heç bir əlavə konfiqurasiya olmadan işləyir.

3. Run development server
bash
Kodu kopyala
npm run dev
Sonra terminalda çıxan linki (adətən http://localhost:5173) brauzerdə aç.

4. Create production build
bash
Kodu kopyala
npm run build
İstəyə bağlı: production build-i lokalda test etmək üçün:

bash
Kodu kopyala
npm run preview
📁 Project Structure (High-Level)
text
Kodu kopyala
new-boulevard1909/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components (shadcn/ui based)
│   ├── pages/            # Route-level pages (home, etc.)
│   ├── lib/              # UI helpers, utils, config
│   ├── styles/           # Global styles (if any)
│   └── main.tsx          # App entry, router setup
├── index.html            # Root HTML template
├── package.json          # Scripts & dependencies
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig*.json        # TypeScript configuration
└── vite.config.ts        # Vite configuration
