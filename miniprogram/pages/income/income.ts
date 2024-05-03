// pages/income/income.ts
import { formatTime, formatDate } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: <IIncomeData>{
    list: {},
    count: 0,
    nextCursor: 'default',
    isLoading: true,
  },

  formatTime,

  initData() {
    wx.showLoading({
      title: '加载中'
    })

    const api = 'http://10.30.1.224:8000/api/incomes'
    wx.request({
      url: api,
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        // console.log(res)
        this.setData({
          list:
            (res.data.data as IIncome[]).map((item: IIncome) => ({
            ...(item as IIncome),
            created_at: formatTime(new Date(item.created_at))
          })).reduce((ret: { [key: string]: IIncome[] }, item: IIncome) => {
            const date = formatDate(new Date(item.created_at))
            if (!ret[date]) {
              ret[date] = []
            }
            ret[date].push(item)
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

    const api = this.data.nextCursor ? `http://10.30.1.224:8000/api/incomes?cursor=${this.data.nextCursor}` : 'http://10.30.1.224:8000/api/incomes'
    wx.request({
      url: api,
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        this.setData({
          list: Object.assign(
            {}, 
            (res.data.data as IIncome[]).map((item: IIncome) => ({
            ...(item as IIncome),
            created_at: formatTime(new Date(item.created_at))
            })).reduce((ret: { [key: string]: IIncome[] }, item: IIncome) => {
              const date = formatDate(new Date(item.created_at))
              if (!ret[date]) {
                ret[date] = []
              }
              ret[date].push(item)
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

  onLoad() {
    wx.setNavigationBarTitle({
      title: '流水'
    });
  },

  onShow() {
    this.initData()
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
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