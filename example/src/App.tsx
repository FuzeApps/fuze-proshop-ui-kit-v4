import * as React from 'react';

import {
  AmityUiKitProvider,
  AmityUiKitSocial,
} from '@amityco/react-native-social-ui-kit';

import { UserRole } from '../../src/enum';
import useEventHandlers from '../hooks/useEventHandlers';
import config from '../uikit.config.json';
import CommunityLeaderboard from './CommunityLeaderboard';
import { NavigationContainer } from '@react-navigation/native';

if (__DEV__) {
  require('../ReactotronConfig');
}

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
    onCommunityCreate,
    onCommunityDelete,
  } = useEventHandlers();

  return (
    <AmityUiKitProvider
      configs={config} //put your config json object
      apiKey="b0ebe15b6fdef4664b3e8b1d530c438b840d8bb3ba66667d"
      apiRegion="eu"
      userId={'766ebb06-f4c4-43f5-8e7c-08ba96b7f289'}
      displayName={'Johneric P'}
      apiEndpoint="https://api.eu.amity.co"
      userRole={UserRole.PRO}
      minMembersToShowCounter={1000}
      onCommunityJoin={onCommunityJoin}
      onCommunityLeave={onCommunityLeave}
      onPostComplete={onPostComplete}
      onPostLike={onPostLike}
      onPostStart={onPostStart}
      onPostUnLike={onPostUnLike}
      onUserFollow={onUserFollow}
      onUserUnFollow={onUserUnFollow}
      onViewMyProShop={onViewMyProShop}
      onCommunityCreate={onCommunityCreate}
      onCommunityDelete={onCommunityDelete}
      CommunityLeaderboardComponent={CommunityLeaderboard} //Sample leaderboard component...
    >
      <NavigationContainer>
        <AmityUiKitSocial useOwnNavigationContainer />
      </NavigationContainer>
    </AmityUiKitProvider>
  );
}
