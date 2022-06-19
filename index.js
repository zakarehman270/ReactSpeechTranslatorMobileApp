/**
 * @format
 */
import React,{useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
import {ContextProvider} from './Components/Context/Context';
import SplashScreen from 'react-native-splash-screen';
const PharmacyApp = () => {
  useEffect (() => {
    SplashScreen.hide ();
  }, []);
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
};

AppRegistry.registerComponent (appName, () => PharmacyApp);
