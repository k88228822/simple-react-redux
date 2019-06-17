import compose from './compose'
export default function applyMiddleware(...middleWares) {

  return (createStore) => (reducer, preloadState)=> {
    const store = createStore(reducer, preloadState)
    let dispatch = ()=> console.log('正在构造，不可用')
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args)=>dispatch(...args)
    }
    const chain = middleWares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(chain)(store.dispatch);

    return Object.assign({}, store, {dispatch})
  }
}