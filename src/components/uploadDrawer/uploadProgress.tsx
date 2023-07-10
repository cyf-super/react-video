import { Progress } from 'antd'
import { FileSyncOutlined, DeleteOutlined } from '@ant-design/icons'
import { formatBytes } from '@cyf-super/utils'
import { useUpload } from '@/context/UploadProvider'

export const UploadProgress = () => {
  const { uploadData: files } = useUpload()

  return (
    <ul className="flex-1 gray-border my-5 p-4 overflow-y-auto">
      {files.map((file: any) => (
        <li className="flex-center justify-start my-2">
          <FileSyncOutlined className="text-xl text-center px-3 py-2 gray-border rounded-lg" />
          <div className="flex-1 mx-5">
            <div>
              <span>{file.name}</span>
              <span className="ml-2">{`(${formatBytes(file.size)})`}</span>
            </div>
            <Progress percent={file.progress} status="active" />
            <div />
          </div>
          <div className="w-8 h-8">
            <DeleteOutlined className="" />
          </div>
        </li>
      ))}
    </ul>
  )
}
