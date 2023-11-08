import React, { memo, useEffect, useState, useTransition } from "react"
import type { ReactNode, FC } from "react"
import BreadcrumbStyle from "./style"
import { Link, useLocation } from "react-router-dom"
import { Breadcrumb } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import routes from "@/router/index"
import { useAppSelector } from "@/store/index"
import { setNavCloseState } from "@/store/features/layoutStore"
import { shallowEqual, useDispatch } from "react-redux"
import { useThisRoute } from "@/hooks/useThisRoute"
import { useTranslation } from "react-i18next"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

// 获取和改变面包屑数据
function changeExtraBreadcrumbItems() {
  // 处理路由地址
  const pathSnippets = location.pathname.split("/").filter((i) => i)

  return pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`
    const thisRoute = useThisRoute(url)

    function dom() {
      if (pathSnippets.length - 1 === index)
        return <p className="last">{t(thisRoute.label)}</p>
      else if (thisRoute.children) return <p>{t(thisRoute.label)}</p>
      else return <Link to={url}>{t(thisRoute.label)}</Link>
    }

    return {
      key: url,
      title: dom(),
    }
  })
}

const BreadcrumbDOM: FC<IProps> = (props) => {
  //hooks
  const location = useLocation()
  const store = useAppSelector((state) => state.layoutStore, shallowEqual)
  const dispatch = useDispatch()
  const [extraBreadcrumbItems, setExtraBreadcrumbItems] = useState<any>()
  const { i18n } = useTranslation()

  useEffect(() => {
    const data = changeExtraBreadcrumbItems()
    setExtraBreadcrumbItems(data)
  }, [location.pathname, i18n.language])

  return (
    <BreadcrumbStyle>
      <div className="box">
        {store.navCloseState ? (
          <MenuFoldOutlined
            onClick={() => dispatch(setNavCloseState())}
            className="icon"
          />
        ) : (
          <MenuUnfoldOutlined
            onClick={() => dispatch(setNavCloseState())}
            className="icon"
          />
        )}
        <Breadcrumb
          items={extraBreadcrumbItems}
          className="Breadcrumb"
        ></Breadcrumb>
      </div>
    </BreadcrumbStyle>
  )
}

export default memo(BreadcrumbDOM)
