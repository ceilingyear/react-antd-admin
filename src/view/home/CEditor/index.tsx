import React, { memo, useEffect, useState } from "react"
import type { ReactNode, FC } from "react"
import ColumnGroup from "antd/es/table/ColumnGroup"
import Column from "antd/es/table/Column"
import C_Editor from "@/components/C_Editor"
import { Form, Input, Space, Tag } from "antd"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const CTable: FC<IProps> = () => {
  //hooks
  const [html, setHtml] = useState("")
  const searchDom = (
    <>
      <Form.Item label="名称" name="password2">
        <Input></Input>
      </Form.Item>
    </>
  )

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>自定义富文本组件封装</h1>
      <C_Editor html={html} setHtml={setHtml}></C_Editor>
    </div>
  )
}

export default memo(CTable)
