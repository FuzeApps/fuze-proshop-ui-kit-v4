import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  amityUIKitTokens,
  AmityUserMetadataKeys,
  ComponentID,
  ElementID,
  PageID,
  TabName,
  UserRole,
} from '../../enum';
import { useUiKitConfig } from '../../hooks/useUiKitConfig';
import { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { RootStackParamList } from '../../routes/RouteParamList';
import PlusIconV4 from '../../svg/PlusIconV4';
import SearchIconV4 from '../../svg/SearchIconV4';

import { UserRepository } from '@amityco/ts-sdk-react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { SvgXml } from 'react-native-svg';
import { useAuthStatic } from '../../hooks/useAuthStatic';
import { communityIcon2, pollIcon2, postIcon2 } from '../../svg/svg-xml-list';
import CreatePostChooseTargetModal from '../CreatePostChooseTargetModal/CreatePostChooseTargetModal';

const AmitySocialHomeTopNavigationComponent = ({
  currentTab,
}: {
  currentTab: string;
}) => {
  const theme = useTheme() as MyMD3Theme;
  const [headerTitle] = useUiKitConfig({
    keys: ['text'],
    page: PageID.social_home_page,
    component: ComponentID.top_navigation,
    element: ElementID.header_label,
  }) as string[];
  const [openPostCreationMenu, setOpenPostCreationMenu] =
    useState<boolean>(false);
  const [postType, setPostType] = useState<string>();
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
  const { userRole, userId } = useAuthStatic();
  const onChooseType = (type: string) => {
    setOpenPostCreationMenu(false);
    setPostType(type);
    setCreatePostModalVisible(true);
  };
  const isFocused = useIsFocused();
  const navigation =
    useNavigation() as NativeStackNavigationProp<RootStackParamList>;
  const route = useRoute<RouteProp<RootStackParamList>>();
  const { params } = route;

  const closeCreatePostModal = useCallback(() => {
    setCreatePostModalVisible(false);
  }, []);

  const onPressSearch = useCallback(() => {
    navigation.navigate('AmitySocialGlobalSearchPage');
  }, [navigation]);

  const onPressCreateCommunity = useCallback(() => {
    setOpenPostCreationMenu(false);
    setCreatePostModalVisible(false);
    navigation.navigate('CreateCommunity');
  }, [navigation]);

  const onPressCreate = useCallback(() => {
    setOpenPostCreationMenu(true);
  }, []);

  // Dropdown options.
  const options = useMemo((): OptionItem[] => {
    return [
      {
        onPress: () => onChooseType('post'),
        title: 'Post',
        icon: <SvgXml xml={postIcon2()} />,
      },
      {
        onPress: () => onChooseType('poll'),
        title: 'Poll',
        icon: <SvgXml xml={pollIcon2()} />,
      },

      userRole === UserRole.PRO &&
      // @ts-ignore
      !params?.user?.metadata?.[AmityUserMetadataKeys.CreatedCommunityId]
        ? {
            onPress: onPressCreateCommunity,
            title: 'Group',
            icon: <SvgXml xml={communityIcon2()} />,
          }
        : null,
    ].filter(Boolean);
    // @ts-ignore
  }, [onPressCreateCommunity, params?.user?.metadata, userRole]);

  const getUser = useCallback(() => {
    if (!userId) {
      return;
    }
    const unsubscribe = UserRepository.getUser(userId, (data) => {
      if (data?.data && !data?.loading && !data?.error) {
        navigation.setParams({ user: data.data });
      }
    });
    unsubscribe();
  }, [navigation, userId]);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        getUser();
      }, 1000);
    }
  }, [getUser, isFocused]);

  return (
    <View
      style={styles.headerContainer}
      testID="top_navigation"
      accessibilityLabel="top_navigation"
    >
      <Text
        style={styles.title}
        testID="top_navigation/header_label"
        accessibilityLabel="top_navigation/header_label"
      >
        {headerTitle}
      </Text>
      <View style={styles.flexContainer}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={onPressSearch}
          testID="top_navigation/global_search_button"
          accessibilityLabel="top_navigation/global_search_button"
        >
          <SearchIconV4 color={theme.colors.base} />
        </TouchableOpacity>

        {currentTab !== TabName.Explore && (
          <Menu
            opened={openPostCreationMenu}
            onBackdropPress={() => setOpenPostCreationMenu(false)}
          >
            <MenuTrigger>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={onPressCreate}
                testID="top_navigation/post_creation_button"
                accessibilityLabel="top_navigation/post_creation_button"
              >
                <PlusIconV4 color={theme.colors.base} />
              </TouchableOpacity>
            </MenuTrigger>
            <MenuOptions
              customStyles={{ optionsContainer: styles.optionsContainer }}
            >
              {options?.map((option, index) => (
                <MenuOption
                  key={`${option.title}-${index}`}
                  onSelect={option.onPress}
                  style={styles.modalRow}
                >
                  {option.icon}
                  <Text style={styles.postText}>{option.title}</Text>
                </MenuOption>
              ))}
            </MenuOptions>
          </Menu>
        )}
        <CreatePostChooseTargetModal
          visible={createPostModalVisible}
          onClose={closeCreatePostModal}
          userId={userId}
          onSelect={closeCreatePostModal}
          postType={postType}
        />
      </View>
    </View>
  );
};

type OptionItem = {
  title: string;
  icon: React.JSX.Element;
  onPress: () => void;
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginVertical: 8,
  },
  title: {
    fontWeight: 'bold',
    color: amityUIKitTokens.colors.base,
    fontSize: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    borderRadius: 50,
    backgroundColor: amityUIKitTokens.colors.baseShade4,
    padding: 4,
    marginHorizontal: 4,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: amityUIKitTokens.colors.base,
    padding: 4,
  },
  optionsContainer: {
    backgroundColor: amityUIKitTokens.colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#606170',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 40,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
  },
  postText: {
    paddingLeft: 12,
    fontWeight: '600',
    color: amityUIKitTokens.colors.base,
  },
});

export default memo(AmitySocialHomeTopNavigationComponent);
