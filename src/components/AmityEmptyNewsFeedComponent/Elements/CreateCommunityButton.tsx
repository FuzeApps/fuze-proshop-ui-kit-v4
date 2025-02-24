import { Text } from 'react-native';
import React, { memo, useCallback } from 'react';
import { ComponentID, ElementID, PageID, UserRole } from '../../../enum';

import { useStyles } from './styles/styles';
import { useBehaviour } from '../../../providers/BehaviourProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/RouteParamList';
import { useUiKitConfig } from '../../../hooks/useUiKitConfig';
import useConfig from '../../../hooks/useConfig';
import { useAuthStatic } from '../../../hooks/useAuthStatic';

const CreateCommunityButton = () => {
  const { userRole } = useAuthStatic();
  const { excludes } = useConfig();
  const styles = useStyles();
  const navigation =
    useNavigation() as NativeStackNavigationProp<RootStackParamList>;
  const { AmityEmptyNewsFeedComponent } = useBehaviour();
  const [text] = useUiKitConfig({
    keys: ['text'],
    page: PageID.social_home_page,
    component: ComponentID.empty_newsfeed,
    element: ElementID.create_community_button,
  }) as string[];

  const onPressCreateCommunity = useCallback(() => {
    if (AmityEmptyNewsFeedComponent.onPressCreateCommunity)
      return AmityEmptyNewsFeedComponent.onPressCreateCommunity();
    navigation.navigate('CreateCommunity');
  }, [AmityEmptyNewsFeedComponent, navigation]);

  if (userRole !== UserRole.PRO) {
    return null;
  }

  if (
    excludes.includes('social_home_page/empty_newsfeed/create_community_button')
  )
    return null;

  return (
    <Text
      style={styles.createCommunityBtnText}
      onPress={onPressCreateCommunity}
    >
      {text ?? 'Create group'}
    </Text>
  );
};

export default memo(CreateCommunityButton);
