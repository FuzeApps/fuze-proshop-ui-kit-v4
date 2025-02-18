import { CustomColors } from '../providers/amity-ui-kit-provider';

const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
};

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

const fontSize = {
  /**
   * 12 pixels font size
   */
  caption1: 12,

  /**
   * 13 pixels font size
   */
  footnote: 13,

  /**
   * 15 pixels font size
   */
  subheadline: 15,

  /**
   * 28 pixels font size
   */
  title1: 28,

  /**
   * 34 pixels font size
   */
  largeTitle: 34,

  /**
   * 17 pixels font size
   */
  body: 17,

  /**
   * 20 pixels font size
   */
  title3: 20,

  /**
   * 11 pixels font size
   */
  caption2: 11,

  /**
   * 17 pixels font size
   */
  headline: 17,

  /**
   * 22 pixels font size
   */
  title2: 22,

  /**
   * 16 pixels font size
   */
  callout: 16,

  /**
   * 8 pixels font size
   */
  caption3: 8,
};

const lineHeight = {
  /**
   * 16 line height
   */
  caption1: 16,

  /**
   * 18 line height
   */
  footnote: 18,

  /**
   * 20 line height
   */
  subheadline: 20,

  /**
   * 34 line height
   */
  title1: 34,

  /**
   * 41 line height
   */
  largeTitle: 41,

  /**
   * 22 line height
   */
  body: 22,

  /**
   * 25 line height
   */
  title3: 25,

  /**
   * 13 line height
   */
  caption2: 13,

  /**
   * 22 line height
   */
  headline: 22,

  /**
   * 28 line height
   */
  title2: 28,

  /**
   * 21 line height
   */
  callout: 21,

  /**
   * 13 line height
   */
  caption3: 13,
};

const fontWeight: Record<string, FontWeight> = {
  /**
   * 400 font weight
   */
  caption1Regular: '400',

  /**
   * 400 font weight
   */
  footnote: '400',

  /**
   * 400 font weight
   */
  subheadlineRegular: '400',

  /**
   * 400 font weight
   */
  headlineRegular: '400',

  /**
   * 400 font weight
   */
  largeTitleRegular: '400',

  /**
   * 700 font weight
   */
  largeTitleEmphasized: '700',

  /**
   * 400 font weight
   */
  title1Regular: '400',

  /**
   * 700 font weight
   */
  title1Emphasized: '700',

  /**
   * 700 font weight
   */
  subheadlineEmphasize: '700',

  /**
   * 400 font weight
   */
  bodyRegular: '400',

  /**
   * 700 font weight
   */
  caption1Emphasized: '700',

  /**
   * 700 font weight
   */
  title3Emphasized: '700',

  /**
   * 400 font weight
   */
  caption2Regular: '400',

  /**
   * 700 font weight
   */
  headlineBold: '700',

  /**
   * 700 font weight
   */
  caption2Emphasized: '700',

  /**
   * 700 font weight
   */
  bodyEmphasized: '700',

  /**
   * 700 font weight
   */
  title2Emphasized: '700',

  /**
   * 400 font weight
   */
  title3Regular: '400',

  /**
   * 700 font weight
   */
  footnoteEmphasized: '700',

  /**
   * 700 font weight
   */
  calloutEmphasized: '700',

  /**
   * 400 font weight
   */
  calloutRegular: '400',

  /**
   * 400 font weight
   */
  caption3Regular: '400',
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
  background: '#182230',
  backgroundShade1: '#475467',

  border: '#101828',
  screenBackground: '#101828',
  alert: '#FA4D30',
  baseDivider: '#101828',
};

export const amityUIKitTokens = {
  spacing,
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  lineHeight,
};

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
