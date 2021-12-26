import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, ActivityIndicator } from 'react-native';
import { AppHeader, AppIconButton, AppPlayerAnimation } from '../components/'
import { SvgXml } from "react-native-svg";

import AppContext from '../context/AppContext';
import { Player } from '../constants/'

import { Audio } from 'expo-av'

const { height, width } = Dimensions.get('screen');

export default function QuestionPlayer({ navigation, route }) {
    const { id, title } = route.params;
    const [play, setPlay] = useState(false)
    const [track, setTrack] = useState(new Audio.Sound());
    const { appContext } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [currentId, setCurrentId] = useState(id);



    const loadAsync = async () => {
        setLoading(true);
        if (!track._loaded) {
            track.loadAsync({ uri: appContext.mode[currentId].uri }, {
                shouldPlay: false,
            }).then(
                async () => {
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
            if (!track._loaded) {
                loadAsync();
            }
        }, [currentId]
    )

    const previousHandler = async () => {
        if (!loading && currentId > !0) {
            await track.unloadAsync();
            setCurrentId((currentId) => currentId - 1)
        }
    }

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


    const nextHandler = async () => {
        if (!loading && appContext.mode.length - 1 !== currentId) {
            await track.unloadAsync();
            setCurrentId((currentId) => currentId + 1)
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
            <AppHeader title='Question Player' onPress={() => navigation.openDrawer()} />
            <View style={{ width: '100%', height: height - 200, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <View style={styles.playerImg}>
                    <SvgXml xml={Player} width='80%' height='60%' />
                </View>
                <Text style={styles.player}>{appContext.mode[currentId].title}</Text>
                <View style={styles.controlsWrapper}>
                    <AppIconButton name='doubleleft' iconSize={25} color='black' onPress={previousHandler} />
                    <AppIconButton size={60} iconSize={30} bg='black' color='white' name={play ? 'pause' : 'caretright'} onPress={playHandler} />
                    <AppIconButton name='doubleright' iconSize={25} color='black' onPress={nextHandler} />
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