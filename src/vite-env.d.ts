/// <reference types="vite/client" />
declare module "crypto-js"
// 路由类型拓展
declare type MyRouteObject = {
  icon?: React.ReactNode | null
  hidden?: boolean
  label?: string
  disable?: boolean
  title?: string
} & RouteObject
//原生事件类型
type EventType =
  | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
