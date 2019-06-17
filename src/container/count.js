import React from 'react'
import { connect } from "../../source/react-redux";

function Count(props) {
  const onClick = ()=>{
    props.addNum(2)
  }

  return(
    <div>
      {props.num}
      <div style={{width: 100, height:20 , backgroundColor: 'gray'}} onClick={onClick}>button</div>
    </div>
  )
}

const mapStateToProps = state=>state.count

const mapDispatchToProps = dispatch => {
  return {
    addNum: num => dispatch({type: 'addNum', payload: { addNum: num }})
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Count)

