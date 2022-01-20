import React from 'react';
import LottieView from 'lottie-react-native';

export default function AppLoading({ visible = false })  {
    if(!visible) return null
    return  (
        <LottieView
            autoPlay    
            loop
            style={{
            width: 40,
            height: 40,
            alignSelf:'center',
            paddingTop:2,
            }}
            source={require('../assets/loading.json')}/>
    );
}
