import { useReducer, useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import type { UploadFile } from 'antd'
import axios, { AxiosProgressEvent, CancelTokenSource } from 'axios'
import { uploadVideoService } from '@/api'
// import { useGetCategory } from './useCategory'

export interface UploadDataType {
  file: UploadFile
  progress?: number
  cancel?: CancelTokenSource
}

interface StateType {
  uploadData: UploadDataType[]
  noUpload: UploadFile[]
}

interface ActionType extends Partial<UploadDataType> {
  type: 'ADD' | 'REMOVE' | 'CLEAR' | 'UPLOAD' | 'PROGRESS'
  files?: UploadFile[]
}

const defaultInitialState: StateType = {
  uploadData: [],
  noUpload: [],
}

const uploadDispatch = (state: StateType, action: ActionType) => {
  const { files, file: newFile, type, progress, cancel } = action
  const { uploadData, noUpload } = state
  switch (type) {
    // 选择文件
    case 'ADD': {
      if (!files) return state
      return {
        noUpload: [...files, ...noUpload],
        uploadData: [...files.map((file) => ({ file })), ...uploadData],
      }
    }

    // 上传文件 cancel等
    case 'UPLOAD': {
      const newNoUpload = noUpload.filter((file) => file.uid !== newFile?.uid)

      const index = uploadData.findIndex(
        (item) => item.file.uid === newFile?.uid
      )
      Object.assign(uploadData[index], { progress, cancel })
      return {
        noUpload: newNoUpload,
        uploadData,
      }
    }
    case 'PROGRESS': {
      const index = uploadData.findIndex(
        (item) => item.file.uid === newFile?.uid
      )
      Object.assign(uploadData[index], { progress })
      return {
        ...state,
        uploadData,
      }
    }

    // 移除某个文件
    case 'REMOVE': {
      const index = uploadData.findIndex(
        (item) => item.file.uid === newFile?.uid
      )

      const { progress: processI, cancel: source } = uploadData[index]
      if (processI !== 100 && !!source) {
        source.cancel()
      }
      uploadData.splice(index, 1)
      const newNoUpload = noUpload.filter((file) => file.uid !== newFile?.uid)

      return {
        noUpload: newNoUpload,
        uploadData,
      }
    }

    // 清除已上传的文件
    case 'CLEAR': {
      const newUploadData = uploadData.filter((item) => item.progress !== 100)
      return {
        ...state,
        uploadData: newUploadData,
      }
    }
    default:
      return state
  }
}

export const useUploadVideo = () => {
  const client = useQueryClient()
  const { categoryId } = useParams()
  // const { categories } = useGetCategory()

  const [state, dispatch] = useReducer(uploadDispatch, defaultInitialState)

  const { mutate: upload, data } = useMutation(uploadVideoService, {
    onSuccess(data1) {
      console.log('上传成功', data1)
      client.invalidateQueries(['getFile', categoryId])
    },
    onError(err) {
      console.log('上传失败', err)
    },
  })
  console.log('🚀 ~ useUploadVideo ~ data:', data)

  const dispatchUpload = useCallback(() => {
    const files = state.noUpload
    if (!files.length) return

    files.forEach((file) => {
      const formData = new FormData()
      formData.append('file', file as unknown as File)
      formData.append('name', file.name)
      formData.append('categoryId', categoryId || '')
      formData.append('fileId', file.uid)
      const source = axios.CancelToken.source()
      const onUploadProgress = (e: AxiosProgressEvent) => {
        const progress = Math.round((e.loaded / <number>e.total) * 100)
        // 将上传进度更新为 mutation 状态
        dispatch({
          type: 'PROGRESS',
          file: <UploadFile>file,
          progress,
        })
      }
      upload({ formData, source, onUploadProgress })
      dispatch({
        type: 'UPLOAD',
        file: <UploadFile>file,
        progress: 0,
        cancel: source,
      })
    })
  }, [state, dispatch, upload, categoryId])

  return {
    upload,
    dispatchUpload,
    state,
    dispatch,
  }
}
