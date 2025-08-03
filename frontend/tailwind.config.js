/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       'primary': {
          '50': '#f4eff5',
          '100': '#eabaf7',
          '200': '#dc8cf2',
          '300': '#ce5eed',
          '400': '#c030e8',
          '500': '#a617cf',
          '600': '#8112a1',
          '700': '#5c0d73',
          '800': '#370845',
          '900': '#120317',
        },
        'secondary': {
          '50': '#f5eff4',
          '100': '#f395e4',
          '200': '#ea43ce',
          '300': '#bc15a0',
        },
        accent: {
          DEFAULT: '#10B981', // green-500
          light: '#6EE7B7',
        },
        danger: {
          DEFAULT: '#EF4444', // red-500
          light: '#FCA5A5',
        },
        bg: {
          base: '#F9FAFB',     // gray-50
          soft: '#F3F4F6',     // gray-100
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
} 
