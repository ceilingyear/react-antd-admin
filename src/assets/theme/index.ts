import { ThemeConfig, theme } from "antd"
// 配置主题
export default {
  // 定义别名
  token: {
    motion: true, //是否启动antd动画
  },
  // 组件级
  components: {
    // Input: {
    //   colorPrimary: "#eb2f96",
    //   /**  默认算法 theme.defaultAlgorithm
    //    暗色算法 theme.darkAlgorithm
    //    紧凑算法 theme.compactAlgorithm
    //    */
    //   algorithm: true,
    // },
  },
} as ThemeConfig
