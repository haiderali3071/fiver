import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export default function AppIconButton({ name, size = 50, bg, onPress, color, iconSize }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg, color }]}>
                <AntDesign name={name} size={iconSize} color={color} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',

    }
});