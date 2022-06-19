import React from 'react';
import HomPage from './Components/HomePage';
import {NavigationContainer} from '@react-navigation/native';
import TextToText from './Components/screens/TextToText';
import SpeechToSpeech from './Components/screens/SpeechToSpeesh';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './Components/DrawerContent';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from './Components/screens/Settings';
import SpeechToText from './Components/screens/SpeechToText'
import ImageToText from './Components/screens/ImageToText'
import AboutUs from './Components/screens/AboutUs'
const Stack = createStackNavigator ();
const Drawer = createDrawerNavigator ();
function Root () {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomPage"
        component={HomPage}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="Settings"
        component={Settings}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="AboutUs"
        component={AboutUs}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="ImageToText"
        component={ImageToText}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TextToText"
        component={TextToText}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="SpeechToText"
        component={SpeechToText}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="SpeechToSpeech"
        component={SpeechToSpeech}
      />
    </Stack.Navigator>
  );
}

export default function App () {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        initialRouteName="Root"
        screenOptions={{headerShown: false}}
      >
        <Drawer.Screen name="Root" component={Root} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
 