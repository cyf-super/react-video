declare namespace Login {
  interface Params {
    username: string
    password: string
  }

  interface Response {
    token: string
    data: {
      id: number
      nickname: string
      role: string
      username: string
    }
  }
}

declare namespace Uplaod {
  interface Params {
    formData: FormData
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
    source: CancelToken
  }

  interface Response {
    code: string
    data: {
      categories: Data[]
      count: number
    }
  }

  interface Data {
    categoryId: string
    createdAt: string
    id: number
    name: string
    updatedAt: string
  }
}

declare namespace Category {
  interface Response {
    code: string
    data: {
      categories: Data[]
      count: number
    }
  }

  interface Data {
    categoryId: string
    createdAt: string
    id: number
    name: string
    updatedAt: string
  }
}

declare namespace File {
  interface GetFileParams {
    categoryId: string
  }

  interface GetFileResponse {
    code: string
    data: {
      count: number
      files: FileType[]
    }
  }

  interface FileType {
    key: string
    id: string
    fileId: string
    name: string
    size: number | string
    type: string
    path: string
    categoryId: string
    createdAt: string
    updatedAt: string
  }

  interface DeleteFilesParams {
    fileIds: string[]
  }
  interface DeleteFilesResponse {
    code: string
    data: {
      count: number
    }
    message: string
  }
}
