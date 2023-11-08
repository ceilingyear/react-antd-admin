import { Pagination, Table, Form, Button, Space, FormInstance } from "antd"
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react"
import type { ReactNode, FC, Ref } from "react"
import C_TableStyle from "./style"
import { ColumnsType } from "antd/es/table"
import { post } from "@/service/index"

interface IProps {
  children?: ReactNode
  searchDom?: ReactNode
  columns?: ColumnsType<any>
  params: any
  url: string
  btnDom?: ReactNode
}
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
]
const C_Table: FC<IProps> = forwardRef((props: IProps, ref) => {
  const { children, searchDom, columns, params, url, btnDom } = props
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    page: 1,
  })
  const formRef = useRef<FormInstance<any>>(null)
  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(() => {
    getTable()
  }, [pagination.page, pagination.pageSize])

  function onFinish(value: any) {
    formRef.current?.validateFields().then((res) => {
      getTable()
    })
  }
  // 获取表单数据
  function getTable() {
    setDataSource(data)
    return
    post(url, {
      params,
      pageSize: pagination.pageSize,
      page: pagination.page,
    }).then((res: any) => {
      setDataSource(res)
    })
  }
  function clearFrom() {
    formRef.current?.resetFields()
  }

  useImperativeHandle(ref, () => ({
    formRef,
  }))
  return (
    <C_TableStyle>
      <Space direction="vertical" size={20} style={{ width: "100%" }}>
        {searchDom && (
          <Form
            // {...layout}
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
          >
            <Space size="small">
              {searchDom}
              <Button onClick={clearFrom}>清空</Button>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              {btnDom}
            </Space>
          </Form>
        )}

        {!children ? (
          <Table dataSource={dataSource} columns={columns}></Table>
        ) : (
          <Table
            dataSource={dataSource}
            pagination={{
              defaultCurrent: 1,
              total: pagination.total,
              showTotal: (total: number) => `总共${pagination.total}条数据`,
              current: pagination.page,
              pageSize: pagination.pageSize,
              showSizeChanger: true,
              pageSizeOptions: [1, 2, 3],
              onChange: (current, pageSize) =>
                setPagination({ ...pagination, page: current, pageSize }),
            }}
          >
            {children}
          </Table>
        )}
      </Space>
    </C_TableStyle>
  )
})

/**
 * 
  @param children?: ReactNode table的子表单，优先级大于column，接受antd Column组件
  @param searchDom?: ReactNode  搜索框相关dom
  @param columns?: ColumnsType<any> table的子表单
  @param params: any 表单请求参数
  @param url: string 表单请求地址 post
  @param btnDom?: ReactNode 额外的按钮dom
 */
export default memo(C_Table)
