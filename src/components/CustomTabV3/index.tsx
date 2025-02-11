import React, { type ReactElement, useState } from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TabName } from '../../enum/tabNameState';
import { useStyles } from './styles';

interface ICustomTab {
  onTabChange: (tabName: TabName) => void;
  tabName: TabName[];
}
const CustomTab = ({ tabName, onTabChange }: ICustomTab): ReactElement => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState(1);
  const [indicatorAnim] = useState(new Animated.Value(0));

  const handleTabPress = ({
    name,
    tabIndex,
  }: {
    name: TabName;
    tabIndex: number;
  }) => {
    setActiveTab(tabIndex);
    onTabChange && onTabChange(name);
    Animated.timing(indicatorAnim, {
      toValue: tabIndex,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabName.map((tab, index) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabPress({ name: tab, tabIndex: index + 1 })}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === index + 1 && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default CustomTab;
