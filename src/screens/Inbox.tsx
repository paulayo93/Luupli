import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Inbox = () => {
  return (
    <View style={styles.container}>
      <Text>Inbox</Text>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
