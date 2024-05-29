import { LStorage } from '@cyf-super/utils'
import { create } from 'zustand'
import { userInfoKey } from '@/pages/login/hooks/useLogin'

type StateType = {
  userInfo: UserDataType
  webSite: WebSiteDataType
}

type ActionType = {
  setUserInfo: (userInfo: UserDataType) => void
  setWebSite: (info: WebSiteDataType) => void
}

type UserDataType = typeof initUserData
type WebSiteDataType = typeof initWebSiteData

const initUserData = {
  username: '',
  nickname: '',
  picture: '',
}

const initWebSiteData = {
  name: '',
  image: '',
}

export const userInfoStore = create<StateType & ActionType>()((set) => ({
  userInfo: initUserData,
  webSite: initWebSiteData,

  setUserInfo(userInfo: UserDataType) {
    set({ userInfo })
  },
  setWebSite(info: WebSiteDataType) {
    set({ webSite: info })
  },
}))

const user = LStorage.get(userInfoKey)
if (user) {
  userInfoStore.getState().setUserInfo(user as UserDataType)
}
