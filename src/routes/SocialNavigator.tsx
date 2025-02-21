/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import type { RootStackParamList } from './RouteParamList';
import useAuth from '../hooks/useAuth';
import Explore from '../screens/Explore';
import CategoryList from '../screens/CategorytList';
import CommunityList from '../screens/CommunityList';
import CommunityHome from '../screens/CommunityHome/index';
import { CommunitySetting } from '../screens/CommunitySetting/index';
import CommunityMemberDetail from '../screens/CommunityMemberDetail/CommunityMemberDetail';
import Home from '../screens/Home';

import CreatePost from '../screens/CreatePost';
import UserProfile from '../screens/UserProfile/UserProfile';
import { EditProfile } from '../screens/EditProfile/EditProfile';
import UserProfileSetting from '../screens/UserProfileSetting/UserProfileSetting';
import CommunitySearch from '../screens/CommunitySearch';

import CreateCommunity from '../screens/CreateCommunity';
import PendingPosts from '../screens/PendingPosts';
import type { MyMD3Theme } from '../providers/amity-ui-kit-provider';
import { useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { useStyles } from '../routes/style';
import BackButton from '../components/BackButton';
import CloseButton from '../components/CloseButton';
import EditCommunity from '../screens/EditCommunity/EditCommunity';
import PostTypeChoiceModal from '../components/PostTypeChoiceModal/PostTypeChoiceModal';
import CreatePoll from '../screens/CreatePoll/CreatePoll';
import { ThreeDotsIcon } from '../svg/ThreeDotsIcon';
import AmitySocialGlobalSearchPage from '../screens/AmitySocialGlobalSearchPage/AmitySocialGlobalSearchPage';
import AmityMyCommunitiesComponent from '../components/AmityMyCommunitiesComponent/AmityMyCommunitiesComponent';
import AmityNewsFeedComponent from '../components/AmityNewsFeedComponent/AmityNewsFeedComponent';

import PreloadCommunityHome from '../screens/PreloadCommunityHome';
import MyUserprofile from '../screens/MyUserProfile';
import PostDetail from '../screens/PostDetail';
import EditPost from '../screens/EditPost/EditPost';
import Toast from '../components/Toast/Toast';

import FollowerList from '../screens/FollowerList/FollowerList';
import UserPendingRequest from '../screens/UserPendingRequest/UserPendingRequest';

import { AmityUiKitRoutes } from '../enum';

interface INavigator {
  screen?: string;
}

export default function SocialNavigator({ screen = 'Home' }: INavigator) {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isConnected, client } = useAuth();

  const theme = useTheme() as MyMD3Theme;

  const styles = useStyles();
  return (
    <NavigationContainer independent={true}>
      {isConnected && (
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTitleStyle: {
              color: theme.colors.base,
            },
          }}
          initialRouteName={screen as keyof RootStackParamList}
        >
          <Stack.Screen
            name={AmityUiKitRoutes.Home}
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={AmityUiKitRoutes.Community} component={Home} />
          <Stack.Screen
            name={AmityUiKitRoutes.Explore}
            component={Explore}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.PreloadCommunityHome}
            component={PreloadCommunityHome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.PostDetail}
            component={PostDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.CategoryList}
            component={CategoryList}
            options={({}) => ({
              title: 'Category',
            })}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.CommunityHome}
            component={CommunityHome}
            options={({
              navigation,
              route: {
                params: {
                  communityName,
                  communityId,
                  isModerator,
                  isBackEnabled = true,
                },
              },
            }: any) => ({
              headerShown: false,
              headerLeft: () => isBackEnabled && <BackButton backTwice />,
              title: communityName,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    // Handle button press here
                    navigation.navigate('CommunitySetting', {
                      communityId: communityId,
                      communityName: communityName,
                      isModerator: isModerator,
                    });
                  }}
                >
                  <ThreeDotsIcon style={styles.dotIcon} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.PendingPosts}
            component={PendingPosts}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.CommunitySearch}
            component={CommunitySearch}
            options={{
              headerShown: false, // Remove the back button
            }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.CommunityMemberDetail}
            component={CommunityMemberDetail}
            options={{
              headerLeft: () => <BackButton />,
              headerTitleAlign: 'center',
              title: 'Member',
            }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.CommunitySetting}
            component={CommunitySetting}
            options={({
              route: {
                params: { communityName },
              },
            }: any) => ({
              title: communityName,
              headerTitleAlign: 'center',
              headerLeft: () => <BackButton />,
            })}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.CreateCommunity}
            component={CreateCommunity}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.CommunityList}
            component={CommunityList}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.AmitySocialGlobalSearchPage}
            component={AmitySocialGlobalSearchPage}
            options={{
              headerShown: false, // Remove the back button
            }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.MyCommunity}
            options={{ headerShown: false }}
            component={AmityMyCommunitiesComponent}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.CreatePost}
            component={CreatePost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.CreatePoll}
            component={CreatePoll}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.UserProfile}
            component={UserProfile}
            options={({
              route: {
                params: { isBackEnabled = true },
              },
            }: any) => ({
              headerLeft: () => isBackEnabled && <BackButton />,
              title: '',
            })}
            initialParams={{ userId: (client as Amity.Client).userId }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.MyUserProfile}
            component={MyUserprofile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.Newsfeed}
            component={AmityNewsFeedComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.EditProfile}
            component={EditProfile}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.EditCommunity}
            component={EditCommunity}
            options={({
              navigation,
            }: {
              navigation: NativeStackNavigationProp<any>;
            }) => ({
              headerLeft: () => <CloseButton navigation={navigation} />,
              title: 'Edit Profile',
              headerTitleAlign: 'center',
            })}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.UserProfileSetting}
            component={UserProfileSetting}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.EditPost}
            component={EditPost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.FollowerList}
            component={FollowerList}
            options={({
              route: {
                params: { displayName },
              },
            }: any) => ({
              title: displayName,
              headerLeft: () => <BackButton />,
            })}
          />
          <Stack.Screen
            name={AmityUiKitRoutes.UserPendingRequest}
            component={UserPendingRequest}
            options={{
              title: 'Follow Requests',
              headerLeft: () => <BackButton />,
            }}
          />
        </Stack.Navigator>
      )}
      <PostTypeChoiceModal />
      <Toast />
    </NavigationContainer>
  );
}
