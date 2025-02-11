import React from 'react';
import { Svg, Rect, Path } from 'react-native-svg';

const CommunityIcon = ({
  color = '#D9E5FC',
  width = 40,
  height = 40,
  style,
}: {
  color?: string;
  width?: number;
  height?: number;
  style?: any;
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    style={style}
  >
    <Rect width="40" height="40" rx="20" fill={color} />
    <Path
      d="M19.8462 12C20.7625 12 21.6413 12.356 22.2893 12.9898C22.9373 13.6235 23.3013 14.4831 23.3013 15.3793C23.3013 16.2756 22.9373 17.1351 22.2893 17.7688C21.6413 18.4026 20.7625 18.7586 19.8462 18.7586C18.9298 18.7586 18.051 18.4026 17.403 17.7688C16.755 17.1351 16.391 16.2756 16.391 15.3793C16.391 14.4831 16.755 13.6235 17.403 12.9898C18.051 12.356 18.9298 12 19.8462 12ZM12.9359 14.4138C13.4887 14.4138 14.0021 14.5586 14.4463 14.8193C14.2982 16.2 14.7128 17.571 15.5618 18.6428C15.0682 19.5697 14.081 20.2069 12.9359 20.2069C12.1504 20.2069 11.3972 19.9017 10.8418 19.3585C10.2864 18.8153 9.97436 18.0786 9.97436 17.3103C9.97436 16.5421 10.2864 15.8054 10.8418 15.2622C11.3972 14.719 12.1504 14.4138 12.9359 14.4138ZM26.7564 14.4138C27.5419 14.4138 28.2951 14.719 28.8505 15.2622C29.4059 15.8054 29.7179 16.5421 29.7179 17.3103C29.7179 18.0786 29.4059 18.8153 28.8505 19.3585C28.2951 19.9017 27.5419 20.2069 26.7564 20.2069C25.6113 20.2069 24.6241 19.5697 24.1305 18.6428C24.9795 17.571 25.3941 16.2 25.246 14.8193C25.6903 14.5586 26.2036 14.4138 26.7564 14.4138ZM13.4295 24.3103C13.4295 22.3117 16.3022 20.6897 19.8462 20.6897C23.3901 20.6897 26.2628 22.3117 26.2628 24.3103V26H13.4295V24.3103ZM8 26V24.5517C8 23.2097 9.86577 22.08 12.3929 21.7517C11.8105 22.4083 11.4551 23.3159 11.4551 24.3103V26H8ZM31.6923 26H28.2372V24.3103C28.2372 23.3159 27.8818 22.4083 27.2994 21.7517C29.8265 22.08 31.6923 23.2097 31.6923 24.5517V26Z"
      fill="white"
    />
  </Svg>
);

export default CommunityIcon;
