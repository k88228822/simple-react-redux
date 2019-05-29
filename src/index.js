import React from 'react'
import ReactDOM from 'react-dom'

class Index extends React.PureComponent {

  render() {
    return (
      <div>hello index 3</div>
    )
  }

}

export default ReactDOM.render(<Index/>, document.getElementById('root') )
