export interface MenuListType {
  zhTW: string
  enUs: string
  url: string
  key: string
  index: number
  childList?: {
    zhTW: string
    enUs: string
    url: string
    title: string
    enTitle: string
    childList?: {
      zhTW: string
      enUs: string
      url: string
      title?: string
      enTitle?: string
    }[]
  }[]
}

export interface TokenCurrentAccountPriceType {
  balance: string
  token: string
  type: string
}
