import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Questions, QuestionPlayer } from '../screens/'

const Stack = createNativeStackNavigator();

export default function QuestionStack() {
    return (
        <Stack.Navigator intialRoute="Questions" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="QuestionsScreen" component={Questions} />
            <Stack.Screen name="QuestionPlayer" component={QuestionPlayer} />
        </Stack.Navigator>
    );
}
