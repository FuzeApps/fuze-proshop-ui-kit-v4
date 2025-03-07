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
      apiKey="b0ebe15b6f8da2631e34881a010a13d9d10ed9b0ee606c78"
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
