import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userInfoStore } from '@/store/userInfoStore'
import { updateUserInfo } from '@/api'
import { isBase64 } from '@/utils/tools'
import { blobToBase64 } from '@/utils/files'

type InfoType = Omit<User.InfoType, 'userId' | 'role'> & {
  verifyPassword: string
  password: string
}

export const useInfoSetting = (tabStatus?: string) => {
  const {
    userInfo: user,
    webSite: webSiteInfo,
    setUserInfo: setUser,
  } = userInfoStore()

  const [userInfo, setUserInfo] = useState<InfoType>({
    username: user.username,
    nickname: user.nickname,
    password: '',
    verifyPassword: '',
    picture: user.picture,
  })

  const [website, setWebsite] = useState({
    name: webSiteInfo.name,
    image: webSiteInfo.image,
  })

  const userInfoRef = useRef<File>()
  const websiteRef = useRef<File>()

  useEffect(() => {
    if (tabStatus === 'userInfo') {
      console.log('渲染')
      onSetUserInfo({
        password: '',
        verifyPassword: '',
      })
    }
  }, [tabStatus])

  const onSetUserInfo = (info: { [key in keyof InfoType]?: string }) => {
    setUserInfo({
      ...userInfo,
      ...info,
    })
  }

  const onAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      userInfoRef.current = file
      const base64 = await blobToBase64(file)
      setUserInfo({
        ...userInfo,
        picture: base64,
      })
    }
  }

  const onLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      websiteRef.current = file
      const base64 = await blobToBase64(file)
      setWebsite({
        ...website,
        image: base64,
      })
    }
  }

  const updateUserMutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess(res) {
      if (res.status) {
        toast.success('更新成功！')
        setUser(res.data)
      } else {
        toast.error(res.message)
      }
    },
    onError() {},
  })

  const onCancleUser = () => {
    onSetUserInfo({
      username: user.username,
      nickname: user.nickname,
      password: '',
      verifyPassword: '',
      picture: user.picture,
    })
  }

  const onSureUser = () => {
    if (userInfo.password && userInfo.password !== userInfo.verifyPassword) {
      toast.warning('密码不一致，请再次确认！')
      return
    }
    const formData = new FormData()
    const params: Setting.UserInfoParams = {
      userId: user.userId,
    }
    if (userInfo.password) {
      params.password = userInfo.password
    }
    if (userInfo.nickname !== user.nickname) {
      params.nickname = userInfo.nickname
    }
    if (isBase64(userInfo.picture)) {
      formData.append('file', userInfoRef.current as File)
    }
    formData.append('info', JSON.stringify(params))
    updateUserMutation.mutate(formData)
  }

  return {
    website,
    userInfo,
    setWebsite,
    onSetUserInfo,
    onLogoChange,
    onAvatarChange,
    onCancleUser,
    onSureUser,
  }
}
