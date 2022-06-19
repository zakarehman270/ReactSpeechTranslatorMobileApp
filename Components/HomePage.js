import React from 'react';
import {SafeAreaView} from 'react-native';
import MainScreen from './MainScreen';

export default function HomPage () {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainScreen/>
    </SafeAreaView>
  );
}