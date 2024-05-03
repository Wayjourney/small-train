// pages/receipt/receipt.ts
import { formatTime, formatDate } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: <IReceiptData>{
    list: {},
    count: 0,
    nextCursor: 'default',
    isLoading: true,
    validList: {}
  },

  formatTime,

  initData() {
    wx.showLoading({
      title: '加载中'
    })

    const api = 'http://10.30.1.224:8000/api/receipts'
    wx.request({
      url: api,
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        // console.log(res)
        this.setData({
          list:
            (res.data.data as IReceipt[]).map((item: IReceipt) => ({
            ...(item as IReceipt),
            created_at: formatTime(new Date(item.created_at))
          })).reduce((ret: { [key: string]: IReceipt[] }, item: IReceipt) => {
            const date = formatDate(new Date(item.created_at))
            if (!ret[date]) {
              ret[date] = []
            }
            ret[date].push(Object.assign({}, item, {user: { ...item.user, phone: item.user.phone.slice(-4)}}))
            this.setData({
              validList: { ...this.data.validList, [item.id]: item.valid === 1 }
            })
            return ret
          }, {}),
          count: this.data.count + res.data.data.length,
          nextCursor: res.data.next_cursor
        })

        setTimeout(() => {
          wx.hideLoading({
            success: () => {
              this.setData({
                isLoading: false
              })
            }
          })
        }, 20);
      }
    })
  },

  requestData() {
    if ((!this.data.nextCursor && Object.keys(this.data.list).length !== 0) || this.data.isLoading) {
      return
    }

    wx.showLoading({
      title: '加载中',
      success: () => {
        this.setData({
          isLoading: true
        })
      }
    })

    const api = this.data.nextCursor ? `http://10.30.1.224:8000/api/receipts?cursor=${this.data.nextCursor}` : 'http://10.30.1.224:8000/api/receipts'
    wx.request({
      url: api,
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        this.setData({
          list: Object.assign(
            {}, 
            (res.data.data as IReceipt[]).map((item: IReceipt) => ({
            ...(item as IReceipt),
            created_at: formatTime(new Date(item.created_at))
            })).reduce((ret: { [key: string]: IReceipt[] }, item: IReceipt) => {
              const date = formatDate(new Date(item.created_at))
              if (!ret[date]) {
                ret[date] = []
              }
              ret[date].push(Object.assign({}, item, {user: { ...item.user, phone: item.user.phone.slice(-4)}}))
              this.setData({
                validList: { ...this.data.validList, [item.id]: item.valid === 1 }
              })
              return ret
            }, this.data.list)
          ),
          count: this.data.count + res.data.data.length,
          nextCursor: res.data.next_cursor
        })

        setTimeout(() => {
          wx.hideLoading({
            success: () => {
              this.setData({
                isLoading: false
              })
            }
          })
        }, 20);
      }
    })
  },

  handleReceipt(e: { currentTarget: { dataset: { id: number, phone: string, valid: 1 | 0 } } }) {
    const { id, phone, valid } = e.currentTarget.dataset
    if (!valid || !this.data.validList[id]) {
      return
    }
    wx.showModal({
      title: '核对小票',
      content: `手机尾号：${phone}`,
      confirmText: '确定',
      confirmColor: '#15B628',
      cancelText: '取消',
      cancelColor: '#9ca3af',
      success: (res) => {
        if (res.confirm) {
          this.handleSubmit(id)
        }
      }
    })
  },

  handleSubmit(id: number) {
    wx.request({
      url: `http://10.30.1.224:8000/api/receipts/${id}/confirm`,
      method: 'POST',
      success: () => {
        this.setData({
          validList: { ...this.data.validList, [id]: false }
        })
      },
      fail: () => {
        wx.showToast({
          icon: 'error',
          title: '操作失败！'
        })
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '小票'
    });
  },

  onShow() {
    this.initData()
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  onPullDownRefresh() {
    this.initData()
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    this.requestData()
  }
})