import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { AppHeader, AppButton } from '../components';

const { width, height } = Dimensions.get('screen');

export default function AboutUs({ navigation }) {
    return (
        <View style={styles.container}>
            <AppHeader title='About Us' onPress={() => navigation.openDrawer()} />
            <Text style={{ width, paddingHorizontal: 20, marginTop: 20, lineHeight: 20 }}>
                This App is design to help you to gain confidence on the day of your interview with many questions plus the interview's intro and outro .
            </Text>
            <Text style={{ width, paddingHorizontal: 20, marginTop: 20, lineHeight: 20 }}>  Use this App to rehearse your answers by simulation
                this Interview inspires, coaching audios App is to help you familiarise and be more natural with your answers and the questions from your potential employer. Our core objective is to help you to prepare yourself with a realistic simulation of your upcoming interview throughout this App. as we cleverly design the App to make it feel more realistic, which can be downloaded from any app store by searching for The Lingó App, and can be use on your Android or IOS. With this App you can select, choose the orders of the questions and many more features, to boost your confidence and activate the best version of you.</Text>

            <View style={{ width: '100%', alignItems: 'center', marginVertical: 30 }}>
                <AppButton title='Ok' disabled={false} onPress={() => navigation.navigate('Home')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
        backgroundColor: 'white'
    }
});