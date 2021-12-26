import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import Colors from '../config/colors';

export default function AppButton({ title, disabled, onPress }) {
    return (
        <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
            <View style={[styles.container, { backgroundColor: disabled ? 'grey' : 'black' }]}>
                <Text adjustsFontSizeToFit style={{ color: 'white', fontSize: 15 }}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '85%',
        borderRadius: 12,
        backgroundColor: Colors.dark,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    }
});