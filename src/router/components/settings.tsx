import React from "react"
import { Navigate } from "react-router-dom"
import { SettingOutlined, NodeIndexOutlined } from "@ant-design/icons"
const Setting = React.lazy(() => import("@/view/settings/routerSetting/index"))

const routes: MyRouteObject[] = [
  {
    path: "/setting",
    icon: <SettingOutlined />,
    label: "系统设置",
    children: [
      {
        path: "/setting",
        hidden: true,
        element: <Navigate to="/setting/router" />,
      },
      {
        path: "/setting/router",
        element: <Setting />,
        icon: <NodeIndexOutlined />,
        label: "路由设置",
      },
    ],
  },
]

export default routes
