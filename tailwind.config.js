/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)'],
        mono: ['var(--font-mono)'],
        body: ['var(--font-body)'],
      },
      colors: {
        accent: '#C8FF00',
        'accent-dim': 'rgba(200,255,0,0.08)',
        surface: '#101010',
        border: '#1E1E1E',
        muted: '#666666',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
}
