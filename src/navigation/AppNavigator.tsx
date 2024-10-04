
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Discover from '../screens/Discover';
import {StyleSheet, View, Text} from 'react-native';
import {dark} from '../constants/colors';
import {
    InboxActiveTabIcon,
    ProfileInactiveTabIcon,
    ProfileActiveTabIcon,
    HomeActiveTabIcon,
    HomeInactiveTabIcon,
    SearchIcon,
    SearchNeutralIcon,
    PostIcon,
    InboxInActiveTabIcon,
} from "../../assets/icons/icons";
import Post from '../screens/Post';
import Inbox from '../screens/Inbox';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View style={styles.tabItemContainer}>
                <HomeActiveTabIcon />
                <Text style={styles.focusedText}>Home</Text>
              </View>
            ) : (
              <View style={styles.tabItemContainer}>
                <HomeInactiveTabIcon />
                <Text style={styles.unFocusedText}>Home</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => {
            return focused ? (
              <View style={styles.tabItemContainer}>
                <SearchIcon />
                <Text style={styles.focusedText}>Discover</Text>
              </View>
            ) : (
              <View style={styles.tabItemContainer}>
                <SearchNeutralIcon />
                <Text style={styles.unFocusedText}>Discover</Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: () => {
            return (
              <View style={styles.postContainer}>
                <PostIcon />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => {
            return focused ? (
              <View style={styles.tabItemContainer}>
                <InboxActiveTabIcon />
                <Text style={styles.focusedText}>Inbox</Text>
              </View>
            ) : (
              <View style={styles.tabItemContainer}>
                <InboxInActiveTabIcon />
                <Text style={styles.unFocusedText}>Inbox</Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Me"
        component={Profile}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => {
            return focused ? (
              <View style={styles.tabItemContainer}>
                <ProfileActiveTabIcon />
                <Text style={styles.focusedText}>Me</Text>
              </View>
            ) : (
              <View style={styles.tabItemContainer}>
                <ProfileInactiveTabIcon />
                <Text style={styles.unFocusedText}>Me</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    display: 'flex',
    height: 100,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: dark,
    alignItems: 'center',
  },
  focusedText: {
    color: 'white',
    fontSize: 10,
  },
  unFocusedText: {
    color: '#999999',
    fontSize: 10,
  },
  tabItemContainer: {
    alignItems: 'center',
    rowGap: 5,
  },
  postContainer: {
    marginBottom: 10,
  },
});
