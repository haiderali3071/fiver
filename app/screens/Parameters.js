import React, { useContext, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableWithoutFeedback } from 'react-native';
import { AppHeader, AppDonut } from '../components';
import Slider from '@react-native-community/slider';
import AppContext from '../context/AppContext';




const { width, height } = Dimensions.get('screen');

export default function Parameters({ navigation }) {
    const [duration, setDuration] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    const { appContext, setAppContext } = useContext(AppContext);
    const duartionHandler = async() => {
        var mode = appContext.mode;
        mode[currentId].duration = duration;
        await setAppContext(
            {
                ...appContext, mode: mode
            }
        )
       
        if (currentId < mode.length - 1) {
            setCurrentId(currentId + 1);
            setDuration(0);
        }
        else {
            navigation.navigate('Player');
        }
    }
    return (
        <View style={styles.container}>
            <AppHeader title='Parameters' />
            <View style={styles.wrap}>
                <View style={{ flexDirection: 'row', width: width - 60, alignItems: 'center', marginVertical: 20 }}>
                    <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17 }}>Question:</Text>
                    <Text style={{ color: 'black', marginHorizontal: 10, fontSize: 17, maxWidth: '65%' }}>{appContext.mode[currentId].title}</Text>
                </View>
                <View style={{ alignItems: 'center', position: 'relative', width: '100%', paddingHorizontal: 20 }}>
                    <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 17, alignSelf: 'flex-start', height: 20, }}>Answer Time:</Text>
                    <View style={{ position: 'absolute', height: 115, width: 115, justifyContent: 'center', alignItems: 'center', top: 20 }}>
                        <Text style={{ fontSize: 25, }}>{duration}s</Text>
                    </View>
                    <AppDonut percentage={(duration / 40) * 100} />
                    <Slider
                        style={{ width: '100%', marginTop: 10 }}
                        minimumValue={0}
                        maximumValue={40}
                        minimumTrackTintColor="rgba(0,0,0,0.7)"
                        maximumTrackTintColor="grey"
                        thumbTintColor='black'
                        onValueChange={(duration) => setDuration(Math.round(duration, 1))}
                    />
                </View>
                <TouchableWithoutFeedback onPress={duartionHandler}>
                    <View style={{ width: width - 40, alignSelf: 'center', height: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginTop: 30 }}>
                        <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 17 }}>Continue</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrap: {
        height: height - 250,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 30,
        width: width,
    },
});