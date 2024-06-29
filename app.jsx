import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as Tone from "tone";
import './style.css';

const App = () => {

  Tone.Transport.bpm.value = 124;
  const trackCount = 2;
  const blankSeq = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  const seqState = [];
  for (let i = 0; i < trackCount; i++) {
    seqState.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null])
  };

  const [seq, updateSeq] = useState(seqState);
  const cellClick = (trackNum, cellNum) => {
    if (seq[trackNum - 1][cellNum - 1] === null) {
      seq[trackNum - 1][cellNum - 1] = 'A1';
    }
    if (seq[trackNum - 1][cellNum - 1] !== null) {
      seq[trackNum - 1][cellNum - 1] = null;
    }
    updateSeq({ ...seq });
  }

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

  const demoSeq = new Tone.Sequence((time, note) => {
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
        cellClick = {cellClick}
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
  const tracks = [];
  for (let i = 0; i < props.trackCount; i++) {
    tracks.push(
      <Track 
        key = {`track${i + 1}`}
        trackNum = {i + 1}
        cellClick = {props.cellClick}
      />
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
      <Cell 
      key = {`track_${props.trackNum}_cell_${i + 1}`}
      trackNum = {props.trackNum}
      cellNum = {i + 1}
      id = {`track_${props.trackNum}_cell_${i + 1}`}
      cellClick = {props.cellClick}
      />
    );
  }

  return(
    <section className = 'track'>{cells}</section>
  );
}

const Cell = props => {
  return(
    <button className = 'cell' onClick = {() => {
      console.log(`clicked trackNum ${props.trackNum} cellNum ${props.cellNum}`);
      props.cellClick(props.trackNum, props.cellNum)
    }}></button>
  )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);