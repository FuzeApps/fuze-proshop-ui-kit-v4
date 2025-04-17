import { StyleSheet } from 'react-native';
import type { MyMD3Theme } from '../../../providers/amity-ui-kit-provider';
import { useTheme } from 'react-native-paper';

export const useStyles = () => {
  const theme = useTheme() as MyMD3Theme;
  const styles = StyleSheet.create({
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      marginBottom: 10,
      backgroundColor: '#D9E5FC',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    communityName: {
      marginLeft: 4,
      marginBottom: 4,
      fontSize: 15,
      fontWeight: 'bold',
      color: theme.colors.base,
    },
    category: {
      marginVertical: 2,
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: theme.colors.baseShade4,
      color: theme.colors.base,
      borderRadius: 12,
      overflow: 'hidden',
      marginHorizontal: 2,
      fontSize: 12,
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
  });

  return styles;
};
