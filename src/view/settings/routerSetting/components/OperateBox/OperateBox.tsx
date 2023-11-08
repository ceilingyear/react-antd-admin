import React, { memo, useRef, useImperativeHandle, forwardRef } from "react"
import { Button, message, Popconfirm } from "antd"
import type { ReactNode, FC } from "react"
import ViewDetail from "../../components/ViewDetail/ViewDetail"
import { QuestionCircleOutlined } from "@ant-design/icons"
interface OperateBox {
  children?: ReactNode //这个接口代表react类型的集合
  value: MyRouteObject //当前行的值
  ref: any //当前行的值
}
// 操作盒子
const OperateBox: FC<OperateBox> = forwardRef((props: any, ref) => {
  const ViewDetailRef = useRef<any>("")
  // 查看详情
  function openBox(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    type?: "add" | string
  ) {
    e.stopPropagation()

    ViewDetailRef.current.setViewDetailState(true)
    if (type === "add") {
      ViewDetailRef.current.setFormData({})
      return ViewDetailRef.current.setAddFatherPath(props.value)
    }
    console.log(props.value)
    ViewDetailRef.current.setFormData(props.value)
  }
  // 删除
  function deleteRoute(e: any) {
    e.stopPropagation()
    console.log(props.value, props.value)

    message.success(`已删除路由：${props.value.path}`)
  }
  useImperativeHandle(ref, () => ({ openBox }), [])
  return (
    <div>
      <Button
        type="primary"
        size="small"
        className="button"
        onClick={(e) => openBox(e, "add")}
        style={{ backgroundColor: "green" }}
      >
        新增
      </Button>
      <Button type="primary" size="small" className="button" onClick={openBox}>
        编辑
      </Button>
      <Popconfirm
        title="是否确认删除？"
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        onConfirm={deleteRoute}
        onCancel={(e) => e?.stopPropagation()}
        okText="删除"
        cancelText="取消"
      >
        <Button
          type="primary"
          danger
          size="small"
          className="button"
          onClick={(e) => e.stopPropagation()}
        >
          删除
        </Button>
      </Popconfirm>
      <ViewDetail ref={ViewDetailRef}></ViewDetail>
    </div>
  )
})

export default OperateBox
