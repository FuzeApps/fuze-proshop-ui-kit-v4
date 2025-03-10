import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import React, {
  memo,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useGallery } from '../../../hooks/useGallery';
import GalleryTab from './GalleryTab';
import { TabName } from '../../../enum/tabNameState';
import { SvgXml } from 'react-native-svg';
import { photo, playBtn, video } from '../../../svg/svg-xml-list';
import { useStyles } from '../styles';
import ImageView from '../../../components/react-native-image-viewing/dist';
import { FeedRefType } from '../../CommunityHome';

interface IUserProfileGallery {
  userId: string;
}

const UserProfileGallery = forwardRef(
  ({ userId }: IUserProfileGallery, ref: React.Ref<FeedRefType>) => {
    const [showFullImage, setShowFullImage] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [tabName, setTabName] = useState<TabName>(TabName.Photos);
    const dataType = tabName === TabName.Photos ? 'image' : 'video';
    const { mediaFiles, getNextPage } = useGallery({
      targetId: userId,
      targetType: 'user',
      dataType: dataType,
      limit: 21,
    });
    const styles = useStyles();
    const handleLoadMore = useCallback(() => {
      getNextPage && getNextPage();
    }, [getNextPage]);
    useImperativeHandle(ref, () => ({
      handleLoadMore,
    }));

    const onPressThumbnail = useCallback((index) => {
      setImageIndex(index);
      setShowFullImage(true);
    }, []);

    const renderGalleryContent = ({ item, index }) => {
      return (
        <TouchableOpacity onPress={() => onPressThumbnail(index)}>
          <Image source={{ uri: item.uri }} style={styles.thumbnail} />
          {item?.dataType === 'video' && (
            <View style={styles.playButton}>
              <SvgXml xml={playBtn} width="50" height="50" />
            </View>
          )}
        </TouchableOpacity>
      );
    };

    const renderGallery = () => {
      if (!mediaFiles || mediaFiles?.length === 0) {
        const icon = tabName === TabName.Photos ? photo() : video();
        return (
          <View style={styles.emptyContentContainer}>
            <SvgXml xml={icon} width={50} height={50} />
            <Text style={styles.emptyContentText}>No {tabName} yet</Text>
          </View>
        );
      }
      return (
        <FlatList
          onEndReached={() => {
            getNextPage && getNextPage();
          }}
          scrollEnabled={false}
          data={mediaFiles}
          renderItem={renderGalleryContent}
          keyExtractor={(item) => item.uri}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      );
    };
    return (
      <View style={styles.container}>
        <GalleryTab
          tabName={[TabName.Photos, TabName.Videos]}
          onTabChange={setTabName}
          curerntTab={tabName}
        />
        {renderGallery()}
        <ImageView
          images={mediaFiles}
          imageIndex={imageIndex}
          visible={showFullImage}
          onRequestClose={() => setShowFullImage(false)}
          isVideoButton={dataType === 'video'}
          videoPosts={dataType === 'video' ? mediaFiles : undefined}
        />
      </View>
    );
  }
);

export default memo(UserProfileGallery);
