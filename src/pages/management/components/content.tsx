import { useState } from 'react'
import { Button } from 'antd'
import { CategoryModal } from './categoryModal'
import { UploadDrawer } from '@/components/uploadDrawer'
import { UploadProvider } from '@/context/UploadProvider'

export const Content = () => {
  const [open, showModal] = useState(false)
  const [openPopver, showPopver] = useState(false)

  const cancelCategory = () => {
    showModal(false)
  }
  const createCategory = () => {
    showModal(true)
  }

  const hidePopver = () => {
    showPopver(false)
  }
  return (
    <>
      <div className="mx-10 my-5">
        <Button
          type="primary"
          onClick={() => showPopver(true)}
          className="mr-5"
        >
          上传
        </Button>
        <Button type="primary" onClick={() => showModal(true)}>
          新建分类
        </Button>
      </div>
      <CategoryModal
        open={open}
        handleOk={createCategory}
        handleCancel={cancelCategory}
      />
      <UploadProvider>
        <UploadDrawer open={openPopver} hidePopver={hidePopver} />
      </UploadProvider>
    </>
  )
}
