
export default function combineReducers (reducers = {}){ // 合并reducer, 返回新的reducer
  const finalReducers = {}
  Object.keys(reducers).forEach(key=>{ //过滤无效reducers
    typeof reducers[key] === 'function'? finalReducers[key] = reducers[key]: null
  })

  return function newReducer(state = {}, action) {
    const nextState = {}
    let hasChange = false
    Object.entries(finalReducers).forEach(([key, itemReducer])=>{ // 遍历reducer , 执行action， 获取新的state
      const itemState = state[key]
      const newItemState = itemReducer(action)
      if(typeof newItemState === 'undefined') {
        throw new Error(`获取state错误-- reducer: ${key}, action: ${action}`)
      }
      nextState[key] = newItemState
      newItemState !== itemState? hasChange = true : null
    })
    return hasChange? nextState : state
  }

}
