import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Interview, Player, Parameters, PlayRecording } from '../screens/'

const Stack = createNativeStackNavigator();

export default function InterviewStack() {
    return (
        <Stack.Navigator intialRoute="InterviewScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InterviewScreen" component={Interview} />
            <Stack.Screen name="Parameters" component={Parameters} />
            <Stack.Screen name="Player" component={Player} />
        </Stack.Navigator>
    );
}
