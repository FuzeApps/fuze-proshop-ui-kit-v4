import { StyleSheet } from 'react-native';
import { amityUIKitTokens } from '../../enum';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: amityUIKitTokens.colors.background,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: amityUIKitTokens.colors.base,
  },
});
