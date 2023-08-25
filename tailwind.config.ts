import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["'DM Sans'", ...defaultTheme.fontFamily.sans],
                serif: ["'DM Serif Display'", ...defaultTheme.fontFamily.serif],
                mono: ["'DM Mono'", ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [require("daisyui"), require("tailwind-scrollbar")],
    daisyui: {
        themes: ["retro", "night"],
        darkTheme: "night",
    },
} satisfies Config;
