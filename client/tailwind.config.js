/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: {
          max: '684px',
        },
        tablet: { min: '684px', max: '1016px' },
        laptop: { min: '1016px', max: '1348px' },
        desktop: '1348px',
      },
      animation: { bounce200: 'bounce 1s infinite 200ms', bounce400: 'bounce 1s infinite 400ms' },
    },
    minWidth: {
      fill: '-webkit-fill-available',
    },
    maxWidth: {
      160: '640px',
      240: '960px',
    },
  },
  plugins: [],
};
