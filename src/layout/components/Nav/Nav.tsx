import React, { memo, useEffect, useRef } from "react"
import type { ReactNode, FC } from "react"
import NavStyle from "./style"
import { Menu, Layout } from "antd"
import routes from "@/router/index"
import { useAppSelector } from "@/store/index"
// import { addTopBarState } from "@/store/features/layoutStore"
import Logo from "@/assets/image/public/logo"
import { useLocation, useNavigate } from "react-router-dom"
import { shallowEqual } from "react-redux"
interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}
const { Sider } = Layout
// 获取路由信息，根据路由渲染页面
function getNavData() {
  const index = routes.findIndex((item) => item.path === "/")
  const layout: any = routes[index].children

  // 递归渲染左侧导航栏
  function deps(data: any[]): any {
    const arr = []
    for (const item of data) {
      if (item.children && !item.hidden) {
        arr.push({
          key: item.path,
          icon: item.icon,
          children: deps(item.children),
          label: t(item.label),
          type: item.type,
        })
      } else if (!item.hidden) {
        // console.log(item)
        arr.push({
          key: item.path,
          icon: item.icon,
          children: item.children,
          label: t(item.label),
          type: item.type,
        })
      }
    }
    return arr
  }
  const items = deps(layout) as any

  return items
}

const Nav: FC<IProps> = (props) => {
  //hooks
  const store = useAppSelector(
    (state) => ({ ...state.layoutStore }),
    shallowEqual
  )
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <NavStyle>
      <Sider
        trigger={null}
        collapsible
        collapsed={store.navCloseState}
        style={{
          height: " 100%",
          backgroundColor: "#001529",
          transition: "all .3s",
        }}
      >
        <div className="logo">
          <Logo width={40} height={40}></Logo>
          <h1
            className="logo_title"
            style={{ display: store.navCloseState ? "none" : "block" }}
            title={t("后台管理系统")}
          >
            {t("后台管理系统")}
          </h1>
        </div>
        <Menu
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={["/" + location.pathname.split("/")[1]]}
          selectedKeys={[location.pathname]}
          mode="inline"
          theme="dark"
          items={getNavData()}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>
    </NavStyle>
  )
}

export default memo(Nav)
