import { useCallback } from 'react';
import { IAmityUIkitProvider } from '../../src/providers/amity-ui-kit-provider';

const useEventHandlers = () => {
  const onViewMyProShop: IAmityUIkitProvider['onViewMyProShop'] = useCallback(
    (data) => {
      console.log(
        `JPN: Viewing pro shop for community: ${data.userName} | ${data.userId}`
      );

      // Implement pro shop view logic here
    },
    []
  );

  const onUserFollow: IAmityUIkitProvider['onUserFollow'] = useCallback(
    (data) => {
      console.log(`JPN: User followed: ${data.userName} ${data.userId}`);
      // Implement your follow logic here
    },
    []
  );

  const onUserUnFollow: IAmityUIkitProvider['onUserUnFollow'] = useCallback(
    (data) => {
      console.log(`JPN: User unfollowed: ${data.userName} ${data.userId}`);
      // Implement your unfollow logic here
    },
    []
  );

  const onCommunityJoin: IAmityUIkitProvider['onCommunityJoin'] = useCallback(
    (data) => {
      console.log(
        `JPN: Joined community: ${data.communityName} ${data?.communityId}`
      );
      // Implement join logic here
    },
    []
  );

  const onCommunityLeave: IAmityUIkitProvider['onCommunityLeave'] = useCallback(
    (data) => {
      console.log(
        `JPN: Left community:${data?.communityName} ${data?.communityId}`
      );
      // Implement leave logic here
    },
    []
  );

  const onPostLike: IAmityUIkitProvider['onPostLike'] = useCallback((data) => {
    console.log(`JPN: Liked post: ${data.postId} ${data.text}`);
    // Implement like logic here
  }, []);

  const onPostUnLike: IAmityUIkitProvider['onPostUnLike'] = useCallback(
    (data) => {
      console.log(`JPN: Unliked post: ${data.postId} ${data.text}`);
      // Implement unlike logic here
    },
    []
  );

  const onPostStart: IAmityUIkitProvider['onPostStart'] = useCallback(
    (data) => {
      console.log(
        `JPN: onPostStart : ${data.communityId} ${data.communityName} | ${data?.userName} ${data?.userId}`
      );
      // Implement post start logic here
    },
    []
  );

  const onPostComplete: IAmityUIkitProvider['onPostComplete'] = useCallback(
    (data) => {
      `JPN: onPostComplete: ${data.communityId} ${data.communityName} | ${data?.userName} ${data?.userId}`;
      // Implement post complete logic here
    },
    []
  );

  const onCommunityCreate: IAmityUIkitProvider['onCommunityCreate'] =
    useCallback((data) => {
      console.log(`JPN: onCommunityCreate: ${JSON.stringify(data)}`);
      // Implement post complete logic here
    }, []);

  const onCommunityDelete: IAmityUIkitProvider['onCommunityDelete'] =
    useCallback((data) => {
      console.log(`JPN: onCommunityDelete: ${JSON.stringify(data)}`);
      // Implement post complete logic here
    }, []);

  return {
    onUserFollow,
    onUserUnFollow,
    onCommunityJoin,
    onCommunityLeave,
    onPostLike,
    onPostUnLike,
    onPostStart,
    onPostComplete,
    onViewMyProShop,
    onCommunityCreate,
    onCommunityDelete,
  };
};

export default useEventHandlers;
