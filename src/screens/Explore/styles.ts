import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { amityUIKitTokens } from '../../enum';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';

export const useStyles = () => {
  const theme = useTheme() as MyMD3Theme;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.baseDivider,
    },
    recommendContainer: {
      backgroundColor: theme.colors.baseDivider,
      paddingVertical: 10,
    },
    trendingContainer: {
      paddingHorizontal: amityUIKitTokens.spacing.m1,
      backgroundColor: theme.colors.background,
      paddingVertical: amityUIKitTokens.spacing.m1,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 10,
      marginBottom: 20,
      color: theme.colors.base,
    },
    listContainer: {
      flex: 1,
    },
    trendingTextContainer: {
      paddingStart: amityUIKitTokens.spacing.m1,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    card: {
      width: 268,
      backgroundColor: theme.colors.background,
      borderRadius: amityUIKitTokens.borderRadius.medium,
      marginHorizontal: amityUIKitTokens.spacing.s1,
      marginBottom: 10,
      overflow: 'hidden',
      height: 250,
    },
    cardBody: {
      padding: amityUIKitTokens.spacing.m1,
    },
    recommendSubDetail: {
      fontSize: 13,
      marginBottom: 5,
      color: theme.colors.baseShade1,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: amityUIKitTokens.borderRadius.medium,
    },
    recommendedAvatar: {
      width: '100%',
      minHeight: 140,
    },
    recommendedCard: {
      width: 175,
      backgroundColor: theme.colors.background,
      borderRadius: amityUIKitTokens.borderRadius.medium,
      marginRight: 10,
      marginBottom: 10,
      overflow: 'hidden',
      height: 250,
    },
    name: {
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 5,
      color: theme.colors.base,
    },
    bio: {
      color: theme.colors.base,
      fontSize: 13,
    },
    communityDescription: {
      color: theme.colors.baseShade2,
      fontSize: 13,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    number: {
      fontSize: 18,
      fontWeight: '600',
      marginHorizontal: 12,
      color: amityUIKitTokens.colors.primary,
      paddingBottom: 10,
    },
    memberContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flex: 1,
    },
    memberText: {
      fontSize: 18,
      fontWeight: '600',
      marginRight: 4,
      color: theme.colors.base,
      maxWidth: '80%',
    },
    memberCount: {
      fontSize: 13,
      fontWeight: '400',
      color: theme.colors.baseShade1,
      marginRight: 4,
    },
    categoriesContainer: {
      paddingTop: 20,
      paddingHorizontal: amityUIKitTokens.spacing.m1,
      paddingBottom: 120,
      backgroundColor: theme.colors.baseDivider,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.base,
    },
    arrowIcon: {
      width: 10,
      height: 17,
      marginRight: 10,
      tintColor: theme.colors.base,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '50%',
      paddingHorizontal: 8,
      marginBottom: 10,
    },
    columnText: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
      marginBottom: 10,
      color: theme.colors.base,
      width: '70%',
    },
    wrapContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    categoryAvatar: {
      width: 40,
      height: 40,
      borderRadius: 40,
    },
    categoryItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '50%',
      overflow: 'hidden',
      marginBottom: amityUIKitTokens.spacing.s1,
    },
    categoryTextWrapper: {
      paddingHorizontal: amityUIKitTokens.spacing.s1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'row',
    },
    categoryName: {
      fontSize: 14,
      lineHeight: 24,
      fontWeight: '600',
      color: theme.colors.base,
    },
    officialIconWrapper: {
      position: 'absolute',
      marginLeft: 55,
      bottom: 0,
    },
    recommendContainerScrollView: {
      paddingHorizontal: amityUIKitTokens.spacing.s1,
    },
    recommendedTitleContainer: {
      paddingHorizontal: amityUIKitTokens.spacing.m1,
    },
    groupsTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    viewAllText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#118CF7',
    },
    groupTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: theme.colors.base,
    },
  });
  return styles;
};
