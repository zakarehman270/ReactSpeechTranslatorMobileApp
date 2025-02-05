import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../Context/Context';
import axios from 'react-native-axios';
import Loader from '../Spinner';
import DocumentPicker from 'react-native-document-picker';
import PDFExample from '../Example/PDFVieweer';
import FileViewer from 'react-native-file-viewer';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
const GifImageHomeScreen = require ('../Images/wellcome.jpg');
const File = require ('../Images/file.png');
const PDF = require ('../Images/PDF.png');
const Word = require ('../Images/word.png');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const icon1 = (
  <FontAwesome5 style={{fontSize: 21}} name={'chevron-down'} solid />
);
const CheckMArk = <FontAwesome5 style={{fontSize: 15}} name={'check'} solid />;
import {langs} from '../Example/Language';
import Header from '../Header';
const TextToText = ({route, navigation}) => {
  const [SelectedValue, setSelectedValue] = useState ('English');
  const [SelectedValueTo, setSelectedValueTo] = useState ('Arabic');
  const [ToggleArrow, setToggleArrow] = useState (false);
  const [DisplayDropDown, setDisplayDropDown] = useState (false);
  const [DisplayDropDownTo, setDisplayDropDownTo] = useState (false);
  const [TextValue, setTextValue] = useState (
    'Write SomeThing You Want To Translate..'
  );
  const [ToggleArrowTo, setToggleArrowTo] = useState (false);
  const [SelectedIndex, setSelectedIndex] = useState (0);
  const [SelectedIndexTo, setSelectedIndexTo] = useState (0);
  const [visible, setvisible] = useState (false);
  const [LanguageFrom, setLanguageFrom] = useState ('en');
  const [LanguageTo, setLanguageTo] = useState ('hi');
  const [TranslatedText, setTranslatedText] = useState ('');
  const [DisplaySpinner, setDisplaySpinner] = useState (false);
  const [PDF_URI, setPDF_URI] = useState (null);
  const contextData = useContext (Context);
  contextData.HandleIsDark ();

  let {name} = route.params;
  let HeaderName = JSON.stringify (name);
  HeaderName = HeaderName.replace ('"', '').replace ('"', '');

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

  async function HandleSelectPDF () {
    try {
      const res = await DocumentPicker.pick ({
        type: [DocumentPicker.types.pdf],
      });
      await setPDF_URI (res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel (err)) {
        alert ('Canceled from single doc picker');
      } else {
        alert ('Unknown Error: ' + JSON.stringify (err));
        throw err;
      }
    }
  }

  async function HandleSelectDocFile () {
    try {
      const res = await DocumentPicker.pick ({
        type: [DocumentPicker.types.docx],
      });
      await FileViewer.open (res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel (err)) {
        alert ('Canceled from single doc picker');
      } else {
        alert ('Unknown Error: ' + JSON.stringify (err));
        throw err;
      }
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

  if (PDF_URI !== null) {
    return <PDFExample uri={PDF_URI} setPDF_URI={setPDF_URI} />;
  } else {
    return (
      <View style={{flex: 1}}>
        <Header name={HeaderName} EditButton={false} ScreenName={false} />
        <View
          style={[
            styles.Outercontainer,
            {backgroundColor: contextData.IsDark ? 'black' : '#eaeaea'},
          ]}
        >
          <View
            style={[
              styles.OutercontainerHomeContent,
              {backgroundColor: contextData.IsDark ? '#252526' : 'white'},
            ]}
          >
            <TouchableOpacity onPress={() => setvisible (true)}>
              <View style={styles.OutercontainerBoxes}>
                <View style={{width: '100%'}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 50,
                      borderColor: '#F4CA16',
                      resizeMode: 'contain',
                    }}
                    source={File}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.OutercontainerHomeContentDropDownTextToText,
              {backgroundColor: contextData.IsDark ? '#252526' : 'white'},
            ]}
          >
            <View style={styles.OutercontainerDropDown}>
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
                    <ScrollView>
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
                                  <Text style={styles.Icon}>
                                    {CheckMArk}
                                  </Text>}
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>}
              </View>
              <View style={{width: 30}} />
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
                    <ScrollView>
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
                              <View style={[styles.AnimatedDropDownList]}>
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
                                  <Text style={styles.Icon}>
                                    {CheckMArk}
                                  </Text>}
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>}
              </View>
            </View>
          </View>
          <View
            style={[
              styles.OutercontainerHomeContentTextToText,
              {backgroundColor: contextData.IsDark ? '#252526' : 'white'},
            ]}
          >
            <View style={[styles.OutercontainerBoxesTextToTextScreen]}>
              <ScrollView>
                <TextInput
                  style={[
                    {
                      color: contextData.IsDark ? 'white' : 'black',
                      textDecorationLine: 'none',
                    },
                  ]}
                  multiline={true}
                  placeholderTextColor={contextData.IsDark ? 'white' : 'black'}
                  value={TextValue}
                  onChangeText={val => {
                    setTextValue (val);
                  }}
                />
              </ScrollView>
            </View>
            <View style={[styles.OutercontainerBoxesTextToTextScreen]}>
              <ScrollView>
                <TextInput
                  style={[
                    {
                      color: contextData.IsDark ? 'white' : 'black',
                      textDecorationLine: 'none',
                    },
                  ]}
                  placeholder="Translated text."
                  multiline={true}
                  placeholderTextColor={contextData.IsDark ? 'white' : 'black'}
                  value={TranslatedText}
                />
              </ScrollView>
            </View>
            <View style={styles.OuterWrapperButton}>
              <Text
                style={styles.Button}
                onPress={() => {
                  HandleTranslatedText ();
                }}
              >
                Convert
              </Text>
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
                <View style={{width: 100, marginTop: 15}}>
                  <TouchableOpacity
                    onPress={() => {
                      HandleSelectPDF ();
                      setvisible (false);
                    }}
                  >
                    <View
                      style={{
                        width: '100%',
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        borderColor: '#A8A8A8',
                      }}
                    >
                      <Image
                        style={{
                          width: '100%',
                          height: 50,
                          borderColor: '#F4CA16',
                          // flex: 1,
                          resizeMode: 'contain',
                        }}
                        source={PDF}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{width: '100%', paddingTop: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        HandleSelectDocFile ();
                        setvisible (false);
                      }}
                    >
                      <Image
                        style={{
                          width: '100%',
                          height: 50,
                          borderColor: '#F4CA16',
                          // flex: 1,
                          resizeMode: 'contain',
                        }}
                        source={Word}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </DialogContent>
            </Dialog>
          </View>
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
              height: 65,
            }}
            source={GifImageHomeScreen}
          />
        </View>
        {DisplaySpinner && <Loader />}
      </View>
    );
  }
};

export default TextToText;
