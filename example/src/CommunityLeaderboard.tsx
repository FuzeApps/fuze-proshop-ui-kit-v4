import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useMemo } from 'react';
import { amityUIKitTokens } from '../../src/enum';

const CommunityLeaderboard = ({ communityId }: { communityId: string }) => {
  const { height } = useWindowDimensions();

  const extraStyles = useMemo(() => {
    return {
      minHeight: height / 2,
    };
  }, [height]);

  return (
    <View style={[styles.container, extraStyles]}>
      <Text style={styles.title}>Welcome to the</Text>
      <Text style={styles.title}>Community Leaderboard</Text>
      <View style={styles.gap} />
      <Text style={styles.subTitle}>{communityId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: amityUIKitTokens.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: amityUIKitTokens.fontSize.title2,
    fontWeight: amityUIKitTokens.fontWeight.title2Bold,
    color: amityUIKitTokens.colors.base,
  },
  subTitle: {
    fontSize: amityUIKitTokens.fontSize.body,
    color: amityUIKitTokens.colors.baseShade4,
  },
  gap: {
    width: '100%',
    height: 20,
  },
});

export default CommunityLeaderboard;
