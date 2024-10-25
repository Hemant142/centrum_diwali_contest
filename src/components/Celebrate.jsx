import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from './fireworks.json';
import './Celebrate.css';

const Celebrate = ({ score, total }) => {
  return (
    <div className="celebrate">
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: '200px', width: '200px' }}
      />
      <h2>🎉 Congratulations on completing the Centrum Diwali Contest! 🎉</h2>
      <p>You got <span className="highlight">{score}</span> out of <span className="highlight">{total}</span> questions correct!</p>
    </div>
  );
};

export default Celebrate;
