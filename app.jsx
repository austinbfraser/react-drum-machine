import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Tone from "tone";
import './style.css';

const App = () => {
  const handleClick = async () => {
    
    await Tone.start();
    console.log('audio is running');
    const sampler = new Tone.Sampler({
      urls: {
        A1: "BD_2.wav",
      },
      baseUrl: "https://github.com/austinbfraser/react-drum-machine/raw/main/kits/909/",
      onload: () => {
        sampler.triggerAttackRelease(["A1", "A1", "A1", "A1"], 0.5);
      }
    }).toDestination();
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