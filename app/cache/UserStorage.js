import React from 'react';
import * as SecureStore from 'expo-secure-store';

const key="TheLingo"

const setData = async( data ) => {
    try{
        await SecureStore.setItemAsync(key, data)
        // console.log(sucess)
    }
    catch(err){
        console.log(err)
    }
}

const getData = async()=>{
    try{
         const sucess = await SecureStore.getItemAsync(key)
         return sucess
    }
    catch(err){
        console.log('here')
        console.log(err)
    }
}

const removeData = async() =>{
    try{
        await SecureStore.deleteItemAsync(key)
    }
    catch(err){
        console.log(err)
    }
}

export {setData, getData, removeData};