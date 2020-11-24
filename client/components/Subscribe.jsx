import React from 'react'

const Subscribe = ({title}) => (
  <div><button onClick={handleClick}>Subscribe</button></div>
)

    function handleClick(e) {
      e.preventDefault();
    }


export default Subscribe