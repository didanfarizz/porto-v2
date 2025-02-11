/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
import withMT from '@material-tailwind/react/utils/withMT';

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F0716',
        purple: '#482A81',
        primary: '#8350EB',
        darkPurple: '#2D135A',
        white: '#D8D9DB',
        foreground: '#060709',
        secondary: '#140B1C',
      },
    },
  },
  plugins: [flowbitePlugin], // Use the imported Flowbite plugin
},);
