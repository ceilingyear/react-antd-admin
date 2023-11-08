import React from "react"
import layoutRoutes from "./components/layoutRoutes"
// 自己引入
const Layout = React.lazy(() => import("@/layout/index"))
import Login from "@/view/login"
import Lock from "@/view/lock"

/**
 * @interface icon?: React.ReactNode | null; 设置导航栏图标
 * @interface hidden?: boolean；; 是否在nav中隐藏
   @interface label?: string ； 设置导航栏名称
   @interface disable?: boolean； 设置导航栏是否无法选中
   @interface title?: string； 	设置收缩时展示的悬浮标题
   @interface path:string; 必填；且子路由‘/’必须是在父路由下级：例如：父：'/HOME';子：'/HOME/children'
 * 
 */

const routes: MyRouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [...layoutRoutes],
    label: "后台页面路由",
  },
  {
    path: "/login",
    element: <Login />,
    label: "登陆",
  },
  {
    path: "/lock",
    element: <Lock />,
    label: "系统已锁定⭐",
  },
]

export default routes
