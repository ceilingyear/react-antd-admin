import React, { Suspense, useEffect, useState } from "react"
import { useRoutes, useLocation, useNavigate } from "react-router-dom"
import routes from "@/router/index"
import Loading from "./components/Loading/Loading"
import { message } from "antd"
import "@/i18/index"
import { useTranslation } from "react-i18next"
import cookie from "@/utils/cookieEncryption"
import { getRoute } from "./service/components/routes"

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [route, setRoute] = useState<MyRouteObject[]>([])
  // 全局拦截，如果没登录跳去登录页
  useEffect(() => {
    if (location.pathname == "/login") return

    const isLogin = localStorage.getItem("isLogin")
    if (!isLogin) {
      message.error("身份验证失败，请重新登陆")
      navigate("/login")
    }
    const isClock = cookie.getCookie("lockPasswords")
    if (isClock && isClock.length > 0) return navigate("/lock")
  }, [location.pathname])

  useEffect(() => {
    // 获取动态路由
    getRoute("").then((res) => {
      setRoute(routes)
    })
  }, [])

  const { t } = useTranslation() //获取相关属性
  ;(window as any).t = t
  return (
    <>
      {route.length > 0 ? (
        <Suspense fallback={<Loading></Loading>}>{useRoutes(route)}</Suspense>
      ) : (
        <Loading></Loading>
      )}
    </>
  )
}

export default App
