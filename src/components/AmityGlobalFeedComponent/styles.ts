import { StyleSheet } from 'react-native';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';

export const useStyle = (themeStyle: MyMD3Theme) => {
  const styles = StyleSheet.create({
    feedWrap: {
      backgroundColor: themeStyle.colors.baseDivider,
      height: '100%',
    },
    contentContainerStyle: {
      paddingBottom: 120,
    },
  });
  return styles;
};
