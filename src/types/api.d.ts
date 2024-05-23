interface PublicResponse {
  status: boolean
  code: string
}

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

  interface Response extends PublicResponse {
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
  interface Response extends PublicResponse {
    data: {
      categories: Data[]
      count: number
    }
    message: string
  }

  interface Data {
    categoryId: string
    createdAt: string
    id: string
    name: string
    updatedAt: string
  }
}

declare namespace File {
  interface GetFilesParams {
    categoryId: string
    pageSize: number
    currentPage: number
    name?: string
  }

  interface GetFilesResponse extends PublicResponse {
    data: {
      count: number
      files: FileType[]
    }
  }
  interface GetFileResponse extends PublicResponse {
    data: FileType
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
    createTime: string
    videoImgPath?: string
    fileName: string
  }

  interface DeleteFilesParams {
    fileIds: string[]
  }
  interface DeleteFilesResponse extends PublicResponse {
    data: {
      count: number
    }
    message: string
  }
}
declare namespace Setting {
  interface SwiperType {
    id: string
    src: string
    href?: string
  }

  interface GetSwiperReponse {
    code: number
    status: boolean
    data: {
      swiper: SwiperType[]
    }
  }

  interface SwiperUploadParams {
    formData: FormData
    list: SwiperType[]
  }
  interface SwiperUploadResponse {
    data: any
    message: string
    status: boolean
  }
}
