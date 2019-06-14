import React from 'react'
import { connect } from "../../source/react-redux";

function Count(props) {
  console.log(props)
  return(
    <div>
      {props.num}
    </div>
  )
}

export default connect(state=>state.count)(Count)

