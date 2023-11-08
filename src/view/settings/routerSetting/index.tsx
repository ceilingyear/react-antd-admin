import React, { memo, useRef, useState } from "react"
import type { ReactNode, FC } from "react"
import RouterSettingStyle from "./style"
import { Table, Button, Tag, Input, message } from "antd"
import { ColumnsType } from "antd/es/table"
import routes from "@/router/index"
import { useAppSelector } from "@/store/index"
import OperateBox from "./components/OperateBox/OperateBox"
import { SearchOutlined } from "@ant-design/icons"
import { shallowEqual } from "react-redux"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

interface DataType {
  key: React.Key
  label: string
  path: string
  icon: string
}

// 获取路由数据
function useNotHiddenRoutes(data: any[]): any {
  const arr: any = []
  data.forEach((item) => {
    if (item.children && !item.hidden) {
      arr.push({
        key: item.path,
        path: item.path,
        icon: item.icon,
        children: useNotHiddenRoutes(item.children),
        label: item.label,
        type: item.type,
      })
    } else if (!item.hidden) {
      arr.push({
        key: item.path,
        path: item.path,
        icon: item.icon,
        children: item.children,
        label: item.label,
        type: item.type,
      })
    }
  })
  return arr
}

const RouterSetting: FC<IProps> = () => {
  const store = useAppSelector((state) => state.colorStore, shallowEqual)
  const [searchInput, setSearchInput] = useState("")
  const [checkedRoutes, setCheckedRoutes] = useState<any[]>([])
  const [tableData, setTableData] = useState(useNotHiddenRoutes(routes))
  const operateBoxRef = useRef<any>("")
  // 当前颜色下标
  let thisColorIndex = 0
  const columns: ColumnsType<DataType> = [
    {
      title: "路由名称",
      dataIndex: "label",
      align: "center",
      render: (value, record: any) => (
        <Tag color={record.color || store.colorBox[0]}>{value}</Tag>
      ),
    },
    { title: "路由路径", dataIndex: "path", key: "path", align: "center" },
    {
      title: "路由图标",
      dataIndex: "icon",
      render: (e) => e,
      align: "center",
    },
    {
      title: "操作",
      render: (value) => (
        <OperateBox value={value} ref={operateBoxRef}></OperateBox>
      ),
      width: 300,
      align: "center",
    },
  ]
  // 点击表格每项，打开子表格
  function tableOpen(expanded: boolean, record: any) {
    console.log(expanded)
    if (expanded && !record.opened && record.children) {
      record.opened = true
      if (thisColorIndex === store.colorBox.length - 1) thisColorIndex = 0
      thisColorIndex++
      for (const item of record.children)
        item.color = store.colorBox[thisColorIndex]
    }
  }
  // 搜索数据
  function searchData() {
    //如果是空，就返回原始数据
    if (searchInput === "") return setTableData(useNotHiddenRoutes(routes))
    // 遍历出table所有路由信息
    function deps(table: any) {
      const map = table.flatMap((item: any) => {
        if (item.children) {
          const data = deps(item.children)
          item.children = null
          data.push(item)
          return data
        }
        return item
      })
      return map
    }
    const allTable = deps(useNotHiddenRoutes(routes))
    const searchData = allTable.filter((item: any) =>
      item.path.includes(searchInput)
    )
    setTableData(searchData)
  }
  // 删除指定路由
  function deleteChecked() {
    message.success(`已删除路由：${checkedRoutes}`)
  }
  // 点击多选框
  function tableCheckedChange(
    checkedState: any,
    checked: boolean,
    checkedArr: any[]
  ) {
    console.log(checkedState)

    // 递归输出已选中的routes
    function deps(data: any[]) {
      data.forEach((item: any) => {
        if (item.children) {
          deps(item.children)
        }
        // 如果是true就选中子路由，如果是false就删除子路由
        if (checked) {
          checkedArr.push(item)
        } else {
          if (checkedRoutes.includes(item.path)) {
            const index = checkedArr.findIndex(
              (item2) => item2.path === item.path
            )
            checkedArr.splice(index, 1)
            console.log(item.path)
          }
        }
      })
    }
    // 如果点击的值存在子路由，将子路由选中或者删除
    if (checkedState.children) {
      deps(checkedState.children)
    }

    const arrKey = checkedArr.map((item: any) => item.path)
    const doWeight = new Set(arrKey)

    setCheckedRoutes([...doWeight])
  }
  // 全选
  function selectAll(...params: any) {
    const path = params[1].map((item: any) => item.path)
    setCheckedRoutes(path)
  }
  console.log("dom更新了")
  function addChildRoute(e: EventType) {
    operateBoxRef.current.openBox(e, "add")
  }
  return (
    <RouterSettingStyle>
      <div>
        <Button
          type="primary"
          danger
          className="button"
          onClick={deleteChecked}
        >
          删除选中项
        </Button>
        <Button
          type="primary"
          className="button"
          onClick={addChildRoute}
          style={{ backgroundColor: "green" }}
        >
          新增子路由
        </Button>
        <Input
          placeholder="查找路由路径（'/'）"
          prefix={<SearchOutlined />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search"
          onPressEnter={searchData}
        />
        <Button type="primary" className="button" onClick={searchData}>
          搜索
        </Button>

        <Table
          columns={columns}
          dataSource={tableData}
          expandable={{
            expandRowByClick: true,
            fixed: "left",
            onExpand: tableOpen,
          }}
          rowSelection={{
            type: "checkbox",
            onSelect: tableCheckedChange,
            selectedRowKeys: checkedRoutes,
            onSelectAll: selectAll,
          }}
        />
      </div>
    </RouterSettingStyle>
  )
}

export default memo(RouterSetting)
