import React from 'react';

const Start = props => {
  return(
    <button className = {props.isPlaying ? 'start-stopActive' : 'start-stop'} onClick={props.startClick}>▶</button>
  )
};

export default Start;