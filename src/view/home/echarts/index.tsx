import React, { memo } from "react"
import type { ReactNode, FC } from "react"
import Echarts from "./echarts"

interface Iprops {
  children?: ReactNode //这个接口代表react类型的集合
}
window.onerror = (e) => {
  console.log(e)
}
const Focus: FC<Iprops> = (props) => {
  return (
    <div>
      <h1 style={{ marginBottom: 10 }}>ECharts案例</h1>
      <Echarts></Echarts>
    </div>
  )
}

export default memo(Focus)
