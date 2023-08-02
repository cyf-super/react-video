import { Table } from 'antd'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const data: DataType[] = []
for (let i = 0; i < 46; i += 1) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}

export const FileTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  )
}
