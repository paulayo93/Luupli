import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {PlusIcon} from '../../../assets/icons/icons';
import {red} from '../../constants/colors';

interface ThumbnailProps {
  url: string;
}

const ProfileAvatarComponent: React.FC<ThumbnailProps> = ({url}) => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: url,
        }}
      />

      <View style={styles.btnContainer}>
        <View style={styles.followButton}>
          <PlusIcon />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
    marginBottom: -10,
  },
  followButton: {
    backgroundColor: red,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default ProfileAvatarComponent;
