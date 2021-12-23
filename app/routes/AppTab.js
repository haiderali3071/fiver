import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import QuestionStack from './QuestionStack'
import InterviewStack from './InterviewStack'


const Tab = createBottomTabNavigator();

export default function AppTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor:'white',
                tabBarInactiveTintColor:'grey',
                tabBarStyle: { backgroundColor: 'black', height: 60 },
                tabBarShowLabel: false,
                headerShown: false
            }}
        >
            <Tab.Screen options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="microphone" size={size} color={color} /> }} name="Interview" component={InterviewStack} />
            <Tab.Screen options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="head-question" size={size} color={color} /> }} name="Questions" component={QuestionStack} />
        </Tab.Navigator>
    );
}