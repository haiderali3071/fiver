import React, { useContext } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { SvgXml } from 'react-native-svg'

import Colors from '../config/colors'
import { AppScreen, AppRadio, AppButton } from '../components/';
import { Logo, Interview } from '../constants/';
import AppContext from '../context/AppContext';


const { width, height } = Dimensions.get('screen');

export default function Language({navigation}) {
    const { appContext, setAppContext } = useContext(AppContext);
    const languageHandler = (language) => {
        setAppContext({ isLaunched: appContext.isLaunched, language: language, gender: appContext.gender, mode: appContext.mode, activeModeTitle: appContext.activeModeTitle })
    }
    return (
        <AppScreen>
            <View style={styles.container}>
                <SvgXml xml={Logo} width='40%' height={100} />
                <View style={styles.wrapper}>
                    <View style={{ width: '100%' }}>
                        <Text adjustsFontSizeToFit style={{ fontSize: 18, marginBottom: 10 }}>Select a language:</Text>
                        <AppRadio title='English' appContext={appContext.language} onPress={() => languageHandler('English')} />
                        <AppRadio title='French' appContext={appContext.language} onPress={() => languageHandler('French')} />
                        <AppRadio title='Spanish' appContext={appContext.language} onPress={() => languageHandler('Spanish')} />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <AppButton title={appContext.isLaunched?'Ok':'Continue'} disabled={appContext.language?false:true} onPress={appContext.isLaunched?()=>navigation.navigate('Home'):()=>navigation.navigate('Gender')}/>
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