import compose from './compose'
export default function applyMiddleware() {
  const middleWares = arguments.map(key=>arguments[key])
  return (createStore) => (reducer, preloadState)=> {
    const store = createStore(reducer, preloadState)
    let _dispatch = ()=> throw new Error('正在构造，不可用')
    const middlewareAPI = {
      getState: store.getState,
      dispatch: function () {return _dispatch.apply(void 0, arguments)}
    }
    const chain = middleWares.map(middleware => middleware(middlewareAPI))
    _dispatch = compose.apply(void 0, chain)(store.dispatch);

    return Object.assign({}, store, {dispatch: _dispatch})
  }
}