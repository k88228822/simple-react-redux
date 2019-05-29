const a = next => action => {console.log('执行a:'+action);return next(action)}
const b = next => action => {console.log('执行b:'+action);return next(action)}
const c = next => action => {console.log('执行c:'+action);return next(action)}
let result = a(b(c))(() => console.log('store.dispatch'))

result('action')