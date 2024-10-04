import React, {useEffect, useState, RefObject} from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {Black} from '../../common/Colors';
import {transformUrlToHttps} from '../../utils/utils';
import {Media} from '@types/types';
import { useIsFocused } from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FeedComponentProps {
    currentIndex: number;
    feedLength: number;
    flashListRef: RefObject<FlashList<any>>;
    isLoading: boolean;
    item: Media;
    videoRef: VideoRef;
}

const FeedVideoComponent = ({item,isLoading, currentIndex,videoRef, feedLength, flashListRef}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [paused, setPaused] = useState(false);
    const [_, setLoading] = useState<boolean>(isLoading);
    const isFocused = useIsFocused();
    const [videoElement, setVideoElement] = useState(null);




    useEffect(() => {
    setVideoElement(
        <>
            <Video
                ref={videoRef}
                renderLoader={() => <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
                }
                resizeMode="cover"
                onLoad={() => setLoading(true)}
                onLoadStart={() => setLoading(false)}
                style={[styles.video]}
                source={isFocused ? {uri: transformUrlToHttps(item?.videoUrl)} : null}
                muted={false}
                disableFocus={true}
                paused={!isFocused || paused}
                onError={error => console.log('VIDEO error', error)}
                preferredForwardBufferDuration={5}

                onEnd={() => {
                    if (currentIndex < feedLength) {
                        flashListRef.current?.scrollToIndex({
                            index: currentIndex++,
                            animated: true,
                        });
                    }
                }}
            />
        </>
    )
    }, [currentIndex, feedLength, flashListRef, isFocused, item?.videoUrl, paused, videoRef]);
    return(
        <>
            {videoElement}
        </>
    );
};

const styles = StyleSheet.create({
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: Black,
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
});
export default  FeedVideoComponent;
