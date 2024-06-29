import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Tone from "tone";
import './style.css';

const App = () => {
  const handleClick = async () => {
    const synth = new Tone.Synth().toDestination();
    await Tone.start();
    console.log('audio is running');
    synth.triggerAttackRelease("C4", "8n");
  };
  return (
    <>
      <h1 className = 'title'>React Drum Machine</h1>
      <Start 
        handleClick = {handleClick}
      />
    </>
  );
};

const Start = props => {
  return(
    <button className = 'start' onClick={props.handleClick}>START</button>
  )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);