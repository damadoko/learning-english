import React from 'react'
import Lottie from 'lottie-react';
import micWaveAnimation from '../../lottie/mic-wave.json';

export type MicWaveformProps = {
  active: boolean
}

export const MicWaveform: React.FC<MicWaveformProps> = ({active}) => {
  return (
    <Lottie
      animationData={micWaveAnimation}
      autoplay={active}
      loop={active}
      style={{ width: 120, height: 120 }}
    />
  );
};

