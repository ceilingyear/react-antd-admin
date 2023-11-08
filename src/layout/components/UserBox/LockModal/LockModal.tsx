import React, { memo, useState } from "react"
import type { ReactNode, FC } from "react"
import { Modal, Form, Input } from "antd"
import LockModalStyle from "./style"
import { useNavigate } from "react-router-dom"
import cookie from "@/utils/cookieEncryption"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
  lockState: boolean //这个接口代表react类型的集合
  setLockState: (state: boolean) => void //这个接口代表react类型的集合
}

const LockModal: FC<IProps> = (props) => {
  //hooks
  const [form] = Form.useForm()
  const navigate = useNavigate()
  // 验证密码
  function recommitPasswords(form: any) {
    return {
      validator(_: any, value: string) {
        if (form.getFieldValue().passwords === value) {
          return Promise.resolve()
        }
        return Promise.reject(new Error("两次密码不一致！请重新验证"))
      },
    }
  }
  function toLock() {
    form
      .validateFields()
      .then((res) => {
        cookie.setCookie({ key: "lockPasswords", value: res.passwords }, 30)
        props.setLockState(false)
        navigate("/lock")
      })
      .catch((err) => console.log(err))
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Modal
        title={t("设置锁屏密码")}
        centered
        open={props.lockState}
        onOk={toLock}
        okText={t("确认")}
        cancelText={t("取消")}
        onCancel={() => props.setLockState(false)}
        destroyOnClose
      >
        <LockModalStyle>
          <Form className="form" labelCol={{ span: 5 }} form={form}>
            <Form.Item
              name="passwords"
              className="formItem"
              label={t("锁屏密码")}
              rules={[
                { min: 6, message: t("密码不低于6位") },
                { required: true, message: t("密码必填") },
              ]}
            >
              <Input.Password
                className="input"
                placeholder={t("设置锁屏密码")}
              ></Input.Password>
            </Form.Item>
            <Form.Item
              name="recommit"
              className="formItem"
              label={t("确认密码")}
              rules={[
                recommitPasswords,
                { required: true, message: t("请重新输入密码") },
              ]}
            >
              <Input.Password
                className="input"
                placeholder={t("确认锁屏密码")}
              ></Input.Password>
            </Form.Item>
          </Form>
        </LockModalStyle>
      </Modal>
    </div>
  )
}

export default memo(LockModal)
