import React from 'react';
import {
  Svg,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Path,
} from 'react-native-svg';

const LikeReactionIcon = ({
  width = 20,
  height = 20,
  circleColor = '#ffffff',
  style = {},
}) => {
  const gradientId = `paint0_linear_${Math.random()}`;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      style={style}
    >
      <Defs>
        <LinearGradient
          id={gradientId}
          x1="7.5"
          y1="2"
          x2="16.5"
          y2="24.5"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#67A4FF" />
          <Stop offset="1" stopColor="#0041BE" />
        </LinearGradient>
      </Defs>
      <Circle
        cx="10"
        cy="10"
        r="9.5"
        fill={`url(#${gradientId})`}
        stroke={circleColor}
      />
      <Path
        d="M6.73438 8.1875C7.01367 8.1875 7.25 8.42383 7.25 8.70312V13.8594C7.25 14.1602 7.01367 14.375 6.73438 14.375H5.01562C4.71484 14.375 4.5 14.1602 4.5 13.8594V8.70312C4.5 8.42383 4.71484 8.1875 5.01562 8.1875H6.73438ZM5.875 13.5156C6.1543 13.5156 6.39062 13.3008 6.39062 13C6.39062 12.7207 6.1543 12.4844 5.875 12.4844C5.57422 12.4844 5.35938 12.7207 5.35938 13C5.35938 13.3008 5.57422 13.5156 5.875 13.5156ZM12.75 5.13672C12.75 6.03906 12.1914 6.55469 12.0195 7.15625H14.2109C14.9199 7.15625 15.4785 7.75781 15.4785 8.42383C15.5 8.81055 15.3281 9.21875 15.0703 9.47656C15.2852 9.9707 15.2422 10.6797 14.877 11.1738C15.0488 11.7324 14.877 12.4199 14.5117 12.7852C14.6191 13.1719 14.5762 13.4941 14.3828 13.752C13.9531 14.375 12.8574 14.375 11.9336 14.375H11.8691C10.8379 14.375 10 14.0098 9.3125 13.709C8.96875 13.5586 8.51758 13.3652 8.17383 13.3652C8.04492 13.3438 7.9375 13.2363 7.9375 13.1074V8.50977C7.9375 8.44531 7.95898 8.38086 8.00195 8.31641C8.86133 7.47852 9.22656 6.59766 9.91406 5.88867C10.2363 5.56641 10.3438 5.09375 10.4727 4.62109C10.5586 4.23438 10.752 3.375 11.2031 3.375C11.7188 3.375 12.75 3.54688 12.75 5.13672Z"
        fill="white"
      />
    </Svg>
  );
};

export default LikeReactionIcon;
