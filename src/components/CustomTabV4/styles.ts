import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { amityUIKitTokens } from '../../enum';

export const useStyles = () => {
  const theme = useTheme() as MyMD3Theme;

  const styles = StyleSheet.create({
    wrapper: {
      borderBottomWidth: 1,
      borderBottomColor: amityUIKitTokens.colors.baseShade2,
    },
    scrollViewWrapper: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: amityUIKitTokens.spacing.m1,
    },
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      paddingTop: amityUIKitTokens.spacing.m1,
      minHeight: 64,
      alignItems: 'flex-end',
    },
    tab: {
      flex: 1,
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
      alignItems: 'center',
      paddingBottom: amityUIKitTokens.spacing.xxs2,
    },
    activeTab: {
      borderBottomColor: theme.colors.primary,
    },
    activeTabText: {
      color: amityUIKitTokens.colors.primary,
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      height: 2,
      backgroundColor: theme.colors.primary,
    },
    tabItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabText: {
      color: amityUIKitTokens.colors.baseShade2,
      fontSize: amityUIKitTokens.fontSize.caption1,
      fontWeight: amityUIKitTokens.fontWeight.caption1Regular,
      textAlign: 'center',
    },
    icon: {
      marginBottom: amityUIKitTokens.spacing.s1,
    },
  });
  return styles;
};
