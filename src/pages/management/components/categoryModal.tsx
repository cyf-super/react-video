import { FC, useState, ChangeEvent } from 'react'
import { Input, Modal } from 'antd'

interface BaseModalType {
  open: boolean
  handleOk: () => void
  handleCancel: () => void
}

export const CategoryModal: FC<BaseModalType> = ({
  open,
  handleOk,
  handleCancel,
}) => {
  const [category, setCategory] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }
  return (
    <Modal
      width={400}
      title="创建分类"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <p>
        <Input className="h-30 my-5" value={category} onChange={onChange} />
      </p>
    </Modal>
  )
}
