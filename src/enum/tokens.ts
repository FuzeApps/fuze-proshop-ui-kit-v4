import { CustomColors } from '../providers/amity-ui-kit-provider';
const spacing = {
  /**
   * 2 pixels spacing
   */
  xxs1: 2,

  /**
   * 4 pixels spacing
   */
  xxs2: 4,

  /**
   * 8 pixels spacing
   */
  s1: 8,

  /**
   * 12 pixels spacing
   */
  s2: 12,

  /**
   * 16 pixels spacing
   */
  m1: 16,

  /**
   * 20 pixels spacing
   */
  m2: 20,

  /**
   * 24 pixels spacing
   */
  m3: 24,

  /**
   * 32 pixels spacing
   */
  l1: 32,

  /**
   * 40 pixels spacing
   */
  l2: 40,

  /**
   * 48 pixels spacing
   */
  l3: 48,

  /**
   * 56 pixels spacing
   */
  l4: 56,

  /**
   * 64 pixels spacing
   */
  xl1: 64,

  /**
   * 72 pixels spacing
   */
  xl2: 72,

  /**
   * 96 pixels spacing
   */
  xl3: 96,
};

const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
};

const colors: CustomColors = {
  /**
   * Primary colors
   */
  primary: '#118CF7',
  primaryShade1: '#0777D9',
  primaryShade2: '#0559A3',
  primaryShade3: '#033B6C',
  primaryShade4: '#021E36',
  /**
   * Secondary colors
   */
  secondary: '#FCFCFD',
  secondaryShade1: '#D0D5DD',
  secondaryShade2: '#98A2B3',
  secondaryShade3: '#667085',
  secondaryShade4: '#475467',
  /**
   * Base colors
   */
  base: '#fcfcfd',
  baseShade1: '#D0D5DD',
  baseShade2: '#98A2B3',
  baseShade3: '#667085',
  baseShade4: '#475467',
  /**
   * Alert colors
   */
  background: '#344054',
  backgroundShade1: '#475467',

  border: '#182230',
  screenBackground: '#182230',
  alert: '#FA4D30',
  baseDivider: '#182230',
};

export const amityUIKitTokens = {
  spacing,
  borderRadius,
  colors,
};
