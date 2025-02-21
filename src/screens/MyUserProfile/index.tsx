import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import useAuth from '../../hooks/useAuth';

export default function MyUserprofile() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { client } = useAuth();

  const redirectToMyProfile = useCallback(() => {
    navigation.navigate('UserProfile', {
      userId: (client as Amity.Client).userId,
      isBackEnabled: false,
    });
  }, [client, navigation]);

  useEffect(() => {
    setTimeout(() => {
      redirectToMyProfile();
    }, 0);
  }, [client, redirectToMyProfile]);

  return <View />;
}
