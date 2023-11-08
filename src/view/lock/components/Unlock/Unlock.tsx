import React, { memo, useEffect, useState } from "react"
import type { ReactNode, FC } from "react"
import UnlockStyle from "./style"
import { Avatar, Button, Input, message } from "antd"
import { Form } from "antd"
import { Link, useNavigate } from "react-router-dom"
import cookie from "@/utils/cookieEncryption"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const Unlock: FC<IProps> = (props) => {
  //hooks
  const [unLockFormState, setUnLockFormState] = useState(false)
  const navigate = useNavigate()

  // 禁止直接访问
  useEffect(() => {
    if (!cookie.getCookie("lockPasswords")) navigate("/home")
  }, [])

  // 解锁
  function unLock(e: any) {
    const lockPasswords: any = cookie.getCookie("lockPasswords")
    if (lockPasswords[0].lockPasswords === e.passwords) {
      cookie.clearCookie("lockPasswords")
      navigate("/home")
      return message.success("解锁成功")
    }
    return message.error("解锁密码错误！")
  }
  function unLockErr(e: any) {
    console.log(e)
  }
  // 重新登陆前清空所有数据
  function clearLocData() {
    localStorage.clear()
    cookie.clearAllCookie()
  }
  console.log("dom更新了")
  return (
    <UnlockStyle>
      <h1 className="title">
        ⚡ 屏幕已锁定
        <div className="unlock-btn" onClick={() => setUnLockFormState(true)}>
          <i className="el-icon-unlock"></i>
          解锁
        </div>
      </h1>
      <div
        className="unlock-modal"
        style={{ display: unLockFormState ? "flex" : "none" }}
      >
        <div style={{ textAlign: "center", width: "400px" }}>
          <Avatar className="userinfo-unlock">admin</Avatar>
          <Form
            className="form"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            onFinish={unLock}
            onFinishFailed={unLockErr}
          >
            <div style={{ display: "flex" }}>
              <Form.Item
                name="passwords"
                className="formItem"
                label="锁屏密码"
                rules={[
                  { min: 6, message: "密码不低于6位" },
                  { required: true, message: "密码必填" },
                ]}
              >
                <Input.Password placeholder="输入锁屏密码"></Input.Password>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 10 }}
              >
                解 锁
              </Button>
            </div>

            <Form.Item>
              <span
                className="btnText"
                onClick={() => setUnLockFormState(false)}
              >
                取 消
              </span>
              <Link to={"/login"} className="btnText" onClick={clearLocData}>
                重新登陆
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </UnlockStyle>
  )
}

export default memo(Unlock)
