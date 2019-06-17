import React from 'react'
import ReactDOM from 'react-dom'
import { createLogger } from 'redux-logger'
import { Provider } from '../source/react-redux'
import createStore from "../source/redux/createStore";
import reducers from './reducers'
import Count from './container/count'
import applyMiddleware from "../source/redux/applyMiddleware";

const store = createStore(reducers, applyMiddleware(createLogger()))

class Index extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <Count />
      </Provider>
    )
  }
}

export default ReactDOM.render(<Index/>, document.getElementById('root') )
