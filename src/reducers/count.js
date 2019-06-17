export default function (state= {num: 1}, action ) {
  switch (action.type) {
    case 'add': return {
      ...state,
      num: state.num + 1
    };
    case 'subtract': return{
      ...state,
      num: state.num - 1
    };
    case 'addNum': return {
      ...state,
      num: state.num + action.payload.addNum
    }
    default: return state
  }
}