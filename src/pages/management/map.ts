import type { ColumnsType } from 'antd/es/table'

export const columns: ColumnsType<any> = [
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
    dataIndex: 'createTime',
  },
]
