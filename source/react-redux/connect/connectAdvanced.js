import hoistStatics from 'hoist-non-react-statics'
import React, {useCallback, useContext, useLayoutEffect, useMemo, useState} from 'react'
import Context from './context'
import Subscription from "../utils/Subscription";

export default function (selectFactory, { shouldHandleStateChanges = true, pure = true, getDisplayName= name=>`Connect${name}`, forwardRef= false } = {}) {

  const { computeNextState } = selectFactory()

  return function (WrapComponent) {
    let subscribed = false

    const NewComponent = React.memo(function(props){
      const context = useContext(Context)
      const store = useMemo(()=>context.store,[context])
      const subscription = useMemo(()=>new Subscription(store, context.subscription),[store])

      const [newProps, setNewProps] = useState(computeNextState(store, props))

      const onStateChange = useCallback(()=>{
        setNewProps(computeNextState(store, props))
      }, [store, newProps, props] )

      useLayoutEffect(()=>{
        if (!shouldHandleStateChanges) return
        if(!subscribed){
          subscribed = true
          subscription.onStateChange = onStateChange
          subscription.trySubscribe()
        }
        return ()=>{
          subscribed? subscription.tryUnsubscribe() : null
        }
      },[])

      return <WrapComponent {...newProps}/>
    })

    const Connect = forwardRef?
      React.forwardRef((props,ref)=> <NewComponent {...props} forwardedRef={ref}/>): NewComponent

    return hoistStatics(Connect, WrapComponent)
  }
}