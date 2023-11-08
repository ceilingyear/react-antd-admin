import React, { memo, useEffect, useState } from "react"
import type { ReactNode, FC } from "react"
import EchartsStyle from "./style"
import ReactECharts from "echarts-for-react"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const Echarts: FC<IProps> = (props) => {
  //hooks
  const [option] = useState({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  })
  const [option2] = useState({
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  })
  console.log("dom更新了")
  return (
    <EchartsStyle>
      <div className="body">
        <ReactECharts className="line" option={option} />
        <ReactECharts className="line" option={option2} />
      </div>
    </EchartsStyle>
  )
}

export default memo(Echarts)
