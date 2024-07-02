import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as Tone from "tone";
import './style.css';

const App = () => {

  Tone.getTransport().bpm.value = 124;
  const trackCount = 2;
  const blankSeq = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  const seqState = [];
  for (let i = 0; i < trackCount; i++) {
    seqState.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null])
  };

  const [seq, setSeq] = useState(seqState);

  const cellClick = (trackNum, cellNum) => {
    const nextSeq = seq.map((el, idx) => {
      if (idx === (trackNum - 1)) {
        const newArr = [...el];
        if (newArr[cellNum - 1] === null) {
          newArr[cellNum - 1] = 'A1';
        }
        else if (newArr[cellNum - 1] !== null) {
          newArr[cellNum - 1] = null;
        }
        return newArr;
      } else return el;
    })
    console.log('nextSeq: ', nextSeq)
    setSeq(nextSeq);
  }

  // NEW CODE BELOW --------------------------------------------------------------------------------------------

  const samplerRef = useRef(null);
  const sequenceRef = useRef(null);

  useEffect(() => {
    samplerRef.current = new Tone.Sampler({
      urls: {
        A1: "BD_2.wav",
      },
      baseUrl: "http://localhost:3000/kits/909/",
      onload: () => {
        console.log('samples loaded');
      }
    }).toDestination();

    sequenceRef.current = new Tone.Sequence((time, note) => {
      samplerRef.current.triggerAttackRelease(note, 1, time);
    }, seq[0], '16n').start(0);

    return () => {
      sequenceRef.current.dispose();
      samplerRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (sequenceRef.current) {
      sequenceRef.current.set({ events: seq[0] });
    }
  }, [seq]);

  // NEW CODE ^^^^^ --------------------------------------------------------------------------------------------

  // const sampler = new Tone.Sampler({
  //   urls: {
  //     A1: "BD_2.wav",
  //   },
  //   baseUrl: "http://localhost:3000/kits/909/",
  //   onload: () => {
  //     console.log('samples loaded');
  //     // sampler.triggerAttackRelease(["A1"], 1);
  //   }
  // }).toDestination();

  // const track1Seq = new Tone.Sequence((time, note) => {
  //   sampler.triggerAttackRelease(note, 1, time);
  //   }, 
  //   seq[0], '16n').start(0);

  // const loadClick = async () => {
  //   await Tone.start();
  //   console.log('audio is running');
  // };

  const startClick = async () => {
    await Tone.start();
    console.log('audio is running');
    Tone.getTransport().start();
  };

  const stopClick = () => {
    Tone.getTransport().stop();
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
        cellClick = {cellClick}
        seq = {seq}
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
        seq = {props.seq}
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
      seq = {props.seq}
      />
    );
  }

  return(
    <section className = 'track'>{cells}</section>
  );
}

const Cell = props => {
  const [isActive, setIsActive] = useState(false);
  return(
    <button 
      className = {isActive ? 'cellActive' : 'cell'} 
      onClick = {() => {
        console.log(`clicked trackNum ${props.trackNum} cellNum ${props.cellNum}`);
        props.cellClick(props.trackNum, props.cellNum);
        setIsActive(!isActive);
      }}
    >
    </button>
  )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);