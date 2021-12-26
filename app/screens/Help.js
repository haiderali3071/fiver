import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { AppHeader } from '../components';

const { width, height } = Dimensions.get('screen');
import PDFReader from 'rn-pdf-reader-js'


export default function Help({ navigation }) {
    return (
        <View style={styles.container}>
            <AppHeader title='Help' onPress={() => navigation.openDrawer()} />
            <PDFReader
                source={{ uri: 'https://drive.google.com/file/d/1o2E3N14KN-fPoaIVRsLYaYsYYuvIe-7p/view?usp=sharing' }}
                style={styles.pdf} />
                
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
        backgroundColor: 'white'
    },
    pdf: {
        flex: 1
    }
});