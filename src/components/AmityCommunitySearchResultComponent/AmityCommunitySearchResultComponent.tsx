import React, { FC, memo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ComponentID, PageID, TabName } from '../../enum';
import { useAmityComponent } from '../../hooks/useUiKitReference';
import SearchResultItem from '../SearchResultItem/SearchResultItem';
import { useStyles } from './AmityCommunitySearchResultComponent.styles';

type AmityCommunitySearchResultComponentType = {
  pageId?: PageID;
  searchResult: Amity.Community[] & Amity.User[];
  searchType: TabName;
  onNextPage: () => void;
  isLoading: boolean;
};

const AmityCommunitySearchResultComponent: FC<
  AmityCommunitySearchResultComponentType
> = ({
  searchResult,
  searchType,
  onNextPage,
  pageId = PageID.WildCardPage,
  isLoading,
}) => {
  const styles = useStyles();
  const componentId = ComponentID.community_search_result;
  const { isExcluded } = useAmityComponent({ pageId, componentId });

  const renderSearchResultItem = ({
    item,
  }: {
    item: Amity.Community & Amity.User;
  }) => {
    return (
      <SearchResultItem
        item={item}
        searchType={searchType}
        pageId={pageId}
        componentId={componentId}
      />
    );
  };

  if (isExcluded) return null;
  if (!searchResult?.length && !isLoading)
    return (
      <View style={styles.noResultContainer}>
        <Text style={styles.noResultText}>
          No {searchType.toLowerCase()} found matching your search
        </Text>
      </View>
    );

  console.log('searchResult', searchResult);

  return (
    <View style={styles.container}>
      <FlatList
        data={searchResult}
        renderItem={renderSearchResultItem}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={() => {
          onNextPage && onNextPage();
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(AmityCommunitySearchResultComponent);
