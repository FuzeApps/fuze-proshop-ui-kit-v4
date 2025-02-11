import { StyleSheet } from 'react-native';
import { amityUIKitTokens } from '../../enum';

export const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#fff',
    color: '#000',

    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    fontSize: 18,
    color: amityUIKitTokens.colors.primary,
  },
});
