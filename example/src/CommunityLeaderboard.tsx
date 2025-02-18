import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useMemo } from 'react';

const CommunityLeaderboard = ({ communityId }: { communityId: string }) => {
  const { height } = useWindowDimensions();

  const extraStyles = useMemo(() => {
    return {
      minHeight: height / 2,
    };
  }, [height]);

  return (
    <View style={[styles.container, extraStyles]}>
      <Text>Welcome to community</Text>
      <Text>{communityId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityLeaderboard;
