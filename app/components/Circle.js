import React from 'react'
import Board from './Board'

const Circle = (props) => {
  return (
    <>
    <div
     style={{background:props.currentColor}}
     className={props.className} 
     onClick={props.onClick}
    ></div>
    </>
  )
}

export default Circle