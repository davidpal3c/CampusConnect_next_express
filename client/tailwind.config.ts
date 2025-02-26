import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-green-600',
    'bg-green-700',
    'bg-green-800',
    'bg-green-900',
    'bg-slate-300',
    'bg-slate-600',
    'bg-slate-700',
    'bg-slate-800',
    'bg-slate-900',
    'bg-saitRed',
    'bg-saitDarkRed',
    'bg-saitLighterBlueOg',
    'bg-saitLighterBlue',
    'bg-saitLightBlue',
    'bg-saitBlue',
    'bg-saitBlueOg',
    'bg-saitPurple',
    'bg-saitDarkPurple',
    'bg-saitLighterPurple',
    'bg-saitLightPurple',
    'bg-saitGray',
    'ng-saitBlack',
    'bg-saitWhite',
    'hover:bg-green-500',
    'hover:bg-slate-800',
    'text-green-200',
    'text-green-700',
    'hover:text-green-200',
    // Add any other classes you want to safelist
],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        saitBlack: "#06222b",
        saitWhite: "#f7f7f7",
        saitRed: "#ca3929",
        saitDarkRed: "#932728",
        saitLighterBlueOg: "#449dde", 
        saitLighterBlue: "#449dde",        // original : out of contrast with white
        saitLightBlue: "#2b64ae",
        saitBlue: "#005795",
        saitBlueOg: "#2b64ae",
        saitPurple: "#5c2876",
        saitDarkPurple: "#502267",
        saitLighterPurple: "#722a7a",
        saitLightPurple: "#8d4990",
        saitGray: "#666666",
      },
      backgroundImage: {
        "blue-gradient": `linear-gradient(to top, #2b64ae, #449dde)`,
        "red-gradient": `linear-gradient(to top, #ca3929, #932728)`,
      },
      screens: {
        '2xs': '320px',
        'xs': '375px',
        'xl': '1440px',
        '2xl': '1536px',
        '955': '955px',
      }
    },
  },
  plugins: [],
} satisfies Config;
