import { FC, useState, ChangeEvent, useEffect } from 'react'
import { Input, Modal } from 'antd'

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
    setCategory('')
    handleOk(category)
  }

  const onCancel = () => {
    setCategory('')
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
