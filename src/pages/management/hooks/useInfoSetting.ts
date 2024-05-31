import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userInfoStore } from '@/store/userInfoStore'
import { updateUserInfo, updateWebsiteInfApi } from '@/api'
import { isBase64 } from '@/utils/tools'
import { blobToBase64 } from '@/utils/files'
import { queryClient } from '@/queryClient'

type InfoType = Omit<User.InfoType, 'userId' | 'role'> & {
  verifyPassword: string
  password: string
}

export const useInfoSetting = (tabStatus?: string) => {
  const {
    userInfo: user,
    webSite: webSiteInfo,
    setUserInfo: setUserStore,
    setWebsite: setWebSiteStore,
  } = userInfoStore()

  const [userInfo, setUserInfo] = useState<InfoType>({
    username: user.username,
    nickname: user.nickname,
    password: '',
    verifyPassword: '',
    picture: user.picture,
  })

  const [website, setWebsite] = useState({
    websiteName: webSiteInfo.websiteName,
    logo: webSiteInfo.logo,
  })

  const isChangeWebsite =
    JSON.stringify(website) !== JSON.stringify(webSiteInfo)

  const userInfoRef = useRef<File>()
  const websiteRef = useRef<File>()

  useEffect(() => {
    if (tabStatus === 'userInfo') {
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
        logo: base64,
      })
    }
  }

  const updateUserMutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess(res) {
      if (res.status) {
        toast.success('更新成功！')
        setUserStore(res.data)
      } else {
        toast.error(res.message)
      }
    },
    onError() {},
  })

  const updateWebsiteMutation = useMutation({
    mutationFn: updateWebsiteInfApi,
    onSuccess(res) {
      if (res.status) {
        toast.success('更新成功！')
        console.log('res.data ', res.data)
        setWebSiteStore(res.data)
        queryClient.invalidateQueries(['websiteInfo'])
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
    if (userInfo.password) {
      if (userInfo.password !== userInfo.verifyPassword) {
        toast.warning('密码不一致，请再次确认！')
        return
      }
      if (userInfo.password.length < 3) {
        toast.warning('密码不能少于3位')
        return
      }
    }
    const formData = new FormData()
    let temp = false
    const params: Setting.UserInfoParams = {
      userId: user.userId,
    }
    if (userInfo.password) {
      params.password = userInfo.password
      temp = true
    }
    if (userInfo.nickname !== user.nickname) {
      params.nickname = userInfo.nickname
      temp = true
    }
    if (isBase64(userInfo.picture)) {
      formData.append('file', userInfoRef.current as File)
      temp = true
    }
    formData.append('info', JSON.stringify(params))
    if (temp) {
      updateUserMutation.mutate(formData)
    }
  }

  const onCancleWebsite = () => {
    setWebsite({
      websiteName: webSiteInfo.websiteName,
      logo: webSiteInfo.logo,
    })
  }

  const onSureWebsite = () => {
    const formData = new FormData()
    let temp = false
    if (website.websiteName !== webSiteInfo.websiteName) {
      formData.append('websiteName', website.websiteName)
      temp = true
    }
    if (website.logo !== webSiteInfo.logo) {
      formData.append('file', websiteRef.current as File)
      temp = true
    }
    if (temp) {
      updateWebsiteMutation.mutate(formData)
    }
  }

  return {
    website,
    userInfo,
    isChangeWebsite,
    setWebsite,
    onSetUserInfo,
    onLogoChange,
    onAvatarChange,
    onCancleUser,
    onSureUser,
    onCancleWebsite,
    onSureWebsite,
  }
}
