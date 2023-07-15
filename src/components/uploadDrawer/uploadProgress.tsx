import { Progress } from 'antd'
import {
  FileSyncOutlined,
  DeleteOutlined,
  FileDoneOutlined,
} from '@ant-design/icons'
import { formatBytes } from '@cyf-super/utils'
import { useUpload } from '@/context/UploadProvider'

const iconType = 'text-xl text-center px-3 py-2 gray-border rounded-lg'

export const UploadProgress = () => {
  const { uploadData: files, removeFile } = useUpload()

  return (
    <ul className="flex-1 gray-border my-5 p-4 overflow-y-auto">
      {files.map((item) => (
        <li className="flex-center justify-start my-2" key={item.file.uid}>
          {item.progress !== 100 ? (
            <FileSyncOutlined className={iconType} />
          ) : (
            <FileDoneOutlined className={iconType} />
          )}

          <div className="flex-1 mx-5">
            <div>
              <span>{item.file.name}</span>
              <span className="ml-2">{`(${formatBytes(
                item.file.size || 0
              )})`}</span>
            </div>
            {item.progress !== 100 && (
              <Progress percent={item.progress} status="active" />
            )}
            <div />
          </div>

          <div className="w-8 h-8">
            <DeleteOutlined
              className="hover:cursor-pointer"
              onClick={() => removeFile(item.file)}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
