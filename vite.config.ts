import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "doc",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "doc"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // 指定库的入口文件
      formats: ["es", "umd"], // 输出的格式，支持 ESM 和 UMD
      name: "ou-react-hooks",
      fileName: (format) => `ou-react-hooks.${format}.js`, // 输出文件名
    },
    rollupOptions: {
      // 外部化依赖项（如果有）
      external: ["react", "react-dom"], // 如果你的库依赖 React 等外部库，可以在这里配置
    },
  },
});
