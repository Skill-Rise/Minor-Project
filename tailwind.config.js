/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js}",
      "./public/**/*.html",
    ],
    theme: {
      extend: {
        colors: {
          teal: {
            400: '#4fd1c5',
            500: '#38b2ac',
          },
          zinc: {
            400: '#a1a1aa',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
            950: '#09090b',
          },
          yellow: {
            500: '#ecc94b',
          },
          indigo: {
            400: '#7f9cf5',
            500: '#667eea',
          }
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        },
        borderRadius: {
          'xl': '0.75rem',
          '2xl': '1rem',
        },
      },
    },
    plugins: [],
  }