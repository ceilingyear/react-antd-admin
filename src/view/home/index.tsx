import React, { memo } from "react"
import type { ReactNode, FC } from "react"
import CTable from "./CTable/index"
import CEditor from "./CEditor/index"
import Echarts from "./echarts/index"

interface Iprops {
  children?: ReactNode //这个接口代表react类型的集合
}

const Focus: FC<Iprops> = (props) => {
  return (
    <div>
      <CTable></CTable>
      <Echarts></Echarts>
      <CEditor></CEditor>
    </div>
  )
}

export default memo(Focus)
