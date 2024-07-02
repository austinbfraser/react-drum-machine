import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as Tone from "tone";
import './style.css';

const App = () => {

  Tone.getTransport().bpm.value = 124;
  const trackCount = 9;
  const demoSeq = ['A1', null, null, null, ['A1', 'B1', 'C1', 'B2'], null, null, null, 'A1', null, null, null, ['A1', 'B1'], null, null, null];
  const seqState = [];
  for (let i = 0; i < trackCount; i++) {
    seqState.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null])
  };

  const [seq, setSeq] = useState(seqState);

  const cellClick = (trackNum, cellNum) => {
    let noteValue;
    if (trackNum === 1) noteValue = 'A1'
    if (trackNum === 2) noteValue = 'B1'
    if (trackNum === 3) noteValue = 'C1'
    if (trackNum === 4) noteValue = 'D1' 
    if (trackNum === 5) noteValue = 'E1'
    if (trackNum === 6) noteValue = 'F1'
    if (trackNum === 7) noteValue = 'G1'
    if (trackNum === 8) noteValue = 'A2'
    if (trackNum === 9) noteValue = 'B2'
    const nextSeq = seq.map((el, idx) => {
      if (idx === (trackNum - 1)) {
        const newArr = [...el];
        if (newArr[cellNum - 1] === null) {
          newArr[cellNum - 1] = noteValue;
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
        A1: 'BD_2.wav',
        B1: 'Snare_2.wav',
        C1: 'Clap.wav',
        D1: 'Tom_1.wav',
        E1: 'Tom_2.wav',
        F1: 'Ride.wav',
        G1: 'Crash.wav',
        A2: 'CH_1.wav',
        B2: 'OH.wav'
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
    <button className = 'start-stop' onClick={props.startClick}>START</button>
  )
}

const Stop = props => {
  return(
    <button className = 'start-stop' onClick={props.stopClick}>STOP</button>
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
    <section className = 'sequencer'>
      <section className = 'trackContainer'><section className = 'trackLabel'>kick</section>{tracks[0]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>snare</section>{tracks[1]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>clap</section>{tracks[2]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>tom 1</section>{tracks[3]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>tom 2</section>{tracks[4]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>ride</section>{tracks[5]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>crash</section>{tracks[6]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>closed HH</section>{tracks[7]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>open HH</section>{tracks[8]}</section>
      </section>
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