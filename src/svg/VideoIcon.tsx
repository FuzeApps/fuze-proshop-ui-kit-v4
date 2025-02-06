import React from 'react';
import { Svg, Path, SvgProps } from 'react-native-svg';

interface VideoIconProps extends SvgProps {
  color?: string;
}

const VideoIcon: React.FC<VideoIconProps> = ({ color = '#A5A9B5', width = 54, height = 48, ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 54 48" fill="none" {...props}>
    <Path d="M50.5195 14.125L50.625 17.5L50.5195 44.5L40.5 37.5391V24.5664L50.5195 17.5V14.125C49.8867 14.2305 49.1484 14.4414 48.6211 14.7578L40.5 20.4531V19.1875C40.5 16.4453 38.1797 14.125 35.4375 14.125H10.125V9.0625C10.125 6.32031 12.3398 4 15.1875 4H32.9062C33.3281 4 33.75 3.68359 33.75 3.15625V1.46875C33.75 1.04688 33.3281 0.625 32.9062 0.625H15.1875C10.4414 0.625 6.75 4.42188 6.75 9.0625V14.125H5.0625C2.21484 14.125 0 16.4453 0 19.1875V42.8125C0 45.6602 2.21484 47.875 5.0625 47.875H35.4375C38.1797 47.875 40.5 45.6602 40.5 42.8125V41.6523L48.6211 47.3477C49.1484 47.6641 49.8867 47.875 50.5195 47.875C52.3125 47.875 54 46.5039 54 44.6055V17.5C54 15.4961 52.3125 14.125 50.5195 14.125ZM37.125 42.8125C37.125 43.7617 36.2812 44.5 35.4375 44.5H5.0625C4.11328 44.5 3.375 43.7617 3.375 42.8125V19.1875C3.375 18.3438 4.11328 17.5 5.0625 17.5H35.4375C36.2812 17.5 37.125 18.3438 37.125 19.1875V42.8125ZM33.0117 20.875H7.38281C6.96094 20.9805 6.75 21.1914 6.75 21.6133V23.6172C6.75 24.0391 6.96094 24.25 7.38281 24.25H33.0117C33.4336 24.25 33.6445 24.0391 33.75 23.6172V21.6133C33.6445 21.1914 33.4336 20.9805 33.0117 20.875Z" fill={color} />
  </Svg>
);

export default VideoIcon;
