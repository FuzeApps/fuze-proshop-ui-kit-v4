import * as React from 'react';
import {
  AmityUiKitProvider,
  AmityUiKitSocial,
} from '@amityco/asc-react-native-ui-kit';

export default function App() {
  return (
    <AmityUiKitProvider
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
