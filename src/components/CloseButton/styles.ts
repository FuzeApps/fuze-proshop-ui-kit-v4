import { StyleSheet } from 'react-native';
import { amityUIKitTokens } from '../../enum';

export const styles = StyleSheet.create({
  icon: {
    color: amityUIKitTokens.colors.primary,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 18,
    color: amityUIKitTokens.colors.primary,
  },
});
