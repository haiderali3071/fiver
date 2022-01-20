import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';

export default function AppRadio({ title, onPress, appContext }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={[styles.border,{borderColor:appContext === title?'black':'grey'}]}>
                    {appContext === title && <View style={styles.selected} />}
                </View>
                <Text adjustsFontSizeToFit style={{ marginLeft: 15, fontSize: 20 }}>{title}</Text>
            </View>
        </TouchableWithoutFeedback >
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    border: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        borderColor: 'grey',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'black'
    }
});