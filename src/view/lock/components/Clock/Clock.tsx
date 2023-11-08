import React, { memo, useEffect, useState } from "react"
import type { ReactNode, FC } from "react"
import ClockStyle from "./style"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const Clock: FC<IProps> = (props) => {
  //hooks
  const [h, setH] = useState("")
  const [m, setM] = useState("")
  const [s, setS] = useState("")

  function getDeg() {
    const oDate = new Date()
    const h = oDate.getHours()
    const m = oDate.getMinutes()
    const s = oDate.getSeconds()
    const ms = oDate.getMilliseconds()

    setH("rotate(" + (h + m / 60 + s / 3600 + ms / 3600000) * 30 + "deg)")
    setM("rotate(" + (m + s / 60 + ms / 60000) * 6 + "deg)")
    setS("rotate(" + Math.ceil(s + ms / 1000 + 2) * 6 + "deg)")
  }
  useEffect(() => {
    getDeg()
    return () => {
      getDeg()
    }
  })
  console.log("dom更新了")
  return (
    <ClockStyle>
      {" "}
      <div className="clock-wrapper">
        <div className="clock-border">
          <div className="clock">
            <ul className="minute-marks">
              <li className="five"></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li className="five"></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li className="five"></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li className="five"></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li className="five"></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li className="five"></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className="hour" style={h ? { transform: h } : {}}>
              <div className="hand"></div>
            </div>
            <div className="minute" style={m ? { transform: m } : {}}>
              <div className="hand"></div>
            </div>
            <div className="second" style={s ? { transform: s } : {}}>
              <div className="hand"></div>
            </div>
          </div>
        </div>
      </div>
    </ClockStyle>
  )
}

export default memo(Clock)
