import { createSlice } from '@reduxjs/toolkit'

interface StateType {
  files: File.FileType[]
  count: number
}

const findIndex = (list: File.FileType[], id: string) =>
  list.findIndex((item) => item.fileId === id)

const initialState: StateType = {
  files: [],
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
  },
})

export const selectFiles = (state: any) => state.files.files
export const selectCount = (state: any) => state.files.count

export const { removeFile, addFiles, setCount } = fileSlice.actions

export default fileSlice.reducer
