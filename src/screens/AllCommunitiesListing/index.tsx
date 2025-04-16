/* eslint-disable react-hooks/exhaustive-deps */
import { CommunityRepository } from '@amityco/ts-sdk-react-native';
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import CloseButton from '../../components/BackButton';
import { useStyles } from './styles';
import CommunityItem from './blocks/CommunityItem';
import { useCategory } from '../../hooks';

type CommunityWithCategory = Amity.Community & {
  category?: string; // Using optional (?) since it might not always be present
};

export default function AllCommunitiesListing({ navigation }: any) {
  const [communities, setCommunities] = useState<CommunityWithCategory[]>([]);
  const [paginateLoading, setPaginateLoading] = useState(false);
  const [hasNextPageState, setHasNextPageState] = useState(false);
  const { getCategory } = useCategory();

  const styles = useStyles();
  const onNextPageRef = useRef<(() => void) | null>(null);
  const isFetchingRef = useRef(false);
  const onEndReachedCalledDuringMomentumRef = useRef(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: CloseButton,
      title: 'Groups',
    });
  }, [navigation]);

  useEffect(() => {
    const loadCommunities = async () => {
      setPaginateLoading(true);
      try {
        const unsubscribe = CommunityRepository.getCommunities(
          { limit: 10 },
          async ({ data, onNextPage, hasNextPage, loading }) => {
            if (!loading) {
              // Only map new communities that aren't already in the state
              const newCommunitiesWithCategories = await Promise.all(
                data.map(async (community) => {
                  let category = '';
                  if (community.categoryIds?.[0]) {
                    const categoryData = await getCategory(
                      community.categoryIds[0]
                    );
                    category = categoryData?.name ?? '';
                  }
                  return { ...community, category };
                })
              );

              setCommunities((prevCommunities) => {
                const uniqueCommunities = Array.from(
                  new Set(
                    [...prevCommunities, ...newCommunitiesWithCategories].map(
                      (c) => c.communityId
                    )
                  )
                ).map(
                  (id) =>
                    [...prevCommunities, ...newCommunitiesWithCategories].find(
                      (c) => c.communityId === id
                    )!
                );
                return uniqueCommunities;
              });
              setHasNextPageState(hasNextPage);
              onNextPageRef.current = onNextPage;
              isFetchingRef.current = false;
              setPaginateLoading(false);
            }
          }
        );
        return () => unsubscribe();
      } catch (error) {
        console.error('Failed to load communities:', error);
        isFetchingRef.current = false;
        setPaginateLoading(false);
      }
    };

    loadCommunities();
  }, [getCategory]);

  const onPressCommunity = useCallback(
    ({
      communityId,
      communityName,
    }: {
      communityId: string;
      communityName: string;
    }) => {
      navigation.navigate('CommunityHome', { communityId, communityName });
    },
    [navigation]
  );

  const renderFooter = () => {
    if (!paginateLoading) return null;
    return (
      <View style={styles.LoadingIndicator}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  const handleEndReached = useCallback(() => {
    if (
      !isFetchingRef.current &&
      hasNextPageState &&
      onEndReachedCalledDuringMomentumRef.current
    ) {
      isFetchingRef.current = true;
      onEndReachedCalledDuringMomentumRef.current = false;
      setPaginateLoading(true);
      onNextPageRef.current && onNextPageRef.current();
    }
  }, [hasNextPageState]);

  return (
    <View style={styles.container}>
      <FlatList
        data={communities}
        renderItem={({ item }) => (
          <CommunityItem item={item} onPressCommunity={onPressCommunity} />
        )}
        keyExtractor={(item) => item.communityId.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentumRef.current = true;
        }}
        onEndReachedThreshold={0.8}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
