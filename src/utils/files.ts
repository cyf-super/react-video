import type { UploadFile } from 'antd'

export const sliceNameType = (name: string) => {
  const nameArr = name.split('.')
  const type = nameArr.pop()
  const namer = nameArr.join('.')
  return [namer, type]
}

export function formatFileData(files: File.FileType[]): File.FileType[] {
  return files.map((file) => ({
    ...file,
    key: file.fileId,
    // createTime: dayjs(file.createdAt).format('YYYY-MM-DD HH:mm'),
    // size: formatBytes(<number>file.size),
    // name: sliceNameType(file.name)[0] || '',
  }))
}

export const isVideoOfFile = (file: UploadFile) =>
  file.type?.startsWith('video')

export const getFileName = (file: File.FileType) => {
  const arr = file.name.split('.')
  return [arr.slice(0, -1).join('.'), arr.slice(-1).join('.')]
}
