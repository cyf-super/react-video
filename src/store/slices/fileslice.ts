import { createSlice } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import { RootState } from '..'

interface StateType {
  files: File.FileType[]
  selectIds: string[]
  count: number
}

const findIndex = (list: File.FileType[], id: string) =>
  list.findIndex((item) => item.fileId === id)

const initialState: StateType = {
  files: [],
  selectIds: [],
  count: 0,
}

export const fileSlice = createSlice({
  name: 'file',

  initialState,

  reducers: {
    removeFile(state, actions) {
      const id = actions.payload
      const index = findIndex(state.files, id)
      if (index !== -1) {
        state.files.splice(index, 1)
      }
    },
    addFiles(state, actions) {
      const files = actions.payload
      state.files = files
    },
    setCount: (state, actions) => {
      const count = actions.payload
      state.count = count
    },
    setSelectIds: (state, actions) => {
      const selectIds = actions.payload
      state.selectIds = selectIds
    },
  },
})

export const selectFiles = (state: RootState) => state.files.files
export const selectCount = (state: RootState) => state.files.count
export const selectFileIds = (state: RootState) => state.files.selectIds

export const { removeFile, addFiles, setCount, setSelectIds } =
  fileSlice.actions

export default fileSlice.reducer
