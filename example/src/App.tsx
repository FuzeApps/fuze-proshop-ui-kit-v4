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
      userId={'6ce2ecb8-6ade-4f0e-9672-14788526e65a'}
      displayName={'Johneric'}
      apiEndpoint="https://api.eu.amity.co"
    >
      <AmityUiKitSocial />
    </AmityUiKitProvider>
  );
}
