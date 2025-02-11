import React from 'react';
import { Svg, Path } from 'react-native-svg';

const PrivateIcon = ({ width = 16, height = 16, color = '#292B32' }) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 11.2266C8.32227 11.2266 8.60156 10.9688 8.60156 10.625V9.25C8.60156 8.92773 8.32227 8.64844 8 8.64844C7.65625 8.64844 7.39844 8.92773 7.39844 9.25V10.625C7.39844 10.9688 7.65625 11.2266 8 11.2266ZM12.8125 7.53125C12.8125 6.97266 12.3398 6.5 11.7812 6.5H11.0938V5.51172C11.0938 3.79297 9.71875 2.39648 8 2.375C6.28125 2.375 4.90625 3.77148 4.90625 5.46875V6.5H4.21875C3.63867 6.5 3.1875 6.97266 3.1875 7.53125V12.3438C3.1875 12.9238 3.63867 13.375 4.21875 13.375H11.7812C12.3398 13.375 12.8125 12.9238 12.8125 12.3438V7.53125ZM5.9375 6.5V5.46875C5.9375 4.35156 6.86133 3.40625 8 3.40625C9.11719 3.40625 10.0625 4.35156 10.0625 5.46875V6.5H5.9375ZM11.7812 7.53125V12.3438H4.21875V7.53125H11.7812Z"
      fill={color}
    />
  </Svg>
);

export default PrivateIcon;
