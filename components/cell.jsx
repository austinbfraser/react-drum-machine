import React from 'react';

const Cell = props => {
  let cellColoring;
  if ((props.seq[props.trackNum - 1][props.cellNum - 1] !== null) && (props.currentStep === (props.cellNum - 1) && props.isPlaying)) cellColoring = 'cellActiveAndCurrentStep'
  else if (props.seq[props.trackNum - 1][props.cellNum - 1] !== null) cellColoring = 'cellActive'
  else if (props.currentStep === (props.cellNum - 1) && props.isPlaying) cellColoring = 'cellCurrentStep'
  else cellColoring = 'cell';
  return(
    <button 
      className = {cellColoring} 
      onClick = {() => {
        console.log(`clicked id ${props.id} trackNum ${props.trackNum} cellNum ${props.cellNum}`);
        props.cellClick(props.trackNum, props.cellNum);
      }}
    >
    </button>
  )
}

export default Cell;