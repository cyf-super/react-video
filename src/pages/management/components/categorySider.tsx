/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dropdown, MenuProps } from 'antd'
import { DeleteOutlined, EditOutlined, LaptopOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useCategory } from '../hooks/useCategory'
import styles from '../index.module.scss'
import { CategoryModal, DeleteModal } from './Modals'

export function CategorySider() {
  const { categoryId } = useParams()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showInputModal, setShowInputModal] = useState(false)
  const idRef = useRef('')
  const nameRef = useRef('')

  const { data, clickMenuItem, updateMutation, deleteMutation } = useCategory()

  const onHandleFile = (event: any, key: string, id: string) => {
    event.stopPropagation()
    idRef.current = id
    if (key === 'edit') {
      setShowInputModal(true)
      const name = data?.find((item) => item.categoryId === id)?.name || ''
      nameRef.current = name
    } else {
      setShowDeleteModal(true)
    }
  }

  const handleDelete = () => {
    deleteMutation.mutate(idRef.current)
    setShowDeleteModal(false)
  }

  const createCategory = (name?: string) => {
    if (!name?.trim()) {
      toast.warning('名称不能为空~')
      return
    }
    updateMutation.mutate({
      id: idRef.current,
      name,
    })
    setShowInputModal(false)
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
  ]
  return (
    <>
      <div className={styles.siderItem}>
        {data &&
          data.map((item) => (
            <div
              key={item.categoryId}
              className={clsx(
                'flex justify-between items-center h-[35px] w-full p-5 rounded-lg hover:bg-slate-200  hover:cursor-pointer'
              )}
              style={
                categoryId === item.categoryId
                  ? {
                      backgroundColor: '#7131d9',
                      color: '#fff',
                    }
                  : {}
              }
              onClick={() => clickMenuItem(item.categoryId)}
            >
              <div className="flex items-center">
                <LaptopOutlined />
                <span className="ml-[6px] ">{item.name}</span>
              </div>
              <Dropdown
                menu={{
                  items,
                  onClick: ({ key, domEvent }) =>
                    onHandleFile(domEvent, key, item.categoryId),
                  style: {
                    width: '80px',
                  },
                }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <span className="hidden">...</span>
              </Dropdown>
            </div>
          ))}
      </div>
      <DeleteModal
        open={showDeleteModal}
        text="确定删除该文件？"
        handleOk={handleDelete}
        handleCancel={() => setShowDeleteModal(false)}
      />
      <CategoryModal
        open={showInputModal}
        title="编辑"
        value={nameRef.current}
        handleOk={createCategory}
        handleCancel={() => setShowInputModal(false)}
      />
    </>
  )
}
