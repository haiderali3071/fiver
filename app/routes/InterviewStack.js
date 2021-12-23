import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Interview, Player, PlayRecording } from '../screens/'

const Stack = createNativeStackNavigator();

export default function InterviewStack() {
    return (
        <Stack.Navigator intialRoute="InterviewScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InterviewScreen" component={Interview} />
            <Stack.Screen name="Player" component={Player} />
            <Stack.Screen name="PlayRecording" component={PlayRecording} />
        </Stack.Navigator>
    );
}
