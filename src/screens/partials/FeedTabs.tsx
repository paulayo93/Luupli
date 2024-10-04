import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feed from './Feed';



import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Black, Grey} from "../../common/Colors";
import {ms} from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

const Following = () => <Feed feedType="following" />;

const ForYou = () => <Feed feedType="for you" />;

// TODO: put a divider between the tab titles
function TopTabBar({state}: {state: {index: number}}) {
    const tabStylesFollowing = state.index === 0 ? styles.selectedTab : styles.unselectedTab;
    const tabStylesForYou = state.index === 1 ? styles.selectedTab : styles.unselectedTab;

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <SafeAreaView style={{position: 'absolute', width: '100%', zIndex: 20}}>
            <View style={styles.topTabBar}>
                <Text
                    style={[tabStylesFollowing, styles.tabText]}>
                    Following
                </Text>
                <Text
                    style={[tabStylesForYou, styles.tabText]}>
                    For You
                </Text>
            </View>
        </SafeAreaView>
    );
}

// TODO: put a divider between the tab titles
export default function FeedTabs() {
    return (
        <Tab.Navigator  tabBar={TopTabBar} style={styles.container}>
            <Tab.Screen name="Following" component={Following} />
            <Tab.Screen name="For You" component={ForYou} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Black,
    },
    topTabBar: {
        flexDirection: 'row',
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        columnGap: 20,
    },
    unselectedTab: {
        color: Grey,
    },
    selectedTab: {
        color: 'white',
    },
    tabText: {
        fontSize: ms(13),
    }
});
