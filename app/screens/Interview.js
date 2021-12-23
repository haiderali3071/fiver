import React, { useContext, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableWithoutFeedback, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { SvgXml } from "react-native-svg";

import { AppScreen, AppHeader, AppDonut } from '../components/';
import AppContext from '../context/AppContext';
import { Ready } from '../constants/'
import Colors from '../config/colors';


const { width, height } = Dimensions.get('screen');

export default function Interview({ navigation }) {
    const { appContext } = useContext(AppContext);
    const [duration, setDuration] = useState(5);
    const [showModal, setShowModal] = useState(false);


    const readyHandler = () => {
        setShowModal(!showModal);
        navigation.navigate('Player', { duration: duration })
    }

    return (
        <AppScreen>
            <View style={styles.container}>
                <AppHeader title='Start Interview' onPress={() => navigation.openDrawer()} />
                <View style={styles.wrap}>
                    <View style={{ alignItems: 'center', position: 'relative', width: '100%' }}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17, alignSelf: 'flex-start', height: 20, }}>Answer Time:</Text>
                        <Text style={{ position: 'absolute', alignSelf: 'center', top: 65, fontSize: 25, height: 20, }}>{duration}s</Text>
                        <AppDonut percentage={(duration / 20) * 100} />
                        <Slider
                            style={{ width: '100%', marginTop: 10 }}
                            minimumValue={5}
                            maximumValue={20}
                            minimumTrackTintColor="rgba(0,0,0,0.7)"
                            maximumTrackTintColor="grey"
                            thumbTintColor='black'
                            onValueChange={(duration) => setDuration(Math.round(duration, 1))}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17 }}>Language:</Text>
                        <Text style={{ color: 'black', marginLeft: 10, fontSize: 17 }}>{appContext.language}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17 }}>Mode:</Text>
                        <Text style={{ color: 'black', marginLeft: 10, fontSize: 17 }}>{appContext.activeModeTitle}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17 }}>Gender:</Text>
                        <Text style={{ color: 'black', marginLeft: 10, fontSize: 17 }}>{appContext.gender}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17 }}>Total Questions:</Text>
                        <Text style={{ color: 'black', marginLeft: 10, fontSize: 17 }}>20</Text>
                    </View>
                    <View style={{ width: '100%', height: 100 }}>
                        <TouchableWithoutFeedback onPress={() => setShowModal(!showModal)}>
                            <View style={{ width: width - 40, alignSelf: 'center', height: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginBottom: 20 }}>
                                <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 17 }}>Start Interview</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('QuestionsScreen')}>
                            <View style={{ width: width - 40, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17 }}>Play Questions</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                {showModal && <View style={{ width, height, backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />}
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        setShowModal(!showModal);
                    }}
                >
                    <View style={styles.modal}>
                        <SvgXml xml={Ready} width='50%' height='30%' />
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, color: 'black', marginVertical: 10, fontWeight: 'bold' }}>Are you Ready?</Text>
                            <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15, maxWidth: width - 70, textAlign: 'center' }}>In interview you're going to have non stop questions, find a quiet place and let's get started.</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={readyHandler}>
                            <View style={{ width: width - 40, alignSelf: 'center', height: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginBottom: 20 }}>
                                <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 17 }}>Got it</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </View>
        </AppScreen >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    wrap: {
        height: height - 140,
        width: '100%',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20
    },
    modal: {
        width: width,
        height: height / 1.5,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        top: height - height / 1.5,
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
    }
});