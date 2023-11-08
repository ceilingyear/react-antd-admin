import React, { memo } from "react"
import type { ReactNode, FC } from "react"
import LockStyle from "./style"
import Unlock from "./components/Unlock/Unlock"
import Clock from "./components/Clock/Clock"
import CurrentTime from "./components/CurrentTime/CurrentTime"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const Lock: FC<IProps> = (props) => {
  return (
    <LockStyle>
      <div className="lock-wrap">
        <Unlock />
        <Clock />
        <CurrentTime />
      </div>
    </LockStyle>
  )
}

export default memo(Lock)
