// pages/income.create/create.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    phone: '',
    type: "single",
    amount: 40,
    count: 1
  },

  handleConfirm() {
    if (this.data.loading) {
      return
    }
    wx.showModal({
      title: '确定录入吗？',
      content: '录入前请仔细核对内容',
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
      url: 'http://10.30.1.224:8000/api/incomes',
      method: 'POST',
      data: {
        phone: this.data.phone,
        type: this.data.type,
        count: this.data.count
      },
      success: (res) => {
        console.log(res)
        this.setData({ loading: false})
        setTimeout(() => {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            success() {
              setTimeout(() => {
                wx.navigateBack()
              }, 1000)
            }
          })
        }, 20)
      },
      fail() {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    const { type: _type, amount: _amount, count: _count } = query
    this.setData({
      type: _type,
      amount: Number(_amount),
      count: Number(_count)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})