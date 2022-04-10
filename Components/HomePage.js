import React,{useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import MainScreen from './MainScreen';
import STTExample from './ReactSpeechTotext/SpeechToText'

export default function HomPage () {
  useEffect( async () => {
  // console.log("dta",data.data)
  }, [])
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <STTExample />
      <MainScreen/>
    </SafeAreaView>
  );
}