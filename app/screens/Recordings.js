import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { SvgXml } from 'react-native-svg'
import firebase from '../config/firebase'
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

import { AppHeader, AppLoading, AppButton } from '../components/';
import AppContext from '../context/AppContext';
import { Dvd, Empty } from '../constants/'
import { getData } from '../cache/UserStorage';

const { height, width } = Dimensions.get('screen');

export default function Recordings({ navigation }) {
    const [recordings, setRecordings] = useState([]);
    const db = getFirestore(firebase);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true)
        const id = await getData();
        const docRef = doc(db, "devices", id);
        onSnapshot(
            docRef,
            (doc) => {
                setRecordings(doc.data().recordings);
                setLoading(false)
            });
        setLoading(false)
    }, [])


    if (loading) {
        return (
            <View style={{ width, height: height - 100, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: 60, height: 60, borderRadius: 30 }}>
                    <AppLoading visible={true} />
                </View>
            </View>
        );
    }

    return (
        recordings.length > 0 ? <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
            <AppHeader title='Recordings' onPress={() => navigation.openDrawer()} />
            {
                recordings.map(({ name, uri }, i) => (
                    <TouchableWithoutFeedback key={i} onPress={() => navigation.navigate('PlayRecording', { uri: uri })}>
                        <View style={styles.btn}>
                            <View style={styles.rctng}>
                                <SvgXml xml={Dvd} width='100%' height='100%' />
                            </View>
                            <Text ellipsizeMode='tail' style={{ color: 'black', width: '80%' }}>Interview {i + 1}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
        </ScrollView> :
            <View style={styles.container}>
                <AppHeader title='Recordings' onPress={() => navigation.openDrawer()} />
                <View style={{ height: height - 230, width, justifyContent: 'center', alignItems: 'center' }}>
                    <SvgXml xml={Empty} width={100} height={140} />
                    <Text style={{ fontSize: 18, marginVertical: 30 }}>No interviews found</Text>
                    <AppButton title='Record an Interview' disabled={false} onPress={() => navigation.navigate('InterviewScreen')} />
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        height: '100%',
        flex: 1,

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
    }
});