import {
  View,
  StyleSheet,
  ActivityIndicator,
  ViewToken,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import useFetchContent from '../../hooks/useFetchContent';
import {following, forYou} from '../../constants/apis';
import {Dimensions} from 'react-native';
import {FeedItem} from '../../types/types';
import {VideoRef} from 'react-native-video';
import {useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import FeedContentComponent from "../../components/feed/FeedContentComponent";

const screenHeight = Dimensions.get('screen').height;

interface FeedProps {
  feedType: string;
  feeds?:  Array<FeedItem[]>;
}

export type VideoPostRef = {
  feedId: string;
  videoRef: VideoRef;
};

const Feed: React.FC<FeedProps> = ({feedType}) => {
  const feedUrl = feedType === 'following' ? following : forYou;

  const {feeds = [], isLoading} = useFetchContent(feedUrl);
  // console.log(feeds, isLoading);
  const [videoRefs, setVideoRefs] = useState<VideoPostRef[]>([]);
  const [currentVideoRef, setCurrentVideoRef] = useState<VideoPostRef | null>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const flashListRef = useRef<FlashList<any>>(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Video should be 50% visible to be considered viewable
  };

  const onViewableItemsChanged = useCallback((callback:{changed: ViewToken[], viewableItems: ViewToken[]}) => {

    const prevMediaKey = callback.changed[0].key;
    const prevVideoRef = videoRefs.find(videoRef => {

      return prevMediaKey === videoRef.feedId;
    });

    if(prevVideoRef && !callback.changed[0].isViewable && callback.changed[0].index !== 0) {
      prevVideoRef.videoRef?.seek(0);
      prevVideoRef.videoRef?.pause();
    }

    if(!callback.viewableItems[0]) {
      return;
    }

    const currentVideoKeyInList = callback.viewableItems[0].key;
    const videoRef = videoRefs.find(videoItem => currentVideoKeyInList === videoItem.feedId);

    if(!videoRef && flashListRef.current && callback.viewableItems[0].isViewable) {
      setCurrentVideoRef(null);
      let index = callback.viewableItems[0].index;
      setCurrentIndex(index);
      setTimeout(() => {
        try {
          flashListRef.current?.scrollToIndex({
            index: index++,
            animated: true,
          })
        } catch (err) {
          throw new Error(err);
        }
      }, 1500);
      return;
    }
    if(callback.viewableItems[0].isViewable) {
      setCurrentVideoRef(videoRef);
      videoRef?.videoRef?.resume();
    }
  }, [videoRefs]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        currentVideoRef && currentVideoRef?.videoRef?.resume();
      }, 1000);

      return () => {
        currentVideoRef && currentVideoRef?.videoRef?.pause();
      };
    }, [currentVideoRef]),
  );

  const rendertItem = ({item, index}: {item: FeedItem; index: number}) => {
    return (
        <FeedContentComponent
            feed={item}
            setVideoRefs={setVideoRefs}
            videoRefs={videoRefs}
            flashListRef={flashListRef}
            currentIndex={currentIndex}
            index={index}
            feedLenght={feeds.length}
         isLoading={isLoading}/>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <FlashList
        ref={flashListRef}
        data={feeds}
        renderItem={rendertItem}
        estimatedItemSize={200}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        bounces={false}

        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    flex: 1,
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: screenHeight,
    width: '100%',
  },
});

export default Feed;
