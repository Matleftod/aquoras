/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        aqoras: {
          "primary": "#14545a",
          "secondary": "#2b8a92",
          "accent": "#f59e0b",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444"
        }
      },
      "light",
      "dark"
    ]
  }
};
