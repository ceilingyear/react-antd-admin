import React, { memo, useEffect } from "react"
import type { ReactNode, FC } from "react"
import ColumnGroup from "antd/es/table/ColumnGroup"
import Column from "antd/es/table/Column"
import C_Table from "@/components/C_Table"
import { Form, Input, Space, Tag } from "antd"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const CTable: FC<IProps> = () => {
  //hooks

  const searchDom = (
    <>
      <Form.Item label="名称" name="password2">
        <Input></Input>
      </Form.Item>
    </>
  )

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>自定义表格组件封装</h1>
      <C_Table searchDom={searchDom} url="/" params={{}}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </C_Table>
    </div>
  )
}

export default memo(CTable)
