import React from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('screen');

export default function AppHeader({ title, onPress }) {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onPress}>
                <MaterialCommunityIcons name="menu" size={30} color="white" />
            </TouchableWithoutFeedback>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 80,
        maxHeight: height / 100 * 20,
        backgroundColor: 'black',
        width,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15
    },
    title: {
        fontSize:18,
        color:'white',
        marginLeft:15,
        fontWeight:'bold',
        letterSpacing:0.2
    }
});