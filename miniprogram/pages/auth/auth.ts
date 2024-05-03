// pages/auth.ts

Page({
  data: {
    userInfo: {
      avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      nickName: '',
      phone: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '登录'
    });
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl,
    })
  },
  onInputChange(e: any) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl,
    })
  },
  onPhoneInputChange(e: any) {
    const phone = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.phone": phone,
      hasUserInfo: phone && avatarUrl,
    })
  },
  handleSubmit() {
    
  }
})
