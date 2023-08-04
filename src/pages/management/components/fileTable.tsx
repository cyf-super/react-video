import { Button, Table, Dropdown } from 'antd'
import { useState } from 'react'
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { EllipsisOutlined } from '@ant-design/icons'
import { FileDataType } from '../hooks/useFiles'

// interface DataType {
//   key: React.Key
//   name: string
//   type: string
//   create: string
//   size: string
// }

const onClick: MenuProps['onClick'] = (value) => {
  console.log('🚀 ~ onClick ~ key:', value)
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <div>编辑</div>,
  },
  {
    key: '2',
    label: <div>删除</div>,
  },
]

const columns: ColumnsType<any> = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '大小',
    dataIndex: 'size',
  },
  {
    title: '创建时间',
    dataIndex: 'create',
  },
  {
    title: '操作',
    dataIndex: 'handle',
    render: () => (
      <Dropdown
        menu={{ items, onClick }}
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

export const FileTable = ({ fileData }: { fileData: FileDataType[] }) => {
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
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={fileData}
    />
  )
}
