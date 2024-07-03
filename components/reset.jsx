import React from 'react';

const Reset = props => {
  return(
    <button className = 'reset' onClick={props.resetAll}>RESET</button>
  )
};

export default Reset;