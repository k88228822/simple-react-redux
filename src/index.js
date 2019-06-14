import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from '../source/react-redux'
import createStore from "../source/redux/createStore";
import reducers from './reducers'
import Count from './container/count'

const store = createStore(reducers)

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
