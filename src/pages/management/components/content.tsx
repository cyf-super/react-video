import { useState } from 'react'
import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { CategoryModal } from './Modals'
import { UploadDrawer } from '@/components/uploadDrawer'
import { UploadProvider } from '@/context/UploadProvider'
import { FileTable } from './fileTable'
import { useGetFile } from '../hooks/useFiles'
import { useCategory } from '../hooks/useCategory'
import './fileTable.css'

export const Content = () => {
  const [open, showModal] = useState(false)
  const [openPopver, showPopver] = useState(false)

  const { categoryId } = useParams()

  const { createMutation } = useCategory()

  useGetFile({
    categoryId,
  } as File.GetFilesParams)

  const cancelCategory = () => {
    showModal(false)
  }
  const createCategory = (name?: string) => {
    if (!name?.trim()) {
      toast.warning('Event start time cannot be earlier than 8am')
      return
    }
    createMutation.mutate(name)
    showModal(false)
  }

  const hidePopver = () => {
    showPopver(false)
  }
  return (
    <>
      <div className="mx-10 my-5">
        <div>
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
        <div className="mt-8">
          <FileTable />
        </div>
      </div>
      <CategoryModal
        open={open}
        title="创建分类"
        handleOk={createCategory}
        handleCancel={cancelCategory}
      />
      <UploadProvider>
        <UploadDrawer open={openPopver} hidePopver={hidePopver} />
      </UploadProvider>
    </>
  )
}
