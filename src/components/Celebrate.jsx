import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from './fireworks.json';
import './Celebrate.css';

const Celebrate = ({ name }) => {
  return (
    <div className="celebrate">
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: '200px', width: '200px', position: 'absolute', zIndex: -1 }} // Positioning for background effect
      />
      <h2 className="diwali-message">🎉 Happy Diwali! 🎉</h2>
      <h2>🎉 
      Thank you   {name}  for your participation! If shortlisted, you'll be contacted soon. 🎉</h2>
      
    </div>
  );
};

export default Celebrate;
