import { configureStore } from "@reduxjs/toolkit"
import layoutStore from "./features/layoutStore"
import colorStore from "./features/colorStore"
import { TypedUseSelectorHook, useSelector } from "react-redux"

const store = configureStore({
  reducer: {
    layoutStore,
    colorStore,
  },
  devTools: import.meta.env.NODE_ENV === "development",
})

//store的类型本质上是store.getState 函数的返回值，所以拿到store.getState 函数的返回值即可
type getStateType = typeof store.getState
export type storeType = ReturnType<getStateType> //returnType 返回一个函数的返回值

//对useSelector进行封装加强，让他的state可以自动验证storeType
export const useAppSelector: TypedUseSelectorHook<storeType> = useSelector

export default store
