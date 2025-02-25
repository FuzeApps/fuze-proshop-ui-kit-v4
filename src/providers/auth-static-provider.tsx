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
  minMembersToShowCounter = DEFAULT_MEMBERS_TO_SHOW_COMMUNITY_COUNTER,
  ...rest
}) => {
  return (
    <AuthStaticContext.Provider
      value={{
        minMembersToShowCounter,
        children,
        ...rest,
      }}
    >
      {children}
    </AuthStaticContext.Provider>
  );
};

export default AuthStaticProvider;
