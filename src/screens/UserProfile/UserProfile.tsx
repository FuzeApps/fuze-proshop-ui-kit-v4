import {
  getMyFollowersTopic,
  getMyFollowingsTopic,
  subscribeTopic,
  UserRepository,
} from '@amityco/ts-sdk-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {
  type MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Image,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import CustomTabV4 from '../../components/CustomTabV4';
import FloatingButton from '../../components/FloatingButton';
import useAuth from '../../hooks/useAuth';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import {
  cancelFollowRequest,
  followIcon,
  primaryDot,
  privateUserProfile,
  proshopSmallIcon,
  threeDots,
  unFollowIcon,
  userIcon,
} from '../../svg/svg-xml-list';
import type { FeedRefType } from '../CommunityHome';
import Feed from '../Feed';
import { useStyles } from './styles';

import { useDispatch } from 'react-redux';
import { PostTargetType } from '../../enum/postTargetType';
import uiSlice from '../../redux/slices/uiSlice';

import GalleryComponent from '../../components/Gallery/GalleryComponent';
import { amityUIKitTokens, ImageSizeState, TabName } from '../../enum';
import { PostTag } from '../../enum/enumPostTag';
import { useAuthStatic } from '../../hooks/useAuthStatic';
import { useFileV4 } from '../../hooks/useFilev4';

const defaultAvatar = require('../../assets/icon/Placeholder.png');

