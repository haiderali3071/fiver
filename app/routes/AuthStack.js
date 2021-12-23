import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { Welcome, Language, Gender, Mode } from '../screens/'

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="Gender" component={Gender} />
            <Stack.Screen name="Mode" component={Mode} />
        </Stack.Navigator>
    );
}

export default AuthStack;