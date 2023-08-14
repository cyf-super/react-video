import dayjs from 'dayjs'
import { formatBytes } from '@cyf-super/utils'

export const sliceNameType = (name: string) => {
  const nameArr = name.split('.')
  const type = nameArr.pop()
  const namer = nameArr.join('.')

  return [namer, type]
}

export function formatFileData(files: File.FileType[]) {
  return files.map((file) => ({
    ...file,
    key: file.fileId,
    type: file.type,
    create: dayjs(file.createdAt).format('YYYY-MM-DD HH:mm'),
    size: formatBytes(<number>file.size),
    name: sliceNameType(file.name)[0] || '',
  }))
}