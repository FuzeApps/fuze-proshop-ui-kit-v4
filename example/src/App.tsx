import * as React from 'react';

import {
  AmityUiKitProvider,
  AmityUiKitSocial,
  ExplorePage,
  MyCommunityPage,
  Newsfeed,
  UserProfile,
  CommunityHome,
  MyUserProfile,
} from '@amityco/react-native-social-ui-kit';

import config from '../uikit.config.json';

if (__DEV__) {
  require('../ReactotronConfig');
}

export default function App() {
  return (
    <AmityUiKitProvider
      configs={config} //put your config json object
      apiKey="b0ebe15b6fdef4664b3e8b1d530c438b840d8bb3ba66667d"
      apiRegion="eu"
      userId={'0aacbd28-2fe8-4ef2-a5a5-b4bb45764b0e'}
      displayName={'Zane Scotland'}
      apiEndpoint="https://api.eu.amity.co"
    >
      <AmityUiKitSocial />
    </AmityUiKitProvider>
  );
}
