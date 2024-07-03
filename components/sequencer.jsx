import React from 'react';
import Track from './track.jsx';
import ResetTrack from './resetTrack.jsx';

const Sequencer = props => {
  const tracks = [];
  const resetTracks = [];
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
  };

  return(
    <section className = 'sequencer'>
      <section className = 'trackContainer'><section className = 'trackLabel'>kick</section><section>{resetTracks[0]}</section>{tracks[0]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>snare</section><section>{resetTracks[1]}</section>{tracks[1]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>clap</section><section>{resetTracks[2]}</section>{tracks[2]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>tom lo</section><section>{resetTracks[3]}</section>{tracks[3]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>tom mid</section><section>{resetTracks[4]}</section>{tracks[4]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>tom hi</section><section>{resetTracks[5]}</section>{tracks[5]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>rim</section><section>{resetTracks[6]}</section>{tracks[6]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>crash</section><section>{resetTracks[7]}</section>{tracks[7]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>ride</section><section>{resetTracks[8]}</section>{tracks[8]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>closed HH</section><section>{resetTracks[9]}</section>{tracks[9]}</section>
      <section className = 'trackContainer'><section className = 'trackLabel'>open HH</section><section>{resetTracks[10]}</section>{tracks[10]}</section>
      </section>
  )
}

export default Sequencer;