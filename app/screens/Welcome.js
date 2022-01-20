import React from 'react';
import { StyleSheet, View, Dimensions, Text, StatusBar } from 'react-native';
import { SvgXml } from 'react-native-svg'

import Colors from '../config/colors'
import { AppScreen, AppButton } from '../components/';
import { Logo, Interview } from '../constants/';


const { width, height } = Dimensions.get('screen');
const windowHeight = Dimensions.get('window').height;
const navbarHeight = height - windowHeight

export default function Welcome({ navigation }) {
    return (
        <AppScreen>
            <View style={styles.container}>
                <SvgXml xml={Logo} width='40%' height={100} />
                <View style={styles.svg}>
                    <SvgXml xml={Interview} width='100%' height='100%' />
                </View>
                <View style={styles.footer}>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text adjustsFontSizeToFit style={styles.heading}>Practice your answers!</Text>
                        <Text adjustsFontSizeToFit style={styles.subHeading}>This app play the select dialog simulation and records your performance to help you to improve your performance</Text>
                    </View>
                    <AppButton title='Get Started' onPress={() => navigation.navigate('Language')} />
                </View>
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        paddingVertical: 30,
        paddingBottom: 30 + navbarHeight
    },
    svg: {
        width: width - 60,
        height: height / 2.5,
        backgroundColor: Colors.off,
        borderRadius: 30
    },
    heading: {
        fontSize: 25,
    },
    subHeading: {
        fontSize: 16,
        color: 'grey',
        maxWidth: '85%',
        textAlign: 'center',
        marginTop: 10
    },
    footer: {
        height: height - 160 - height / 2.5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10
    }
});