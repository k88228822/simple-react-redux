export default function compose() {
  const funcs = arguments.map(key=> arguments[key])
  if(funcs.length === 0) return args=>args
  if(funcs.length === 1) return funcs[0]
  return funcs.reduce((a,b)=>function () {
    return a(b.apply(void 0, arguments))
  })
}