import { formatFileData } from './files'

export type GetFunctionParams<T> = T extends (...args: infer R) => void ? R : T

export const typeGuard = function <T>(value: T): T {
  return value as T
}

export type FormatFileDataType = ReturnType<typeof formatFileData>[number]
