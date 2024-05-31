import { LStorage } from '@cyf-super/utils'
import { create } from 'zustand'
import { userInfoKey } from '@/pages/login/hooks/useLogin'

type StateType = {
  userInfo: UserDataType
  webSite: WebSiteDataType
}

type ActionType = {
  setUserInfo: (userInfo: UserDataType) => void
  setWebsite: (info: WebSiteDataType) => void
}

type UserDataType = typeof initUserData
type WebSiteDataType = typeof initWebSiteData

const initUserData = {
  userId: 0,
  role: '',
  username: '',
  nickname: '',
  picture: '',
}

const initWebSiteData = {
  websiteName: '',
  logo: '',
}

export const userInfoStore = create<StateType & ActionType>()((set) => ({
  userInfo: initUserData,
  webSite: initWebSiteData,

  setUserInfo(userInfo: User.InfoType) {
    set({ userInfo })
  },
  setWebsite(info: WebSiteDataType) {
    set({ webSite: info })
  },
}))

const user = LStorage.get(userInfoKey)
if (user) {
  userInfoStore.getState().setUserInfo(user as User.InfoType)
}
