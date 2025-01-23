import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        saitGray: "#666666",
      },
      backgroundImage: {
        "blue-gradient": `linear-gradient(to top, #2b64ae, #449dde)`,
        "red-gradient": `linear-gradient(to top, #ca3929, #932728)`,
      },
    },
  },
  plugins: [],
} satisfies Config;
