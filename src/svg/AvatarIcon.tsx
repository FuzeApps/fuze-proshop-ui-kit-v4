import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';
import { amityUIKitTokens } from '../enum';

export const AvatarIcon = ({
  width = 40,
  height = 40,
  color = amityUIKitTokens.colors.backgroundShade1,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <Svg width={width} height={height} viewBox="0 0 40 40" fill="none">
    <Rect id="Rectangle 67" width="40" height="40" rx="20" fill={color} />
    <Path
      d="M23.1254 13.1312C22.3849 12.4069 21.3805 12 20.3333 12C19.286 12 18.2816 12.4069 17.5411 13.1312C16.8006 13.8555 16.3846 14.8378 16.3846 15.8621C16.3846 16.8864 16.8006 17.8687 17.5411 18.593C18.2816 19.3172 19.286 19.7241 20.3333 19.7241C21.3805 19.7241 22.3849 19.3172 23.1254 18.593C23.866 17.8687 24.282 16.8864 24.282 15.8621C24.282 14.8378 23.866 13.8555 23.1254 13.1312Z"
      fill="white"
    />
    <Path
      d="M20.3333 21.931C16.283 21.931 12.9999 23.7848 12.9999 26.069V28H27.6666V26.069C27.6666 23.7848 24.3835 21.931 20.3333 21.931Z"
      fill="white"
    />
  </Svg>
);
