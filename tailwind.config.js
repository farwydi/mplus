const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: true,
    theme: {
        colors: {
            itemLevel: '#ffd100',
            poor: '#d9d9d',
            common: '#ffffff',
            uncommon: '#1eff00',
            rare: '#0070dd',
            epic: '#a335ee',
            legendary: '#ff8000',
            artifact: '#e6cc80',
            wowtoken: '#00ccff',
            huge: {
                50: "#F1E7DF",
                100: "#E2CDBB",
                200: "#C79E7A",
                300: "#9E6D43",
                400: "#5D4127",
                500: "#1A120B",
                600: "#150F09",
                700: "#0E0A06",
                800: "#0B0705",
                900: "#040202"
            },
            large: {
                50: "#F1E9E5",
                100: "#E2D2CA",
                200: "#C3A392",
                300: "#A6765E",
                400: "#73513F",
                500: "#3C2A21",
                600: "#31231B",
                700: "#241914",
                800: "#17100D",
                900: "#0D0907"
            },
            middle: {
                50: "#FAF9F4",
                100: "#F7F6ED",
                200: "#EDEBD8",
                300: "#E5E1C7",
                400: "#DDD8B5",
                500: "#D5CEA3",
                600: "#BDB36F",
                700: "#9A8F46",
                800: "#665E2E",
                900: "#353118"
            },
            little: {
                50: "#FCFCF8",
                100: "#FAFAF5",
                200: "#F5F5EB",
                300: "#F0F0E0",
                400: "#EBEBD6",
                500: "#E5E5CB",
                600: "#C9C992",
                700: "#ACAC58",
                800: "#74743A",
                900: "#3A3A1D"
            },
            // stone: colors.stone,
            // neutral: colors.neutral,
            // black: colors.black,
            white: colors.white,
            // gray: colors.gray,
            // emerald: colors.emerald,
            // indigo: colors.indigo,
            // yellow: colors.yellow,
        }
    },
    plugins: [],
};
