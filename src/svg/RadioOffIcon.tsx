import React from 'react';
import { Svg, Path } from 'react-native-svg';

const RadioOffIcon = ({ color = "#A5A9B5", width = 24, height = 24 }: { color?: string, width?: number, height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12Z"
      fill={color}
    />
  </Svg>
);

export default RadioOffIcon;
