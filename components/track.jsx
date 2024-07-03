import React from 'react';
import Cell from './cell.jsx';

const Track = props => {
  const cells = [];
  for (let i = 0; i < 16; i++) {
    cells.push(
      <Cell 
      key = {`track_${props.trackNum}_cell_${i + 1}`}
      trackNum = {props.trackNum}
      cellNum = {i + 1}
      id = {`track_${props.trackNum}_cell_${i + 1}`}
      cellClick = {props.cellClick}
      seq = {props.seq}
      currentStep = {props.currentStep}
      isPlaying = {props.isPlaying}
      />
    );
  }

  return(
    <section className = 'track'>{cells}</section>
  );
}

export default Track;