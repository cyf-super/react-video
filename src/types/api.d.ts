declare namespace Login {
  interface ParamsType {
    username: string
    password: string
  }

  interface ResponseType {
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
  interface ParamsType {
    formData: FormData
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
    source: CancelToken
  }
}
