// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    
  },
  handleOrder(e: any) {
    if (!getApp().globalData.openid) {
      wx.showModal({
        icon: 'error',
        title: '获取微信身份中，请重试'
      });
      return
    }

    if (getApp().globalData.role !== 'admin') {
      wx.navigateTo({ url: '/pages/auth/auth' });
      return
    }

    const { type, amount, count } = e.currentTarget.dataset
    // console.log(type, amount, count)
    wx.navigateTo({ url: `/pages/income.create/create?type=${type}&amount=${amount}&count=${count}` })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})
