import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { amityUIKitTokens } from '../../enum';

export const useStyles = () => {
  const theme = useTheme() as MyMD3Theme;
  const styles = StyleSheet.create({
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 72,
      marginRight: 10,
    },
    itemText: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.base,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: amityUIKitTokens.spacing.m1,
      paddingVertical: amityUIKitTokens.spacing.s1,
    },
    rightContainer: {
      alignItems: 'center',
      paddingHorizontal: amityUIKitTokens.spacing.m1,
      minHeight: amityUIKitTokens.spacing.l4,
      justifyContent: 'center',
    },
    dotIcon: {
      width: 16,
      height: 12,
    },
    btnContainer: {
      padding: amityUIKitTokens.spacing.s2,
    },
  });
  return styles;
};
