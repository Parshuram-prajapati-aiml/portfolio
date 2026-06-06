## Parshuram Prajapati — Portfolio

A modern developer portfolio built with React, Vite and Tailwind-inspired utilities. It showcases projects (web, desktop, and ML), contact form integration, and smooth interactive animations using GSAP and Lenis.

Live demo: https://portfolio-ya44.onrender.com

## Features

- Responsive, mobile-first layout and components
- Animated hero, project showcase cards and testimonials
- Contact form that sends via EmailJS and opens a WhatsApp notification
- Smooth scrolling via Lenis and scroll-triggered animations with GSAP
- Lightweight, Vite-powered dev workflow

## Tech Stack

- React
- Vite
- Tailwind-style utilities (custom CSS)
- GSAP (ScrollTrigger)
- Lenis (smooth scrolling)
- AOS (optional scroll animations)
- EmailJS for contact form

## Quick Start

Prerequisites:
- Node.js 18+ recommended
- Git

1. Clone the repo

```bash
git clone https://github.com/Parshuram-prajapati-aiml/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
```

3. Local development

```bash
npm run dev
# open http://localhost:5173 (or the port Vite reports)
```

4. Build for production

```bash
npm run build
npm run preview
```

## Environment / Secrets

The project uses EmailJS to send contact form messages. Configure these values on deployment or locally as needed inside `src/utils/emailService.js` or via environment variables if you refactor:

- SERVICE_ID (EmailJS service id)
- TEMPLATE_ID (EmailJS template id)
- PUBLIC_KEY (EmailJS public key)

Note: The repository currently contains example values. Replace with your own values from https://dashboard.emailjs.com/ before using in production.

## Deploy

This repo is compatible with static hosting providers supporting SPA routing (Netlify, Vercel, Render). Example: Vercel

```bash
vercel --prod
```

Or deploy the `dist/` output from `npm run build` to your preferred static host.

## Contributing

- Fork the repo, create a feature branch, open a PR describing your changes.
- Keep commits small and focused.

## Troubleshooting

- If the contact form doesn't appear to submit, check browser console for network errors and verify EmailJS credentials in `src/utils/emailService.js`.
- If elements overlap on small screens, run `npm run dev` and test with device emulator. Z-index values and pointer-events are the usual culprits.

## License

MIT — feel free to reuse and modify.

---

If you'd like, I can:
- Add a `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
- Move EmailJS config to environment variables and document `.env` usage.
- Add a simple GitHub Actions workflow to run lint/build on push.

Which would you like next?wc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
