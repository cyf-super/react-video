export const sliceNameType = (name: string) => {
  const nameArr = name.split('.')
  const type = nameArr.pop()
  const namer = nameArr.join('.')

  return [namer, type]
}
