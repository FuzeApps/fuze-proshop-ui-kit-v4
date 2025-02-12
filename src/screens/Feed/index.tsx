import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import {
  CommunityRepository,
  PostRepository,
  SubscriptionLevels,
  UserRepository,
  getCommunityTopic,
  getUserTopic,
  subscribeTopic,
} from '@amityco/ts-sdk-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import AmityPostContentComponent from '../../components/AmityPostContentComponent/AmityPostContentComponent';
import NewsFeedLoadingComponent from '../../components/NewsFeedLoadingComponent/NewsFeedLoadingComponent';
import { AmityPostContentComponentStyleEnum } from '../../enum/AmityPostContentComponentStyle';
import { amityPostsFormatter } from '../../util/postDataFormatter';
import type { FeedRefType } from '../CommunityHome';
import { useStyles } from './styles';

interface IFeed {
  targetId: string;
  targetType: string;
  tags?: string[];
}
function Feed(
  { targetId, targetType, tags }: IFeed,
  ref: React.Ref<FeedRefType>
) {
  const styles = useStyles();
  const [postData, setPostData] = useState<Amity.Post>(null);
  const [onNextPage, setOnNextPage] = useState(null);
  const disposers: Amity.Unsubscriber[] = useMemo(() => [], []);
  let isSubscribed = false;

  const subscribePostTopic = useCallback((type: string, id: string) => {
    if (isSubscribed) return;

    if (type === 'user') {
      let user = {} as Amity.User;
      UserRepository.getUser(id, ({ data }) => {
        user = data;
      });
      disposers.push(
        subscribeTopic(getUserTopic(user, SubscriptionLevels.POST))
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isSubscribed = true;
      return;
    }
    if (type === 'community') {
      CommunityRepository.getCommunity(id, (data) => {
        if (data.data) {
          disposers.push(
            subscribeTopic(
              getCommunityTopic(data.data, SubscriptionLevels.POST)
            )
          );
        }
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      disposers.forEach((fn) => fn());
    };
  }, [disposers]);

  const handleLoadMore = () => {
    if (onNextPage) {
      onNextPage();
    }
  };

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = PostRepository.getPosts(
        {
          targetId,
          targetType,
          sortBy: 'lastCreated',
          limit: 10,
          feedType: 'published',
          tags,
        },
        async ({ data, error, loading, hasNextPage, onNextPage: nextPage }) => {
          if (!error && !loading) {
            const filterData: any[] = data.map((item) => {
              if (item.dataType === 'text') return item;
            });

            setOnNextPage(hasNextPage ? () => nextPage : null);
            const formattedPostList = await amityPostsFormatter(filterData);
            setPostData(formattedPostList);
            subscribePostTopic(targetType, targetId);
          }
        }
      );
      return () => {
        unsubscribe();
      };
    }, [subscribePostTopic, tags, targetId, targetType])
  );

  useImperativeHandle(ref, () => ({
    handleLoadMore,
  }));

  const filteredPostData = useMemo(() => {
    /**
     * If there are no tags provided, it only means that the user wants to see posts without tags.
     * This is a workaround to filter posts without tags.
     * */
    if (!tags?.length) {
      return (
        postData?.filter((item) => !item?.tags || !item?.tags?.length) ?? []
      );
    }

    /**
     * If there are tags provided, filter the posts based on the tags.
     * The feed is pre-filtered by the backend, so no need for the workaround.
     * */
    return postData ?? [];
  }, [postData, tags?.length]);

  return (
    <View style={styles.feedWrap}>
      {filteredPostData ? (
        <FlatList
          scrollEnabled={false}
          data={filteredPostData ?? []}
          extraData={filteredPostData}
          style={{ backgroundColor: 'white' }}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <AmityPostContentComponent
              post={item}
              AmityPostContentComponentStyle={
                AmityPostContentComponentStyleEnum.feed
              }
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <NewsFeedLoadingComponent />
      )}
    </View>
  );
}
export default forwardRef(Feed);
