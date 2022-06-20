import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Context} from '../Context/Context';
import Header from '../Header';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import axios from 'react-native-axios';
import Voice from '@react-native-voice/voice';
import Loader from '../Spinner';
const img = require ('../Images/Arrow.png');
const Mic = require ('../Images/Mic.png');
const Recorder = require ('../Images/Recorder.gif');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const GifImageHomeScreen = require ('../Images/wellcome.jpg');
const icon1 = (
  <FontAwesome5 style={{fontSize: 21}} name={'chevron-down'} solid />
);
const CheckMArk = <FontAwesome5 style={{fontSize: 15}} name={'check'} solid />;
import {langs} from '../Example/Language';

const SpeechToText = ({route, navigation}) => {
  const [SelectedValue, setSelectedValue] = useState ('English');
  const [SelectedValueTo, setSelectedValueTo] = useState ('Hindi');
  const [ToggleArrow, setToggleArrow] = useState (false);
  const [DisplayDropDown, setDisplayDropDown] = useState (false);
  const [DisplayDropDownTo, setDisplayDropDownTo] = useState (false);
  const [TextValue, setTextValue] = useState ('Recorded Text');
  const [ToggleArrowTo, setToggleArrowTo] = useState (false);
  const [SelectedIndex, setSelectedIndex] = useState (0);
  const [SelectedIndexTo, setSelectedIndexTo] = useState (0);
  const [visible, setvisible] = useState (false);
  const [results, setResults] = useState (['Recoded Text..']);
  const [TranslatedText, setTranslatedText] = useState ('Translated Text..');
  const [DisplaySpinner, setDisplaySpinner] = useState (false);
  const [LanguageFrom, setLanguageFrom] = useState ('en');
  const [LanguageTo, setLanguageTo] = useState ('hi');
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
    setResults (e.value);
    setTextValue (e.value[0]);
  };
  const startRecognizing = async () => {
    try {
      await Voice.start ('en-US');
      setResults ([]);
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
  };

  function HandleTranslatedText () {
    setDisplaySpinner (true);
    const encodedParams = new URLSearchParams ();
    encodedParams.append ('source_language', LanguageFrom);
    encodedParams.append ('target_language', LanguageTo);
    encodedParams.append ('text', TextValue);
    if (LanguageFrom === LanguageTo) {
      setTranslatedText (TextValue);
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
          setTranslatedText (response.data.data.translatedText);
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
          {
            backgroundColor: contextData.IsDark ? 'black' : '#eaeaea',
            paddingBottom: 12,
          },
        ]}
      >
        <View
          style={[
            styles.OutercontainerHomeContentDropDownSpeechToText,
            {backgroundColor: contextData.IsDark ? '#252526' : 'white'},
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setvisible (true);
              startRecognizing ();
            }}
          >
            <View style={[styles.OutercontainerBoxes, {marginTop: 0}]}>

              <View style={{width: '100%'}}>
                <Image
                  style={{
                    width: '100%',
                    height: 50,
                    borderColor: '#F4CA16',
                    resizeMode: 'contain',
                  }}
                  source={Mic}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.OutercontainerHomeContentDropDownSpeechToText,
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
                        style={{
                          color: contextData.IsDark ? 'white' : 'black',
                        }}
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
                      {
                        backgroundColor: contextData.IsDark ? 'black' : 'white',
                      },
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
                  // flex: 1,
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
                        style={{
                          color: contextData.IsDark ? 'white' : 'black',
                        }}
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
                              setLanguageTo (item.value);
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
          </View>
        </View>
        <View
          style={[
            styles.OutercontainerSpeechToText,
            {backgroundColor: contextData.IsDark ? '#252526' : 'white'},
          ]}
        > 
          <View style={styles.OutercontainerBoxesTextToSpeech}>
            <View style={{width: '100%', height: 130}}>
              <ScrollView>
                <Text
                  style={{
                    color: contextData.IsDark ? 'white' : 'black',
                  }}
                >
                  {results[0]}
                </Text>
              </ScrollView>
            </View>
          </View>
          <View style={styles.OutercontainerBoxesTextToSpeech}>
            <View style={{width: '100%', height: 130}}>
              <ScrollView>
                <Text
                  style={{
                    color: contextData.IsDark ? 'white' : 'black',
                  }}
                >
                  {TranslatedText}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            HandleTranslatedText ();
          }}
        >
          <View
            style={[
              styles.OutercontainerHomeContentDropDownSpeechToText,
              {
                backgroundColor: contextData.IsDark ? '#252526' : 'white',
                marginTop: 1,
              },
            ]}
          >
            <View
              style={[styles.OuterWrapperButtonImageToText, {paddingTop: 0}]}
            >
              <Text style={[styles.Button, {marginTop: 0}]}>
                Convert
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
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
                      // flex: 1,
                      resizeMode: 'contain',
                    }}
                    source={Recorder}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setvisible (false);
                stopRecognizing ();
              }}
            >
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

      <View
        style={{
          width: '100%',
          paddingTop: 12,
          backgroundColor: contextData.IsDark ? '#252526' : 'white',
          position: 'relative',
          zIndex: -1,
        }}
      >
        <Image
          style={{
            width: '100%',
            height: 90,
          }}
          source={GifImageHomeScreen}
        />
      </View>
      {DisplaySpinner && <Loader />}
    </View>
  );
};

export default SpeechToText;
