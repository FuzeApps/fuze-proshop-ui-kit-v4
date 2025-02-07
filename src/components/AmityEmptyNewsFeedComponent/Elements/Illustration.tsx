import React, { memo } from 'react';
import { Image } from 'react-native';

import { useStyles } from './styles/styles';

const emptyNewsFeedIcon = require('../../../configAssets/icons/emptyFeedIcon_dark.png');

const Illustration = () => {
  const styles = useStyles();

  return (
    <Image
      source={emptyNewsFeedIcon}
      style={styles.icon}
      resizeMode="contain"
    />
  );
};

export default memo(Illustration);
