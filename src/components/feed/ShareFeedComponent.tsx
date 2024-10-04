import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {ShareIcon} from '../../../assets/icons/icons';
const ShareFeedComponent = () => {
  return (
    <View style={styles.container}>
      <ShareIcon />
      <Text style={styles.text}>Share</Text>
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

export default ShareFeedComponent;
