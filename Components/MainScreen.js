import React, {useState, useContext, useEffect} from 'react';
import {Context} from './Context/Context';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyCarousel from './Slider';
import styles from './Style';
import Header from './Header';
import 'react-native-gesture-handler';
const GifImageHomeScreen = require ('./Images/wellcome.jpg');
const Speech_To_Speech = require ('./Images/voice-control.png');
const Speech_to_Text = require ('./Images/text-to-speech.png');
const Text_to_text = require ('./Images/Text_to_text.png');
const image_to_text = require ('./Images/image_to_text-removebg-preview.png');

export default function HomPage () {
  const navigation = useNavigation ();
  const [ToggleHeader, setToggleHeader] = useState (false);
  const contextData = useContext (Context);
  contextData.HandleIsDark ();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        ToggleHeader={ToggleHeader}
        EditButton={false}
        ScreenName={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View
          style={[
            styles.Outercontainer,
            {backgroundColor: contextData.IsDark ? 'black' : '#eaeaea'},
          ]}
        >
          <MyCarousel />
          <View
            style={[
              styles.OutercontainerHomeContent,
              {backgroundColor: contextData.IsDark ? '#252526' : 'white'},
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate ('SpeechToSpeech', {
                  name: 'Speech To Speech',
                });
              }}
            >
              <View style={[styles.OutercontainerBoxes]}>
                <Text style={styles.TextHomePage}>Speech To Speech</Text>
                <View style={{width: '100%', marginTop: 10}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 35,
                      borderColor: '#F4CA16',
                      flex: 1,
                      resizeMode: 'contain',
                    }}
                    source={Speech_To_Speech}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate ('SpeechToText', {
                  name: 'Speech To Text',
                });
              }}
            >
              <View style={styles.OutercontainerBoxes}>
                <Text style={styles.TextHomePage}>Speech To Text</Text>
                <View style={{width: '100%', marginTop: 10}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 35,
                      borderColor: '#F4CA16',
                      flex: 1,
                      resizeMode: 'contain',
                    }}
                    source={Speech_to_Text}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate ('TextToText', {
                  name: 'Text To Text',
                });
              }}
            >
              <View style={styles.OutercontainerBoxes}>
                <Text style={styles.TextHomePage}>Text To Text</Text>
                <View style={{width: '100%', marginTop: 10}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 35,
                      borderColor: '#F4CA16',
                      flex: 1,
                      resizeMode: 'contain',
                    }}
                    source={Text_to_text}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate ('ImageToText', {
                  name: 'Image To Text',
                });
              }}
            >
              <View style={styles.OutercontainerBoxes}>
                <Text style={styles.TextHomePage}>Image To Text</Text>
                <View style={{width: '100%', marginTop: 10}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 35,
                      borderColor: '#F4CA16',
                      flex: 1,
                      resizeMode: 'contain',
                    }}
                    source={image_to_text}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            paddingTop: 26,
            backgroundColor: contextData.IsDark ? '#252526' : 'white',
          }}
        >
          <Image
            style={{
              width: '100%',
              height: 65,
              flex: 1,
            }}
            source={GifImageHomeScreen}
          />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