export default function UserProfile({ route }: any) {
  const theme = useTheme() as MyMD3Theme;
  const {
    onViewMyProShop,
    onUserFollow,
    onPostStart,
    userId: currentSessionUserId,
  } = useAuthStatic();
  const styles = useStyles();
  const { client } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { userId } = route.params;
  const { openPostTypeChoiceModal } = uiSlice.actions;
  const dispatch = useDispatch();
  const { onUserUnFollow } = useAuthStatic();
  const [user, setUser] = useState<Amity.User>();
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followStatus, setFollowStatus] =
    useState<Amity.FollowInfo['status']>(null);
  const [currentTab, setCurrentTab] = useState<TabName>(TabName.Timeline);
  const [socialSettings, setSocialSettings] =
    useState<Amity.SocialSettings>(null);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const { getImage } = useFileV4();
  const [avatar, setAvatar] = useState<string>(null);
  const isMyProfile = !followStatus;
  const isBlocked = followStatus === 'blocked';
  const isUnfollowed = followStatus === 'none';
  const isPending = followStatus === 'pending';
  const isAccepted = followStatus === 'accepted';
  const shouldShowPrivateProfile =
    !isMyProfile &&
    !isAccepted &&
    socialSettings?.userPrivacySetting === 'private';
  const shouldShowPending = isMyProfile && pendingCount > 0;
  const feedRef: MutableRefObject<FeedRefType | null> =
    useRef<FeedRefType | null>(null);
  const galleryRef: MutableRefObject<FeedRefType | null> =
    useRef<FeedRefType | null>(null);
  const scrollViewRef = useRef(null);

  const onFollowTap = useCallback(async () => {
    const { data: followStatus } =
      await UserRepository.Relationship.follow(userId);

    if (followStatus) {
      onUserFollow?.({
        userId: userId,
        userName: user?.displayName,
      });
      setFollowStatus(followStatus.status);
    }
  }, [onUserFollow, user?.displayName, userId]);

  const onUnblockUser = useCallback(async () => {
    await UserRepository.Relationship.unBlockUser(userId);
    setFollowStatus('none');
  }, [userId]);

  useLayoutEffect(() => {
    if (currentSessionUserId !== userId) {
      navigation.setOptions({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserProfileSetting', {
                user,
                follow: followStatus,
              });
            }}
          >
            <SvgXml xml={threeDots()} />
          </TouchableOpacity>
        ),
      });
    }
  }, [
    currentSessionUserId,
    followStatus,
    navigation,
    styles.dotIcon,
    user,
    userId,
  ]);

  useEffect(() => {
    (async () => {
      if (client) {
        const settings = await (client as Amity.Client)?.getSocialSettings();
        setSocialSettings(settings);
      }
    })();
  }, [client]);

  useEffect(() => {
    if (!user?.avatarFileId) {
      return setAvatar(null);
    }

    //IIFE
    (async () => {
      const avatarUrl = await getImage({
        fileId: user.avatarFileId,
        imageSize: ImageSizeState.small,
      });
      setAvatar(avatarUrl);
    })();
  }, [getImage, user?.avatarFileId]);

  useEffect(() => {
    let userUnsubscribe: () => void;
    let userRsUnsubscribe: () => void;
    const unsubFollowing = subscribeTopic(getMyFollowingsTopic());
    const unsubFollower = subscribeTopic(getMyFollowersTopic());
    const unsubscribe = navigation.addListener('focus', () => {
      userRsUnsubscribe = UserRepository.Relationship.getFollowInfo(
        userId,
        (value) => {
          if (value && !value.loading) {
            setPendingCount(value.data.pendingCount);
            setFollowStatus(value.data.status);
            setFollowerCount(value.data.followerCount);
            setFollowingCount(value.data.followingCount);
          } else {
          }
        }
      );

      userUnsubscribe = UserRepository.getUser(userId, ({ data, loading }) => {
        if (!loading) {
          setUser(data);
        } else {
        }
      });
    });

    return () => {
      unsubscribe();
      userUnsubscribe && userUnsubscribe();
      userRsUnsubscribe && userRsUnsubscribe();
      unsubFollowing();
      unsubFollower();
    };
  }, [navigation, userId]);

  const followButton = useMemo(() => {
    return (
      <TouchableOpacity style={styles.button} onPress={onFollowTap}>
        <SvgXml xml={followIcon()} />
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
    );
  }, [onFollowTap, styles.button, styles.followText]);

  const unBlockButton = useMemo(() => {
    return (
      <TouchableOpacity style={styles.button} onPress={onUnblockUser}>
        <SvgXml xml={unFollowIcon()} />
        <Text style={styles.editProfileText}>Unblock user</Text>
      </TouchableOpacity>
    );
  }, [onUnblockUser, styles.button, styles.editProfileText]);

  const cancelRequestButton = useMemo(() => {
    const onCancelRequest = async () => {
      await UserRepository.Relationship.unfollow(userId);
      onUserUnFollow?.({
        userId: user?.userId,
        userName: user?.displayName,
      });
      setFollowStatus('none');
    };
    return (
      <TouchableOpacity style={styles.button} onPress={onCancelRequest}>
        <SvgXml
          width={24}
          height={20}
          xml={cancelFollowRequest(theme.colors.base)}
        />
        <Text style={styles.editProfileText}>Cancel request</Text>
      </TouchableOpacity>
    );
  }, [
    onUserUnFollow,
    styles.button,
    styles.editProfileText,
    theme.colors.base,
    user?.displayName,
    user?.userId,
    userId,
  ]);

  const pendingCountButton = () => {
    const onPressPending = () => {
      navigation.navigate('UserPendingRequest');
    };

    return (
      <TouchableOpacity
        style={styles.pendingRequestContainer}
        onPress={onPressPending}
      >
        <View style={styles.rowContainer}>
          <SvgXml xml={primaryDot(theme.colors.primary)} />
          <Text style={styles.pendingRequestText}>Pending requests</Text>
        </View>

        <Text style={styles.pendingRequestSubText}>
          Your requests are waiting for review
        </Text>
      </TouchableOpacity>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isScrollEndReached =
      layoutMeasurement.height + contentOffset.y + 200 >= contentSize.height;

    if (isScrollEndReached) {
      triggerLoadMoreFunction();
    }
  };

  function triggerLoadMoreFunction() {
    if (feedRef.current) {
      feedRef.current.handleLoadMore(); // Call the function inside the child component
    }
    if (galleryRef.current) {
      galleryRef.current.handleLoadMore();
    }
  }

  const handleOnPressPostBtn = () => {
    onPostStart?.({
      userId: userId,
      userName: user?.displayName,
      communityName: 'My Timeline',
    });

    dispatch(
      openPostTypeChoiceModal({
        userId: userId,
        targetId: userId,
        targetName: 'My Timeline',
        targetType: PostTargetType.user,
      })
    );
  };

  const renderPrivateProfile = () => {
    return (
      <View style={styles.privateProfileContainer}>
        <SvgXml width={40} height={40} xml={privateUserProfile()} />
        <Text style={styles.privateAccountTitle}>This account is private</Text>
        <Text style={styles.privateAccountSubTitle}>
          Follow this user to see all posts
        </Text>
      </View>
    );
  };

  const renderTabs = () => {
    if (shouldShowPrivateProfile) return renderPrivateProfile();
    if (currentTab === TabName.Timeline)
      return (
        <Feed
          targetType="user"
          targetId={userId}
          ref={feedRef}
          tags={[PostTag.Feed]}
        />
      );
    if (currentTab === TabName.Activities)
      return (
        <Feed
          targetType="user"
          targetId={userId}
          ref={feedRef}
          tags={[PostTag.Activity]}
        />
      );
    if (currentTab === TabName.Gallery)
      return (
        <GalleryComponent
          targetId={userId}
          ref={galleryRef}
          targetType="user"
        />
      );
    return null;
  };

  // View My Proshop Button
  const viewMyProshopButton = useMemo(() => {
    if (typeof onViewMyProShop !== 'function') {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.buttonGhost}
        onPress={() =>
          onViewMyProShop?.({
            userId: userId,
            userName: user?.displayName,
          })
        }
      >
        <SvgXml
          width={40}
          height={40}
          xml={proshopSmallIcon(amityUIKitTokens.colors.base)}
        />
        <Text style={styles.editProfileText}>View My ProShop</Text>
      </TouchableOpacity>
    );
  }, [
    onViewMyProShop,
    styles.buttonGhost,
    styles.editProfileText,
    user?.displayName,
    userId,
  ]);

  const onPressFollowers = useCallback(() => {
    if (isMyProfile || isAccepted) navigation.navigate('FollowerList', user);
  }, [isAccepted, isMyProfile, navigation, user]);

  const renderButtons = useMemo(() => {
    if (isUnfollowed) return followButton;
    if (isPending) return cancelRequestButton;
    if (isBlocked) return unBlockButton;
    return null;
  }, [
    cancelRequestButton,
    followButton,
    isBlocked,
    isPending,
    isUnfollowed,
    unBlockButton,
  ]);

  const ctaSection = useMemo(() => {
    const buttons = [renderButtons, viewMyProshopButton].filter(Boolean);

    const wrapperStyle: StyleProp<ViewStyle> = {
      paddingHorizontal: amityUIKitTokens.spacing.s1,
      paddingTop: amityUIKitTokens.spacing.m1,
      flexDirection: 'row',
    };

    const buttonWrapperStyle: StyleProp<ViewStyle> = {
      flex: 1,
      paddingHorizontal: amityUIKitTokens.spacing.s1,
    };

    if (!buttons?.length) {
      return null;
    }

    return (
      <View style={wrapperStyle}>
        {buttons?.map((item, index) => {
          return (
            <View key={index} style={buttonWrapperStyle}>
              {item}
            </View>
          );
        })}
      </View>
    );
  }, [renderButtons, viewMyProshopButton]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={20}
      >
        <View style={styles.profileContainer}>
          <View style={styles.userDetail}>
            <View style={styles.avatarWrapper}>
              {avatar ? (
                <Image
                  style={styles.avatar}
                  source={{ uri: avatar ? avatar : defaultAvatar?.uri }}
                />
              ) : (
                <SvgXml xml={userIcon()} width={60} height={60} />
              )}
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.title}>{user?.displayName}</Text>
              <Pressable
                style={styles.horizontalText}
                onPress={onPressFollowers}
              >
                <Text style={styles.textComponent}>
                  {followingCount + ' Following '}
                </Text>
                <Text style={styles.textComponent}>
                  {followerCount +
                    ` ${followerCount > 1 ? 'Followers' : 'Follower'}`}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            {user?.description ? (
              <Text style={styles.descriptionText}> {user?.description}</Text>
            ) : (
              <View />
            )}
          </View>

          {shouldShowPending && pendingCountButton()}
        </View>

        {/* CTA Section */}
        {ctaSection}

        {!isBlocked && (
          <>
            <CustomTabV4
              tabName={
                [
                  TabName.Timeline,
                  TabName.Activities,
                  TabName.Gallery,
                ] as TabName[]
              }
              onTabChange={setCurrentTab}
            />

            {renderTabs()}
          </>
        )}
      </ScrollView>

      {(client as Amity.Client).userId === userId && (
        <FloatingButton onPress={handleOnPressPostBtn} isGlobalFeed={false} />
      )}
    </View>
  );
}
