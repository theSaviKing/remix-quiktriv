import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["'DM Sans'", ...defaultTheme.fontFamily.sans],
                serif: ["'DM Serif Display'", ...defaultTheme.fontFamily.serif],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["retro", "night"],
        darkTheme: "night",
    },
} satisfies Config;
