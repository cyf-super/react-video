import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userInfoStore } from '@/store/userInfoStore'
import { updateUserInfo } from '@/api'
import { isBase64 } from '@/utils/tools'

type InfoType = User.InfoType & {
  verifyPassword: string
}

export const useInfoSetting = () => {
  const { userInfo: user, webSite: webSiteInfo } = userInfoStore()

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

  const onSetUserInfo = (info: { [key in keyof InfoType]?: string }) => {
    setUserInfo({
      ...userInfo,
      ...info,
    })
  }

  const onAvatarChange = () => {}

  const onLogoChange = () => {}

  const updateUserMutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess(res) {
      if (res.status) {
        toast.success('更新成功！')
      } else {
        toast.error(res.message)
      }
    },
    onError() {},
  })

  const onCancleUser = () => {}

  const onSureUser = () => {
    if (userInfo.password && userInfo.password !== userInfo.verifyPassword) {
      toast.warning('密码不一致，请再次确认！')
      return
    }
    const formData = new FormData()
    const params: Setting.UserInfoParams = {}
    if (userInfo.password) {
      params.password = userInfo.password
    }
    if (userInfo.nickname) {
      params.nickname = userInfo.nickname
    }
    if (isBase64(userInfo.picture)) {
      formData.append('files', userInfoRef.current as File)
    }
    formData.append('params', JSON.stringify(params))

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
