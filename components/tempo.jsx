import React from 'react';

const Tempo = props => {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const value = e.target;
    console.log(value);
    // props.setTempo(e.target.value);
  }
  return(
    <form onSubmit={handleSubmit}>
      <label>
          Tempo: <input className = 'tempoInput' defaultValue = {props.tempo} onChange={e => props.setTempo(e.target.value)} name="tempo" />
      </label>
    </form>
  );
};

export default Tempo;