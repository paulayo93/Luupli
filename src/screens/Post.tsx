import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Black} from "../common/Colors";

const Post = () => {
  return (
    <View style={styles.constainer}>
      <Text>post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: Black,
  },
});

export default Post;
