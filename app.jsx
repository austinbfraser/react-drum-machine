import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as Tone from "tone";
import './style.css';

const App = () => {

  Tone.Transport.bpm.value = 124;
  const trackCount = 1;
  const blankSeq = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

  const sampler = new Tone.Sampler({
    urls: {
      A1: "BD_2.wav",
    },
    baseUrl: "http://localhost:3000/kits/909/",
    onload: () => {
      console.log('samples loaded');
      // sampler.triggerAttackRelease(["A1"], 1);
    }
  }).toDestination();

  const seq = new Tone.Sequence((time, note) => {
    sampler.triggerAttackRelease(note, 1, time);
    }, 
    ["A1", null, null, null, "A1", null, null, null, "A1", null, null, null, "A1", null, null, null], '16n').start(0);

  // const loadClick = async () => {
  //   await Tone.start();
  //   console.log('audio is running');
  // };

  const startClick = async () => {
    await Tone.start();
    console.log('audio is running');
    Tone.Transport.start();
  };

  const stopClick = () => {
    Tone.Transport.stop();
  }

  return (
    <>
      <h1 className = 'title'>React Drum Machine</h1>
      {/* <Load 
        loadClick = {loadClick}
        /> */}
      <Start 
        startClick = {startClick}
      />
      <Stop 
        stopClick = {stopClick}
      />
      <br></br>
      <Sequencer 
        trackCount = {trackCount}
        blankSeq = {blankSeq}
      />
    </>
  );
};

// const Load = props => {
//   return(
//     <button className = 'load' onClick={props.loadClick}>LOAD</button>
//   )
// }

const Start = props => {
  return(
    <button className = 'start' onClick={props.startClick}>START</button>
  )
}

const Stop = props => {
  return(
    <button className = 'start' onClick={props.stopClick}>STOP</button>
  )
}

const Sequencer = props => {
  // const [seq, updateSeq] = useState(props.blankSeq);
  // const cellClick = (index) => {

  // }
  const tracks = [];
  for (let i = 0; i < props.trackCount; i++) {
    tracks.push(
      <Track />
    )
  };

  return(
    <section className = 'sequencer'>{tracks}</section>
  )
}

const Track = props => {
  const cells = [];
  for (let i = 0; i < 16; i++) {
    cells.push(
      <Cell />
    );
  }

  return(
    <section className = 'track'>{cells}</section>
  );
}

const Cell = props => {
  return(
    <button className = 'cell'></button>
  )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);