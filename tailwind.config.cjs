import defaultTheme from 'tailwindcss/defaultTheme';
import typographyPlugin from '@tailwindcss/typography';

import plugin from 'tailwindcss/plugin';
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addComponents }) => [
      addComponents({
        // Using before as state-layer
        // See https://m3.material.io/foundations/interaction-states for theory behind this
        // Opacities are the same for all button types,
        // so this style can be re-used for all components that need a state layer
        // Set the bg-color of the before element using before: in the tailwind style
        '.statelayer': {
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            bottom: '0px',
            left: '0px',
            opacity: 0,
            position: 'absolute',
            right: '0px',
            top: '0px',
          },
          '@media only screen and (hover: hover)': {
            '&:not(:disabled):not([aria-disabled="true"]):hover::before': {
              opacity: '.08',
            },
          },
          '&:not(:disabled):not([aria-disabled="true"]):focus-visible::before': {
            opacity: '.12',
          },
          '&:not(:disabled):not([aria-disabled="true"]):active::before': {
            opacity: '.12',
          },
          '&[data-state-layer="soft"]::before': {
            opacity: '.08',
          },
          '&[data-state-layer="medium"]::before': {
            opacity: '.12',
          },
        },
      }),
    ]),
  ],
  darkMode: 'class',
};
