import React, { memo, useEffect, Suspense } from "react"
import type { ReactNode, FC } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Nav from "./components/Nav/Nav"
import Breadcrumb from "./components/Breadcrumb/Breadcrumb"
import UserBox from "./components/UserBox/UserBox"
import TopBar from "./components/Topbar/TopBar"
import LayoutStyle from "./style"
import { useDispatch } from "react-redux"
import { changeTopBarState } from "@/store/features/layoutStore"
import Loading from "../components/Loading/Loading"
import { useAppSelector } from "@/store"
import { stat } from "fs"
import { useThisRoute } from "@/hooks/useThisRoute"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const Layout: FC<IProps> = (props) => {
  const location = useLocation()
  const dispatch = useDispatch()

  // 路由守卫：当路由改变时触发，改变时改变
  useEffect(() => {
    const thisRoute = useThisRoute(location.pathname)
    console.log(t(thisRoute.label))
    const data = {
      label: thisRoute.label,
      key: thisRoute.path,
      closable: location.pathname !== "/home",
    }
    dispatch(changeTopBarState(data))
  }, [location.pathname])

  return (
    <LayoutStyle>
      <div className="layout">
        <Nav></Nav>
        <div className="contentBox">
          <Suspense fallback={<Loading></Loading>}>
            <div className="topBox">
              <Breadcrumb></Breadcrumb>
              <UserBox></UserBox>
            </div>
            <TopBar></TopBar>
            <div className="content">
              <Outlet></Outlet>
            </div>
          </Suspense>
        </div>
      </div>
    </LayoutStyle>
  )
}

export default memo(Layout)
