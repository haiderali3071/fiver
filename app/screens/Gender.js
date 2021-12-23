import React, { useContext } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { SvgXml } from 'react-native-svg'

import Colors from '../config/colors'
import { AppScreen, AppRadio, AppButton } from '../components/';
import { Logo, Interview } from '../constants/';
import AppContext from '../context/AppContext';


const { width, height } = Dimensions.get('screen');

export default function Gender({ navigation }) {
    const { appContext, setAppContext } = useContext(AppContext);
    const genderHandler = (gender) => {
        setAppContext({ isLaunched: appContext.isLaunched, language: appContext.gender, gender: gender, mode: appContext.mode, activeModeTitle: appContext.activeModeTitle })
    }
    return (
        <AppScreen>
            <View style={styles.container}>
                <SvgXml xml={Logo} width='40%' height={100} />
                <View style={styles.wrapper}>
                    <View style={{ width: '100%' }}>
                        <Text adjustsFontSizeToFit style={{ fontSize: 18, marginBottom: 10 }}>Select a gender:</Text>
                        <AppRadio title='Jane' appContext={appContext.gender} onPress={() => genderHandler('Jane')} />
                        <AppRadio title='James' appContext={appContext.gender} onPress={() => genderHandler('James')} />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <AppButton title={appContext.isLaunched ? 'Ok' : 'Continue'} disabled={appContext.gender ? false : true} onPress={appContext.isLaunched ? () => navigation.navigate('Home') : () => navigation.navigate('Mode')} />
                    </View>
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
        justifyContent: 'space-between'
    },
    wrapper: {
        height: height - 170,
        width: '100%',
        paddingHorizontal: 30,
        justifyContent: 'space-evenly'
    }
});