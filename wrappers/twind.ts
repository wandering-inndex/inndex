import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";

export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    screens: {
      "2xs": "480px",
      xs: "532px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
};

if (IS_BROWSER) setup(config);
