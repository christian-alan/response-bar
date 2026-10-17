/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Helvetica Neue"', 'Helvetica', 'sans-serif'],
      },
      transitionTimingFunction: {
        // Under-damped spring sampled into CSS linear(): slight overshoot, quick settle.
        spring: 'var(--spring)',
        pop: 'cubic-bezier(.3,1.35,.5,1)',
      },
    },
  },
  plugins: [],
}
