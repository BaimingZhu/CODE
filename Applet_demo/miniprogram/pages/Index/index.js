const app = getApp()

Page({
  data: {
    btn_arr: [
      { id: 0, text: '', icon_name: 'icon-tongsuo', order: '' },
      { id: 1, text: '童锁', icon_name: 'icon-tongsuo', order: '' },
      { id: 2, text: '', icon_name: '', order: '' },
      { id: 3, text: '开关机', icon_name: 'icon-kaiguan', time: 0, order: ["A5 FC 02 00 A0 91 06 00 DA 02 FB", "A5 FC 02 00 A0 91 07 00 DB 02 FB"] },
      { id: 4, text: '调温', icon_name: 'icon-wendu', order: 'A5 FC 02 00 A0 91 0C 00 E0 02 FB' },
      { id: 5, text: '自动烧水', icon_name: 'icon-dianya', time: 0, order:  ['A5 FC 02 00 A0 91 0A 00 DE 02 FB', 'A5 FC 02 00 A0 91 0B 00 DF 02 FB'] },
      { id: 6, text: '取冷水', icon_name: 'icon-shuidi', time: 0, order: ['A5 FC 02 00 A0 91 18 00 EC 02 FB', 'A5 FC 02 00 A0 91 09 00 DD 02 FB'] },
      { id: 7, text: '制冷', icon_name: 'icon-zhileng', time: 0, order: ['A5 FC 02 00 A0 91 1C 00 F0 02 FB', 'A5 FC 02 00 A0 91 1D 00 F1 02 FB'] },
      { id: 8, text: '取水', icon_name: 'icon-shuidi', time: 0, order: ['A5 FC 02 00 A0 91 08 00 DC 02 FB', 'A5 FC 02 00 A0 91 09 00 DD 02 FB'] },
      { id: 9, text: '保温', icon_name: 'icon-wendu2', time: 0, order: ['A5 FC 02 00 A0 91 1A 00 EE 02 FB', 'A5 FC 02 00 A0 91 1B 00 EF 02 FB'] },
      { id: 10, text: '', icon_name: '', order: '' },
      { id: 11, text: '加热', icon_name: 'icon-jiare', time: 0, order: ['A5 FC 02 00 A0 91 0A 00 DE 02 FB', 'A5 FC 02 00 A0 91 0B 00 DF 02 FB'] },
    ],
    connected: false,
    array: ['40度', '45度', '50度', '55度', '60度', '65度', '70度', '75度', '80度', '85度', '90度', '95度', '100度'],
    temperature_order: [
      "A5 FC 02 00 A0 91 0C 00 E0 02 FB",
      "A5 FC 02 00 A0 91 0D 00 E1 02 FB",
      "A5 FC 02 00 A0 91 0E 00 E2 02 FB",
      "A5 FC 02 00 A0 91 0F 00 E3 02 FB",
      "A5 FC 02 00 A0 91 10 00 E4 02 FB",
      "A5 FC 02 00 A0 91 11 00 E5 02 FB",
      "A5 FC 02 00 A0 91 12 00 E6 02 FB",
      "A5 FC 02 00 A0 91 13 00 E7 02 FB",
      "A5 FC 02 00 A0 91 14 00 E8 02 FB",
      "A5 FC 02 00 A0 91 15 00 E9 02 FB",
      "A5 FC 02 00 A0 91 16 00 EA 02 FB",
      "A5 FC 02 00 A0 91 17 00 EB 02 FB",
      "A5 FC 02 00 A0 91 1E 00 F2 02 FB"
    ],
    child_lock: false,
  },
  onLoad: function () {
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
    console.log('Index onLoad')
  },
  connect_bluetooth: function () {
    var that = this
    wx.navigateTo({
      url: '/pages/Bluetooth/index',
      events: {
        connectedChange: function (data) {
          that.setData({
            connected: data.connected
          })
        }
      }
    })
  },
  bindPickerChange: function (e) {
    var index = e.detail.value
    var order = this.data.temperature_order[index]
    console.log('picker发送选择改变，携带值为', index, order)
    // sync_writeBLECharacteristicValue(order)
    this.writeBLECharacteristicValue(order)
  },
  sendBLECharacteristicValue(e) {
    if (!this.data.connected) {
      return wx.showToast({
        title: '请先连接设备',
        icon: 'error',
        duration: 1500
      })
    }
    var index = e.currentTarget.dataset.index
    var str = this.data.btn_arr[index].order

    if (index == 1) {//童锁
      this.setData({
        child_lock: !this.data.child_lock
      })
      return
    }
    if (this.data.child_lock) {
      return wx.showToast({
        title: '请先关闭童锁',
        icon: 'error',
        duration: 1500
      })
    }
    if (!str) {
      return
    }
    if (index == 4) {//调温
      return
    }
    if (Array.isArray(str)) {
      var time = this.data.btn_arr[index].time
      var time_index = time % str.length
      str = str[time_index]
      this.data.btn_arr[index].time = this.data.btn_arr[index].time + 1
    }
    console.log(str)
    this.writeBLECharacteristicValue(str)
  },
  writeBLECharacteristicValue(str) {
    str = str.trim()
    var array = str.split(' ').map(item => parseInt(item, 16))
    var buffer = new ArrayBuffer(array.length)
    let dataView = new DataView(buffer)
    array.forEach((item, index) => {
      dataView.setUint8(index, item)
    })
    // console.log(app.globalData._deviceId, app.globalData._serviceId, app.globalData._characteristicId)
    
    wx.writeBLECharacteristicValue({
      deviceId: app.globalData._deviceId,
      serviceId: app.globalData._serviceId,
      characteristicId: app.globalData._characteristicId,
      value: buffer,
    })
  }
})
function writeBLECharacteristicValue(str) {
  str = str.trim()
  var array = str.split(' ').map(item => parseInt(item, 16))
  var buffer = new ArrayBuffer(array.length)
  let dataView = new DataView(buffer)
  array.forEach((item, index) => {
    dataView.setUint8(index, item)
  })
  var that = this
  console.log(app.globalData._deviceId, app.globalData._serviceId, app.globalData._characteristicId)
  wx.writeBLECharacteristicValue({
    deviceId: app.globalData._deviceId,
    serviceId: app.globalData._serviceId,
    characteristicId: app.globalData._characteristicId,
    value: buffer,
    complete:function(){
      console.log('--finished--', that)
      that.setData({finished:true})
    }
  })
}
// 第三版
function throttle(func, wait) {
  var timeout, context, args;
  var previous = 0;

  var later = function () {
    previous = +new Date();
    timeout = null;
    func.apply(context, args)
  };

  var throttled = function () {
    var now = +new Date();
    //下次触发 func 剩余的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
}

var sync_writeBLECharacteristicValue = throttle(writeBLECharacteristicValue, 100)