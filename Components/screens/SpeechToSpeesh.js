import React, {useState, useContext} from 'react';
import {View, Text, Animated, Image, TouchableOpacity} from 'react-native';
import {Context} from '../Context/Context';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Header from '../Header';
import Icon from 'react-native-vector-icons/FontAwesome';
const img = require ('../Images/Arrow.png');
const Speech_To_Speech = require ('../Images/voice-control.png');
const Mic = require ('../Images/Mic.png');
const Play = require ('../Images/Play.png');
const Filled = require ('../Images/Filled.png');
const UnFilled = require ('../Images/unfilled.png');
const image_to_text = require ('../Images/image_to_text-removebg-preview.png');
const BottomFig = require ('../Images/ButtomFig.gif');
let music = <Icon family={'FontAwesome'} name={'heart'} color={'#808080'} />;
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const icon1 = (
  <FontAwesome5 style={{fontSize: 21}} name={'chevron-down'} solid />
);
const CheckMArk = <FontAwesome5 style={{fontSize: 15}} name={'check'} solid />;
import {langs} from '../Example/Language';

const SpeechToSpeech = ({route, navigation}) => {
  const [SelectedValue, setSelectedValue] = useState ('From');
  const [SelectedValueTo, setSelectedValueTo] = useState ('To');
  const [ballAnimation, setballAnimation] = useState (new Animated.Value (0));
  const [ballAnimationTo, setballAnimationTo] = useState (
    new Animated.Value (0)
  );
  const [ToggleArrow, setToggleArrow] = useState (false);
  const [DisplayDropDown, setDisplayDropDown] = useState (false);
  const [DisplayDropDownTo, setDisplayDropDownTo] = useState (false);
  const [TextValue, setTextValue] = useState ('');
  const [ToggleArrowTo, setToggleArrowTo] = useState (false);
  const [SelectedIndex, setSelectedIndex] = useState (0);
  const [SelectedIndexTo, setSelectedIndexTo] = useState (0);
  const [SelectedHurt, setSelectedHurt] = useState (false);
  const [RadioButtonSelectedValue, setRadioButtonSelectedValue] = useState (0);
  const contextData = useContext (Context);
  contextData.HandleIsDark ();

  const animateBall = () => {
    if (ToggleArrow) {
      Animated.timing (ballAnimation, {
        toValue: 180,
        duration: 1500,
        useNativeDriver: true,
      }).start ();
    } else {
      Animated.timing (ballAnimation, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start ();
    }
  };

  const animateBallTo = () => {
    if (ToggleArrowTo) {
      Animated.timing (ballAnimationTo, {
        toValue: 180,
        duration: 1500,
        useNativeDriver: true,
      }).start ();
    } else {
      Animated.timing (ballAnimationTo, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start ();
    }
  };

  let {name} = route.params;
  let HeaderName = JSON.stringify (name);
  HeaderName = HeaderName.replace ('"', '').replace ('"', '');

  const ballInterpolateStyle = ballAnimation.interpolate ({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
  });

  const ballInterpolateStyleTo = ballAnimationTo.interpolate ({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
  });

  const ballAnimationFun = {
    transform: [
      {
        rotate: ballInterpolateStyle,
      },
    ],
  };

  const ballAnimationFunTo = {
    transform: [
      {
        rotate: ballInterpolateStyleTo,
      },
    ],
  };

  var radio_props = [
    {label: 'Feminine', value: 0},
    {label: 'Masculine', value: 1},
  ];

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
                      animateBall ();
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
                      <Animated.View
                        style={[
                          styles.boxAnimatedDropDownBox,
                          ballAnimationFun,
                        ]}
                      >
                        <Text style={styles.Icon}>{icon1}</Text>
                      </Animated.View>
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
                      animateBallTo ();
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
                      <Animated.View
                        style={[
                          styles.boxAnimatedDropDownBox,
                          ballAnimationFunTo,
                        ]}
                      >
                        <Text style={styles.Icon}>{icon1}</Text>
                      </Animated.View>
                    </View>
                  </TouchableOpacity>
                </View>
                {DisplayDropDownTo &&
                  <View
                    style={[
                      styles.OuterWrapperAnimatedDropDownList,
                      {backgroundColor: contextData.IsDark ? 'black' : 'white'},
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
          <TouchableOpacity>
            <View style={styles.OutercontainerBoxes}>
              <View style={{width: '100%'}}>
                <Image
                  style={{
                    width: '100%',
                    height: 65,
                    borderColor: '#F4CA16',
                    // flex: 1,
                    resizeMode: 'contain',
                  }}
                  source={Mic}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
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
        <View>
          {SelectedHurt
            ? <View style={{width: '100%'}}>
                <TouchableOpacity onPress={() => setSelectedHurt (false)}>
                  <Image
                    style={{
                      width: '100%',
                      height: 65,
                      borderColor: '#F4CA16',
                      resizeMode: 'contain',
                    }}
                    source={Filled}
                  />
                </TouchableOpacity>
              </View>
            : <View style={{width: '100%'}}>
                <TouchableOpacity onPress={() => setSelectedHurt (true)}>
                  <Image
                    style={{
                      width: '100%',
                      height: 65,
                      borderColor: '#F4CA16',
                      // flex: 1,
                      resizeMode: 'contain',
                    }}
                    source={UnFilled}
                  />
                </TouchableOpacity>
              </View>}
        </View>
      </View>
      <View
        style={{
          paddingTop: 12,
          backgroundColor: contextData.IsDark ? '#252526' : 'white',
        }}
      >
        <Image
          style={{
            width: '100%',
            height: 250,
            resizeMode: 'cover',
          }}
          source={BottomFig}
        />
      </View>
    </View>
  );
};

export default SpeechToSpeech;
