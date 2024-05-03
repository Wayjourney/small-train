/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    openid: string
    role: string
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
interface IIncome {
  id: string
  created_at: string
  user: {
    id: string
    name: string
  }
  price: {
    amount: number
    count: number
    type: 'single' | 'charge'
  }
}
interface IIncomeData {
  list: { [key:string]: IIncome[] }
  nextCursor: string | null
  isLoading: boolean
  count: number
}

interface IReceipt {
  id: string
  valid: 1 | 0
  created_at: string
  user: {
    openid: string
    name: string
    phone: string
  }
}
interface IReceiptData {
  list: { [key:string]: IReceipt[] }
  count: number
  nextCursor: string | null
  isLoading: boolean
  validList: { [key: string]: boolean }
}