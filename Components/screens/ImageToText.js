import React, {useState, useContext} from 'react';
import {View, Text, Image, TouchableOpacity,ScrollViewxl} from 'react-native';
import {Context} from '../Context/Context';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../Header';
import axios from 'react-native-axios';
import RNTextDetector from 'rn-text-detector';
import Loader from '../Spinner';
const GifImageHomeScreen = require ('../Images/wellcome.jpg');
const img = require ('../Images/Arrow.png');
const Mic = require ('../Images/IconImage.png');
const Camera = require ('../Images/Camera.png');
const GalleryIcon = require ('../Images/gallery.png');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const icon1 = (
  <FontAwesome5 style={{fontSize: 21}} name={'chevron-down'} solid />
);
const CheckMArk = <FontAwesome5 style={{fontSize: 15}} name={'check'} solid />;
import {langs} from '../Example/Language';

const ImageToText = ({route, navigation}) => {
  const [SelectedValue, setSelectedValue] = useState ('From');
  const [SelectedValueTo, setSelectedValueTo] = useState ('To');
  const [ToggleArrow, setToggleArrow] = useState (false);
  const [DisplayDropDown, setDisplayDropDown] = useState (false);
  const [DisplayDropDownTo, setDisplayDropDownTo] = useState (false);
  const [ToggleArrowTo, setToggleArrowTo] = useState (false);
  const [SelectedIndex, setSelectedIndex] = useState (0);
  const [SelectedIndexTo, setSelectedIndexTo] = useState (0);
  const [visible, setvisible] = useState (false);
  const [TextFromImage, setTextFromImage] = useState ('Image Text...');
  const contextData = useContext (Context);
  const [DisplaySpinner, setDisplaySpinner] = useState (false);
  const [LanguageFrom, setLanguageFrom] = useState ('en');
  const [LanguageTo, setLanguageTo] = useState ('hi');
  const [TranslatedText, setTranslatedText] = useState ('Translated Text..');
  contextData.HandleIsDark ();
  let {name} = route.params;
  let HeaderName = JSON.stringify (name);
  HeaderName = HeaderName.replace ('"', '').replace ('"', '');

  const HandleCamera = () => {
    setvisible (false);
    ImagePicker.openCamera ({
      width: 300,
      height: 400,
      cropping: true,
    }).then (image => {
      if (image.path !== null) {
        convert (image.path);
      }
    });
  };

  const Gallery = async () => {
    setvisible (false);
    ImagePicker.openPicker ({
      width: 300,
      height: 400,
      cropping: true,
    }).then (image => {
      if (image.path !== null) {
        convert (image.path);
      }
    });
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
      data: {q: TextFromImage, source: LanguageFrom, target: LanguageTo},
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

  async function convert (path) {
    if (path !== null) {
      const textRecognition = await RNTextDetector.detectFromUri (path);
      let temp = [];
      for (let i = 0; i < textRecognition.length; i++) {
        if (textRecognition[i].text !== null) {
          temp.push (textRecognition[i].text);
        }
      }
      if (temp !== null && temp !== []) {
        let text = temp.toString ();
        text.replace (',', '');
        setTextFromImage (text);
      }
    }
  }
  return (
    <View style={{flex: 1}}>
      <Header name={HeaderName} ScreenName={false} EditButton={false} />
      <ScrollView>
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
                      height: 55,
                      borderColor: '#F4CA16',
                      // flex: 1,
                      resizeMode: 'contain',
                    }}
                    source={Mic}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
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
                    <View style={styles.container}>
                      <Dialog
                        visible={visible}
                        onTouchOutside={() => {
                          setvisible (false);
                        }}
                      >
                        <DialogContent
                          style={{
                            backgroundColor: contextData.IsDark
                              ? 'black'
                              : '#eaeaea',
                          }}
                        >
                          <View style={{width: 100, marginTop: 15}}>
                            <View
                              style={{
                                width: '100%',
                                paddingBottom: 10,
                                borderBottomWidth: 1,
                                borderColor: '#A8A8A8',
                              }}
                            >
                              <TouchableOpacity onPress={HandleCamera}>
                                <Image
                                  style={{
                                    width: '100%',
                                    height: 50,
                                    borderColor: '#F4CA16',
                                    // flex: 1,
                                    resizeMode: 'contain',
                                  }}
                                  source={Camera}
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={{width: '100%', paddingTop: 10}}>
                              <TouchableOpacity onPress={Gallery}>
                                <Image
                                  style={{
                                    width: '100%',
                                    height: 50,
                                    borderColor: '#F4CA16',
                                    // flex: 1,
                                    resizeMode: 'contain',
                                  }}
                                  source={GalleryIcon}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </DialogContent>
                      </Dialog>
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
              <TouchableOpacity>
                <View style={styles.OutercontainerBoxesTextToSpeech}>
                  <View style={{width: '100%', height: 65}}>
                    <Text
                      style={{color: contextData.IsDark ? 'white' : 'black'}}
                    >
                      {TextFromImage}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.OutercontainerBoxesTextToSpeech}>
                  <View style={{width: '100%', height: 65}}>
                    <Text
                      style={{color: contextData.IsDark ? 'white' : 'black'}}
                    >
                      {TranslatedText}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {DisplaySpinner && <Loader />}
              <View style={styles.OuterWrapperButtonImageToText}>
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
      </ScrollView>
    </View>
  );
};
export default ImageToText;
