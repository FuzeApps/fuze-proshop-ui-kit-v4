import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import useFile from '../../../hooks/useFile';
import { proShopButtonIconRound } from '../../../svg/svg-xml-list';
import { useStyle } from '../styles';
import { amityUIKitTokens } from '../../../enum';

const Categories = ({
  item,
  onSelectCategory,
}: {
  item: Amity.Category;
  onSelectCategory: (id: string, name: string) => void;
}) => {
  const avatarURL = useFile({ fileId: item.avatarFileId });

  const styles = useStyle();
  return (
    <TouchableOpacity
      onPress={() => onSelectCategory(item.categoryId, item.name)}
      style={styles.rowContainer}
    >
      {!item?.avatarFileId ? (
        <SvgXml xml={proShopButtonIconRound()} />
      ) : (
        <Image
          style={styles.avatar}
          source={{
            uri: avatarURL,
          }}
        />
      )}

      <Text style={styles.communityText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default memo(Categories);
