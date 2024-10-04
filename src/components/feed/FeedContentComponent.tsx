import React, {Dispatch, RefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FeedItem} from "@types/types";
import {VideoPostRef} from "../Feed";
import FlashList from "@shopify/flash-list/dist/FlashList";
import FeedVideoComponent from './FeedVideoComponent'
const screenHeight = Dimensions.get('window').height;
import {transformTimeString, limitWords} from "../../utils/utils";
import ProfileAvatarComponent from "./ProfileAvatarComponent";
import FeedLikedComponent from "./FeedLikedComponent";
import FeedCommentSectionComponent from "./FeedCommentSectionComponent";
import ShareFeedComponent from "./ShareFeedComponent";
import {Black, Grey} from "../../common/Colors";

interface FeedItemProps {
    feed: FeedItem;
    setVideoRefs: Dispatch<SetStateAction<VideoPostRef[]>>;
    videoRefs: VideoPostRef[];
    flashListRef: RefObject<FlashList<any>>;
    currentIndex: number;
    index: number;
    feedLenght: number;
    isLoading: boolean;
}
const FeedContentComponent: React.FC<FeedItemProps> = ({feed, setVideoRefs,videoRefs, flashListRef, currentIndex, feedLenght,index, isLoading}) => {
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);
    const {id, username, caption, media, profilePhotoUrl, likes, comments, shares,timestamp} = feed;
    const [showFullCaption, setShowFullCaption] = useState(false);
    const [loading, setLoading] = useState(isLoading);
    const videoRef = useRef<VideoRef>(null);
    const feedType = media?.type;

    useEffect(() => {
        if (feedType === 'video') {

            const newVideoRefs = videoRefs;
            newVideoRefs.push({
                feedId: id,
                videoRef: videoRef.current as VideoRef,
            });
            setVideoRefs(newVideoRefs);
        }
    }, [id, setVideoRefs, feedType, videoRefs]);

    return (
      <>
          <View style={styles.container}>
              {showLikeAnimation && (
                  <View style={styles.likeAnimation}>
                      <Image source={require('../../../assets/icons/like.gif')} />
                  </View>
              )}
              {media?.type === 'video' ? (
                  <FeedVideoComponent
                      item={feed?.media}
                      videoRef={videoRef} isLoading={loading} currentIndex={currentIndex}
                      index={index}
                      feedLength={feedLenght}
                      flashListRef={flashListRef}
                  />
              ) : (
                  <Image source={{uri: media?.imageUrl}} style={styles.bgMediaContent} />
              )}

              <View style={styles.feedActions}>
                  <ProfileAvatarComponent url={profilePhotoUrl} />
                  <FeedLikedComponent
                      numOfLikes={likes}
                      setShowLikeAnimation={setShowLikeAnimation}
                  />
                  <FeedCommentSectionComponent comments={comments} />
                  <ShareFeedComponent />
              </View>

              <View style={styles.feedDetails}>
                  <Text style={styles.username}>
                      {`@${username}`}{' '}
                      <Text style={styles.timestamp}>{`. ${transformTimeString(
                          timestamp,
                      )}`}</Text>
                  </Text>
                  <TouchableOpacity
                      onPress={() => {
                          setShowFullCaption(prevVal => !prevVal);
                      }}>
                      <Text style={styles.caption}>
                          {showFullCaption ? caption : limitWords(caption)}
                          <Text style={styles.more}>
                              {caption.length > 100 ? 'more' : ''}
                          </Text>
                      </Text>
                  </TouchableOpacity>
              </View>
          </View>
      </>

    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight - (Platform.OS === 'ios' ? 100 : 120),
    },
    bgMediaContent: {
        position: 'absolute',
        backgroundColor: Black,
        bottom: 0,
        right: 0,
        top: 0,
        left: 0,
    },
    feedActions: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 20,
        rowGap: 20,
        alignItems: 'center',
    },
    feedDetails: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 20,
        rowGap: 20,
    },
    username: {
        color: 'white',
        fontWeight: '600',
    },
    timestamp: {
        color: Grey,
        fontWeight: 'normal',
    },
    caption: {
        width: Dimensions.get('screen').width * 0.7,
        color: 'white',
    },
    loader: {
        width: '100%',
        position: 'absolute',
        top: 0,
        opacity: 50,
        height: Dimensions.get('screen').height,
        zIndex: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    more: {
        color: 'white',
        fontWeight: 'bold',
    },
    likeAnimation: {
        zIndex: 70,
    },
});

export default FeedContentComponent;
