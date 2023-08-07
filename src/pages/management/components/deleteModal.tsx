import { FC } from 'react'
import { Modal } from 'antd'

interface BaseModalType {
  open: boolean
  handleOk: () => void
  handleCancel: () => void
}

export const DeleteModal: FC<BaseModalType> = ({
  open,
  handleOk,
  handleCancel,
}) => (
  <Modal
    width={400}
    title="删除"
    open={open}
    onOk={handleOk}
    onCancel={handleCancel}
    destroyOnClose
  >
    <p>确定删除该文件？</p>
  </Modal>
)
