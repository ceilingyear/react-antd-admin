import React, { memo, useEffect } from "react"
import type { ReactNode, FC } from "react"
import LoginStyle from "./style"
import { Form, Input, Checkbox, Button, message } from "antd"
import { useNavigate } from "react-router-dom"
import cookie from "@/utils/cookieEncryption"
interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

const Login: FC<IProps> = (props) => {
  //hooks
  const navigate = useNavigate()

  const rememberData = cookie.getCookie("username", "password")

  function toLogin(formData: any) {
    localStorage.setItem("isLogin", "true")
    if (formData.remember) {
      localStorage.remember = formData.remember
      cookie.setCookie({ key: "username", value: formData.username }, 30)
      cookie.setCookie({ key: "password", value: formData.password }, 30)
    } else {
      localStorage.remember = false
      cookie.clearCookie("password", "username")
    }
    message.success("登陆成功")
    navigate("/")
    console.log(formData)
  }
  function error(e: any) {
    message.error("登陆失败")
    for (const item of e.errorFields) {
      console.error(item.errors[0])
    }
  }
  console.log(localStorage.remember)

  return (
    <LoginStyle>
      <div className="loginBox">
        <div className="contentBox">
          <div className="logo">
            <h3>欢迎进入后台管理系统</h3>
          </div>
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            labelAlign="left"
            wrapperCol={{ span: 18 }}
            // style={{ width: 300 }}
            initialValues={{
              remember: localStorage.remember === "true",
              username: rememberData
                ?.map((item) => item.username)
                .filter((item) => item != undefined)[0],
              password: rememberData
                ?.map((item) => item.password)
                .filter((item) => item != undefined)[0],
            }}
            onFinish={toLogin}
            onFinishFailed={error}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: "请输入用户名!" },
                { min: 3, message: "用户名最少3位" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: "请输入密码!" },
                { min: 8, message: "密码最少8位" },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 18, span: 8 }}
              style={{ marginBottom: 10 }}
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10 }}>
              <Button type="primary" htmlType="submit">
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </LoginStyle>
  )
}

export default memo(Login)
