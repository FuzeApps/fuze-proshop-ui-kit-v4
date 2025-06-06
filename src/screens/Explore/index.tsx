import {
  CategoryRepository,
  CommunityRepository,
} from '@amityco/ts-sdk-react-native';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { amityUIKitTokens } from '../../enum';
import useAuth from '../../hooks/useAuth';
import CommunityIcon from '../../svg/CommunityIcon';
import { chevronRightIcon, verifiedIcon } from '../../svg/svg-xml-list';
import { useStyles } from './styles';

export default function Explore() {
  const styles = useStyles();
  const { apiRegion } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [recommendCommunityList, setRecommendCommunityList] = useState<
    Amity.Community[]
  >([]);
  const [trendingCommunityList, setTrendingCommunityList] = useState<
    Amity.Community[]
  >([]);
  const [categoryList, setCategoryList] = useState<Amity.Category[]>([]);

  const loadRecommendCommunities = () => {
    const unsubscribe = CommunityRepository.getRecommendedCommunities(
      { limit: 5 },
      ({ data: recommendCommunities }) =>
        setRecommendCommunityList(recommendCommunities)
    );
    unsubscribe();
  };

  const loadTrendingCommunities = async () => {
    CommunityRepository.getTrendingCommunities(
      { limit: 5 },
      ({ data, loading, error }) => {
        if (error) return;
        if (!loading) {
          setTrendingCommunityList(data);
        }
      }
    );
  };

  const loadCategories = async () => {
    CategoryRepository.getCategories(
      { sortBy: 'name', limit: 8 },
      ({ data }) => {
        if (data) {
          data.sort((a, b) => b.name.localeCompare(a.name));
          setCategoryList(data);
        }
      }
    );
  };
  const handleCategoryListClick = () => {
    setTimeout(() => {
      navigation.navigate('CategoryList');
    }, 100);
  };
  const handleCommunityClick = (communityId: string, communityName: string) => {
    setTimeout(() => {
      navigation.navigate('CommunityHome', { communityId, communityName });
    }, 100);
  };
  useEffect(() => {
    loadRecommendCommunities();
    loadTrendingCommunities();
    loadCategories();
  }, []);
  const handleCategoryClick = useCallback(
    (categoryId: string, categoryName: string) => {
      setTimeout(() => {
        navigation.navigate('CommunityList', { categoryId, categoryName });
      }, 100);
    },
    [navigation]
  );

  const renderCategoryList = useCallback(() => {
    return (
      <View style={styles.wrapContainer}>
        {categoryList.map((category) => {
          return (
            <TouchableOpacity
              style={styles.categoryItem}
              key={category.categoryId}
              onPress={() =>
                handleCategoryClick(category.categoryId, category.name)
              }
            >
              <View>
                <Image
                  style={styles.categoryAvatar}
                  source={
                    category.avatarFileId
                      ? {
                          uri: `https://api.${apiRegion}.amity.co/api/v3/files/${category.avatarFileId}/download`,
                        }
                      : require('../../assets/icon/Placeholder.png')
                  }
                />
              </View>
              <View style={styles.categoryTextWrapper}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.categoryName}
                >
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [apiRegion, categoryList, handleCategoryClick, styles]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Recommended Group Section */}
      <View style={styles.recommendContainer}>
        <View style={styles.recommendedTitleContainer}>
          <Text style={styles.title}>Recommended for you</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.recommendContainerScrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {recommendCommunityList.map((community) => (
            <TouchableOpacity
              style={styles.card}
              key={community.communityId}
              onPress={() =>
                handleCommunityClick(
                  community.communityId,
                  community.displayName
                )
              }
            >
              {community.avatarFileId ? (
                <Image
                  style={styles.recommendedAvatar}
                  source={{
                    uri: `https://api.${apiRegion}.amity.co/api/v3/files/${community.avatarFileId}/download?size=medium`,
                  }}
                />
              ) : (
                <CommunityIcon width={40} height={40} style={styles.avatar} />
              )}
              <View style={styles.cardBody}>
                <Text style={styles.name}>{community.displayName}</Text>
                {/* <Text style={styles.recommendSubDetail}>
                  {community.membersCount} members
                </Text> */}
                <Text numberOfLines={3} style={styles.communityDescription}>
                  {community.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Groups Section  */}
      <View style={styles.trendingContainer}>
        <View style={styles.groupsTitleContainer}>
          <Text style={styles.groupTitle}>Groups</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllCommunitiesListing')}
          >
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View>
          {trendingCommunityList.map((community) => (
            <TouchableOpacity
              key={community.communityId}
              style={styles.itemContainer}
              onPress={() =>
                handleCommunityClick(
                  community.communityId,
                  community.displayName
                )
              }
            >
              {community.avatarFileId ? (
                <Image
                  style={styles.avatar}
                  source={
                    community.avatarFileId
                      ? {
                          uri: `https://api.${apiRegion}.amity.co/api/v3/files/${community.avatarFileId}/download?size=medium`,
                        }
                      : require('../../assets/icon/Placeholder.png')
                  }
                />
              ) : (
                <CommunityIcon width={40} height={40} style={styles.avatar} />
              )}

              <View style={styles.trendingTextContainer}>
                <View style={styles.memberContainer}>
                  <Text numberOfLines={1} style={styles.memberText}>
                    {community.displayName}
                  </Text>
                  {community.isOfficial && (
                    <SvgXml width={24} height={24} xml={verifiedIcon()} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Categories</Text>
          <TouchableOpacity onPress={handleCategoryListClick}>
            <SvgXml
              style={styles.arrowIcon}
              xml={chevronRightIcon(amityUIKitTokens.colors.base)}
              width={15}
              height={15}
            />
          </TouchableOpacity>
        </View>
        {renderCategoryList()}
      </View>
    </ScrollView>
  );
}
