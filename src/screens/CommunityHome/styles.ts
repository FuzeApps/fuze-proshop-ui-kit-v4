import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { amityUIKitTokens } from '../../enum';

export const useStyles = () => {
  const theme = useTheme() as MyMD3Theme;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginBottom: 10,
      backgroundColor: '#D9E5FC',
    },
    joinContainer: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 16,
    },
    joinCommunityButton: {
      backgroundColor: theme.colors.primary,
      padding: 8,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    joinCommunityText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '600',
      color: '#FFF',
    },
    dotIcon: {
      width: 16,
      height: 12,
    },
    imageContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },

    image: {
      width: '100%',
      height: '100%',
    },
    imagePlaceholder: {
      // paddingTop: amityUIKitTokens.spacing.l3,
    },
    emptyImage: {
      width: '100%',
      height: '100%',
      backgroundColor: '#898E9E',
    },
    darkOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.0)', // Adjust the alpha value for darkness
    },
    topHeaderControls: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: amityUIKitTokens.spacing.m1,
      zIndex: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sectionWrapper: {
      paddingHorizontal: amityUIKitTokens.spacing.m1,
      paddingTop: amityUIKitTokens.spacing.m1,
      backgroundColor: theme.colors.background,
    },
    communityNameSection: {
      flexDirection: 'row',
      paddingTop: amityUIKitTokens.spacing.m1,
      paddingHorizontal: amityUIKitTokens.spacing.m1,
      flexWrap: 'nowrap',
      backgroundColor: theme.colors.background,
    },
    spacer: {
      width: amityUIKitTokens.spacing.m1,
      height: amityUIKitTokens.spacing.m1,
    },
    overlayCommunityText: {
      color: theme.colors.base,
      fontWeight: 'bold',
      fontSize: 20,
    },
    communityNameWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    communityNameWrapperLeft: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
    },

    communityActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    communityName: {
      color: theme.colors.base,
      fontWeight: 'bold',
      fontSize: 20,
      paddingTop: amityUIKitTokens.spacing.xxs2,
    },
    verifiedIconWrapper: {
      paddingTop: amityUIKitTokens.spacing.xxs2,
      paddingStart: amityUIKitTokens.spacing.xxs2,
    },
    shortCommunityName: {
      maxWidth: '70%',
    },

    descriptionWrapper: {
      paddingHorizontal: amityUIKitTokens.spacing.m1,
      paddingTop: amityUIKitTokens.spacing.m1,
    },
    description: {
      color: amityUIKitTokens.colors.baseShade1,
      fontSize: amityUIKitTokens.fontSize.body,
      fontWeight: amityUIKitTokens.fontWeight.bodyRegular,
      lineHeight: amityUIKitTokens.lineHeight.body,
    },
    joinIcon: {
      width: 18,
      height: 16,
      color: 'white',
    },
    overlayCategoryText: {
      color: theme.colors.base,
      fontWeight: '400',
      fontSize: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      height: 30,
      marginVertical: 10,
      paddingHorizontal: 20,
    },
    rowItem: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    rowItemContent: {
      flexDirection: 'row',
      paddingLeft: 50,
    },
    verticalLine: {
      height: 40,
      width: 1,
      backgroundColor: theme.colors.baseShade4,
      marginHorizontal: 5,
    },
    rowNumber: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.base,
    },
    rowLabel: {
      fontSize: 16,
      color: theme.colors.baseShade2,
    },
    textComponent: {
      fontSize: 16,
      paddingVertical: 15,
      paddingHorizontal: 20,
      color: theme.colors.base,
    },
    pendingPostArea: {
      flex: 1,
      backgroundColor: amityUIKitTokens.colors.baseShade4,
      paddingVertical: amityUIKitTokens.spacing.s1,
      alignItems: 'center',
      borderRadius: 4,
    },
    pendingText: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.base,
      marginLeft: 6,
    },
    pendingDescriptionText: {
      fontSize: amityUIKitTokens.fontSize.body,
      fontWeight: amityUIKitTokens.fontWeight.bodyRegular,
      lineHeight: amityUIKitTokens.lineHeight.body,
      color: theme.colors.base,
    },
    pendingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editProfileButton: {
      width: '98%',
      borderWidth: 1,
      borderColor: '#A5A9B5',
      padding: 8,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 16,
    },
    editProfileText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.base,
    },
    tabBackground: {
      backgroundColor: theme.colors.baseShade4,
      flex: 1,
    },
    ctaWrapper: {
      paddingHorizontal: amityUIKitTokens.spacing.m1,
      paddingTop: amityUIKitTokens.spacing.m1,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 8,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      minHeight: 40,
      marginBottom: amityUIKitTokens.spacing.m1,
    },
    semiTransparentButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% transparency
      height: amityUIKitTokens.spacing.l1,
      width: amityUIKitTokens.spacing.l1,
      borderRadius: amityUIKitTokens.spacing.l1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    transparentButton: {
      height: amityUIKitTokens.spacing.l1,
      width: amityUIKitTokens.spacing.l1,
      borderRadius: amityUIKitTokens.spacing.l1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return styles;
};
