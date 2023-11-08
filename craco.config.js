const path = require("path")

const resolve = (pathName) => path.resolve(__dirname, pathName)
module.exports = {
  //配置webpack的东西
  webpack: {
    // 配置别名
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
      utils: resolve("src/utils"),
    },
  },
}
