import React, { useContext, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from '../config/firebase'
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppContext from '../context/AppContext';
import { AppLoading } from '../components/';



const { height, width } = Dimensions.get('screen');


import AppTab from './AppTab'
import { Language, Gender, Mode, Help, Share, AboutUs } from '../screens/'
import { removeData, getData } from '../cache/UserStorage';
import { Playlist } from '../constants';


const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    const { appContext, setAppContext } = useContext(AppContext);
    const Logout = () => {

        useEffect(async () => {
            const db = getFirestore(firebase);
            const id = await getData()
            if (!id) { return }
            await deleteDoc(doc(db, "devices", id));
            await removeData();
            setAppContext({
                isLaunched: false,
                language: 'English',
                gender: 'James',
                mode: Playlist,
                activeModeTitle: 'Traditional'
            })
        }, [])

        return (
            <View style={{ width, height, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 25 }}>
                    <AppLoading visible={true} />
                </View>
            </View>
        )
    }
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
                    else if (route.name === 'Log out') {
                        iconName = focused
                            ? 'logout'
                            : 'logout';
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
            <Drawer.Screen name="About Us" component={AboutUs} />
            <Drawer.Screen name="Log out" component={Logout} />
        </Drawer.Navigator>
    );
}