import { Button, Table, Dropdown } from 'antd'
import { useState, useRef } from 'react'
import type { MenuProps } from 'antd'
import { useSelector } from 'react-redux'
import {
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { selectFiles } from '@/store/slices/fileslice'
import { useHandleFile } from '../hooks/useFiles'
import { columns } from '../map'

// interface DataType {
//   key: React.Key
//   name: string
//   type: string
//   create: string
//   size: string
// }

export const FileTable = () => {
  const fileData = useSelector(selectFiles)
  console.log('🚀 ~ FileTable ~ fileData:', fileData)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const currentFile = useRef<File.FileType>()
  const { deleteFile, showDelIcon, setShowDelIcon } = useHandleFile()
  const onHandleFile = (key: string, file: File.FileType) => {
    switch (key) {
      case '2':
        console.log('🚀 ~ onHandleFile ~ currentFile:', currentFile)
        currentFile.current = file
        setShowDelIcon(true)
        break
      default:
        break
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="w-20">
          <EditOutlined />
          <span>编辑</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex-center">
          <div className="w-20 flex-center justify-start">
            <DeleteOutlined />
            <div className="text-red-600 m-1">删除</div>
          </div>
          {showDelIcon && (
            <CheckOutlined
              onClick={() => deleteFile(currentFile.current?.fileId as string)}
            />
          )}
        </div>
      ),
    },
  ]

  const tableCol = [
    ...columns,
    {
      title: '操作',
      dataIndex: 'handle',
      render: (key1: any, record: any) => (
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <Table
      rowSelection={rowSelection}
      columns={tableCol}
      dataSource={fileData}
    />
  )
}
