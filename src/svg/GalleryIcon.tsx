import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { amityUIKitTokens } from '../enum';

const GalleryIcon = ({
  color = amityUIKitTokens.colors.base,
  width = 25,
  height = 24,
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
    viewBox="0 0 25 24"
    fill="none"
    style={style}
  >
    <Path
      d="M21 4.5H4.5C4.08579 4.5 3.75 4.83579 3.75 5.25V18.75C3.75 19.1642 4.08579 19.5 4.5 19.5H21C21.4142 19.5 21.75 19.1642 21.75 18.75V5.25C21.75 4.83579 21.4142 4.5 21 4.5Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.75 15.7499L8.46966 11.0302C8.5393 10.9606 8.62198 10.9053 8.71297 10.8676C8.80397 10.8299 8.9015 10.8105 8.99999 10.8105C9.09848 10.8105 9.19601 10.8299 9.287 10.8676C9.37799 10.9053 9.46067 10.9606 9.53032 11.0302L13.7197 15.2196C13.7893 13.2892 13.872 15.3444 13.963 15.3821C14.054 15.4198 14.1515 15.4392 14.25 15.4392C14.3485 15.4392 14.446 15.4198 14.537 15.3821C14.628 15.3444 14.7107 15.2892 14.7803 15.2196L16.7197 13.2802C16.7893 13.2106 16.872 13.1553 16.963 13.1176C17.054 13.0799 17.1515 13.0605 17.25 13.0605C17.3485 13.0605 17.446 13.0799 17.537 13.1176C17.628 13.1553 17.7107 13.2106 17.7803 13.2802L21.75 17.2499"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.375 10.5C15.9963 10.5 16.5 9.99632 16.5 9.375C16.5 8.75368 15.9963 8.25 15.375 8.25C14.7537 8.25 14.25 8.75368 14.25 9.375C14.25 9.99632 14.7537 10.5 15.375 10.5Z"
      fill={color}
    />
  </Svg>
);

export default GalleryIcon;
