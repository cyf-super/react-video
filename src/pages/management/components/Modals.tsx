import { FC, useState, ChangeEvent, useEffect } from 'react'
import { Input, Modal } from 'antd'
import { toast } from 'sonner'
import { ParamsType } from '../hooks/useFiles'
import { sliceNameType } from '@/utils/files'

interface BaseModalType {
  open: boolean
  handleOk: (name?: string) => void
  handleCancel: () => void
  title: string
  value?: string
}

// 创建分类
export const CategoryModal: FC<BaseModalType> = ({
  open,
  title,
  value,
  handleOk,
  handleCancel,
}) => {
  const [category, setCategory] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  useEffect(() => {
    open && setCategory(value || '')
  }, [open])

  const onOk = () => {
    handleOk(category)
  }

  const onCancel = () => {
    handleCancel()
  }

  return (
    <Modal
      width={400}
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <p>
        <Input className="h-30 my-5" value={category} onChange={onChange} />
      </p>
    </Modal>
  )
}

interface DeleteModalType extends Omit<BaseModalType, 'title'> {
  text: string
}

/**
 * 删除的Modal
 * @param param0
 * @returns
 */
export const DeleteModal = ({
  open,
  text,
  handleOk,
  handleCancel,
}: DeleteModalType) => (
  <Modal
    width={400}
    title="删除"
    open={open}
    onOk={() => handleOk()}
    onCancel={handleCancel}
    destroyOnClose
  >
    <p>{text}</p>
  </Modal>
)

interface UpdateModalType extends Omit<BaseModalType, 'title' | 'handleOk'> {
  file: File.FileType
  handleOk: (params: ParamsType) => void
}

export const UpdateModal = ({
  open,
  file,
  handleOk,
  handleCancel,
}: UpdateModalType) => {
  const [fileName, setFileName] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value)
  }

  useEffect(() => {
    open && setFileName(sliceNameType(file?.name || '')[0] || '')
  }, [open])

  const editFile = () => {
    if (fileName === '') {
      toast.warning('文件名不能为空！')
      return
    }

    const params: ParamsType = {
      fileId: file.fileId,
    }
    const [fName, suffix] = sliceNameType(file.name)
    console.log(fName, suffix)
    if (fileName !== fName) {
      params.name = `${fileName}.${suffix}`
    }
    handleOk(params)
    handleCancel()
  }

  return (
    <Modal
      width={400}
      title="修改文件信息"
      open={open}
      onOk={editFile}
      onCancel={handleCancel}
      destroyOnClose
    >
      <div className="flex my-4 items-center">
        <span className="mr-2">文件名</span>
        <Input value={fileName} onChange={onChange} className="flex-1" />
      </div>
    </Modal>
  )
}
