import React, { useState, useContext, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av'

import { AppScreen, AppHeader } from '../components/'
import AppContext from '../context/AppContext';

const { width, height } = Dimensions.get('screen')

export default function Player({ navigation, route }) {
    const { appContext } = useContext(AppContext);
    const [activeSpeaker, setActiveSpeaker] = useState('interviewer');
    const [loading, setLoading] = useState(true);
    const [track, setTrack] = useState(new Audio.Sound());
    const [currentTrackId, setCurrentTrackId] = useState(0);
    const [trackDuration, setTrackDuration] = useState();
    const [answerTime, setAnswerTime] = useState(route.params.duration);
    const [ended, setEnded] = useState(false)


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
                setAnswerTime(route.params.duration);
                if (appContext.mode.length - 1 !== currentTrackId) {
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
        if (ended) {
            navigation.goBack();
        }
    }, [ended])




    return (
        <AppScreen>
            <View style={styles.container}>
                <AppHeader title='Interview' />
                <View style={styles.wrap}>
                    <View style={{ flexDirection: 'row', height: 40, width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17 }}>Question:</Text>
                        <Text style={{ color: 'black', marginLeft: 10, fontSize: 17 }}>{appContext.mode[currentTrackId].title}</Text>
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
            </View>
        </AppScreen>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrap: {
        height: height - 140,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 30,
        width: '100%'
    },
    callerCard: {
        alignSelf: 'center',
        height: '35%',
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
});