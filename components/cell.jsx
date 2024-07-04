import React from 'react';

const Cell = props => {
  let cellColoring;
  let downbeats = false;
  if (props.cellNum === 1 ||
      props.cellNum === 5 ||
      props.cellNum === 9 ||
      props.cellNum === 13
  ) downbeats = true;
  if ((props.seq[props.trackNum - 1][props.cellNum - 1] !== null) && (props.currentStep === (props.cellNum - 1) && props.isPlaying)) cellColoring = 'cellActiveAndCurrentStep'
  else if (props.seq[props.trackNum - 1][props.cellNum - 1] !== null) cellColoring = 'cellActive'
  else if (props.currentStep === (props.cellNum - 1) && props.isPlaying) cellColoring = 'cellCurrentStep'
  else cellColoring = 'cell';
  return(
    <button 
      className = {cellColoring} 
      onClick = {() => {
        // console.log(`clicked id ${props.id} trackNum ${props.trackNum} cellNum ${props.cellNum}`);
        props.cellClick(props.trackNum, props.cellNum);
      }}
    >
      {downbeats? 'O' : '-'}
    </button>
  )
}

export default Cell;