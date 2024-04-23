/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      indigo: {
        50: '#EEE',
        100: '#DDD',
        200: '#CCC',
        300: '#BBB',
        400: '#AAA',
        500: '#b86363', // Default indigo-500
        600: '#8f2323', // Your custom color
        700: '#777',
        800: '#666',
        900: '#555',
      },
      extend: {},
    },
    plugins: [],
  }
}
