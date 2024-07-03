import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import Start from './start.jsx';
import Reset from './reset.jsx';
import Sequencer from './sequencer.jsx';
import Tempo from './tempo.jsx';

const App = () => {

  const trackCount = 11;

  const [tempo, setTempo] = useState(120);


  Tone.getTransport().bpm.value = tempo;

  const [currentStep, setCurrentStep] = useState(0);
  const repeat = () => {
   setCurrentStep((prevStep) => {
      const nextStep = prevStep === 15 ? 0 : prevStep + 1;
      console.log('currentStep: ', nextStep);
      return nextStep;
    });
  };
  Tone.getTransport().scheduleRepeat(repeat, '16n');


  const seqState = [];
  for (let i = 0; i < trackCount; i++) {
    seqState.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null])
  };

  const [seq, setSeq] = useState(seqState);
  const [isPlaying, setIsPlaying] = useState(false);

  const cellClick = (trackNum, cellNum) => {
    let noteValue = 'A1';

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
    // console.log('nextSeq: ', nextSeq);
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
      <div className='mainContainer'>
      <h1 className = 'title'>React Drum Machine</h1>
      <div className = 'globalControls'>
      <Start 
        startClick = {startClick}
        isPlaying = {isPlaying}
      />
      <Reset 
        resetAll = {resetAll}
      />
      <Tempo 
        tempo = {tempo}
        setTempo = {setTempo}
      />
      </div>
      <br></br>
      <Sequencer 
        trackCount = {trackCount}
        cellClick = {cellClick}
        seq = {seq}
        currentStep = {currentStep}
        isPlaying = {isPlaying}
      />
      </div>
    </>
  );
};

export default App;