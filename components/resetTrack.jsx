import React from 'react';


const ResetTrack = props => {
  return(
    <button className='resetTrack' onClick={() => props.resetTrackFunc(props.trackNum)}>RESET</button>
  );
};

export default ResetTrack;