import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity,ScrollView} from 'react-native';
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
  const [SelectedValueTo, setSelectedValueTo] = useState ('Arabic');
  const [ToggleArrow, setToggleArrow] = useState (false);
  const [DisplayDropDown, setDisplayDropDown] = useState (false);
  const [DisplayDropDownTo, setDisplayDropDownTo] = useState (false);
  const [TextValue, setTextValue] = useState ('Recorded Text');
  const [ToggleArrowTo, setToggleArrowTo] = useState (false);
  const [SelectedIndex, setSelectedIndex] = useState (0);
  const [SelectedIndexTo, setSelectedIndexTo] = useState (0);
  const [visible, setvisible] = useState (false);
  const [pitch, setPitch] = useState ('');
  const [error, setError] = useState ('');
  const [end, setEnd] = useState ('');
  const [started, setStarted] = useState ('');
  const [results, setResults] = useState (['Recoded Test..']);
  const [TranslatedText, setTranslatedText] = useState ('Translated Text..');
  const [DisplaySpinner, setDisplaySpinner] = useState (false);
  const [LanguageFrom, setLanguageFrom] = useState ('en');
  const [LanguageTo, setLanguageTo] = useState ('hi');
  const [partialResults, setPartialResults] = useState ([]);
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
      setEnd ('');
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
    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'x-rapidapi-key': '9eafae7c55msha08ac80fd699164p1a4bfdjsn6d9a42ad752f',
      },
      data: {q: TextValue, source: LanguageFrom, target: LanguageTo},
    };
    axios
      .request (options)
      .then (function (response) {
        setTranslatedText (response.data.data.translations.translatedText);
        setDisplaySpinner (false);
      })
      .catch (function (error) {
        console.error (error);
      });
  }

  return (
    <View style={{flex: 1}}>
      <Header name={HeaderName} ScreenName={false} EditButton={false} />
      <ScrollView>
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
                          backgroundColor: contextData.IsDark
                            ? 'black'
                            : 'white',
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
                                    color: contextData.IsDark
                                      ? 'white'
                                      : 'black',
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
                          backgroundColor: contextData.IsDark
                            ? 'black'
                            : 'white',
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
                                    color: contextData.IsDark
                                      ? 'white'
                                      : 'black',
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
              styles.OutercontainerHomeContent,
              {backgroundColor: contextData.IsDark ? '#252526' : 'white'},
            ]}
          >
            <TouchableOpacity>
              <View style={styles.OutercontainerBoxesTextToSpeech}>
                <View style={{width: '100%', height: 65}}>
                  <Text
                    style={{
                      color: contextData.IsDark ? 'white' : 'black',
                    }}
                  >
                    {results[0]}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.OutercontainerBoxesTextToSpeech}>
                <View style={{width: '100%', height: 65}}>
                  <Text
                    style={{
                      color: contextData.IsDark ? 'white' : 'black',
                    }}
                  >
                    {TranslatedText}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
                  Convert{' '}
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
                  style={[
                    styles.OuterWrapperButtonImageToText,
                    {paddingTop: 10},
                  ]}
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
      </ScrollView>
    </View>
  );
};

export default SpeechToText;
