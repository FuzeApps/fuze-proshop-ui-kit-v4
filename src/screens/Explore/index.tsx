import * as React from 'react';
import {
  CategoryRepository,
  CommunityRepository,
} from '@amityco/ts-sdk-react-native';
import { useState, useEffect, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';

import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAuth from '../../hooks/useAuth';
import CommunityIcon from '../../svg/CommunityIcon';
import { chevronRightIcon, officialIcon } from '../../svg/svg-xml-list';
import { SvgXml } from 'react-native-svg';
import { amityUIKitTokens } from '../../enum';

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
    <ScrollView style={styles.container}>
      {/* Recommended Group UI Block */}
      <View style={styles.recommendContainer}>
        <Text style={styles.title}>Recommended for you</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommendCommunityList.map((community) => (
            <TouchableOpacity
              key={community.communityId}
              style={styles.card}
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
      {/* Trending now  */}
      <View style={styles.trendingContainer}>
        <Text style={styles.title}>Trending now</Text>
        <View>
          {trendingCommunityList.map((community, index) => (
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
                {/* <Text style={styles.number}>{index + 1}</Text> */}
                <View style={styles.memberContainer}>
                  <View style={styles.memberTextContainer}>
                    <View style={styles.memberTextWrapper}>
                      <Text numberOfLines={1} style={styles.memberText}>
                        {community.displayName}
                      </Text>
                    </View>
                    {community.isOfficial && (
                      <SvgXml
                        width={24}
                        height={24}
                        xml={officialIcon(amityUIKitTokens.colors.primary)}
                      />
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Categories */}
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
