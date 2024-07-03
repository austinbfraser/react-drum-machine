import React from 'react';
import Track from './track.jsx';
import ResetTrack from './resetTrack.jsx';

const Sequencer = props => {
  const tracks = [];
  const resetTracks = [];
  const fullTracks = [];
  const trackLabels = [];
  const trackLabelStrings = [
    'kick',
    'snare',
    'clap',
    'tom lo',
    'tom mid',
    'tom hi',
    'rim',
    'crash',
    'ride',
    'closed HH',
    'open HH'
  ];
  for (let i = 0; i < props.trackCount; i++) {
    tracks.push(
      <Track 
        key = {`track${i + 1}`}
        trackNum = {i + 1}
        cellClick = {props.cellClick}
        seq = {props.seq}
        currentStep = {props.currentStep}
        isPlaying = {props.isPlaying}
      />
    );
    resetTracks.push(
      <ResetTrack 
        key = {`resetTrack${i + 1}`}
        trackNum = {i + 1}
        resetTrackFunc = {props.resetTrackFunc}
      />
    )
    trackLabels.push(
      <section key = {`trackLabel${i + 1}`}>{trackLabelStrings[i]}</section>
    )
    fullTracks.push(
      <section className = 'trackContainer' key = {`fullTrack${i +1}`}><section className = 'trackLabel'>{trackLabels[i]}</section><section>{resetTracks[i]}</section>{tracks[i]}</section>
    );
  };

  return(
    <section className = 'sequencer'>{fullTracks}</section>
  )
}

export default Sequencer;