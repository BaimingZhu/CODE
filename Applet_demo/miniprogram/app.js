// app.js
const EventBus = require('./utils/eventBus.js');
App({
  onLaunch: function () {

    this.globalData = {};

    // 将eventBus初始到wx上
    wx['$event_bus'] = (function () {
      if (wx['$event_bus']) return wx['$event_bus'];
      return new EventBus();
    })();
  }
});
