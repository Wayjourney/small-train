// custom-tab-bar/index.ts
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#15B628",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/image/home.png",
      selectedIconPath: "/image/home_active.png",
      text: "首页"
    }, 
    {
      "pagePath": "/pages/member/member",
      "iconPath": "/image/user.png",
      "selectedIconPath": "/image/user_active.png",
      "text": "会员"
    },
    {
      "pagePath": "/pages/receipt/receipt",
      "iconPath": "/image/receipt.png",
      "selectedIconPath": "/image/receipt_active.png",
      "text": "小票"
    },
    {
      pagePath: "/pages/income/income",
      iconPath: "/image/list.png",
      selectedIconPath: "/image/list_active.png",
      text: "流水"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e: { currentTarget: { dataset: any } }) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})