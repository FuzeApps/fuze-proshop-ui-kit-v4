import React from 'react';
import { Svg, Path } from 'react-native-svg';

const EditIcon = ({
  color = '#292B32',
  width = 21,
  height = 20,
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
    viewBox="0 0 21 20"
    fill="none"
    style={style}
  >
    <Path
      d="M17.4434 4.54492L16.3301 3.43164C15.9785 3.08008 15.4805 2.875 15.0117 2.875C14.543 2.875 14.0449 3.08008 13.6934 3.43164L11.4961 5.62891L10.5 6.625L3.35156 13.7734L3 17.1133C2.94141 17.5234 3.26367 17.875 3.67383 17.875C3.70312 17.875 3.73242 17.875 3.76172 17.875L7.10156 17.5234L14.25 10.375L15.2461 9.37891L17.4434 7.18164C18.1758 6.44922 18.1758 5.27734 17.4434 4.54492ZM6.45703 16.1758L4.49414 16.3809L4.69922 14.418L11.4668 7.62109L12.375 6.71289L14.1621 8.5L13.2539 9.4082L6.45703 16.1758ZM16.4473 6.18555L15.1582 7.50391L13.3711 5.7168L14.6895 4.42773C14.8066 4.31055 14.9531 4.28125 15.0117 4.28125C15.0703 4.28125 15.2168 4.31055 15.334 4.42773L16.4473 5.54102C16.623 5.7168 16.623 6.00977 16.4473 6.18555Z"
      fill={color}
    />
  </Svg>
);

export default EditIcon;
