const listenerOperator = () => {
  let current = []
  let next = []
  return {
    clear: () => {
      next = null;
      current = null
    },
    notify: () => {
      let listeners = current = next;
      listeners.forEach(function (listener) {
        listener()
      })
    },
    get: () => next,
    subscribe: (listener) => {
      let isSubscribed = true
      if (next === current) next = current.slice() // 创建新的next
      next.push(listener)
      return function unScribe() {  // 返回取消绑定函数
        if (isSubscribed || current === null) return;
        isSubscribed = false
        if (next === current) next = current.slice()
        next.splice(next.indexOf(listener), 1)
      }
    }
  }
}

export default class Subscription {
  constructor(store, parentSub) {
    this.store = store;
    this.parentSub = parentSub;
    this.unsubscribe = null;
    this.listeners = {
      notify: () => {
      }
    };
    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
  }

  addNestedSub = (listener) => { // 添加监听函数
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  notifyNestedSubs = () => { // 触发监听函数
    this.listeners.notify();
  };

  onStateChange = () => {
    this.listeners.notify()
  }

  handleChangeWrapper = () => { // state变化
    if (this.onStateChange) {
      this.onStateChange();
    }
  };

  isSubscribed = () => { // 是否绑定
    return Boolean(this.unsubscribe);
  };

  trySubscribe = () => { // 绑定
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.handleChangeWrapper) : this.store.subscribe(this.handleChangeWrapper);
      this.listeners = listenerOperator();
    }
  };

  tryUnsubscribe = () => { // 取消绑定
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = {
        notify: () => {
        }
      };
    }
  };

}

