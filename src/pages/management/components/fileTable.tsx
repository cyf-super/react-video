import { Table } from 'antd'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { useParams } from 'react-router-dom'
import { useGetFile } from '../hooks/useFiles'

// interface DataType {
//   key: React.Key
//   name: string
//   type: string
//   create: string
//   size: string
// }

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Size',
    dataIndex: 'size',
  },
  {
    title: 'create',
    dataIndex: 'create',
  },
]

export const FileTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const { categoryId } = useParams()
  console.log('🚀 ~ FileTable ~ params:', categoryId)

  const { fileData } = useGetFile({
    categoryId,
  } as File.GetFileParams)
  console.log('🚀 ~ FileTable ~ data:', fileData)

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={fileData}
    />
  )
}
