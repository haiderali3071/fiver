import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AppScreen({ children }) {
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});