import connectHoc from './connectAdvanced'


const defaultMapStateToProps = () => ({})
const defaultMapDispatchToProps = dispatch => ({dispatch})
const defaultMergeProps = (stateProps, dispatchProps, ownProps) => ({...stateProps, ...dispatchProps, ...ownProps})


function connect(mapStateToProps, mapDispatchToProps, mergeProps, {pure = true, ...otherOptions} = {}) {
  const initMapStateToProps = mapStateToProps || defaultMapStateToProps
  const initMapDispatchToProps = mapDispatchToProps || defaultMapDispatchToProps
  const initMergeProps = mergeProps || defaultMergeProps
  const shouldUpdateDispatchProps = initMapDispatchToProps.length > 1
  const shouldUpdateStateProps = initMapStateToProps.length > 1

  const selectFactory = (store, props) => {
    const computeStateProps = (store, props) => {
      const state = store.getState()
      return shouldUpdateStateProps? initMapStateToProps(state, props): initMapStateToProps(state)
    }

    const computeDispatchProps = (store, props)=>{
      const {dispatch} = store
      return shouldUpdateDispatchProps? initMapDispatchToProps(dispatch, props): initMapDispatchToProps(dispatch)
    }

    const computeNextState = (store, props)=>{
      const stateProps = computeStateProps(store, props)
      const dispatchProps = computeDispatchProps(store, props)
      return initMergeProps(stateProps,dispatchProps, props)
    }

    return {
      computeStateProps,
      computeDispatchProps,
      computeNextState,
    }
  }

  return connectHoc(selectFactory, {
    initMapStateToProps,
    initMapDispatchToProps,
    initMergeProps,
    getDisplayName: name => `Connect${name}`,
    shouldHandleStateChanges: Boolean(mapStateToProps),
    pure,
    ...otherOptions
  })
}

export default connect

