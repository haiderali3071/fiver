import React, { useContext, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { SvgXml } from 'react-native-svg'
import firebase from '../config/firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore/lite'

import Colors from '../config/colors'
import { AppScreen, AppRadio, AppButton, AppLoading } from '../components/';
import { Logo, Interview } from '../constants/';
import AppContext from '../context/AppContext';
import { getData } from '../cache/UserStorage';


const { width, height } = Dimensions.get('screen');

export default function Language({ navigation }) {
    const { appContext, setAppContext } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const continueHandler = async () => {
        setLoading(true)
        if (!appContext.isLaunched) {
            setLoading(false)
            navigation.navigate('Gender')

        }
        else {
            const db = getFirestore(firebase);
            const id = await getData();
            const docRef = doc(db, "devices", id);
            await updateDoc(docRef, appContext)
            setLoading(false)
            navigation.navigate('Home')
        }
    }


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
                        {!loading ? <AppButton title={appContext.isLaunched ? 'Ok' : 'Continue'} disabled={appContext.language ? false : true} onPress={() => continueHandler()} /> :
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 25 }}>
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