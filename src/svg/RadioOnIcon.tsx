import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { amityUIKitTokens } from '../enum';

const RadioOnIcon = ({
  color = amityUIKitTokens.colors.primary,
  width = 18,
  height = 18,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
    <Path
      d="M17.7188 9.25C17.7188 4.46875 13.7812 0.53125 9 0.53125C4.18359 0.53125 0.28125 4.46875 0.28125 9.25C0.28125 14.0664 4.18359 17.9688 9 17.9688C13.7812 17.9688 17.7188 14.0664 17.7188 9.25ZM7.98047 13.8906C7.76953 14.1016 7.38281 14.1016 7.17188 13.8906L3.51562 10.2344C3.30469 10.0234 3.30469 9.63672 3.51562 9.42578L4.32422 8.65234C4.53516 8.40625 4.88672 8.40625 5.09766 8.65234L7.59375 11.1133L12.8672 5.83984C13.0781 5.59375 13.4297 5.59375 13.6406 5.83984L14.4492 6.61328C14.6602 6.82422 14.6602 7.21094 14.4492 7.42188L7.98047 13.8906Z"
      fill={color}
    />
  </Svg>
);

export default RadioOnIcon;
