export default function createStore(reducer, preloadState = undefined, enhancer = undefined) {
  if (typeof preloadState === 'function' && !enhancer) { //参数转换
    enhancer = preloadState
    preloadState = undefined
  }
  if (typeof enhancer !== 'undefined') { // 返回加强版createStore
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer必须是函数')
    }
    return enhancer(createStore)(reducer, preloadState)
  }

  let currentReducer = reducer;
  let currentState = preloadState;
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  const dispatch = (action) => {

    if (action === null || typeof action !== 'object') {
      throw new Error('action格式错误' + action)
    }
    if (isDispatching) {
      throw new Error('正在dispatch')
    }
    try { // 执行reducer 获取新的 state
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = currentListeners = nextListeners
    listeners.forEach(listener => listener())  // 执行监听回调

    return action
  }

  const subscribe = (listener) => { // 绑定或取消绑定监听函数
    if (typeof listener !== 'function') {
      throw new Error('监听器必须是函数')
    }
    if (isDispatching) {
      throw new Error('不能在reducer执行时绑定监听函数')
    }
    nextListeners.push(listener)
    let isSubscribe = true
    return function unSubscribe() {
      if (!isSubscribe) return
      if (isDispatching) throw new Error('不能在reducer执行时取消绑定监听函数')
      isSubscribe = false
      nextListeners.splice(nextListeners.indexOf(listener), 1)
    }

  }

  const getState = () => {
    if (isDispatching) throw new Error('不能在reducer执行时获取state')
    return currentState
  }

  const replaceReducer = (nextReducer) => {
    if (typeof nextReducer !== 'function') {
      throw  new Error('reducer 必须是函数')
    }
    currentReducer = nextReducer
    dispatch({type: 'action-for-replace'}) // 重新初始化state
  }

  dispatch({type: '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.')}) // 初始化state
  return {dispatch, subscribe, getState, replaceReducer}

}

