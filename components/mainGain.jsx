import React from 'react';

const MainGain = props => {
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const value = e.target;
  // }
  return(
    <label>Main Volume <input 
    type = 'range' 
    className='fader'
    min = '0' 
    max = '10'
    defaultValue={props.gain[0] * 10}
    onChange={e => {
      console.log('fader value', e.target.value);
      return props.updateGain(0, (e.target.value / 10))}}
    
    >
    </input>
    </label>
  );
};

export default MainGain;