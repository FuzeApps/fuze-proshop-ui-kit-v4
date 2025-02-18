import React from 'react';
import { Pressable, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { newPostIcon } from '../../svg/svg-xml-list';
import { useStyles } from './styles';

interface IBackBtn {
  onPress: () => any;
  isGlobalFeed?: boolean;
}
export default function FloatingButton({
  onPress,
  isGlobalFeed = true,
}: IBackBtn) {
  const styles = useStyles();
  return (
    <View style={!isGlobalFeed ? styles.otherFeedContainer : styles.container}>
      <Pressable
        onPress={() => {
          onPress && onPress();
        }}
        style={styles.button}
      >
        <SvgXml xml={newPostIcon()} />
      </Pressable>
    </View>
  );
}
