import React from 'react';
import { Svg, Path } from 'react-native-svg';

const CommentIcon = ({
  width = 18,
  height = 16,
  color = '#898E9E',
  style,
}: {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 18 16"
    fill="none"
    style={style}
  >
    <Path
      d="M8.9917 0.1875C13.6733 0.1875 17.4585 3.30859 17.4585 7.09375C17.4585 10.9121 13.6733 14 8.9917 14C7.896 14 6.8335 13.834 5.90381 13.5352C4.90771 14.2324 3.31396 15.0625 1.28857 15.0625C0.956543 15.0625 0.657715 14.8965 0.524902 14.5977C0.425293 14.2988 0.458496 13.9668 0.690918 13.7344C0.724121 13.7344 1.75342 12.6055 2.21826 11.3105C1.12256 10.1484 0.491699 8.6875 0.491699 7.09375C0.491699 3.30859 4.27686 0.1875 8.9917 0.1875ZM8.9917 12.4062C12.7769 12.4062 15.8979 10.0488 15.8979 7.09375C15.8979 4.17188 12.7769 1.78125 8.9917 1.78125C5.17334 1.78125 2.08545 4.17188 2.08545 7.09375C2.08545 8.52148 2.78271 9.58398 3.38037 10.2148L4.07764 10.9453L3.7124 11.875C3.54639 12.3398 3.31396 12.8047 3.04834 13.2031C3.84521 12.9375 4.50928 12.5723 4.97412 12.2402L5.60498 11.7754L6.36865 12.0078C7.19873 12.2734 8.09521 12.4062 8.9917 12.4062Z"
      fill={color}
    />
  </Svg>
);

export default CommentIcon;
