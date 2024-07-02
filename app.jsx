import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as Tone from "tone";
import './style.css';

const App = () => {

  Tone.getTransport().bpm.value = 124;
  const trackCount = 11;

  const seqState = [];
  for (let i = 0; i < trackCount; i++) {
    seqState.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null])
  };

  const [seq, setSeq] = useState(seqState);
  const [isPlaying, setIsPlaying] = useState(false);

  const cellClick = (trackNum, cellNum) => {
    let noteValue;
    // if (trackNum === 1) noteValue = 'A1'
    // if (trackNum === 2) noteValue = 'B1'
    // if (trackNum === 3) noteValue = 'C1'
    // if (trackNum === 4) noteValue = 'D1' 
    // if (trackNum === 5) noteValue = 'E1'
    // if (trackNum === 6) noteValue = 'F1'
    // if (trackNum === 7) noteValue = 'G1'
    // if (trackNum === 8) noteValue = 'A2'
    // if (trackNum === 9) noteValue = 'B2'
    noteValue = 'A1';

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

  const resetAll = () => {
    const nextSeq = [];
    for (let i = 0; i < trackCount; i++) {
      nextSeq.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null])
    };
    console.log('nextSeq: ', nextSeq)
    setSeq(nextSeq);
  }

  // NEW CODE BELOW --------------------------------------------------------------------------------------------
  const samplerRef = useRef(null);
  const sequenceRef = useRef(null);

  useEffect(() => {
    samplerRef.current = [];

    let sampler1 = new Tone.Sampler({
        urls: {
          A1: 'BD.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler1 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler1);
    
      let sampler2 = new Tone.Sampler({
        urls: {
          A1: 'Snare.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler2 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler2);

      let sampler3 = new Tone.Sampler({
        urls: {
          A1: 'Clap.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler3 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler3);

      let sampler4 = new Tone.Sampler({
        urls: {
          A1: 'Tom_1.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler4 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler4);

      let sampler5 = new Tone.Sampler({
        urls: {
          A1: 'Tom_2.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler5 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler5);

      let sampler6 = new Tone.Sampler({
        urls: {
          A1: 'Tom_3.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler6 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler6);

      let sampler7 = new Tone.Sampler({
        urls: {
          A1: 'Rim.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler7 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler7);

      let sampler8 = new Tone.Sampler({
        urls: {
          A1: 'Crash.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler8 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler8);

      let sampler9= new Tone.Sampler({
        urls: {
          A1: 'Ride.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler9 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler9);

      let sampler10 = new Tone.Sampler({
        urls: {
          A1: 'CH.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler10 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler10);

      let sampler11 = new Tone.Sampler({
        urls: {
          A1: 'OH.wav',
        },
        baseUrl: "http://localhost:3000/kits/909/",
        onload: () => {
          console.log('sampler11 loaded');
        }
      }).toDestination();
      samplerRef.current.push(sampler11);

    sequenceRef.current = [];

    let seq0 = new Tone.Sequence((time, note) => {
      samplerRef.current[0].triggerAttackRelease(note, 1, time);
    }, seq[0], '16n').start(0);
    sequenceRef.current.push(seq0);

    let seq1 = new Tone.Sequence((time, note) => {
      samplerRef.current[1].triggerAttackRelease(note, 1, time);
    }, seq[1], '16n').start(0);
    sequenceRef.current.push(seq1);

    let seq2 = new Tone.Sequence((time, note) => {
      samplerRef.current[2].triggerAttackRelease(note, 1, time);
    }, seq[2], '16n').start(0);
    sequenceRef.current.push(seq2);

    let seq3 = new Tone.Sequence((time, note) => {
      samplerRef.current[3].triggerAttackRelease(note, 1, time);
    }, seq[3], '16n').start(0);
    sequenceRef.current.push(seq3);

    let seq4 = new Tone.Sequence((time, note) => {
      samplerRef.current[4].triggerAttackRelease(note, 1, time);
    }, seq[4], '16n').start(0);
    sequenceRef.current.push(seq4);

    let seq5 = new Tone.Sequence((time, note) => {
      samplerRef.current[5].triggerAttackRelease(note, 1, time);
    }, seq[5], '16n').start(0);
    sequenceRef.current.push(seq5);

    let seq6 = new Tone.Sequence((time, note) => {
      samplerRef.current[6].triggerAttackRelease(note, 1, time);
    }, seq[6], '16n').start(0);
    sequenceRef.current.push(seq6);

    let seq7 = new Tone.Sequence((time, note) => {
      samplerRef.current[7].triggerAttackRelease(note, 1, time);
    }, seq[7], '16n').start(0);
    sequenceRef.current.push(seq7);

    let seq8 = new Tone.Sequence((time, note) => {
      samplerRef.current[8].triggerAttackRelease(note, 1, time);
    }, seq[8], '16n').start(0);
    sequenceRef.current.push(seq8);

    let seq9 = new Tone.Sequence((time, note) => {
      samplerRef.current[9].triggerAttackRelease(note, 1, time);
    }, seq[9], '16n').start(0);
    sequenceRef.current.push(seq9);

    let seq10 = new Tone.Sequence((time, note) => {
      samplerRef.current[10].triggerAttackRelease(note, 1, time);
    }, seq[10], '16n').start(0);
    sequenceRef.current.push(seq10);

    return () => {
      for (let i = 0; i < trackCount; i++) {
        sequenceRef.current[i].dispose();
        samplerRef.current[i].dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (sequenceRef.current) {
      for (let i = 0; i < trackCount; i++) {
        sequenceRef.current[i].set({ events: seq[i] });
      }
    }
  }, [seq]);

  // NEW CODE ^^^^^ --------------------------------------------------------------------------------------------

  const startClick = async () => {
    await Tone.start();
    console.log('audio is running');
    if (!isPlaying) {
      Tone.getTransport().start();
    } else Tone.getTransport().stop();
    const flip = !isPlaying;
    setIsPlaying(flip);
    console.log('isPlaying: ', flip)
  };

  return (
    <>
      <h1 className = 'title'>React Drum Machine</h1>
      <Start 
        startClick = {startClick}
        isPlaying = {isPlaying}
      />
      <Reset 
        resetAll = {resetAll}
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
    <button className = {props.isPlaying ? 'start-stopActive' : 'start-stop'} onClick={props.startClick}>▶</button>
  )
}

const Reset = props => {
  return(
    <button className = 'reset' onClick={props.resetAll}>RESET</button>
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
      <section className = 'trackContainer'><section className = 'trackLabel'>tom lo</section>{tracks[3]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>tom mid</section>{tracks[4]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>tom hi</section>{tracks[5]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>rim</section>{tracks[6]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>crash</section>{tracks[7]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>ride</section>{tracks[8]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>closed HH</section>{tracks[9]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>open HH</section>{tracks[10]}</section>
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
  // const [isActive, setIsActive] = useState(false);
  let isActive = false;
  if (props.seq[props.trackNum - 1][props.cellNum - 1] !== null) isActive = true; 
  return(
    <button 
      className = {isActive ? 'cellActive' : 'cell'} 
      onClick = {() => {
        console.log(`clicked trackNum ${props.trackNum} cellNum ${props.cellNum}`);
        props.cellClick(props.trackNum, props.cellNum);
        // setIsActive(!isActive);
      }}
    >
    </button>
  )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);