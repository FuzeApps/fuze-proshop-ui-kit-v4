import React, { type ReactElement, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { amityUIKitTokens } from '../../enum';
import { TabName } from '../../enum/tabNameState';
import {
  activityIcon,
  galleryIcon,
  galleryTabIcon,
  leaderboardIcon,
  timelineIcon,
} from '../../svg/svg-xml-list';
import { useStyles } from './styles';

interface ICustomTab {
  onTabChange?: (tabName: TabName) => void;
  tabName: TabName[];
}

const CustomTabV4 = ({ tabName, onTabChange }: ICustomTab): ReactElement => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState(1);
  const { width } = useWindowDimensions();
  const handleTabPress = ({
    name,
    tabIndex,
  }: {
    name: TabName;
    tabIndex: number;
  }) => {
    setActiveTab(tabIndex);
    onTabChange && onTabChange(name);
  };

  const getIcon = (tab: TabName, isActive: boolean) => {
    const color = isActive
      ? amityUIKitTokens.colors.base
      : amityUIKitTokens.colors.baseShade2;

    switch (tab) {
      case TabName.Timeline:
        return <SvgXml style={styles.icon} xml={timelineIcon(color)} />;
      case TabName.Activities:
        return <SvgXml style={styles.icon} xml={activityIcon(color)} />;
      case TabName.Activity:
        return <SvgXml style={styles.icon} xml={activityIcon(color)} />;
      case TabName.Leaderboard:
        return <SvgXml style={styles.icon} xml={leaderboardIcon(color)} />;
      case TabName.Gallery:
        return <SvgXml style={styles.icon} xml={galleryTabIcon(color)} />;
      default:
        return null;
    }
  };

  const tabCustomStyle = useMemo(() => {
    // P.S. Usually it should be based on number of tabs but for now it's hardcoded
    // const tabNameLength = tabName.length;
    const tabNameLength = 4;
    return {
      width: (width - 32) / tabNameLength,
    };
  }, [width]);

  const tabsWrapperStyle = useMemo(() => {
    return {
      minWidth: width - 32,
    };
  }, [width]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewWrapper}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.container, tabsWrapperStyle]}>
          {tabName.map((tab, index) => {
            return (
              <TouchableOpacity
                key={tab}
                onPress={() =>
                  handleTabPress({ name: tab, tabIndex: index + 1 })
                }
                style={[
                  styles.tab,
                  activeTab === index + 1 && styles.activeTab,
                  tabCustomStyle,
                ]}
              >
                {getIcon(tab, activeTab === index + 1)}
                <Text
                  numberOfLines={1}
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
        </View>
      </ScrollView>
    </View>
  );
};
export default CustomTabV4;
