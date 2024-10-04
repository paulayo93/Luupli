import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Black} from "../common/Colors";

export default function Discover() {
  return (
    <View style={styles.container}>
      <Text>Discover</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Black,
  },
});
