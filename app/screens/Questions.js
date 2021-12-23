import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { SvgXml } from 'react-native-svg'

import { AppHeader } from '../components/';
import AppContext from '../context/AppContext';
import { Dvd } from '../constants/'

const { height, width } = Dimensions.get('screen');

export default function Questions({ navigation }) {
    const { appContext } = useContext(AppContext);
    return (
        <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
            <AppHeader title='Questions' onPress={() => navigation.openDrawer()} />
            {
                appContext.mode.map(({ title, id, }) => (
                    <TouchableWithoutFeedback key={id} onPress={() => navigation.navigate('QuestionPlayer', { title: title, id: id })}>
                        <View style={styles.btn}>
                            <View style={styles.rctng}>
                                <SvgXml xml={Dvd} width='100%' height='100%' />
                            </View>
                            <Text ellipsizeMode='tail' style={{ color: 'black', width: '80%' }}>{title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
        </ScrollView>
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