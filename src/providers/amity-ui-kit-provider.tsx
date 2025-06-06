import * as React from 'react';
import { DefaultTheme, PaperProvider, type MD3Theme } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import fallBackConfig from '../../uikit.config.json';
import { amityUIKitTokens, UserRole } from '../enum';
import useValidateConfig from '../hooks/useValidateConfig';
import { BehaviourProvider } from '../providers/BehaviourProvider';
import { store } from '../redux/store';
import { IBehaviour } from '../types/behaviour.interface';
import { IConfigRaw } from '../types/config.interface';
import AuthContextProvider from './auth-provider';
import AuthStaticProvider from './auth-static-provider';
import { ConfigProvider } from './config-provider';

export type CusTomTheme = typeof DefaultTheme;
export interface IAmityUIkitProvider {
  userId: string;
  displayName?: string;
  apiKey: string;
  apiRegion?: string;
  apiEndpoint?: string;
  children: any;
  authToken?: string;
  configs?: IConfigRaw;
  behaviour?: IBehaviour;
  //Extra properties
  userRole?: UserRole;
  minMembersToShowCounter?: number;
  //Callbacks. This is on Top of Social+
  onUserFollow?: (data: { userId?: string; userName?: string }) => void;
  onUserUnFollow?: (data: { userId?: string; userName?: string }) => void;
  onViewMyProShop?: (data: { userId?: string; userName?: string }) => void;
  onCommunityJoin?: (data: {
    communityName?: string;
    communityId?: string;
  }) => void;
  onCommunityLeave?: (data: {
    communityName?: string;
    communityId?: string;
    userId?: string;
  }) => void;
  onCommunityCreate?: (data: {
    communityName?: string;
    communityId?: string;
    userId?: string;
  }) => void;
  onCommunityDelete?: (data: {
    communityName?: string;
    communityId?: string;
    userId?: string;
  }) => void;
  onPostLike?: (data: { text?: string; postId?: string }) => void;
  onPostUnLike?: (data: { text?: string; postId?: string }) => void;
  onPostStart?: (data: {
    text?: string;
    postId?: string;
    userId?: string;
    userName?: string;
    communityId?: string;
    communityName?: string;
    targetType?: string;
  }) => void;
  onPostComplete?: (data: {
    text?: string;
    postId?: string;
    userId?: string;
    userName?: string;
    communityId?: string;
    communityName?: string;
    targetType?: string;
  }) => void;
  //Extra Components
  CommunityLeaderboardComponent?: (props: {
    communityId: string;
  }) => JSX.Element;
}

export interface CustomColors {
  primary?: string;
  primaryShade1?: string;
  primaryShade2?: string;
  primaryShade3?: string;
  primaryShade4?: string;
  secondary?: string;
  secondaryShade1?: string;
  secondaryShade2?: string;
  secondaryShade3?: string;
  secondaryShade4?: string;
  base?: string;
  baseShade1?: string;
  baseShade2?: string;
  baseShade3?: string;
  baseShade4?: string;

  background?: string;
  backgroundShade1?: string;

  alert?: string;
  border?: string;
  screenBackground?: string;
  baseDivider?: string;
}
export interface MyMD3Theme extends MD3Theme {
  colors: MD3Theme['colors'] & CustomColors;
}
export default function AmityUiKitProvider({
  userId,
  displayName,
  apiKey,
  apiRegion,
  apiEndpoint,
  children,
  authToken,
  configs,
  behaviour,
  CommunityLeaderboardComponent,
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
  userRole,
  minMembersToShowCounter,
}: IAmityUIkitProvider) {
  const isValidConfig = useValidateConfig(configs);
  const configData = isValidConfig ? configs : (fallBackConfig as IConfigRaw);

  const globalTheme: MyMD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...amityUIKitTokens.colors,
    },
  };

  return (
    <Provider store={store}>
      <MenuProvider>
        <AuthContextProvider
          userId={userId}
          displayName={displayName || userId}
          apiKey={apiKey}
          apiRegion={apiRegion}
          apiEndpoint={apiEndpoint}
          authToken={authToken}
        >
          {/* This is for proshop purpose */}
          <AuthStaticProvider
            userId={userId}
            displayName={displayName || userId}
            apiKey={apiKey}
            apiRegion={apiRegion}
            apiEndpoint={apiEndpoint}
            authToken={authToken}
            CommunityLeaderboardComponent={CommunityLeaderboardComponent}
            onCommunityJoin={onCommunityJoin}
            onCommunityLeave={onCommunityLeave}
            onPostComplete={onPostComplete}
            onPostLike={onPostLike}
            onPostStart={onPostStart}
            onPostUnLike={onPostUnLike}
            onUserFollow={onUserFollow}
            onUserUnFollow={onUserUnFollow}
            onViewMyProShop={onViewMyProShop}
            userRole={userRole}
            minMembersToShowCounter={minMembersToShowCounter}
            onCommunityCreate={onCommunityCreate}
            onCommunityDelete={onCommunityDelete}
          >
            <ConfigProvider configs={configData}>
              <BehaviourProvider behaviour={behaviour}>
                <PaperProvider theme={globalTheme}>{children}</PaperProvider>
              </BehaviourProvider>
            </ConfigProvider>
          </AuthStaticProvider>
        </AuthContextProvider>
      </MenuProvider>
    </Provider>
  );
}
