import React, { memo, useEffect, useState } from "react"
import type { ReactNode, FC } from "react"
import { Tabs, message } from "antd"
import TopBarStyle from "./style"
import { useAppSelector } from "@/store/index"
import { deleteTopBarState } from "@/store/features/layoutStore"
import { useNavigate } from "react-router-dom"
import { shallowEqual, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}
type OnEdit =
  | string
  | React.MouseEvent<Element, MouseEvent>
  | React.KeyboardEvent<Element>

const TopBar: FC<IProps> = (props) => {
  //hooks
  const store = useAppSelector((state) => state.layoutStore, shallowEqual)
  const [items, setItems] = useState<
    {
      label: string
      key: string
      closable: boolean
    }[]
  >()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  // 删除topBar触发
  function onEdit(e: OnEdit) {
    dispatch(deleteTopBarState(e))
    const index = store.topBarState.findIndex((item) => item.key === e)
    const url = store.topBarState[index - 1].key
    navigate(url)
  }
  // 处理国际化
  useEffect(() => {
    setItems(
      store.topBarState.map((res) => {
        const clone = JSON.parse(JSON.stringify(res))
        clone.label = t(clone.label)
        return clone
      })
    )
  }, [store, i18n.language])

  return (
    <TopBarStyle>
      <Tabs
        type="editable-card"
        onChange={(e) => navigate(e)}
        onEdit={onEdit}
        activeKey={store.thisTopBarKey}
        items={items}
        hideAdd
      />
    </TopBarStyle>
  )
}

export default memo(TopBar)
