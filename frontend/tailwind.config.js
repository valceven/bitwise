/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      greenz: "#27AE60",
      yellowz: "#F2C94C",
      orangez: "#F2994A",
      redz: "#F14E3A",
      darkpurple: "#9B51E0",
      lightpurple: "#DAC3FF",
      cyanz: "#56CCF2",
      bluez: "#6E61FF",
      grayz: "#29314D",
      offwhite: "#F1F6F1",
      blackz: "#031926",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      grotesk: ["Space Grotesk", "sans-serif"],
    },
  },
};
export const plugins = [];
