import {
  useMemo,
  useCallback,
  useContext,
  createContext,
  FC,
  ReactNode,
} from 'react'
import { UploadFile } from 'antd'
import {
  useUploadVideo,
  UploadDataType,
} from '@/pages/management/hooks/useUploadVideo'

export interface UploadContextType {
  uploadData: UploadDataType[]
  removeFile: (file: UploadFile) => void
  dispatchUpload: () => void
  selectFiles: (files: UploadFile[]) => void
  clearFiles: () => void
}

const UploadContext = createContext<UploadContextType | {}>({})

export const UploadProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { dispatchUpload, state, dispatch } = useUploadVideo()
  const selectFiles = useCallback(
    (files: UploadFile[]) => {
      console.log('files ', files)
      dispatch({
        type: 'ADD',
        files,
      })
    },
    [dispatch]
  )
  const removeFile = useCallback(
    (file: UploadFile) => {
      dispatch({
        type: 'REMOVE',
        file,
      })
    },
    [dispatch]
  )

  const clearFiles = useCallback(() => {
    dispatch({
      type: 'CLEAR',
    })
  }, [dispatch])

  const cacheValue = useMemo(
    () => ({
      ...state,
      removeFile,
      dispatchUpload,
      selectFiles,
      clearFiles,
    }),
    [removeFile, selectFiles, dispatchUpload, clearFiles, state]
  )
  return (
    <UploadContext.Provider value={cacheValue}>
      {children}
    </UploadContext.Provider>
  )
}

export const useUpload = () => {
  const context = useContext(UploadContext)
  return context as UploadContextType
}
