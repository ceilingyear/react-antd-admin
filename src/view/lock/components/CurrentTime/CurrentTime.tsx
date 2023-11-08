import React, { memo, useEffect, useState } from "react"
import type { ReactNode, FC } from "react"
import CurrentTimeStyle from "./style"
import { parseTime } from "@/utils/parseTime"
interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const CurrentTime: FC<IProps> = (props) => {
  //hooks
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    getTime()
    return () => {
      requestAnimationFrame(getTime)
    }
  })
  function getTime() {
    setCurrentTime(parseTime(new Date(), "{h}:{i}:{s}"))
    requestAnimationFrame(getTime)
  }
  console.log("dom更新了")
  return (
    <CurrentTimeStyle>
      <div className="current-time">
        <div className="time">{currentTime}</div>
        <div className="date">
          {currentDate}
          <span style={{ marginLeft: "16px" }}></span>
        </div>
      </div>
    </CurrentTimeStyle>
  )
}

export default memo(CurrentTime)
