import { useState } from 'react'
import { Drawer, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'

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
          console.log(fileList)
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
    >
      <Upload.Dragger {...prop}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Upload.Dragger>
    </Drawer>
  )
}
