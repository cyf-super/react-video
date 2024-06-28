import { create } from 'zustand'

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

export enum UserState {
  none = 0,
  admin = 1,
  vip = 2,
  user = 3,
}

const initUserData = {
  userId: 0,
  role: UserState.none,
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
