import React from "react"
import ReactDOM from "react-dom/client"
import App from "@/App"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import zhCN from "antd/locale/zh_CN"

// 自己引入的文件
import "@/style/index.scss" //重置样式
import store from "@/store/index"
import { ConfigProvider, ThemeConfig } from "antd"
import "@/assets/icon/iconfont.css"
import layoutStore from "./store/features/layoutStore"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

// https://ant-design.antgroup.com/docs/react/customize-theme-cn#theme
const theme = store.getState().layoutStore.theme
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider locale={zhCN} theme={theme}>
        {/* <ThemeProvider theme={theme}> */}
        <App />
        {/* </ThemeProvider> */}
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
)
