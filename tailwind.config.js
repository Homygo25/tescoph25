module.exports = {
  content: [
    './resources/js/**/*.{js,jsx,ts,tsx}',
    './resources/views/**/*.blade.php',
    './resources/js/pages/**/*.{js,jsx,ts,tsx}',
    './resources/js/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        flipIn: {
          '0%': { transform: 'rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' },
        },
        shine: {
          '0%': { left: '-75%' },
          '100%': { left: '125%' },
        },
      },
      animation: {
        flipIn: 'flipIn 0.8s ease-out forwards',
        shine: 'shine 2s ease-in-out 0.5s forwards',
      },
      rotate: {
        'y-90': '90deg',
        'x-6': '6deg',
      },
      transformOrigin: {
        '3d': 'center center',
      },
    },
  },
  plugins: [],
};
