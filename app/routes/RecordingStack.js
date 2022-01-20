import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Recordings, PlayRecording } from '../screens/'

const Stack = createNativeStackNavigator();

export default function RecordingStack() {
    return (
        <Stack.Navigator intialRoute="RecordingScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RecordingScreen" component={Recordings} />
            <Stack.Screen name="PlayRecording" component={PlayRecording} />
        </Stack.Navigator>
    );
}
