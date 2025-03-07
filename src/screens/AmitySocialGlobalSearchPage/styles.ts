import { StyleSheet } from 'react-native';
import { amityUIKitTokens } from '../../enum';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';

export const useStyles = (theme: MyMD3Theme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    searchScrollList: {
      paddingBottom: 110,
      marginTop: 10,
    },
    notFoundText: {
      marginTop: 40,
      fontSize: 16,
      alignSelf: 'center',
      textAlign: 'center',
      color: theme.colors.baseShade3,
    },
    searchEmptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconWrapper: {
      backgroundColor: amityUIKitTokens.colors.baseShade3,
      width: 160,
      height: 160,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 160,
      marginBottom: amityUIKitTokens.spacing.l1,
    },
    searchEmptyText: {
      color: amityUIKitTokens.colors.baseShade3,
      fontSize: 16,
      lineHeight: 24,
    },
  });

  return styles;
};
