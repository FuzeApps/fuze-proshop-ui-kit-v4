import {
  CommunityRepository,
  PostRepository,
  SubscriptionLevels,
  getCommunityTopic,
  subscribeTopic,
} from '@amityco/ts-sdk-react-native';
import React, {
  type MutableRefObject,
  useCallback,
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
} from 'react-native';
import CustomTabV4 from '../../components/CustomTabV4';
import useAuth from '../../hooks/useAuth';
import Feed from '../Feed';
import { useStyles } from './styles';

import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import FloatingButton from '../../components/FloatingButton';
import { IPost } from '../../components/Social/PostList';
import { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { checkCommunityPermission } from '../../providers/Social/communities-sdk';
import { amityPostsFormatter } from '../../util/postDataFormatter';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import CategoryPills from '../../components/CategoryPills';
import GalleryComponent from '../../components/Gallery/GalleryComponent';
import { amityUIKitTokens } from '../../enum';
import { PostTag } from '../../enum/enumPostTag';
import { PostTargetType } from '../../enum/postTargetType';
import { TabName } from '../../enum/tabNameState';
import { useAuthStatic } from '../../hooks/useAuthStatic';
import useFile from '../../hooks/useFile';
import uiSlice from '../../redux/slices/uiSlice';
import PrimaryDot from '../../svg/PrimaryDotIcon';
import {
  kebabMenu,
  proShopLogo,
  screenBackIcon,
  verifiedIcon,
} from '../../svg/svg-xml-list';
import metadataHandlers from '../../util/metadataHandlers';

const COMMUNITY_IMAGE_HEIGHT = 180;

export type FeedRefType = {
  handleLoadMore: () => void;
};

export default function CommunityHome({ route }: any) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const theme = useTheme() as MyMD3Theme;
  const insets = useSafeAreaInsets();
  const {
    onCommunityJoin,
    onPostStart,
    userId,
    displayName,
    CommunityLeaderboardComponent,
  } = useAuthStatic();
  // const { excludes } = useConfig();
  const styles = useStyles();
  const dispatch = useDispatch();
  const { openPostTypeChoiceModal } = uiSlice.actions;
  const { apiRegion, client } = useAuth();
  const { communityId, communityName, isBackEnabled, isModerator } =
    route.params as {
      communityId: string;
      communityName: string;
      isBackEnabled: string;
      isModerator: boolean;
    };
  const [isJoin, setIsJoin] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabName>(TabName.Timeline);
  const [communityData, setCommunityData] =
    useState<Amity.LiveObject<Amity.Community>>();
  const avatarUrl = useFile({ fileId: communityData?.data.avatarFileId });
  const feedRef: MutableRefObject<FeedRefType | null> =
    useRef<FeedRefType | null>(null);
  const scrollViewRef = useRef(null);
  const [pendingPosts, setPendingPosts] = useState<IPost[]>([]);
  const [isShowPendingArea, setIsShowPendingArea] = useState<boolean>(false);
  const [isStickyHeaderVisible, setIsStickyHeaderVisible] = useState(false);
  const [isUserHasPermission, setIsUserHasPermission] =
    useState<boolean>(false);
  const [postSetting, setPostSetting] = useState<
    ValueOf<
      Readonly<{
        ONLY_ADMIN_CAN_POST: 'ONLY_ADMIN_CAN_POST';
        ADMIN_REVIEW_POST_REQUIRED: 'ADMIN_REVIEW_POST_REQUIRED';
        ANYONE_CAN_POST: 'ANYONE_CAN_POST';
      }>
    >
  >(null);
  const disposers: Amity.Unsubscriber[] = useMemo(() => [], []);
  const isSubscribed = useRef(false);

  const topInset = insets.top + 16;
  const communityImageHeight = COMMUNITY_IMAGE_HEIGHT + topInset;

  const stickyHeaderStyle: StyleProp<any> = useMemo(() => {
    return {
      paddingTop: topInset,
      paddingBottom: amityUIKitTokens.spacing.m1,
    };
  }, [topInset]);

  const imageContainerStyles = useMemo(() => {
    return {
      height: communityImageHeight,
    };
  }, [communityImageHeight]);

  const topHeaderControlsExtraStyles = useMemo(() => {
    return {
      paddingTop: topInset,
    };
  }, [topInset]);

  const subscribePostTopic = useCallback(
    (targetType: string) => {
      if (isSubscribed.current) return;

      if (targetType === 'community') {
        disposers.push(
          subscribeTopic(
            getCommunityTopic(communityData?.data, SubscriptionLevels.POST)
          )
        );
        isSubscribed.current = true;
      }
    },
    [communityData?.data, disposers]
  );

  const getPendingPosts = useCallback(async () => {
    const unsubscribe = PostRepository.getPosts(
      {
        targetId: communityId,
        targetType: 'community',
        feedType: 'reviewing',
        limit: 30,
      },
      async ({ data: posts }) => {
        const pendingPost = await amityPostsFormatter(posts);
        setPendingPosts(pendingPost);
        subscribePostTopic('community');
      }
    );
    disposers.push(unsubscribe);
    const res = await checkCommunityPermission(
      communityId,
      client as Amity.Client,
      apiRegion
    );
    if (
      res?.permissions?.length > 0 &&
      res.permissions.includes('Post/ManagePosts')
    ) {
      setIsUserHasPermission(true);
      navigation.setParams({ isModerator: true, communityId, communityName });
    }
  }, [
    apiRegion,
    client,
    communityId,
    communityName,
    disposers,
    navigation,
    subscribePostTopic,
  ]);

  useFocusEffect(
    useCallback(() => {
      if (postSetting === 'ADMIN_REVIEW_POST_REQUIRED') {
        setIsShowPendingArea(true);
      }
    }, [postSetting])
  );

  const loadCommunity = useCallback(async () => {
    try {
      const unsubscribe = CommunityRepository.getCommunity(
        communityId,
        (community) => {
          setCommunityData(community);
          setPostSetting(community?.data?.postSetting);
          if (community.data?.postSetting === 'ADMIN_REVIEW_POST_REQUIRED') {
            setPostSetting('ADMIN_REVIEW_POST_REQUIRED');
          }
          setIsJoin(community?.data.isJoined || false); // Set isJoin to communityData?.data.isJoined value
        }
      );
      unsubscribe();
    } catch (error) {
      console.error('Failed to load communities:', error);
    }
  }, [communityId]);

  useFocusEffect(
    useCallback(() => {
      getPendingPosts();
      loadCommunity();
      return () => {
        disposers.forEach((fn) => fn());
      };
    }, [disposers, getPendingPosts, loadCommunity])
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isScrollEndReached =
      layoutMeasurement.height + contentOffset.y + 200 >= contentSize.height;

    if (!isStickyHeaderVisible && contentOffset.y >= communityImageHeight) {
      setIsStickyHeaderVisible(true);
    }

    if (isStickyHeaderVisible && contentOffset.y < communityImageHeight) {
      setIsStickyHeaderVisible(false);
    }

    if (isScrollEndReached) {
      triggerLoadMoreFunction();
    }
  };

  const handleMembersPress = useCallback(() => {
    navigation.navigate('CommunityMemberDetail', {
      communityId: communityId,
      communityName: communityName,
      isModerator: isUserHasPermission,
    });
  }, [communityId, communityName, isUserHasPermission, navigation]);

  function triggerLoadMoreFunction() {
    if (feedRef.current) {
      feedRef.current.handleLoadMore(); // Call the function inside the child component
    }
  }

  const onJoinCommunityTap = useCallback(async () => {
    const isJoined = await CommunityRepository.joinCommunity(communityId);
    if (isJoined) {
      //Event callback for joining community.
      onCommunityJoin?.({
        communityId: communityId,
        communityName: communityName,
      });

      // Add community to joined communities metadata
      await metadataHandlers.addToJoinedCommunities(
        (client as Amity.Client).userId,
        communityId
      );
      setIsJoin(isJoined);
      return isJoined;
    }
    return null;
  }, [client, communityId, communityName, onCommunityJoin]);

  const handleTab = (tabName: TabName) => {
    setCurrentTab(tabName);
  };

  const handleClickPendingArea = useCallback(() => {
    navigation.navigate('PendingPosts', {
      communityId: communityId,
      isModerator: isUserHasPermission,
    });
  }, [communityId, isUserHasPermission, navigation]);

  const handleOnPressPostBtn = () => {
    onPostStart?.({
      communityId: communityId,
      communityName: communityName,
      targetType: PostTargetType.community,
      userId: userId,
      userName: displayName,
    });

    return dispatch(
      openPostTypeChoiceModal({
        userId: (client as Amity.Client).userId as string,
        targetId: communityId,
        isPublic: communityData?.data.isPublic,
        targetName: communityName,
        targetType: PostTargetType.community,
        postSetting: postSetting,
        needApprovalOnPostCreation: (communityData?.data as Record<string, any>)
          ?.needApprovalOnPostCreation,
      })
    );
  };

  const onEditProfileTap = useCallback(() => {
    navigation.navigate('EditCommunity', {
      communityData,
    });
  }, [communityData, navigation]);

  const backNavigationUi = useMemo(() => {
    if (!isBackEnabled) {
      return (
        <RoundButton
          isTransparent={isStickyHeaderVisible}
          onPress={() => {
            navigation.dispatch(StackActions.pop(2));
          }}
        >
          <SvgXml xml={screenBackIcon()} />
        </RoundButton>
      );
    }

    return null;
  }, [isBackEnabled, isStickyHeaderVisible, navigation]);

  const communityActionsUi = useMemo(() => {
    return (
      <RoundButton
        isTransparent={isStickyHeaderVisible}
        onPress={() => {
          navigation.navigate('CommunitySetting', {
            communityId: communityId,
            communityName: communityName,
            isModerator: isModerator,
          });
        }}
      >
        <SvgXml xml={kebabMenu()} />
      </RoundButton>
    );
  }, [
    communityId,
    communityName,
    isModerator,
    isStickyHeaderVisible,
    navigation,
  ]);

  /**
   * Communinity CTAs section
   * */

  // Join Community Button
  const joinCommunityButton = useMemo(() => {
    if (isJoin) return null;

    return (
      <TouchableOpacity style={styles.button} onPress={onJoinCommunityTap}>
        <Text style={styles.joinCommunityText}>Join</Text>
      </TouchableOpacity>
    );
  }, [isJoin, onJoinCommunityTap, styles.button, styles.joinCommunityText]);

  // Edit Community Button
  const editCommunityButton = useMemo(() => {
    return isUserHasPermission ? (
      <TouchableOpacity style={styles.button} onPress={onEditProfileTap}>
        <Text style={styles.editProfileText}>Edit</Text>
      </TouchableOpacity>
    ) : null;
  }, [
    isUserHasPermission,
    onEditProfileTap,
    styles.button,
    styles.editProfileText,
  ]);

  // Pending Post Area
  const pendingPostUiBlock = useMemo(() => {
    if (isJoin && isShowPendingArea) {
      return (
        <Pressable onPress={handleClickPendingArea}>
          <View style={styles.pendingPostArea}>
            <View style={styles.pendingRow}>
              <PrimaryDot color={theme.colors.primary} />
              <Text style={styles.pendingText}>Pending posts</Text>
            </View>

            <Text style={styles.pendingDescriptionText}>
              {isUserHasPermission
                ? (pendingPosts.length > 30 && 'More than ') +
                  pendingPosts.length +
                  ' posts need approval'
                : 'Your posts are pending for review'}
            </Text>
          </View>
        </Pressable>
      );
    }

    return null;
  }, [
    handleClickPendingArea,
    isJoin,
    isShowPendingArea,
    isUserHasPermission,
    pendingPosts.length,
    styles.pendingDescriptionText,
    styles.pendingPostArea,
    styles.pendingRow,
    styles.pendingText,
    theme.colors.primary,
  ]);

  // Community Post and member counter

  const communityPostAndMemberCounter = useMemo(() => {
    if (communityData?.data.membersCount < 1000) {
      return null;
    }

    return (
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Text style={styles.rowNumber}>{communityData?.data.postsCount}</Text>
          <Text style={styles.rowLabel}>post</Text>
        </View>

        <View style={styles.rowItemContent}>
          <View style={styles.verticalLine} />
          <TouchableOpacity
            onPress={() => handleMembersPress()}
            style={[styles.rowItem, { paddingLeft: 10 }]}
          >
            <Text style={styles.rowNumber}>
              {communityData?.data.membersCount}
            </Text>
            <Text style={styles.rowLabel}>members</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [
    communityData?.data.membersCount,
    communityData?.data.postsCount,
    handleMembersPress,
    styles.row,
    styles.rowItem,
    styles.rowItemContent,
    styles.rowLabel,
    styles.rowNumber,
    styles.verticalLine,
  ]);

  /**
   * Tabs Section
   * */

  const renderTabs = useCallback(() => {
    switch (currentTab) {
      case TabName.Timeline:
        return (
          <Feed
            targetType="community"
            targetId={communityId}
            ref={feedRef}
            tags={[PostTag.Feed]}
          />
        );
      case TabName.Activities:
        return (
          <Feed
            targetType="community"
            targetId={communityId}
            ref={feedRef}
            tags={[PostTag.Activity]}
          />
        );
      case TabName.Leaderboard:
        // Return null if the leaderboard is not there
        if (CommunityLeaderboardComponent) {
          return <CommunityLeaderboardComponent communityId={communityId} />;
        }
        return null;

      case TabName.Gallery:
        return (
          <GalleryComponent
            targetId={communityId}
            ref={feedRef}
            targetType="community"
          />
        );
      default:
        return null;
    }
  }, [CommunityLeaderboardComponent, communityId, currentTab]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        stickyHeaderIndices={[1]}
      >
        {/* Community Avatar */}
        <View style={[styles.imageContainer, imageContainerStyles]}>
          {/* Avatar images */}
          {avatarUrl ? (
            <Image
              style={styles.image}
              source={{
                uri: avatarUrl,
              }}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <SvgXml xml={proShopLogo()} />
            </View>
          )}
          <View
            style={[styles.topHeaderControls, topHeaderControlsExtraStyles]}
          >
            {backNavigationUi}
            {communityActionsUi}
          </View>
        </View>
        {/* CategoryPills Section */}
        {/* Community Name Section */}
        <View
          style={[
            styles.communityNameSection,
            isStickyHeaderVisible ? stickyHeaderStyle : null,
          ]}
        >
          {/* Name */}
          <View style={styles.communityNameWrapper}>
            <View style={styles.communityNameWrapperLeft}>
              {/* Back button */}
              {isStickyHeaderVisible ? backNavigationUi : null}
              {/* Spacer */}
              {isStickyHeaderVisible ? <View style={styles.spacer} /> : null}
              {/* Community Name */}
              <Text
                style={[
                  styles.communityName,
                  isStickyHeaderVisible && styles.shortCommunityName,
                ]}
                numberOfLines={isStickyHeaderVisible ? 1 : 3}
              >
                {communityData?.data.displayName}
                {`${communityData?.data.isOfficial && !isStickyHeaderVisible ? ' ' : ''}`}

                {communityData?.data.isOfficial && !isStickyHeaderVisible && (
                  <SvgXml
                    style={{ marginTop: -6 }}
                    width={24}
                    height={24}
                    xml={verifiedIcon()}
                  />
                )}
              </Text>
              {/* Verified icon: shown if sticky header is visible. */}
              {communityData?.data.isOfficial && isStickyHeaderVisible && (
                <View style={styles.verifiedIconWrapper}>
                  <SvgXml width={24} height={24} xml={verifiedIcon()} />
                </View>
              )}
            </View>

            {/* Community actions */}
            {isStickyHeaderVisible ? communityActionsUi : null}
          </View>
        </View>

        {/* CategoryPills Section */}
        <View style={styles.sectionWrapper}>
          <CategoryPills categoryIds={communityData?.data?.categoryIds} />
        </View>

        {/* Description Block Section */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.description}>
            {communityData?.data.description}
          </Text>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaWrapper}>
          {/* Edit Group CTA */}
          {editCommunityButton}

          {/* Join Community CTA */}
          {joinCommunityButton}

          {/* Pending Post area */}
          {pendingPostUiBlock}
        </View>

        {communityPostAndMemberCounter}

        {/* Tabs Section: Timeline, Activity, Leaderboard, Gallery */}
        <CustomTabV4
          tabName={[
            TabName.Timeline,
            TabName.Activities,
            CommunityLeaderboardComponent ? TabName.Leaderboard : null,
            TabName.Gallery,
          ].filter(Boolean)}
          onTabChange={handleTab}
        />
        {/* The tabs with complex ui */}
        <View style={styles.tabBackground}>{renderTabs()}</View>
      </ScrollView>
      {isJoin && (
        <FloatingButton onPress={handleOnPressPostBtn} isGlobalFeed={false} />
      )}
    </View>
  );
}

const RoundButton = ({ onPress, children, isTransparent }) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isTransparent ? styles.transparentButton : styles.semiTransparentButton
      }
    >
      {children}
    </TouchableOpacity>
  );
};
