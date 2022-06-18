import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import Voice from '@react-native-voice/voice';
import axios from 'react-native-axios';
import {Context} from '../Context/Context';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Loader from '../Spinner';
import Header from '../Header';
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
import {langs} from '../Example/Language';
import Tts from 'react-native-tts';
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
  const [end, setEnd] = useState ('');
  const [results, setResults] = useState (['Recoded Test..']);
  const [TextValue, setTextValue] = useState ('Please Speak Something..');
  const [TranslatedResult, setTranslatedResult] = useState (
    'Please Speak Something..'
  );
  const [LanguageFrom, setLanguageFrom] = useState ('en');
  const [RadioButtonSelectedValue, setRadioButtonSelectedValue] = useState (0);
  const contextData = useContext (Context);
  contextData.HandleIsDark ();
  let {name} = route.params;
  let HeaderName = JSON.stringify (name);
  HeaderName = HeaderName.replace ('"', '').replace ('"', '');
  var radio_props = [
    {label: 'Feminine', value: 0},
    {label: 'Masculine', value: 1},
  ];

  useEffect (() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy ().then (Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = e => {
    setResults (e.value);
    setTranslatedResult (e.value[0]);
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
    setvisible (false);
  };

  function HandleTranslatedText (LanguageCode) {
    setDisplaySpinner (true);
    Tts.setDefaultLanguage (LanguageCode);
    console.log (
      'hyyy',
      TextValue,
      '---===',
      LanguageFrom,
      'ppp==--',
      LanguageCode
    );
    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'x-rapidapi-key': '9eafae7c55msha08ac80fd699164p1a4bfdjsn6d9a42ad752f',
      },
      data: {q: TextValue, source: LanguageFrom, target: LanguageCode},
    };
    axios
      .request (options)
      .then (function (response) {
        console.log ('hrr', response.data.data.translations.translatedText);
        setTranslatedResult (response.data.data.translations.translatedText);
        setDisplaySpinner (false);
      })
      .catch (function (error) {
        console.error (error);
      });
  }

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
          <View style={{marginTop: 32}}>
            <RadioForm formHorizontal={true} animation={true}>
              {radio_props.map ((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={RadioButtonSelectedValue === i}
                    onPress={() => setRadioButtonSelectedValue (i)}
                    borderWidth={1}
                    buttonInnerColor={'#FF783E'}
                    buttonOuterColor={'#FF783E'}
                    buttonSize={20}
                    buttonOuterSize={20}
                    buttonWrapStyle={{marginLeft: 30}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => setRadioButtonSelectedValue (i)}
                    labelStyle={{
                      fontSize: 15,
                      color: contextData.IsDark ? 'white' : 'black',
                    }}
                    labelWrapStyle={{marginRight: 30}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
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
              Tts.speak (TranslatedResult);
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
          paddingTop: 20,
          backgroundColor: contextData.IsDark ? '#252526' : 'white',
          flex: 1,
          overflow: 'hidden',
          alignItems: 'center',
          position: 'relative',
          zIndex:-1,
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
