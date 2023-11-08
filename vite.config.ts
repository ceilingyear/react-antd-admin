import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig(({ mode }) => {
  return {
    base: "",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@public": path.resolve(__dirname, "./public"),
        components: path.resolve(__dirname, "src/components"),
        utils: path.resolve(__dirname, "src/utils"),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
      },
    },
    //server配置
    server: {
      // hmr:true,
      port: 8000,
      host: "0.0.0.0",
      open: true,
      // 代理设置
      proxy: {
        // '/!/trading-desk/upm/login': {
        //   target: 'http://uat-al.cdp.changan.com.cn/', //测试服务
        //   // target: 'https://www.cdp.changan.com.cn/', //测试服务
        //   ws: true, // websockets
        //   changeOrigin: true, //将主机头的原始信息更改为目标 URL,
        //   rewrite: (path) => path.replace('/!/trading-desk', '/'),
        // },
      },
    },
  }
})
