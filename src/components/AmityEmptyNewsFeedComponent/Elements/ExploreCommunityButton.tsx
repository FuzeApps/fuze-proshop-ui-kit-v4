import React, { FC, memo } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { ComponentID, ElementID, PageID } from '../../../enum';
import { useUiKitConfig } from '../../../hooks/useUiKitConfig';
import { useStyles } from './styles/styles';

const exploreCommunityIcon = require('../../../configAssets/icons/exploreCommunityIcon.png');

type ExploreCommunityButtonType = {
  onPressExploreCommunity?: () => void;
};

const ExploreCommunityButton: FC<ExploreCommunityButtonType> = ({
  onPressExploreCommunity,
}) => {
  const styles = useStyles();

  const [text] = useUiKitConfig({
    keys: ['text'],
    page: PageID.social_home_page,
    component: ComponentID.empty_newsfeed,
    element: ElementID.explore_communities_button,
  }) as string[];

  return (
    <TouchableOpacity
      style={styles.exploreBtn}
      onPress={() => onPressExploreCommunity && onPressExploreCommunity()}
    >
      <Image
        source={exploreCommunityIcon}
        style={styles.exploreIcon}
        resizeMode="contain"
      />
      <Text style={styles.exploreText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default memo(ExploreCommunityButton);
