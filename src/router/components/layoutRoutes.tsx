import React from "react"
import { Navigate } from "react-router-dom"
import { HomeOutlined } from "@ant-design/icons"
import settings from "./settings"
const Home = React.lazy(() => import("@/view/home/index"))

const routes: MyRouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
    hidden: true,
  },
  {
    path: "/home",
    element: <Home />,
    icon: <HomeOutlined />,
    label: "首页",
  },
  ...settings,
]

export default routes
