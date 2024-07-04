import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import Start from './start.jsx';
import Reset from './reset.jsx';
import Sequencer from './sequencer.jsx';
import Tempo from './tempo.jsx';
import MainGain from './mainGain.jsx';

const App = () => {

  const trackCount = 11;

  const [tempo, setTempo] = useState(120);
  Tone.getTransport().bpm.value = tempo;
  const [gain, setGain] = useState(Array(12).fill(.8))
  const seqState = Array(trackCount).fill(Array(16).fill(null));
  const [seq, setSeq] = useState(seqState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startClick = async () => {
    await Tone.start();
    console.log('audio is running');
    if (!isPlaying) {
      setCurrentStep(0);
      Tone.getTransport().start();
    } else Tone.getTransport().stop();
    const flip = !isPlaying;
    setIsPlaying(flip);
    console.log('isPlaying: ', flip)
  };
  
  const cellClick = (trackNum, cellNum) => {
    let noteValue = 'A1';
    const nextSeq = seq.map((el, idx) => {
      if (idx === (trackNum - 1)) {
        const newArr = [...el];
        newArr[cellNum - 1] = newArr[cellNum - 1] === null ? noteValue : null;
        return newArr;
      } else return el;
    })
    setSeq(nextSeq);
  };

  const resetTrackFunc = (trackNum) => {
    const nextSeq = seq.map((el, idx) => {
      if (idx === (trackNum - 1)) {
        return Array(16).fill(null);
      } else return el
    });
    setSeq(nextSeq);
  };

  const randomizeTrackFunc = trackNum => {
    const nextSeq = seq.map((el, idx) => {
      if (idx === (trackNum - 1)) {
        const newArr = el.map(cell => {
          const random = Math.random();
          if (random > .6) return 'A1'
          else return cell
        })
        return newArr;
      } else return el
    });
    setSeq(nextSeq);
  };

  const resetAll = () => {
    const nextSeq = Array(trackCount).fill(Array(16).fill(null));
    setSeq(nextSeq);
  };

  const updateGain = (index, value) => {
    console.log(`updateGain fired, index ${index} value ${value}`);
    console.log('gain: ', gain);
    const nextGain = gain.map((el, idx) => {
      if (idx === index) return value
      else return el
    });
    setGain(nextGain);
  }

  // SAMPLER, SEQUENCER AND GAIN CODE --------------------------------------------------------------------------------------------
  const samplerRef = useRef([]);
  const sequenceRef = useRef([]);
  const stepperRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    gainNodeRef.current = new Tone.Gain(gain[0]).toDestination();

    const baseUrl = "http://localhost:3000/kits/909/";
    const sampleFiles = [
      'BD.wav', 'Snare.wav', 'Clap.wav', 'Tom_1.wav', 'Tom_2.wav',
      'Tom_3.wav', 'Rim.wav', 'Crash.wav', 'Ride.wav', 'CH.wav', 'OH.wav'
    ];

    samplerRef.current = sampleFiles.map((file, index) => {
      return new Tone.Sampler({
        urls: { A1: file },
        baseUrl,
        onload: () => console.log(`sampler${index + 1} loaded`),
      }).connect(gainNodeRef.current);
    });
    
    sequenceRef.current = samplerRef.current.map((sampler, index) => {
      return new Tone.Sequence((time, note) => {
        sampler.triggerAttackRelease(note, 1, time);
      }, seq[index], '16n').start(0);
    });

    stepperRef.current = Tone.getTransport().scheduleRepeat(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % 16);
    }, '16n', '16n');

    return () => {
      sequenceRef.current.forEach(seq => seq.dispose());
      samplerRef.current.forEach(sampler => sampler.dispose());
      stepperRef.current.dispose();
      gainNodeRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (sequenceRef.current) {
      for (let i = 0; i < trackCount; i++) {
        sequenceRef.current[i].set({ events: seq[i] });
      }
    }
  }, [seq]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(gain[0], Tone.now() + .05);
    }
  }, [gain]);

  // ------------------------------------------------------------------------------------------------------------------------

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
      <section className='mainGainContainer'>
      <MainGain 
        gain = {gain}
        updateGain = {updateGain}
      />
      </section>
      </div>
      <br></br>
      <Sequencer 
        trackCount = {trackCount}
        cellClick = {cellClick}
        seq = {seq}
        currentStep = {currentStep}
        isPlaying = {isPlaying}
        resetTrackFunc = {resetTrackFunc}
        randomizeTrackFunc = {randomizeTrackFunc}
      />
      </div>
    </>
  );
};

export default App;