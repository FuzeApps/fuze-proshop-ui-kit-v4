import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PostIcon = ({ color = '#292B32' }) => (
  <Svg width="29" height="29" viewBox="0 0 29 29" fill="none" >
    <Path
      d="M26.6484 4.12989L27.6592 3.07521C28.1426 2.57716 28.1572 1.85939 27.6738 1.37599L27.3369 1.03907C26.8975 0.599621 26.1797 0.658215 25.7109 1.12697L24.6709 2.13771L26.6484 4.12989ZM10.7695 18.4268L13.5088 17.2549L25.623 5.14064L23.6455 3.17775L11.5459 15.292L10.3008 17.9434C10.1836 18.207 10.4912 18.544 10.7695 18.4268ZM4.9541 28.7979H21.1846C23.7188 28.7979 25.2129 27.3184 25.2129 24.4326V9.09572L22.7959 11.5127V24.2715C22.7959 25.6777 22.0342 26.3955 21.0967 26.3955H5.04199C3.69434 26.3955 2.94727 25.6777 2.94727 24.2715V8.65626C2.94727 7.25001 3.69434 6.53224 5.04199 6.53224H16.7607L19.1777 4.12989H4.9541C2.02441 4.12989 0.530273 5.59474 0.530273 8.49513V24.4326C0.530273 27.333 2.02441 28.7979 4.9541 28.7979Z"
      fill={color}
    />
  </Svg>
);

export default PostIcon;