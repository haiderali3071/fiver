import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, Modal, TouchableWithoutFeedback, ScrollView, TouchableHighlight } from 'react-native';
import { SvgXml } from 'react-native-svg'
import { Entypo } from '@expo/vector-icons';

import Colors from '../config/colors'
import { AppScreen, AppRadio, AppButton, AppLoading } from '../components/';
import { setData } from '../cache/UserStorage'
import { Logo, Dvd } from '../constants/';
import AppContext from '../context/AppContext';

import { Playlist, Random, } from '../constants/'





const { width, height } = Dimensions.get('screen');

export default function Mode({ navigation }) {
    const { appContext, setAppContext } = useContext(AppContext);
    const [Tailored, setTailored] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, showModal] = useState(false)


    const isLaunchedHandler = async (appMode) => {
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

    const exist = (id) => {
        return Tailored.findIndex(item => item.id === id);
    }

    const tailoredHandler = async (id, title, uri) => {
        if (exist(id) === -1) {
            await setTailored([...Tailored, { id: id, title: title, uri: uri }])
        }
        else {
            const data = Tailored;
            data.splice(exist(id), 1)
            await setTailored([...data])
        }
    }

    const modeHandler = (appMode) => {
        if (appMode === 'Tailored') {
            showModal(true)
        }
        setAppContext({ isLaunched: appContext.isLaunched, language: appContext.language, gender: appContext.gender, mode: appMode === 'Traditional' ? Playlist : appMode === 'Random' ? Random : Tailored, activeModeTitle: appMode })
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
                        {!loading ? <AppButton title={appContext.isLaunched ? 'Ok' : 'Continue'} disabled={appContext.mode ? false : true} onPress={appContext.isLaunched ? () => navigation.navigate('Home') : () => isLaunchedHandler(appContext.activeModeTitle)} /> :
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 25 }}>
                                <AppLoading visible={true} />
                            </View>}
                    </View>
                </View>
                {modal && <View style={{ width, height, backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />}
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        showModal(!modal);
                    }}
                >
                    <View style={styles.modal}>
                        <ScrollView>
                            <Text style={{ color: 'black', width: '80%', paddingHorizontal: 20, marginVertical: 20, fontSize: 18 }}>Select Questions:</Text>
                            {
                                Playlist.map(({ id, title, uri }) => (
                                    <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' key={id} onPress={() => tailoredHandler(id, title, uri)}>
                                        <View style={styles.btn}>
                                            <View style={styles.rctng}>
                                                <SvgXml xml={Dvd} width='100%' height='100%' />
                                                {(exist(id) !== -1) && <View style={[styles.rctng, { backgroundColor: 'rgba(0,0,0,0.3)', position: 'absolute', borderRadius: 20 }]}>
                                                    <Entypo name="check" size={20} color="white" />
                                                </View>}
                                            </View>
                                            <Text ellipsizeMode='tail' style={{ color: 'black', width: '80%' }}>{title}</Text>
                                        </View>
                                    </TouchableHighlight>
                                ))
                            }
                            <TouchableWithoutFeedback onPress={() => { showModal(!modal), setAppContext({ isLaunched: appContext.isLaunched, language: appContext.language, gender: appContext.gender, mode: Tailored, activeModeTitle: 'Tailored' }) }}>
                                <View style={{ width: width - 40, alignSelf: 'center', height: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginVertical: 20, marginBottom: 50 }}>
                                    <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 17 }}>Continue</Text>
                                </View>
                            </TouchableWithoutFeedback >
                        </ScrollView>
                    </View>
                </Modal>
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
    },
    modal: {
        width: width,
        height: height / 1.1,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        top: height - height / 1.1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 15,
        paddingBottom: 30
    },
    btn: {
        width,
        height: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    rctng: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});