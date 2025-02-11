import { StyleSheet } from 'react-native';
import { amityUIKitTokens } from '../../enum';

export const styles = StyleSheet.create({
  roundCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A5A9B5',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: amityUIKitTokens.colors.primary,
    borderWidth: 0,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});
