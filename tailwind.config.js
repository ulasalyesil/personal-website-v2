/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Variable"', ...defaultTheme.fontFamily.sans],
        mono: ['"Geist Mono Variable"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
