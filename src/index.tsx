import React from 'react';
import AmityUiKitProvider from './providers/amity-ui-kit-provider';
import AmityUiKitSocial from './routes/SocialNavigator';
import { PostTag } from './enum/enumPostTag';
import { AmityUiKitRoutes, AmityUserMetadataKeys } from './enum';

const ExploreScreen = () => {
  return <AmityUiKitSocial screen={AmityUiKitRoutes.Explore} />;
};
const MyCommunityScreen = () => {
  return <AmityUiKitSocial screen={AmityUiKitRoutes.MyCommunity} />;
};
const NewsfeedScreen = () => {
  return <AmityUiKitSocial screen={AmityUiKitRoutes.Newsfeed} />;
};

const UserProfileScreen = () => {
  return <AmityUiKitSocial screen={AmityUiKitRoutes.UserProfile} />;
};
const PreloadCommunityHomeScreen = () => {
  return <AmityUiKitSocial screen={AmityUiKitRoutes.PreloadCommunityHome} />;
};
const MyUserProfileScreen = () => {
  return <AmityUiKitSocial screen={AmityUiKitRoutes.MyUserProfile} />;
};

export {
  // Providers
  AmityUiKitProvider,
  AmityUiKitSocial,
  //Screens
  ExploreScreen,
  MyCommunityScreen,
  NewsfeedScreen,
  UserProfileScreen,
  PreloadCommunityHomeScreen,
  MyUserProfileScreen,
  // Enums
  PostTag,
  AmityUiKitRoutes,
  AmityUserMetadataKeys,
};
