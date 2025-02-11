import React from 'react';
import { Svg, Path } from 'react-native-svg';

const PersonIcon = ({ width = 15, height = 16, color = '#FFFFFF' }) => (
  <Svg width={width} height={height} viewBox="0 0 15 16">
    <Path
      d="M10.1254 1.13117C9.38491 0.406896 8.38054 0 7.33327 0C6.28601 0 5.28164 0.406896 4.54111 1.13117C3.80058 1.85545 3.38455 2.83778 3.38455 3.86207C3.38455 4.88635 3.80058 5.86869 4.54111 6.59296C5.28164 7.31724 6.28601 7.72414 7.33327 7.72414C8.38054 7.72414 9.38491 7.31724 10.1254 6.59296C10.866 5.86869 11.282 4.88635 11.282 3.86207C11.282 2.83778 10.866 1.85545 10.1254 1.13117Z"
      fill={color}
    />
    <Path
      d="M7.33327 9.93104C3.28302 9.93104 -6.10352e-05 11.7848 -6.10352e-05 14.069V16H14.6666V14.069C14.6666 11.7848 11.3835 9.93104 7.33327 9.93104Z"
      fill={color}
    />
  </Svg>
);

export default PersonIcon;
