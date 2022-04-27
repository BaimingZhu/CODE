const app = getApp()

Page({
  data: {
    btn_arr: [
      { id: 0, text: '', icon_name : 'icon-tongsuo'},
      { id: 1, text: '童锁', icon_name : 'icon-tongsuo'},
      { id: 2, text: '', icon_name : ''},
      { id: 3, text: '开关机', icon_name : 'icon-kaiguan'},
      { id: 4, text: '调温', icon_name : 'icon-wendu'},
      { id: 5, text: '自动烧水', icon_name : 'icon-dianya'},
      { id: 6, text: '取冷水', icon_name : 'icon-shuidi'},
      { id: 7, text: '制冷', icon_name : 'icon-zhileng'},
      { id: 8, text: '取水', icon_name : 'icon-shuidi'},
      { id: 9, text: '保温', icon_name : 'icon-wendu2'},
      { id: 10, text: '', icon_name : ''},
      { id: 11, text: '加热', icon_name : 'icon-jiare'},
    ]
  },
  onLoad: function () {
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })

    wx.switchTab({
      url: 'pages/Bluetooth/index'
    })
  },
})
