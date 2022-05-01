/**
 * 简易版事件总线机制完整代码
 */
class EventBus {
  constructor() {
      this.events = this.events || {};  //{key:Array}
  }

  /**
   * @param {String} eventName 
   * @param {Function} callback 
   */
  $on(eventName, callback) {
      if (this.events[eventName]) {
          this.events[eventName].push(callback);
      } else {
          this.events[eventName] = [callback];
      }
  }

  /**
   * @param {String} eventName 
   * @param {Function} callback 
   */
  $emit(eventName, data) {
      if (this.events[eventName]) {
          this.events[eventName].forEach(callback => {
              callback && callback(data);
          });
      }
  }

  /**
   * @param {String} eventName 
   * @param {Function} callback 
   */
  $once(eventName, callback) {
      let _this = this;
      function handler(args) {
          callback.apply(_this, [args])
          _this.$off(eventName)
      }
      this.$on(eventName, handler)
  }

  /**
   * @param {String} eventName 
   */
  $off(eventName) {

      if (eventName) {
          this.events[eventName] && (delete this.events[eventName]);
      } else {
          this.events = [];
      }
  }
}

module.exports = EventBus