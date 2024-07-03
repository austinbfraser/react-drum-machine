import React from 'react';
import Track from './track.jsx';

const Sequencer = props => {
  const tracks = [];
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

export default Sequencer;