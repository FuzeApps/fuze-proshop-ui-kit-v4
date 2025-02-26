import { CommunityRepository } from '@amityco/ts-sdk-react-native';
import React from 'react';
import { Alert, SectionList, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { amityUIKitTokens } from '../../enum';
import { useAuthStatic } from '../../hooks/useAuthStatic';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import ArrowOutlinedIcon from '../../svg/ArrowOutlinedIcon';
import {
  communityIcon2,
  trashIcon,
  userLeaveIcon,
} from '../../svg/svg-xml-list';
import metadataHandlers from '../../util/metadataHandlers';
import { useStyles } from './styles';

interface ChatDetailProps {
  navigation: any;
  route: any;
}

export enum SettingType {
  basicInfo = 'basic_info',
  leaveOrClose = 'leave_or_close',
}

export const CommunitySetting: React.FC<ChatDetailProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme() as MyMD3Theme;
  const styles = useStyles();
  const { onCommunityLeave, onCommunityDelete, userId } = useAuthStatic();
  const { communityId, isModerator, communityName } = route.params;
  const handleMembersPress = () => {
    navigation.navigate('CommunityMemberDetail', {
      communityId: communityId,
      isModerator: isModerator,
    });
  };

  const handleLeaveCommunityPress = async () => {
    const hasLeft = await CommunityRepository.leaveCommunity(communityId);

    //Event handler for leaving community.
    onCommunityLeave?.({
      communityId: communityId,
      communityName: communityName,
    });

    // Remove community from joined communities metadata
    await metadataHandlers.removeFromJoinedCommunities(userId, communityId);

    if (hasLeft) {
      navigation.goBack();
    }
  };

  const onCloseCommunity = async () => {
    const deletedCommunity =
      await CommunityRepository.deleteCommunity(communityId);

    if (deletedCommunity) {
      onCommunityDelete?.({
        communityId: communityId,
        communityName: communityName,
        userId: userId,
      });

      await metadataHandlers
        .deleteCreatedCommunityId(userId, communityId)
        .finally(() => {
          if (deletedCommunity)
            return navigation.navigate('Home', {
              shouldRefresh: true,
            });
        });

      return;
    }

    Alert.alert(
      'Unable to close community',
      'Something went wrong. Please try again later'
    );
  };

  const handleCloseCommunityPress = async () => {
    Alert.alert(
      'Close community?',
      'All members will be removed from the community. All posts, messages, reactions and media shared in community will be deleted. This cannot be undone',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel');
          },
          style: 'cancel',
        },
        {
          text: 'Close',
          onPress: onCloseCommunity,
          style: 'destructive',
        },
      ]
    );
  };

  const communitySettingData = [
    {
      data: [
        {
          name: 'Members',
          leftIcon: <SvgXml xml={communityIcon2()} />,
          callBack: handleMembersPress,
          rightIcon: <ArrowOutlinedIcon width={24} color={theme.colors.base} />,
          type: SettingType.basicInfo,
        },
        {
          name: 'Leave group',
          leftIcon: (
            <SvgXml xml={userLeaveIcon(amityUIKitTokens.colors.alert)} />
          ),

          callBack: handleLeaveCommunityPress,
          rightIcon: null,
          type: SettingType.leaveOrClose,
        },
        {
          name: 'Close group',
          leftIcon: <SvgXml xml={trashIcon(amityUIKitTokens.colors.alert)} />,
          callBack: handleCloseCommunityPress,
          rightIcon: null,
          type: SettingType.leaveOrClose,
        },
      ],
    },
  ];

  const renderSettingItems = ({ item }) => {
    if (item.type === SettingType.basicInfo) {
      return (
        <TouchableOpacity style={styles.rowContainer} onPress={item.callBack}>
          <View style={styles.iconContainer}>{item.leftIcon}</View>
          <Text style={styles.rowText}>{item.name}</Text>
          {item.rightIcon}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.rowContainer} onPress={item.callBack}>
          <View style={styles.iconContainer}>{item.leftIcon}</View>
          <View style={styles.leaveChatContainer}>
            <Text style={styles.leaveChatLabel}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={communitySettingData}
        renderItem={renderSettingItems}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};
