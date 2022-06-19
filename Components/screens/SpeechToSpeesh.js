import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import Voice from '@react-native-voice/voice';
import axios from 'react-native-axios';
import {Context} from '../Context/Context';
import Loader from '../Spinner';
import Header from '../Header';
import {langs} from '../Example/Language';
import Tts from 'react-native-tts';
const img = require ('../Images/Arrow.png');
const Mic = require ('../Images/Mic.png');
const Play = require ('../Images/Play.png');
const GifImageHomeScreen = require ('../Images/StSImage.jpg');
const Recorder = require ('../Images/Recorder.gif');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const icon1 = (
  <FontAwesome5 style={{fontSize: 21}} name={'chevron-down'} solid />
);
const CheckMArk = <FontAwesome5 style={{fontSize: 15}} name={'check'} solid />;
const SpeechToSpeech = ({route, navigation}) => {
  const [SelectedValue, setSelectedValue] = useState ('English');
  const [SelectedValueTo, setSelectedValueTo] = useState ('English');
  const [ToggleArrow, setToggleArrow] = useState (false);
  const [visible, setvisible] = useState (false);
  const [DisplaySpinner, setDisplaySpinner] = useState (false);
  const [DisplayDropDown, setDisplayDropDown] = useState (false);
  const [DisplayDropDownTo, setDisplayDropDownTo] = useState (false);
  const [ToggleArrowTo, setToggleArrowTo] = useState (false);
  const [SelectedIndex, setSelectedIndex] = useState (0);
  const [SelectedIndexTo, setSelectedIndexTo] = useState (0);
  const [SpeechResult, setSpeechResult] = useState ('Please Speak Something..');
  const [VoiceRecord, setVoiceRecord] = useState ('Please Speak Something..');
  const [LanguageFrom, setLanguageFrom] = useState ('en');
  const contextData = useContext (Context);
  contextData.HandleIsDark ();
  let {name} = route.params;
  let HeaderName = JSON.stringify (name);
  HeaderName = HeaderName.replace ('"', '').replace ('"', '');

  useEffect (() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy ().then (Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = e => {
    setVoiceRecord (e.value[0]);
    setSpeechResult (e.value[0]);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start ('en-US');
    } catch (e) {
      console.error (e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop ();
    } catch (e) {
      console.error (e);
    }
    setvisible (false);
  };
  function HandleTranslatedText (LanguageCode) {
    setDisplaySpinner (true);
    Tts.setDefaultLanguage (LanguageCode);
    const encodedParams = new URLSearchParams ();
    encodedParams.append ('source_language', LanguageFrom);
    encodedParams.append ('target_language', LanguageCode);
    encodedParams.append ('text', VoiceRecord);
    if (LanguageFrom === LanguageCode) {
      setSpeechResult (VoiceRecord);
    } else {
      const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': 'f0c1ebf81bmsh6b2c24be3fd36dap1abd55jsna4cab6cccac1',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
        },
        data: encodedParams,
      };

      axios
        .request (options)
        .then (function (response) {
          setSpeechResult (response.data.data.translatedText);
          setDisplaySpinner (false);
        })
        .catch (function (error) {
          console.error (error);
          Alert.alert (
            'API Service',
            'Your Api Service has ended. please purchase API and try again',
            [
              {
                text: 'Cancel',
                onPress: () => console.log ('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log ('OK Pressed')},
            ]
          );
        });
    }
  }
  useEffect (
    () => {
      const timer = setTimeout (() => {
        setDisplaySpinner (false);
      }, 5000);
      return () => clearTimeout (timer);
    },
    [DisplaySpinner]
  );
  return (
    <View style={{flex: 1}}>
      <Header name={HeaderName} ScreenName={false} EditButton={false} />
      <View
        style={[
          styles.Outercontainer,
          {backgroundColor: contextData.IsDark ? 'black' : '#eaeaea'},
        ]}
      >
        <View
          style={[
            styles.OutercontainerHomeContentDropDown,
            {backgroundColor: contextData.IsDark ? '#252526' : 'white'},
          ]}
        >
          <View style={styles.OutercontainerDropDown}>
            <View style={styles.DropDown}>
              <View style={styles.DropDown}>
                <View
                  style={[
                    styles.AnimatedDropDown,
                    {borderColor: contextData.IsDark ? 'white' : 'black'},
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setToggleArrow (!ToggleArrow);
                      setDisplayDropDown (!DisplayDropDown);
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 12,
                      }}
                    >
                      <Text
                        style={{color: contextData.IsDark ? 'white' : 'black'}}
                      >
                        {SelectedValue}
                      </Text>
                      <Text style={styles.Icon}>{icon1}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {DisplayDropDown &&
                  <View
                    style={[
                      styles.OuterWrapperAnimatedDropDownList,
                      {backgroundColor: contextData.IsDark ? 'black' : 'white'},
                    ]}
                  >
                    {langs.map ((item, index) => {
                      let selected = false;
                      if (index === SelectedIndex) {
                        selected = true;
                      }
                      return (
                        <View style={{zIndex: 2}} key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedValue (item.label);
                              setSelectedIndex (index);
                              setDisplayDropDown (false);
                              setLanguageFrom (item.value);
                            }}
                          >
                            <View style={styles.AnimatedDropDownList}>
                              <Text
                                style={{
                                  color: contextData.IsDark ? 'white' : 'black',
                                }}
                              >
                                {item.label}
                              </Text>
                              {selected &&
                                <Text style={styles.Icon}>{CheckMArk}</Text>}
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>}
              </View>
            </View>
            <View style={{width: 30}}>
              <Image
                style={{
                  width: '100%',
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={img}
              />
            </View>
            <View style={styles.DropDown}>
              <View style={styles.DropDown}>
                <View
                  style={[
                    styles.AnimatedDropDown,
                    {borderColor: contextData.IsDark ? 'white' : 'black'},
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setToggleArrowTo (!ToggleArrowTo);
                      setDisplayDropDownTo (!DisplayDropDownTo);
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 12,
                      }}
                    >
                      <Text
                        style={{color: contextData.IsDark ? 'white' : 'black'}}
                      >
                        {SelectedValueTo}
                      </Text>
                      <Text style={styles.Icon}>{icon1}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {DisplayDropDownTo &&
                  <View
                    style={[
                      styles.OuterWrapperAnimatedDropDownList,
                      {
                        backgroundColor: contextData.IsDark ? 'black' : 'white',
                      },
                    ]}
                  >
                    {langs.map ((item, index) => {
                      let selected = false;
                      if (index === SelectedIndexTo) {
                        selected = true;
                      }
                      return (
                        <View style={{zIndex: 2}} key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedValueTo (item.label);
                              setSelectedIndexTo (index);
                              setDisplayDropDownTo (false);
                              HandleTranslatedText (item.value);
                            }}
                          >
                            <View style={styles.AnimatedDropDownList}>
                              <Text
                                style={{
                                  color: contextData.IsDark ? 'white' : 'black',
                                }}
                              >
                                {item.label}
                              </Text>
                              {selected &&
                                <Text style={styles.Icon}>
                                  {CheckMArk}
                                </Text>}
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>}
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.OutercontainerHomeContent,
            {backgroundColor: contextData.IsDark ? '#252526' : 'white'},
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setvisible (true);
              startRecognizing ();
            }}
          >
            <View style={styles.OutercontainerBoxes}>
              <View style={{width: '100%'}}>
                <Image
                  style={{
                    width: '100%',
                    height: 65,
                    borderColor: '#F4CA16',
                    resizeMode: 'contain',
                  }}
                  source={Mic}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Tts.speak (SpeechResult);
            }}
          >
            <View style={styles.OutercontainerBoxes}>
              <View style={{width: '100%'}}>
                <Image
                  style={{
                    width: '100%',
                    height: 65,
                    borderColor: '#F4CA16',
                    resizeMode: 'contain',
                  }}
                  source={Play}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Dialog
          visible={visible}
          onTouchOutside={() => {
            setvisible (false);
          }}
        >
          <DialogContent
            style={{
              backgroundColor: contextData.IsDark ? 'black' : '#eaeaea',
            }}
          >
            <View style={{width: 200, marginTop: 15}}>
              <View style={{width: '100%', paddingTop: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    setvisible (false);
                  }}
                >
                  <Image
                    style={{
                      width: '100%',
                      height: 150,
                      borderColor: '#F4CA16',
                      resizeMode: 'contain',
                    }}
                    source={Recorder}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={stopRecognizing}>
              <View
                style={[styles.OuterWrapperButtonImageToText, {paddingTop: 10}]}
              >
                <Text style={[styles.Button, {marginTop: 0, width: '100%'}]}>
                  Stop
                </Text>
              </View>
            </TouchableOpacity>
          </DialogContent>
        </Dialog>
      </View>
      {DisplaySpinner && <Loader />}
      <View
        style={{
          paddingTop: 12,
          backgroundColor: contextData.IsDark ? '#252526' : 'white',
          flex: 1,
          overflow: 'hidden',
          alignItems: 'center',
          position: 'relative',
          zIndex: -1,
        }}
      >
        <Image
          style={{
            flex: 1,
          }}
          source={GifImageHomeScreen}
        />
      </View>
    </View>
  );
};

export default SpeechToSpeech;
