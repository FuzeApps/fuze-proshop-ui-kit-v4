import { StyleSheet } from 'react-native';
import { amityUIKitTokens } from '../../enum';

export const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: amityUIKitTokens.colors.backgroundShade1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sectionHeaderText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#898E9E',
  },
});
