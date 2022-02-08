import React,{useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import MainScreen from './MainScreen';

export default function HomPage () {
  useEffect( async () => {
  // console.log("dta",data.data)
  }, [])
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainScreen/>
    </SafeAreaView>
  );
}