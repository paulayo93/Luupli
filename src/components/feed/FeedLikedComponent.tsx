import {Text, StyleSheet, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';

import {HeartUnLikeIcon, HeartLikedIcon} from '../../../assets/icons/icons';

interface LikeOptionProps {
  numOfLikes: number;
  setShowLikeAnimation: Dispatch<SetStateAction<boolean>>;
}

const FeedLikedComponent: React.FC<LikeOptionProps> = ({
  numOfLikes,
  setShowLikeAnimation,
}) => {
  const [liked, setLiked] = useState(false);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setLiked(true);
        setShowLikeAnimation(true);
        setTimeout(() => {
          setShowLikeAnimation(false);
        }, 1000);
      }}>
      {liked ? <HeartLikedIcon /> : <HeartUnLikeIcon />}
      <Text style={styles.text}>{numOfLikes}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default FeedLikedComponent;
