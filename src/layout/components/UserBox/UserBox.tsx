import React, { memo, useState } from "react"
import type { ReactNode, FC } from "react"
import UserBoxStyle from "./style"
import { Avatar, Dropdown, message } from "antd"
import { ArrowsAltOutlined, ShrinkOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import browserFull from "@/utils/browserFull"
import LockModal from "./LockModal/LockModal"
import { useTranslation } from "react-i18next"

interface IProps {
  children?: ReactNode //这个接口代表react类型的集合
}

function outLogin() {
  const remember = localStorage.remember
  localStorage.clear()
  localStorage.remember = remember
  message.success(t("登出成功"))
}

const UserBox: FC<IProps> = (props) => {
  const [isFull, setFull] = useState(false)
  const [lockState, setLockState] = useState(false)
  const { i18n } = useTranslation() //获取相关属性
  // 是否全屏
  function changeFull() {
    browserFull(isFull)
    setFull(!isFull)
  }

  function changeLang() {
    i18n.changeLanguage(i18n.language === "cn" ? "en" : "cn")
  }
  const userInfoData = [
    {
      key: 0,
      label: <Link to="/">{t("个人中心")}</Link>,
    },
    {
      key: 1,
      label: <Link to="/">{t("修改密码")}</Link>,
    },
    {
      key: 2,
      label: (
        <div onClick={() => setLockState(!lockState)}>{t("锁定屏幕")}</div>
      ),
    },
    {
      key: 3,
      label: (
        <Link to="/login" onClick={outLogin}>
          {t("退出登录")}
        </Link>
      ),
    },
  ]
  return (
    <UserBoxStyle>
      <div className="box">
        {isFull ? (
          <ShrinkOutlined className="icon" onClick={changeFull} />
        ) : (
          <ArrowsAltOutlined className="icon" onClick={changeFull} />
        )}
        <div className="iconfont lang" onClick={changeLang}>
          &#xe853;
        </div>
        <Dropdown menu={{ items: userInfoData }} placement="bottomRight" arrow>
          <div className="userInfo">
            <Avatar>{t("admin")}</Avatar>
            <p className="userInfo_username">{t("admin")}</p>
          </div>
        </Dropdown>
      </div>
      <LockModal
        lockState={lockState}
        setLockState={(state: boolean) => setLockState(state)}
      ></LockModal>
    </UserBoxStyle>
  )
}

export default memo(UserBox)
