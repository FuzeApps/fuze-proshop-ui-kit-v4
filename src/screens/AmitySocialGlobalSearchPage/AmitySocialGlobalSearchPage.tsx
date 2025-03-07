import React, { memo, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import AmityCommunitySearchResultComponent from '../../components/AmityCommunitySearchResultComponent/AmityCommunitySearchResultComponent';
import AmityTopSearchBarComponent from '../../components/AmityTopSearchBarComponent/AmityTopSearchBarComponent';
import CustomTab from '../../components/CustomTab';
import { PageID, TabName } from '../../enum';
import { useAmityGlobalSearchViewModel } from '../../hooks/useAmityGlobalSearchViewModel';
import { useAmityPage } from '../../hooks/useUiKitReference';
import { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { searchEmptyIcon } from '../../svg/svg-xml-list';
import { useStyles } from './styles';

const AmitySocialGlobalSearchPage = () => {
  const pageId = PageID.social_global_search_page;
  const { isExcluded, themeStyles } = useAmityPage({ pageId });
  const styles = useStyles(themeStyles);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState(TabName.Communities);
  const { searchResult, onNextCommunityPage, onNextUserPage } =
    useAmityGlobalSearchViewModel(searchValue, searchType);
  const onNextPage =
    searchType === TabName.Communities ? onNextCommunityPage : onNextUserPage;
  if (isExcluded) return null;
  return (
    <SafeAreaView style={styles.container}>
      <AmityTopSearchBarComponent setSearchValue={setSearchValue} />
      <CustomTab
        onTabChange={setSearchType}
        tabName={[TabName.Communities, TabName.Users]}
      />

      {searchValue?.trim()?.length ? (
        <AmityCommunitySearchResultComponent
          pageId={pageId}
          searchType={searchType}
          searchResult={searchResult}
          onNextPage={onNextPage}
        />
      ) : (
        <SearchPlaceholderLanding themeStyles={themeStyles} />
      )}
    </SafeAreaView>
  );
};

const SearchPlaceholderLanding = ({
  themeStyles,
}: {
  themeStyles: MyMD3Theme;
}) => {
  const styles = useStyles(themeStyles);
  return (
    <View style={styles.searchEmptyContainer}>
      <View style={styles.iconWrapper}>
        <SvgXml xml={searchEmptyIcon()} />
      </View>

      <Text style={styles.searchEmptyText}>
        Start typing to find groups and users
      </Text>
    </View>
  );
};

export default memo(AmitySocialGlobalSearchPage);
