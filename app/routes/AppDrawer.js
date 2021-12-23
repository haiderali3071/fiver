import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('screen');


import AppTab from './AppTab'
import { Language, Gender, Mode, Help, Share, AboutUs } from '../screens/'

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                drawerActiveBackgroundColor: 'rgba(255,255,255,0.1)',
                drawerActiveTintColor: 'white',
                drawerInactiveTintColor: 'grey',
                drawerStyle: {
                    backgroundColor: '#202020',
                    paddingVertical: height / 100 * 15,
                    maxWidth: width / 1.6,

                },
                drawerLabelStyle: {
                    marginLeft: -15
                },
                drawerItemStyle: {
                    paddingHorizontal: 10,
                },
                drawerIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'microphone'
                            : 'microphone';
                    }
                    else if (route.name === 'Help') {
                        iconName = focused
                            ? 'help'
                            : 'help';
                    }
                    else if (route.name === 'About Us') {
                        iconName = focused
                            ? 'information-variant'
                            : 'information-variant';
                        ;
                    }
                    else if (route.name === 'Language') {
                        iconName = focused
                            ? 'earth'
                            : 'earth';
                    }
                    else if (route.name === 'Gender') {
                        iconName = focused
                            ? 'gender-male-female'
                            : 'gender-male-female';
                    }
                    else if (route.name === 'Mode') {
                        iconName = focused
                            ? 'shuffle-variant'
                            : 'shuffle-variant';
                    }
                    else if (route.name === 'Share') {
                        iconName = focused
                            ? 'share'
                            : 'share';
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Drawer.Screen name="Home" component={AppTab} />
            <Drawer.Screen name="Language" component={Language} />
            <Drawer.Screen name="Gender" component={Gender} />
            <Drawer.Screen name="Mode" component={Mode} />
            <Drawer.Screen name="Help" component={Help} />
            <Drawer.Screen name="Share" component={Share} />
            <Drawer.Screen name="About Us" component={AboutUs} />
        </Drawer.Navigator>
    );
}