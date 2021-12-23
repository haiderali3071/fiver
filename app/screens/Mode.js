import React, { useContext, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { SvgXml } from 'react-native-svg'

import Colors from '../config/colors'
import { AppScreen, AppRadio, AppButton, AppLoading } from '../components/';
import { setData } from '../cache/UserStorage'
import { Logo, Interview } from '../constants/';
import AppContext from '../context/AppContext';

import { Playlist, Random, } from '../constants/'




const { width, height } = Dimensions.get('screen');

export default function Mode({ navigation }) {
    const { appContext, setAppContext } = useContext(AppContext);
    const [Tailored, setTailored] = useState([]);
    const [loading, setLoading] = useState(false)
    const modeHandler = (appMode) => {
        setAppContext({ isLaunched: appContext.isLaunched, language: appContext.language, gender: appContext.gender, mode: appMode === 'Traditional' ? Playlist : appMode === 'Random' ? Random : Tailored, activeModeTitle: appMode })
    }
    const isLaunchedHandler = async () => {
        setLoading(true)
        fetch('https://thelingo.herokuapp.com/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appContext: {
                    isLaunched: true,
                    language: appContext.language,
                    gender: appContext.gender,
                    mode: appContext.mode,
                    activeModeTitle: appContext.activeModeTitle
                }
            })
        }).then((response) => response.json())
            .then((json) => {
                setData(JSON.stringify(json.token))
                setAppContext({ isLaunched: true, language: appContext.language, gender: appContext.gender, mode: appContext.mode, activeModeTitle: appContext.activeModeTitle })
                setLoading(false)
            })

    }
    return (
        <AppScreen>
            <View style={styles.container}>
                <SvgXml xml={Logo} width='40%' height={100} />
                <View style={styles.wrapper}>
                    <View style={{ width: '100%' }}>
                        <Text adjustsFontSizeToFit style={{ fontSize: 18, marginBottom: 10 }}>Select a mode:</Text>
                        <AppRadio title='Traditional' appContext={appContext.activeModeTitle} onPress={() => modeHandler('Traditional')} />
                        <AppRadio title='Random' appContext={appContext.activeModeTitle} onPress={() => modeHandler('Random')} />
                        <AppRadio title='Tailored' appContext={appContext.activeModeTitle} onPress={() => modeHandler('Tailored')} />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        {!loading ? <AppButton title={appContext.isLaunched ? 'Ok' : 'Continue'} disabled={appContext.mode ? false : true} onPress={appContext.isLaunched ? () => navigation.navigate('Home') : () => isLaunchedHandler()} /> :
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius:25 }}>
                                <AppLoading visible={true} />
                            </View>}
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