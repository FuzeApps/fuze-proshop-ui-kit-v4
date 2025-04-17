import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { communityIcon } from '../../../svg/svg-xml-list';
import useAuth from '../../../hooks/useAuth';
import { useStyles } from './communityItem.styles';

const CommunityItem = ({
  item,
  onPressCommunity,
}: {
  item: Amity.Community & { category?: string };
  onPressCommunity: (community: {
    communityId: string;
    communityName: string;
  }) => void;
}) => {
  const { apiRegion } = useAuth();
  const styles = useStyles();

  const avatarFileURL = (fileId: string) => {
    return `https://api.${apiRegion}.amity.co/api/v3/files/${fileId}/download?size=medium`;
  };

  return (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={() =>
        onPressCommunity({
          communityId: item.communityId,
          communityName: item.displayName,
        })
      }
    >
      {item?.avatarFileId ? (
        <Image
          style={styles.avatar}
          source={{
            uri: item.avatarFileId && avatarFileURL(item.avatarFileId!),
          }}
        />
      ) : (
        <View style={styles.avatar}>
          <SvgXml xml={communityIcon} />
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.communityName}>{item.displayName}</Text>
        {item?.category && (
          <Text
            style={styles.category}
            testID="community_search_result/community_category_name"
            accessibilityLabel="community_search_result/community_category_name"
          >
            {item.category}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CommunityItem;
