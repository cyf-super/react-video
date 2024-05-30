interface PublicResponse {
  status: boolean
  code: string
  message?: string
}

interface ResponseT<T> extends PublicResponse, T {}

declare namespace User {
  interface InfoType {
    userId: number
    role: string
    nickname: string
    username: string
    picture: string
  }
}

declare namespace Login {
  interface Params {
    username: string
    password: string
  }

  interface Response {
    token: string
    data: User.InfoType
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

  boolean
  interface GetSwiperReponse extends PublicResponse {
    data: {
      swiper: SwiperType[]
    }
  }

  interface SwiperUploadParams {
    formData: FormData
    list: SwiperType[]
  }
  interface SwiperUploadResponse extends PublicResponse {
    data: any
  }

  interface UserInfoParams {
    nickname?: string
    picture?: string
    password?: string
    userId: number
  }

  interface UserInfoResponse extends PublicResponse {
    data: User.InfoType
  }
}
