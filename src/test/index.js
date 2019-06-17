const componse = (funs)=>{
  if(funs.length === 0) return arg=>arg;
  if(funs.length === 1) return funs[0]
  return funs.reduce((a,b)=>(...args)=>a(b(...args)))
}

const a1 = next=>action=> {
  console.log('a1')
  console.log(next)
  console.log(action)
  next(action)
}
const b1 = next=>action=>{
  console.log('b1')
  console.log(next)
  console.log(action)
  next(action)
}

const c1 = next=>action=>{
  console.log('c1')
  console.log(next)
  console.log(action)
  next(action)
}

const ab = action=>{
  console.log('a(b)')
  b1(c1)(action)
}

const abc = a1(b1(c1))
console.log(abc)

// const dispatch = componse([a1,b1,c1])(()=>console.log('dispatch method'))
// dispatch('action')
