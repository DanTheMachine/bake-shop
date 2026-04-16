import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Playful & Colorful Palette
        primary: {
          50: '#fff1f5',
          100: '#ffe4ec',
          200: '#ffccd9',
          300: '#ffa3bc',
          400: '#ff6b9d',
          500: '#ff3d7f',
          600: '#ed1461',
          700: '#c70d4f',
          800: '#a40f47',
          900: '#8b1142',
        },
        secondary: {
          50: '#fffbf5',
          100: '#fff4e0',
          200: '#ffe5b4',
          300: '#ffd68a',
          400: '#ffc75f',
          500: '#ffb835',
          600: '#f5a623',
          700: '#d48806',
          800: '#b07203',
          900: '#8f5d02',
        },
        accent: {
          mint: '#a8e6cf',
          lavender: '#e1bee7',
        },
        neutral: {
          charcoal: '#333333',
          cream: '#fffbf5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-baloo)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'playful': '0 4px 20px -2px rgba(255, 107, 157, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
