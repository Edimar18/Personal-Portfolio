/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F4F2ED',
        'paper-dim': '#E7E3DA',
        ink: '#0E0E0D',
        'ink-soft': '#2A2A28',
        graphite: '#6B6862',
        ash: '#B8B3A8',
        hairline: '#CFC9BC',
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        plate: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
