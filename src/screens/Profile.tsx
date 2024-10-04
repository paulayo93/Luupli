import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Black} from "../common/Colors";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Black,
  },
});
