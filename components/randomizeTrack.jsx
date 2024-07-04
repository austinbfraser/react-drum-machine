import React from "react";

const RandomizeTrack = props => {
  return(
    <button
      className="randomizeTrack"
      onClick={() => props.randomizeTrackFunc(props.trackNum)}
    >?!</button>
  )
}

export default RandomizeTrack;