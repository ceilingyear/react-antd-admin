import { createSlice } from "@reduxjs/toolkit"
import theme from "@/assets/theme/index"

const layoutStore = createSlice({
  name: "layoutStore",
  initialState: {
    navCloseState: false, //左侧导航栏是否缩入
    topBarState: [{ label: "首页", key: "/home", closable: false }], //topBar的数据
    thisTopBarKey: "", //当前topBar的key（用于页面跳转）
    theme,
  },
  reducers: {
    // 改变左侧导航栏是否缩入
    setNavCloseState(state) {
      state.navCloseState = !state.navCloseState
    },
    //改变当前topBar的数据
    changeTopBarState(state, { payload }) {
      if (payload.label === undefined) return
      // if (state.topBarState.length === 0) return
      for (const item of state.topBarState) {
        if (item.key === payload.key) {
          state.thisTopBarKey = item.key
          return
        }
      }
      state.thisTopBarKey = payload.key
      state.topBarState.push(payload)
    },
    //删除当前topBar的数据
    deleteTopBarState(state, { payload }) {
      const newTopBarState = state.topBarState.filter(
        (item) => item.key !== payload
      )
      state.topBarState = newTopBarState
      console.log(newTopBarState)
    },
    // 更改主题信息
    setTheme(state, { payload }) {
      state.theme = { ...state.theme, ...payload }
    },
  },
})

export const {
  setNavCloseState,
  changeTopBarState,
  deleteTopBarState,
  setTheme,
} = layoutStore.actions

export default layoutStore.reducer
