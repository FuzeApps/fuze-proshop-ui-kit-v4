import React, { FC } from 'react';
import { IAmityUIkitProvider } from './amity-ui-kit-provider';

const DEFAULT_MEMBERS_TO_SHOW_COMMUNITY_COUNTER = 1000;

export const AuthStaticContext = React.createContext<IAmityUIkitProvider>({
  userId: '',
  displayName: '',
  apiKey: '',
  apiRegion: '',
  apiEndpoint: '',
  authToken: '',
  children: null,
});

export const AuthStaticProvider: FC<IAmityUIkitProvider> = ({
  children,
  userId,
  displayName,
  apiKey,
  apiRegion,
  apiEndpoint,
  authToken,
  onCommunityJoin,
  onCommunityLeave,
  onPostComplete,
  onPostLike,
  onPostStart,
  onPostUnLike,
  onUserFollow,
  onUserUnFollow,
  onViewMyProShop,
  CommunityLeaderboard,
  userRole,
  minMembersToShowCounter = DEFAULT_MEMBERS_TO_SHOW_COMMUNITY_COUNTER,
}) => {
  return (
    <AuthStaticContext.Provider
      value={{
        userId,
        displayName,
        apiKey,
        apiRegion,
        apiEndpoint,
        authToken,
        children,
        onCommunityJoin,
        onCommunityLeave,
        onPostComplete,
        onPostLike,
        onPostStart,
        onPostUnLike,
        onUserFollow,
        onUserUnFollow,
        onViewMyProShop,
        CommunityLeaderboard,
        userRole,
        minMembersToShowCounter,
      }}
    >
      {children}
    </AuthStaticContext.Provider>
  );
};

export default AuthStaticProvider;
