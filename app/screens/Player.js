import React, { useState, useContext, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, Text, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av'
import { SvgXml } from "react-native-svg";
import firebase from '../config/firebase';
import { getFirestore, doc, updateDoc, arrayUnion, } from 'firebase/firestore/lite'



import { AppScreen, AppHeader, AppDonut } from '../components/'
import AppContext from '../context/AppContext';
import { Done } from '../constants/'
import { getData } from '../cache/UserStorage';


const { width, height } = Dimensions.get('screen')

export default function Player({ navigation }) {
    const { appContext } = useContext(AppContext);
    const [activeSpeaker, setActiveSpeaker] = useState('interviewer');
    const [loading, setLoading] = useState(true);
    const [track, setTrack] = useState(new Audio.Sound());
    const [recording, setRecording] = useState();
    const [currentTrackId, setCurrentTrackId] = useState(0);
    const [trackDuration, setTrackDuration] = useState();
    const [answerTime, setAnswerTime] = useState(appContext.mode[currentTrackId].duration);
    const [ended, setEnded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [uri, setUri] = useState('')



    const loadAsync = async () => {
        if (!track._loaded && !ended) {
            track.loadAsync({ uri: appContext.mode[currentTrackId].uri }, {
                shouldPlay: true,
            }).then(
                async () => {
                    const durationProm = await track.getStatusAsync();
                    setTrackDuration(() => durationProm.durationMillis);
                    setActiveSpeaker('interviewer');
                    setLoading(false);
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
        }
    }

    async function startRecording() {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        const uri = recording.getURI();
        await recording.stopAndUnloadAsync();
        setUri(uri);
        await setRecording(null);
        setShowModal(true);
    }

    useEffect(
        () => {
            loadAsync();
        }, [currentTrackId]
    )

    const unloadAsync = async () => {
        if (track._loaded) {
            track.stopAsync();
            track.unloadAsync();
        }
    }



    const getStatus = useCallback(
        async () => {
            const status = await track.getStatusAsync();
            if (trackDuration === status.positionMillis) {
                unloadAsync();
                setActiveSpeaker('user')
            }
        }
    )

    const getRecordingStatus = useCallback(
        async () => {
            if (answerTime !== 0) {
                setAnswerTime(answerTime - 1);
            }
            else {
                setActiveSpeaker('interviewer');
                if (appContext.mode.length - 1 !== currentTrackId) {
                    setAnswerTime(appContext.mode[currentTrackId + 1].duration)
                    setCurrentTrackId(currentTrackId + 1)
                }
                else {
                    setEnded(true);
                }
            }
        }
    )

    useEffect(
        () => {
            if (activeSpeaker === 'interviewer' && trackDuration && !ended) {
                const timer = setInterval(
                    () => {
                        getStatus();
                    }, 1000
                )
                return () => clearInterval(timer);
            }
            else if (activeSpeaker === 'user' && !ended) {
                const timer = setInterval(
                    () => {
                        getRecordingStatus();
                    }, 1000
                )
                return () => clearInterval(timer);
            }
        }, [activeSpeaker, trackDuration, answerTime]
    )


    useEffect(() => {
        startRecording()
    }, [])


    useEffect(() => {
        if (ended) {
            stopRecording()
        }
    }, [ended])



    const doneHandler = () => {
        setShowModal(!showModal);
        pushRecording(uri)
    }


    const pushRecording = async () => {
        if (uri) {
            const db = getFirestore(firebase);
            setLoading(true)
            const source = {
                uri: uri,
                name: new Date()
            }
            const id = await getData();
            const docRef = doc(db, "devices", id);
            await updateDoc(docRef, { recordings: arrayUnion(source) });
            setLoading(false)
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'Recordings'
                }],
            });

        }
    }



    return (
        <AppScreen>
            <View style={styles.container}>
                <AppHeader title='Interview' />
                <View style={styles.wrap}>
                    <View style={{ flexDirection: 'row', width: width - 60, alignItems: 'center' }}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17 }}>Question:</Text>
                        <Text style={{ color: 'black', marginHorizontal: 10, fontSize: 17, maxWidth: '65%' }}>{appContext.mode[currentTrackId].title}</Text>
                    </View>
                    <View style={[styles.callerCard, { backgroundColor: activeSpeaker === 'interviewer' ? 'black' : 'rgba(0,0,0,0.1)' }]}>
                        <Text style={{ color: activeSpeaker === 'interviewer' ? 'white' : 'black', position: 'absolute', left: 20, top: 20 }}>{activeSpeaker === 'interviewer' ? 'Speaking...' : 'Listening...'}</Text>
                        <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: activeSpeaker === 'interviewer' ? 'white' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name={activeSpeaker === 'interviewer' ? 'microphone' : 'headphones'} size={30} color={activeSpeaker === 'interviewer' ? 'black' : 'white'} />
                        </View>
                        <Text style={{ borderRadius: 10, paddingHorizontal: 20, padding: 7, backgroundColor: activeSpeaker === 'interviewer' ? 'white' : 'black', color: activeSpeaker === 'interviewer' ? 'black' : 'white', position: 'absolute', left: 20, bottom: 20 }}>{appContext.gender}</Text>
                    </View>
                    <View style={[styles.callerCard, { backgroundColor: activeSpeaker === 'user' ? 'black' : 'rgba(0,0,0,0.1)' }]}>
                        <Text style={{ color: activeSpeaker === 'user' ? 'white' : 'black', position: 'absolute', left: 20, top: 20 }}>{activeSpeaker === 'user' ? 'Speaking...' : 'Listening...'}</Text>
                        <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: activeSpeaker === 'user' ? 'white' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name={activeSpeaker === 'user' ? 'microphone' : 'headphones'} size={30} color={activeSpeaker === 'user' ? 'black' : 'white'} />
                        </View>
                        <Text style={{ borderRadius: 10, paddingHorizontal: 20, padding: 7, backgroundColor: activeSpeaker === 'user' ? 'white' : 'black', color: activeSpeaker === 'user' ? 'black' : 'white', position: 'absolute', left: 20, bottom: 20 }}>You</Text>
                        {activeSpeaker === 'user' && <Text style={{ borderRadius: 10, paddingHorizontal: 20, padding: 7, color: 'white', position: 'absolute', right: 20, bottom: 20 }}>{answerTime}</Text>}
                    </View>
                </View>
                {
                    loading && <View style={styles.overlay}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                }
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
                        <SvgXml xml={Done} width='50%' height='30%' />
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, color: 'black', marginVertical: 10, fontWeight: 'bold' }}>All Done!</Text>
                            <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15, maxWidth: width - 70, textAlign: 'center' }}>Your interview is over, let's check out answers!</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={doneHandler}>
                            <View style={{ width: width - 40, alignSelf: 'center', height: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginBottom: 20 }}>
                                <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 17 }}>Play Recording</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>

            </View>
        </AppScreen>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrap: {
        height: height - 230,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 30,
        width: '100%',
    },
    callerCard: {
        alignSelf: 'center',
        height: '32%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        width,
        height: '100%',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 40,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
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