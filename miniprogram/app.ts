// app.ts
App<IAppOption>({
  globalData: {
    openid: '',
    role: 'user'
  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code
        wx.request({
          url: `http://10.30.1.224:8000/api/wx/user?code=${code}`,
          method: 'GET',
          success: (res: { data: any}) => {
            // console.log(res)
            // Get openid, app.globalstorage save
            this.globalData.openid = res.data.openid
            // findOrCreate user
            wx.request({
              url: `http://10.30.1.224:8000/api/users/${res.data.openid}`,
              method: 'GET',
              success: () => {

              }
            })
          }
        })


      },
    })
  },
})