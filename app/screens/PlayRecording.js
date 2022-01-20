import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, ActivityIndicator } from 'react-native';
import { AppHeader, AppIconButton, AppPlayerAnimation } from '../components/'
import AppContext from '../context/AppContext';

import { SvgXml } from "react-native-svg";
import { Player } from '../constants/'


import { Audio } from 'expo-av'

const { height, width } = Dimensions.get('screen');

export default function PlayeRecording({ navigation, route }) {
    const { uri } = route.params;
    const [play, setPlay] = useState(false)
    const [track, setTrack] = useState(new Audio.Sound());
    const [loading, setLoading] = useState(true);
    const [trackDuration, setTrackDuration] = useState();


    const loadAsync = async () => {
        setLoading(true);
        if (!track._loaded) {
            track.loadAsync({ uri: uri }, {
                shouldPlay: false,
            }).then(
                async () => {
                    const durationProm = await track.getStatusAsync();
                    setTrackDuration(() => durationProm.durationMillis);
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
        }, []
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
                setPlay(false)
                navigation.goBack();
            }
        }
    )

    useEffect(
        () => {
            if (trackDuration) {
                const timer = setInterval(
                    () => {
                        getStatus();
                    }, 1000
                )
                return () => clearInterval(timer);
            }

        }, [trackDuration]
    )



    const playHandler = async () => {
        if (!loading && !play) {
            setPlay(!play);
            track.playAsync();
        }
        else if (!loading && play) {
            setPlay(!play)
            track.pauseAsync();
        }
    }


    if (loading) {
        return (
            <View style={{ width, height, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='white' />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <AppHeader title='Interview recordings' onPress={() => navigation.openDrawer()} />
            <View style={{ width: '100%', height: height - 250, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor:'green' }}>
                <View style={styles.playerImg}>
                    <SvgXml xml={Player} width='80%' height='60%' />
                </View>
                <Text style={styles.player}>Answers</Text>
                <View style={styles.controlsWrapper}>
                    <AppIconButton size={60} iconSize={30} bg='black' color='white' name={play ? 'pause' : 'caretright'} onPress={playHandler} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        height: '100%',
        flex: 1,
        alignItems: 'center',

    },
    playerImg: {
        width: width - 40,
        height: height / 2.4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controlsWrapper: {
        width: width - 40,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    player: {
        fontSize: 16,
        color: 'black',
        alignSelf: 'flex-start',
        marginLeft: 30,
        maxWidth: width - 60
    }
});