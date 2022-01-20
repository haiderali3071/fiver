import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
// import AppLoading from 'expo-app-loading';
import firebase from './app/config/firebase'
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';

import AppContext from './app/context/AppContext'
import AuthStack from './app/routes/AuthStack';
import AppDrawer from './app/routes/AppDrawer';
import AppLoading from 'expo-app-loading';

import { Playlist } from './app/constants';
import { getData } from './app/cache/UserStorage';

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
    const id = await getData()
    if (!id) { return }
    const db = getFirestore(firebase);
    const docRef = doc(db, "devices", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {return}
    setAppContext(docSnap.data());
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={extractData}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
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

