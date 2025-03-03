import React, { useState } from 'react';
import { View } from 'react-native';
import AddMembersModal from '../../components/AddMembersModal';
//import CustomTab from '../../components/CustomTabV3';
import { TabName } from '../../enum/tabNameState';
import { updateCommunityMember } from '../../providers/Social/communities-sdk';
import type { UserInterface } from '../../types/user.interface';
import CommunityMembersTab from './Components/CommunityMembersTab';
import MemberActionModal from './Components/MemberActionModal';
import { useStyles } from './styles';

export default function CommunityMemberDetail({ route }: any) {
  const styles = useStyles();
  const [member, setMember] = useState<UserInterface[]>([]);
  const { communityId, isModerator } = route.params;
  const [addMembersModal, setAddMembersModal] = React.useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [userId, setUserId] = useState('');

  //TODO: Hide the modal options for now
  // const [activeTab, setActiveTab] = useState(TabName.Members);

  // TODO: Will hide this for now as it is buggy and not necessary for the release.
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         onPress={() => {
  //           setAddMembersModal(true);
  //         }}
  //       >
  //         <PlusIcon style={styles.plusIcon} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation, styles.dotIcon, styles.plusIcon]);

  const onSelectMember = async (users: UserInterface[]) => {
    const memberIds = users.map((user) => user.userId);
    try {
      await updateCommunityMember({ operation: 'ADD', communityId, memberIds });
      // getMembers();
    } catch (error) {
      console.log(error);
    }
  };

  const onThreeDotTap = (user: UserInterface) => {
    setUserId(user.userId);
    setActionModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* TODO: Hide the modal options for now */}
      {/* <CustomTab
        tabName={[TabName.Members, TabName.Moderators]}
        onTabChange={setActiveTab}
      />

      <CommunityMembersTab
        activeTab={activeTab}
        communityId={communityId}
        onThreeDotTap={onThreeDotTap}
        setMember={setMember}
      /> */}

      <CommunityMembersTab
        activeTab={TabName.Members}
        communityId={communityId}
        onThreeDotTap={onThreeDotTap}
        setMember={setMember}
      />
      <AddMembersModal
        onSelect={onSelectMember}
        onClose={() => setAddMembersModal(false)}
        visible={addMembersModal}
        initUserList={[]}
        excludeUserList={member}
      />
      <MemberActionModal
        isVisible={actionModalVisible}
        setIsVisible={setActionModalVisible}
        userId={userId}
        communityId={communityId}
        hasModeratorPermission={isModerator}
        // isInModeratorTab={activeTab === TabName.Moderators}
        isInModeratorTab={false}
      />
    </View>
  );
}
