import React from 'react'
import Lottie from 'lottie-react';
import micWaveAnimation from '../../lottie/mic-wave.json';

export type MicWaveformProps = {
  active: boolean
}

export const MicWaveform: React.FC<MicWaveformProps> = ({active}) => {
  if (!active) return null;
  return (
    <Lottie
      animationData={micWaveAnimation}
      loop
      style={{ width: 120, height: 120 }}
    />
  );
};

