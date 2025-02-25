import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { amityUIKitTokens } from '../enum';

const CloseIcon = ({
  color = amityUIKitTokens.colors.base,
  width = 12,
  height = 12,
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
    viewBox="0 0 12 12"
    fill="none"
    style={style}
  >
    <Path
      d="M7.65234 6.25L11.4492 2.48828C11.6602 2.27734 11.6602 1.89062 11.4492 1.67969L10.5703 0.800781C10.3594 0.589844 9.97266 0.589844 9.76172 0.800781L6 4.59766L2.20312 0.800781C1.99219 0.589844 1.60547 0.589844 1.39453 0.800781L0.515625 1.67969C0.304688 1.89062 0.304688 2.27734 0.515625 2.48828L4.3125 6.25L0.515625 10.0469C0.304688 10.2578 0.304688 10.6445 0.515625 10.8555L1.39453 11.7344C1.60547 11.9453 1.99219 11.9453 2.20312 11.7344L6 7.9375L9.76172 11.7344C9.97266 11.9453 10.3594 11.9453 10.5703 11.7344L11.4492 10.8555C11.6602 10.6445 11.6602 10.2578 11.4492 10.0469L7.65234 6.25Z"
      fill={color}
    />
  </Svg>
);

export default CloseIcon;
