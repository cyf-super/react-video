import {
  useState,
  useMemo,
  useCallback,
  useContext,
  createContext,
  FC,
  ReactNode,
} from 'react'

export interface UploadContextType {
  uploadData: any[]
  openPopver: Boolean
  setUploadData: (files: any[]) => void
  setPopver: (key: boolean) => void
}

const UploadContext = createContext<UploadContextType | {}>({})

export const UploadProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadData, setUploadData] = useState([])
  const [openPopver, showPopver] = useState(false)
  const setPopver = useCallback(
    (show: boolean) => {
      showPopver(show)
    },
    [showPopver]
  )

  const cacheValue = useMemo(
    () => ({
      uploadData,
      openPopver,
      setUploadData,
      setPopver,
    }),
    [uploadData, openPopver, setUploadData, setPopver]
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
