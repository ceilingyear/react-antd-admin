import React, { memo, useEffect } from "react"
import type { ReactNode, FC } from "react"
import LoadingStyle from "./style"
import { Spin } from "antd"
interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const Loading: FC<IProps> = (props) => {
  //hooks

  return (
    <LoadingStyle>
      <div className="mask">
        <Spin />
      </div>
    </LoadingStyle>
  )
}

export default memo(Loading)
