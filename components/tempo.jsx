import React from 'react';

const Tempo = props => {
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target;
  }
  return(
    <form onSubmit={handleSubmit} className='tempoForm'>
      <label>
          Tempo: <input className = 'tempoInput' defaultValue = {props.tempo} onChange={e => props.setTempo(e.target.value)} name="tempo" />
      </label>
    </form>
  );
};

export default Tempo;