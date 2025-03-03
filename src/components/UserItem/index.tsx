import React, { useCallback, useMemo, useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import RoundCheckbox from '../RoundCheckbox/index';
import type { UserInterface } from '../../types/user.interface';
import useAuth from '../../hooks/useAuth';
import { ThreeDotsIcon } from '../../svg/ThreeDotsIcon';
import { SvgXml } from 'react-native-svg';
import { userIcon } from '../../svg/svg-xml-list';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/RouteParamList';

export default function UserItem({
  user,
  isCheckmark,
  showThreeDot,
  onPress,
  onThreeDotTap,
  showActions = true,
}: {
  user: UserInterface;
  isCheckmark?: boolean | undefined;
  showThreeDot?: boolean | undefined;
  showActions?: boolean | undefined;
  onPress?: (user: UserInterface) => void;
  onThreeDotTap?: (user: UserInterface) => void;
}) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = useStyles();
  const { apiRegion } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const maxLength = 25;
  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (onPress) {
      onPress(user);
    }
  };

  const displayName = () => {
    if (user.displayName) {
      if (user.displayName!.length > maxLength) {
        return user.displayName!.substring(0, maxLength) + '..';
      }
      return user.displayName!;
    }
    return 'Display name';
  };

  const avatarFileURL = (fileId: string) => {
    return `https://api.${apiRegion}.amity.co/api/v3/files/${fileId}/download?size=medium`;
  };

  const menuActions = useMemo(() => {
    if (!showActions) {
      return null;
    }

    return !showThreeDot ? (
      <RoundCheckbox isChecked={isCheckmark ?? false} />
    ) : (
      <TouchableOpacity
        onPress={() => {
          if (onThreeDotTap) {
            onThreeDotTap(user);
          }
        }}
      >
        <ThreeDotsIcon style={styles.dotIcon} />
      </TouchableOpacity>
    );
  }, [
    isCheckmark,
    onThreeDotTap,
    showActions,
    showThreeDot,
    styles.dotIcon,
    user,
  ]);

  const navigateToUserDetail = useCallback(() => {
    navigation.navigate('UserProfile', { userId: user?.userId });
  }, [navigation, user?.userId]);

  return (
    <Pressable style={styles.listItem} onPress={handleToggle}>
      <Pressable onPress={navigateToUserDetail}>
        <View style={styles.leftContainer}>
          {user.avatarFileId ? (
            <Image
              style={styles.avatar}
              source={{
                uri: user.avatarFileId && avatarFileURL(user.avatarFileId),
              }}
            />
          ) : (
            <SvgXml style={styles.avatar} xml={userIcon()} />
          )}

          <Text style={styles.itemText}>{displayName()}</Text>
        </View>
      </Pressable>

      {/* Menu actions that is displayed with three dots. */}
      {menuActions}
    </Pressable>
  );
}
