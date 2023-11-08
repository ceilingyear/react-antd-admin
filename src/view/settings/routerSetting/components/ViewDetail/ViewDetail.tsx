import React, { memo, useState, useImperativeHandle, forwardRef } from "react"
import { Button, Input, Modal } from "antd"
import type { ReactNode, FC } from "react"
import { Form, Radio } from "antd"
import ViewDetailStyle from "./style"
interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
  ref?: any //这个接口代表react类型的集合
}
// 使用forwardRef
const ViewDetail: FC<IProps> = forwardRef((props, ref) => {
  //hooks
  const [ViewDetailState, setViewDetailState] = useState(false)
  const [formData, setFormData] = useState<any>({
    children: [],
  })
  const [addFatherPath, setAddFatherPath] = useState("")

  // 导出方法和数据
  useImperativeHandle(
    ref,
    () => ({ setViewDetailState, setFormData, setAddFatherPath }),
    []
  )
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Modal
        title={addFatherPath ? "新增子路由" : "编辑路由"}
        centered
        open={ViewDetailState}
        onOk={() => setViewDetailState(false)}
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setViewDetailState(false)
        }}
        width={800}
        destroyOnClose
      >
        <ViewDetailStyle>
          <Form className="form" initialValues={formData}>
            <Form.Item name="path" className="formItem" label="路由路径">
              <Input className="input" placeholder="路由路径"></Input>
            </Form.Item>
            <Form.Item name="label" className="formItem" label="路由名称">
              <Input className="input" placeholder="路由名称"></Input>
            </Form.Item>
            <Form.Item name="hidden" className="formItem" label="是否隐藏">
              <Radio.Group defaultValue={false}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item className="formItem" label="图标">
              {formData.icon}
            </Form.Item>
            {/* <Form.Item className="formItem" label="是否存在子路由">
              <Radio.Group
                value={hasChild}
                onChange={(e) => setHasChild(e.target.value)}
              >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item> */}
          </Form>
        </ViewDetailStyle>
      </Modal>
    </div>
  )
})

export default memo(ViewDetail)
