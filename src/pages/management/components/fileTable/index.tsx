/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Table, Dropdown } from 'antd'
import { useState, useRef, memo, forwardRef } from 'react'
import type { MenuProps } from 'antd'
import {
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { formatBytes } from '@cyf-super/utils'
import dayjs from 'dayjs'
import { toast } from 'sonner'
import { CategoryModal, DeleteModal, UpdateModal } from '../modals'
import { useGetFile, useHandleFile } from '../../hooks/useFiles'
import { sliceNameType } from '@/utils/files'
import { UploadProvider } from '@/context/UploadProvider'
import { UploadDrawer } from '@/components/uploadDrawer'
import { useCategory } from '../../hooks/useCategory'
import '../../css/fileTable.css'
import { fileStore } from '@/store/fileStore'

export const FileTable = memo(
  forwardRef(() => {
    const { categoryId } = useParams()

    const { setSelectIds } = fileStore()

    const [popver, showPopver] = useState(false)
    const [open, showModal] = useState(false)

    const { createMutation } = useCategory()
    const {
      fileIds,
      showBatchDeleteModal,
      setShowBatchDeleteModal,
      onBatchDelete,
      deleteBatch,
    } = useHandleFile()
    const { files, pagination, onChange } = useGetFile({
      categoryId,
    } as File.GetFilesParams)

    const cancelCategory = () => {
      showModal(false)
    }
    const createCategory = (name?: string) => {
      if (!name?.trim()) {
        toast.warning('名称不能为空～')
        return
      }
      createMutation.mutate(name)
      showModal(false)
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const currentFile = useRef<File.FileType>()
    const {
      showEditModal,
      showDeleteModal,
      deleteFile,
      downloadFile,
      handleUpdate,
      setShowDeleteModal,
      setShowEditModal,
    } = useHandleFile()

    const onHandleFile = (key: string, file: File.FileType) => {
      currentFile.current = file
      switch (key) {
        case 'edit':
          setShowEditModal(true)
          break
        case 'delete':
          setShowDeleteModal(true)
          break
        case 'download':
          downloadFile(file)
          break
        default:
          break
      }
    }

    const items: MenuProps['items'] = [
      {
        key: 'edit',
        label: (
          <div className="w-20 flex-center justify-start">
            <EditOutlined />
            <span>编辑</span>
          </div>
        ),
      },
      {
        key: 'delete',
        label: (
          <div className="w-20 flex-center justify-start">
            <DeleteOutlined />
            <span className="text-red-600 m-1">删除</span>
          </div>
        ),
      },
      {
        key: 'download',
        label: (
          <div className="w-20 flex-center justify-start">
            <DeleteOutlined />
            <span className="m-1">下载</span>
          </div>
        ),
      },
    ]

    const tableCol: ColumnsType<any> = [
      {
        title: '名称',
        dataIndex: 'name',
        render: (text) => (
          <div className="text-sky-500 cursor-pointer" onClick={() => {}}>
            {sliceNameType(text)[0] || ''}
          </div>
        ),
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '大小',
        dataIndex: 'size',
        render: (size) => <div>{formatBytes(size)}</div>,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        render: (timer) => <div>{dayjs(timer).format('YYYY-MM-DD HH:mm')}</div>,
      },
      {
        title: '操作',
        dataIndex: 'handle',
        render: (_: unknown, record: File.FileType) => (
          <Dropdown
            menu={{ items, onClick: ({ key }) => onHandleFile(key, record) }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        ),
      },
    ]

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys)
      setSelectIds(newSelectedRowKeys as string[])
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    }

    return (
      <div className="mx-5">
        <div className="my-5">
          <div className="flex justify-between">
            <div>
              <Button
                type="primary"
                className="mr-5"
                onClick={() => showModal(true)}
              >
                新建分类
              </Button>
              <Button type="primary" onClick={() => showPopver(true)}>
                上传
              </Button>
            </div>
            <Button type="primary" onClick={onBatchDelete}>
              删除
            </Button>
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={tableCol}
          dataSource={files}
          pagination={{
            total: pagination.total,
            pageSize: pagination.pageSize,
            current: pagination.currentPage,
            onChange,
          }}
        />

        <DeleteModal
          open={showDeleteModal}
          text="确定删除该文件？"
          handleOk={() => deleteFile(currentFile.current!)}
          handleCancel={() => {
            setShowDeleteModal(false)
          }}
        />
        <UpdateModal
          open={showEditModal}
          file={currentFile.current!}
          handleOk={handleUpdate}
          handleCancel={() => setShowEditModal(false)}
        />

        <CategoryModal
          open={open}
          title="创建分类"
          handleOk={createCategory}
          handleCancel={cancelCategory}
        />
        <DeleteModal
          open={showBatchDeleteModal}
          text={`确定删除${fileIds.length}文件？`}
          handleOk={deleteBatch}
          handleCancel={() => {
            setShowBatchDeleteModal(false)
            setSelectedRowKeys([])
          }}
        />
        <UploadProvider>
          <UploadDrawer open={popver} hidePopver={() => showPopver(false)} />
        </UploadProvider>
      </div>
    )
  })
)
