import { useState } from 'react'
import { Button, Drawer, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { UploadProgress } from './uploadProgress'
import { useUpload } from '@/context/UploadProvider'

interface UploadDrawerType {
  open: boolean
  hidePopver: () => void
}

export const UploadDrawer = ({ open, hidePopver }: UploadDrawerType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadNum, setUploadNum] = useState(0)
  const onClose = () => {
    hidePopver()
  }

  const { dispatchUpload, selectFiles, clearFiles } = useUpload()

  const prop: UploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: '',
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
    beforeUpload(_, fileList) {
      setUploadNum((preVal) => {
        if (preVal === fileList.length - 1) {
          selectFiles(fileList)
          return 0
        }
        return preVal + 1
      })
      return false
    },
  }

  return (
    <Drawer
      title="上传文件"
      placement="right"
      size="large"
      open={open}
      onClose={onClose}
      className="overflow-hidden"
    >
      <Upload.Dragger {...prop} height={200}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        <p className="ant-upload-hint">支持视频、图片、pdf</p>
      </Upload.Dragger>
      <UploadProgress />
      <div className="flex justify-between pt-5 px-[-24] border-t border-gray border-solid">
        <Button onClick={() => clearFiles()}>清除</Button>
        <Button type="primary" onClick={() => dispatchUpload()}>
          确认上传
        </Button>
      </div>
    </Drawer>
  )
}
