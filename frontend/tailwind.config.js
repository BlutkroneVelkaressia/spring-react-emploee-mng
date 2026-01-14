/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 커스텀 컬러 추가 가능
      },
      fontFamily: {
        // 커스텀 폰트 추가 가능
      },
    },
  },
  plugins: [],
}
