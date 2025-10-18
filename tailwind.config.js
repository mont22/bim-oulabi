/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#00A76F',
        'primary-light': 'rgba(0, 167, 111, 0.08)',
        'primary-border': 'rgba(0, 167, 111, 0.48)',
        secondary: '#8E33FF',
        'secondary-light': 'rgba(142, 51, 255, 0.16)',
        error: '#B71D18',
        'error-light': 'rgba(255, 86, 48, 0.16)',
        success: '#118D57',
        'success-light': 'rgba(34, 197, 94, 0.16)',
        'text-primary': '#212B36',
        'text-secondary': '#637381',
        'text-tertiary': '#919EAB',
        'text-disabled': 'rgba(145, 158, 171, 0.48)',
        background: '#FFFFFF',
        'background-gray': '#F9FAFB',
        'background-input': 'rgba(145, 158, 171, 0.08)',
        border: '#A8B2BC',
        'border-light': 'rgba(145, 158, 171, 0.32)',
      },
      fontFamily: {
        'public-sans': ['Public Sans'],
        'barlow': ['Barlow'],
      },
    },
  },
  plugins: [],
}

