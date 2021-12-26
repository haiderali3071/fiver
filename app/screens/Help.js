import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AppHeader } from '../components';
import { Help1, Help2, Help3, Help4, Help5, Help6, Help7 } from '../constants/';

const { width, height } = Dimensions.get('screen');


export default function Help({ navigation }) {
    return (
        <ScrollView stickyHeaderIndices={[0]} style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <AppHeader title='Help' onPress={() => navigation.openDrawer()} />
            <SvgXml xml={Help1} width={width - 40} height={height - 20} style={{ marginVertical: 10, }} />
            <SvgXml xml={Help2} width={width - 40} height={height - 20} style={{ marginVertical: 10, }} />
            <SvgXml xml={Help3} width={width - 40} height={height - 20} style={{ marginVertical: 10, }} />
            <SvgXml xml={Help4} width={width - 40} height={height - 20} style={{ marginVertical: 10, }} />
            <SvgXml xml={Help5} width={width - 40} height={height - 20} style={{ marginVertical: 10, }} />
            <SvgXml xml={Help6} width={width - 40} height={height - 20} style={{ marginVertical: 10, }} />
            <SvgXml xml={Help7} width={width - 40} height={height - 20} style={{ marginVertical: 10, }} />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        height: '100%',
        flex: 1,
        backgroundColor: 'white',
    },
});