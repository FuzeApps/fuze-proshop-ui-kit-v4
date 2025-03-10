import { UserRepository, createReport } from '@amityco/ts-sdk-react-native';
import { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import CloseButton from '../../components/BackButton';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { useAuthStatic } from '../../hooks/useAuthStatic';
import { RootStackParamList } from '../../routes/RouteParamList';
import ArrowOutlinedIcon from '../../svg/ArrowOutlinedIcon';
import EditIcon from '../../svg/EditIcon';
import {
  blockUserIcon,
  flagIcon,
  unBlockUserIcon,
  unFollowIcon,
} from '../../svg/svg-xml-list';
import { useStyles } from './styles';
export default function UserProfileSetting({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'UserProfileSetting'>;
}) {
  const { user, follow } = route.params;
  const { userId, displayName } = user;
  const { onUserUnFollow } = useAuthStatic();
  const styles = useStyles();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [followStatus, setFollowStatus] = useState(follow);
  const isMyProfile = !followStatus;
  const isBlocked = followStatus === 'blocked';
  const isFollowed = followStatus === 'accepted';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton />,
      title: displayName,
      headerTitleAlign: 'center',
    });
  }, [displayName, navigation]);

  const handleReportUserPress = useCallback(async () => {
    setShowLoadingIndicator(true);
    await createReport('user', userId);
    setShowLoadingIndicator(false);
  }, [userId]);

  const handleUnfollowPress = useCallback(async () => {
    setShowLoadingIndicator(true);
    await UserRepository.Relationship.unfollow(userId);
    onUserUnFollow?.({
      userId: user?.userId,
      userName: user?.displayName,
    });
    setShowLoadingIndicator(false);
    setFollowStatus('none');
  }, [onUserUnFollow, user?.displayName, user?.userId, userId]);

  const handleBlockUser = useCallback(async () => {
    setShowLoadingIndicator(true);
    await UserRepository.Relationship.blockUser(userId);
    setShowLoadingIndicator(false);
    setFollowStatus('blocked');
  }, [userId]);

  const handleUnblockUser = useCallback(async () => {
    setShowLoadingIndicator(true);
    await UserRepository.Relationship.unBlockUser(userId);
    setShowLoadingIndicator(false);
    setFollowStatus('none');
  }, [userId]);

  const onProfileEditPress = useCallback(() => {
    navigation.navigate('EditProfile', { user });
  }, [navigation, user]);

  const settingData = useMemo(() => {
    const userSettingData = [];
    if (!isMyProfile) {
      userSettingData.push({
        data: [
          {
            type: 'manage',
            leftIcon: <SvgXml xml={flagIcon()} />,
            label: 'Report user',
            callBack: handleReportUserPress,
          },
          {
            type: 'manage',
            leftIcon: (
              <SvgXml xml={isBlocked ? unBlockUserIcon() : blockUserIcon()} />
            ),
            label: isBlocked ? 'Unblock user' : 'Block user',
            callBack: isBlocked ? handleUnblockUser : handleBlockUser,
          },
        ],
      });
      if (isFollowed) {
        userSettingData.map((setting) => {
          setting.data.unshift({
            type: 'manage',
            leftIcon: <SvgXml xml={unFollowIcon()} />,
            label: 'Unfollow',
            callBack: handleUnfollowPress,
          });
          return setting;
        });
      }

      return userSettingData;
    }

    //means it is my profile.
    userSettingData.push({
      data: [
        {
          label: 'Edit Profile',
          leftIcon: <EditIcon />,
          rightIcon: <ArrowOutlinedIcon />,
          callBack: onProfileEditPress,
        },
      ],
    });
    return userSettingData;
  }, [
    handleBlockUser,
    handleReportUserPress,
    handleUnblockUser,
    handleUnfollowPress,
    isBlocked,
    isFollowed,
    isMyProfile,
    onProfileEditPress,
  ]);

  const renderSectionItem = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          key={item.label}
          style={styles.rowContainer}
          onPress={item.callBack}
        >
          <View style={styles.iconContainer}>{item.leftIcon}</View>
          <Text style={styles.rowText}>{item.label}</Text>
          {item.rightIcon && item.rightIcon}
        </TouchableOpacity>
      );
    },
    [styles]
  );

  return (
    <View style={styles.container}>
      <LoadingOverlay isLoading={showLoadingIndicator} loadingText={null} />
      <SectionList
        sections={settingData}
        renderItem={renderSectionItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}
