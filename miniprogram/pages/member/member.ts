// pages/member/member.ts
import { loadingSvg } from '../../utils/svg'

type UserData = {
  phone: string
  openid: string
  count: number
  created_at: string
}
type DataProps = {
  svgImg: string
  phone: string
  user: UserData | null
  loading: boolean
}
Page({

  /**
   * 页面的初始数据
   */
  data: <DataProps>{
    svgImg: loadingSvg(),
    phone: '',
    user: null,
    loading: false
  },

  handleInputChange(e: { detail: { value: any } }) {
    const phone = e.detail.value
    this.setData({ phone })
  },

  handleSearch() {
    wx.request({
      url: 'http://10.30.1.224:8000/api/users/search',
      data: {
        phone: this.data.phone
      },
      success: (res: { statusCode: number, data: UserData }) => {
        if (res.statusCode === 404) {
          wx.showToast({
            icon: 'error',
            title: "没有找到"
          })
        }
        this.setData({ user: res.data })
      },
      fail() {
        wx.showToast({
          title: "错误"
        })
      }
    })
  },

  handleConfirm() {
    if (this.data.loading) {
      return
    }

    wx.showModal({
      title: '核销',
      content: '手机尾号' + this.data.user!.phone.slice(-4) + '，核减一次',
      confirmText: '确定',
      confirmColor: '#15B628',
      cancelText: '取消',
      cancelColor: '#9ca3af',
      success: (res) => {
        if (res.confirm) {
          this.handleSubmit()
        }
      }
    })
  },
  
  handleSubmit() {
    this.setData({ loading: true })
    wx.request({
      url: 'http://10.30.1.224:8000/api/users/decrease',
      method: 'POST',
      data: {
        openid: this.data.user!.openid
      },
      success: (res: { data: UserData }) => {
        this.setData({ loading: false, user: res.data })
        wx.showToast({
          title: '核减成功！',
          duration: 1500,
          success: () => {
            this.handleSearch()
          }
        })
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '会员'
    });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  }
})