import colors from './colors.config.json';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./**/*.js'],
  theme: {
    extend: {
      colors,
      outline: {
        none: 'none',
      },
      boxShadow: {
        panel: '-4px 4px 20px 0px rgba(0, 0, 0, 0.10)',
        hover: '0px 1px 3px 1px #00000033',
      },
    },
  },
  safelist: [
    {
      pattern:
        /(bg|text|ring|outline)-(primary|secondary|danger|success|warning|info)-(100|500|800|900)/,
      variants: ['hover'],
    },
  ],
  plugins: [],
};
