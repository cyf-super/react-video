// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand'
import { CategoryOptions } from '@/pages/home/hooks/useProject'

interface StateType {
  files: File.FileType[]
  categories: CategoryOptions[]
  selectIds: string[]
  count: number
}

interface ActionType {
  removeFile: (id: string) => void
  addFiles: (files: File.FileType[]) => void
  setCount: (count: number) => void
  setSelectIds: (selectIds: string[]) => void
  addCateGory: (categories: CategoryOptions[]) => void
}

const findIndex = (list: File.FileType[], id: string) =>
  list.findIndex((item) => item.fileId === id)

const initialState = {
  files: [],
  selectIds: [],
  count: 0,
  categories: [],
}

export const fileStore = create<StateType & ActionType>()((set) => ({
  ...initialState,

  removeFile(id: string) {
    set((state) => {
      const newState = { ...state }
      const index = findIndex(newState.files, id)
      if (index !== -1) {
        newState.files.splice(index, 1)
      }
      return newState
    })
  },

  addFiles(files: File.FileType[]) {
    set({
      files,
    })
  },

  setCount: (count: number) => {
    set({ count })
  },

  setSelectIds: (selectIds: string[]) => {
    set({
      selectIds,
    })
  },

  addCateGory(categories: CategoryOptions[]) {
    set({ categories })
  },
}))
