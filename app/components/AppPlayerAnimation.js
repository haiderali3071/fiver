import React from 'react';
import { Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
const { height, width } = Dimensions.get('screen');


export default function AppPlayerAnimation({ visible = false }) {
    if (!visible) return null
    return (
        <LottieView
            autoPlay
            loop
            style={{
                width: width / 1.1,
                height: width / 1.1,
                alignSelf: 'center',
            }}
            source={require('../assets/player.json')} />
    );
}
