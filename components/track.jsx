import React from 'react';
import Cell from './cell.jsx';

const Track = props => {
  const cells = [];
  const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  for (let i = 0; i < 16; i++) {
    cells.push(
      <Cell 
      // key = {keys[i]}
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