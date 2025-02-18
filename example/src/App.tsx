import * as React from 'react';

import {
  AmityUiKitProvider,
  AmityUiKitSocial,
} from '@amityco/react-native-social-ui-kit';

import config from '../uikit.config.json';
import useEventHandlers from '../hooks/useEventHandlers';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { UserRole } from '../../src/enum';

if (__DEV__) {
  require('../ReactotronConfig');
}

const CommunityLeaderboard = ({ communityId }: { communityId: string }) => {
  return (
    <View>
      <Text>Community Leaderboard</Text>
      <Text>{communityId ?? 'No community ID is provided'}</Text>
    </View>
  );
};

export default function App() {
  const {
    onCommunityJoin,
    onCommunityLeave,
    onPostComplete,
    onPostLike,
    onPostStart,
    onPostUnLike,
    onUserFollow,
    onUserUnFollow,
    onViewMyProShop,
  } = useEventHandlers();

  return (
    <AmityUiKitProvider
      configs={config} //put your config json object
      apiKey="b0ebe15b6fdef4664b3e8b1d530c438b840d8bb3ba66667d"
      apiRegion="eu"
      userId={'0aacbd28-2fe8-4ef2-a5a5-b4bb45764b0e'}
      displayName={'Zane Scotland'}
      apiEndpoint="https://api.eu.amity.co"
      userRole={UserRole.PRO}
      onCommunityJoin={onCommunityJoin}
      onCommunityLeave={onCommunityLeave}
      onPostComplete={onPostComplete}
      onPostLike={onPostLike}
      onPostStart={onPostStart}
      onPostUnLike={onPostUnLike}
      onUserFollow={onUserFollow}
      onUserUnFollow={onUserUnFollow}
      onViewMyProShop={onViewMyProShop}
      CommunityLeaderboard={CommunityLeaderboard}
    >
      <AmityUiKitSocial />
    </AmityUiKitProvider>
  );
}
