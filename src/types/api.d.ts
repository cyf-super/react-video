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
    code: number
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
    code: number
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
    count: number
    files: FileType[]
  }

  interface FileType {
    id: string
    fileId: string
    name: string
    size: number
    type: string
    path: string
    categoryId: string
    createdAt: string
    updatedAt: string
  }
}
