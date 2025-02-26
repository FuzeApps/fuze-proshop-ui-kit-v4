import React, { FC, memo, useMemo } from 'react';
import { View } from 'react-native';
import {
  CreateCommunityButton,
  Description,
  ExploreCommunityButton,
  Illustration,
  Title,
} from './Elements';
import { useStyles } from './styles';

import { RouteProp, useRoute } from '@react-navigation/native';
import {
  AmityUserMetadataKeys,
  ComponentID,
  PageID,
  UserRole,
} from '../../enum';
import { useAuthStatic } from '../../hooks/useAuthStatic';
import useConfig from '../../hooks/useConfig';
import { RootStackParamList } from '../../routes/RouteParamList';

type AmityEmptyNewsFeedComponentType = {
  pageId?: PageID;
  onPressExploreCommunity?: () => void;
};

const AmityEmptyNewsFeedComponent: FC<AmityEmptyNewsFeedComponentType> = ({
  onPressExploreCommunity,
  pageId = '*',
}) => {
  const { excludes } = useConfig();
  const styles = useStyles();
  const { userRole } = useAuthStatic();
  const componentId = ComponentID.empty_newsfeed;
  const uiReference = `${pageId}/${componentId}/*}`;

  const route = useRoute<RouteProp<RootStackParamList>>();
  const { params } = route;

  const createCommunityButton = useMemo(() => {
    // If user is not a PRO user, return null
    if (userRole !== UserRole.PRO) return null;
    // @ts-ignore If user has already created a community before, return null.
    if (params?.user?.metadata?.[AmityUserMetadataKeys.CreatedCommunityId]) {
      return null;
    }

    return <CreateCommunityButton />;
    //@ts-ignore
  }, [params?.user?.metadata, userRole]);

  if (excludes.includes(uiReference)) return null;
  return (
    <View
      style={styles.container}
      // testID={uiReference}
      // accessibilityLabel={uiReference}
    >
      <Illustration />
      <Title />
      <Description />
      <ExploreCommunityButton
        onPressExploreCommunity={onPressExploreCommunity}
      />
      {createCommunityButton}
    </View>
  );
};

export default memo(AmityEmptyNewsFeedComponent);
