# Orestias

Marketing site for Orestias, built with React, TypeScript, and Vite. Includes i18n content (en, tr, de, es), motion, and a contact form powered by EmailJS.

## Tech Stack
- React 19 + TypeScript
- Vite 6
- Tailwind CSS
- Framer Motion
- i18next
- three.js (via react-three-fiber/drei)

## Getting Started
1. Install dependencies:
   `npm install`
2. Start the dev server:
   `npm run dev`
3. Open the app at the URL Vite prints in the terminal.

## Scripts
- `npm run dev` Start the development server
- `npm run build` Type-check and build for production
- `npm run preview` Preview the production build
- `npm run lint` Run ESLint

## Environment Variables
The contact form expects EmailJS configuration in a `.env` file:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Example:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Build Output
Production files are generated into `dist/`.
