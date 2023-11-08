// 获取当前路由所有信息
import routes from "@/router/index"

export function useThisRoute(thisUrl: string) {
  // 筛选出layout布局路由
  const index = routes.findIndex((item) => item.path === "/")
  const layout: any = routes[index].children
  function deps(data: any): void {
    for (const item of data) {
      // console.log(item);
      if (thisUrl === item.path) return item
      else if (item.children && thisUrl.includes(item.path)) {
        return deps(item.children)
      }
    }
  }
  const thisRoute = deps(layout) as any
  console.log(thisRoute);

  return thisRoute
}