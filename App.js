import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import jwtDecode from 'jwt-decode'

import AppContext from './app/context/AppContext'
import AuthStack from './app/routes/AuthStack';
import AppDrawer from './app/routes/AppDrawer';

import { getData } from './app/cache/UserStorage'
import { Playlist } from './app/constants';

export default function App() {
  const [appContext, setAppContext] = useState({
    isLaunched: false,
    language: 'English',
    gender: 'James',
    mode: Playlist,
    activeModeTitle: 'Traditional'
  });
  const [isReady, setIsReady] = useState(false);


  const extractData = async () => {
    const data = await getData()
    if (!data) return
    setAppContext(jwtDecode(data));
  }

  if (!isReady) {
    return (<AppLoading startAsync={extractData} onFinish={() => setIsReady(true)} onError={(err) => console.log(err)} />);
  }

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      <NavigationContainer>
        {appContext.isLaunched ?
          <AppDrawer />
          :
          <AuthStack />}
      </NavigationContainer>
    </AppContext.Provider>
  );
}

