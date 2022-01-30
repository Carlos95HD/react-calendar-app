import React from 'react';
import './loading.css'

export const LoadingScreen = () => {
  return (
    <div className="gooey">
      <span className="dot"></span>
      <div className="dots">
        <span className="dotspan"></span>
        <span className="dotspan"></span>
        <span className="dotspan"></span>
      </div>
    </div>
  )
};
