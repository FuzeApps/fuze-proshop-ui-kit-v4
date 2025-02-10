import React, { FC } from 'react';
import { IAmityUIkitProvider } from './amity-ui-kit-provider';

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
      }}
    >
      {children}
    </AuthStaticContext.Provider>
  );
};

export default AuthStaticProvider;
