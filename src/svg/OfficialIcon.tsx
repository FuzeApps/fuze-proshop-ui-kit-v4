import React from 'react';
import { Svg, Path, SvgProps } from 'react-native-svg';

interface OfficialIconProps extends SvgProps {
  color?: string;
}

const OfficialIcon: React.FC<OfficialIconProps> = ({ color = '#1054DE', width = 24, height = 24, ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M20.4187 17.2431V15.484L21.6578 14.2367C21.6585 14.236 21.6591 14.2353 21.6598 14.2347C22.3179 13.5809 22.7516 12.8357 22.75 11.9944C22.7484 11.1539 22.3123 10.4096 21.6598 9.75703L20.4187 8.51599V6.75731C20.4187 5.82929 20.1982 4.99367 19.6024 4.39784C19.0065 3.802 18.1709 3.58149 17.2429 3.58149H15.4842L14.2432 2.34045L13.7265 2.85718L14.2432 2.34045C13.5864 1.6837 12.8389 1.24643 11.9953 1.24805C11.1522 1.24967 10.4079 1.68919 9.75583 2.35012L8.51619 3.58149H6.75709C5.8332 3.58149 4.99652 3.79565 4.39906 4.38988C3.80081 4.98488 3.58127 5.82267 3.58127 6.75731V8.51599L2.34222 9.75505C2.34186 9.75541 2.3415 9.75576 2.34114 9.75612C1.68254 10.4101 1.24839 11.1557 1.25 11.9973C1.25162 12.8375 1.68721 13.5814 2.33924 14.2337C2.33957 14.2341 2.3399 14.2344 2.34023 14.2347L3.58127 15.484V17.2431C3.58127 18.1712 3.80178 19.0068 4.39761 19.6026C4.99345 20.1984 5.82907 20.419 6.75709 20.419H8.51577L9.75483 21.658C9.75525 21.6584 9.75567 21.6588 9.75609 21.6593C10.4102 22.3179 11.1557 22.7518 11.9982 22.7502C12.8389 22.7486 13.5848 22.3135 14.2412 21.662L14.2432 21.66L15.4842 20.419H17.2429C18.1709 20.419 19.0065 20.1984 19.6024 19.6026C20.1982 19.0068 20.4187 18.1712 20.4187 17.2431ZM11.1362 14.6129L15.3255 8.63315C15.3257 8.63284 15.3259 8.63254 15.3261 8.63223C15.3555 8.5907 15.3769 8.56758 15.3897 8.55538C15.3961 8.5494 15.4003 8.54608 15.4025 8.54447L15.4048 8.5429L15.4054 8.54255L15.4054 8.54254L15.4062 8.54222C15.4072 8.54187 15.4101 8.54087 15.4157 8.53964C15.4272 8.53713 15.4517 8.53329 15.4953 8.53329C15.5882 8.53329 15.6273 8.56322 15.6388 8.5743C15.649 8.58401 15.6664 8.60526 15.6669 8.65924C15.6668 8.65923 15.6656 8.67493 15.6559 8.70327C15.6448 8.73575 15.6277 8.76991 15.6066 8.79938L15.6062 8.79996L10.738 15.6294C10.7079 15.6668 10.6872 15.6781 10.6764 15.6832C10.6626 15.6896 10.6288 15.7019 10.5567 15.7019C10.4668 15.7019 10.4177 15.6788 10.3664 15.6274L7.5945 12.5264L7.58765 12.5187L7.58058 12.5112C7.58023 12.5109 7.57454 12.5045 7.5688 12.4892C7.56299 12.4738 7.55926 12.4547 7.55926 12.435C7.55926 12.3586 7.58347 12.3322 7.59029 12.3255C7.59747 12.3184 7.63028 12.2894 7.72221 12.2894C7.78716 12.2894 7.81058 12.2994 7.8149 12.3013L7.81503 12.3014C7.81882 12.303 7.8367 12.3108 7.87134 12.3481L9.9633 14.6831L10.5939 15.3869L11.1362 14.6129Z" fill={color} stroke="white" strokeWidth="1.5"/>
  </Svg>
);

export default OfficialIcon;
