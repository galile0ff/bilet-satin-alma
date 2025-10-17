/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background-rgb))',
        foreground: 'rgb(var(--foreground-rgb))',
        // Marka Renkleri
        brand: {
          primary: '#5EC576',    // Ana yeşil
          secondary: '#A8E6CF',  // Açık yeşil
          accent: '#FFD166',     // Sarı vurgu
          neutral: '#2F3E46',    // Koyu gri
          light: '#F7FDF9',      // Çok açık yeşil-beyaz
        },
        // ek renkler
        morphism: {
          surface: 'rgba(255, 255, 255, 0.8)',
          shadow: 'rgba(0, 0, 0, 0.1)',
          border: 'rgba(0, 0, 0, 0.05)',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'morph-in': 'morphIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        morphIn: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'morphism': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'morphism-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
