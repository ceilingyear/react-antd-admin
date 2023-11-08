import { createSlice } from "@reduxjs/toolkit"
const colorStore = createSlice({
  name: 'colorStore',
  initialState: {
    colorBox: [
      "magenta",
      "gold",
      "green",
      "volcano",
      "red",
      "lime",
      "orange",
      "cyan",
      "blue",
      "geekblue",
      "purple",
    ],
  },
  reducers: {
  }
})

export default colorStore.reducer