import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {CommentIcon} from '../../../assets/icons/icons';

interface CommentOptionProps {
  comments: number;
}

const FeedCommentSectionComponent: React.FC<CommentOptionProps> = ({comments}) => {
  return (
    <View style={styles.container}>
      <CommentIcon />
      <Text style={styles.text}>{comments}</Text>
    </View>
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

export default FeedCommentSectionComponent;
