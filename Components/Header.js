import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Share,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './Style';
const img = require ('./Images/setting.png');
const Menu = require ('./Images/menu.png');
const Ioupe = require ('./Images/search.png');
const LeftArrow = require ('./Images/left-arrow.png');
function Header (props) {
  const navigation = useNavigation ();
  if (props.name === undefined) {
    return (
      <SafeAreaView>
        <View style={styles.OutercontainerHeader}>
          <View
            style={{
              marginRight: 19,
              marginLeft: 5,
              elevation: 1,
              
            }}
          >
            <TouchableOpacity
              underlayColor="none"
              onPress={() => {
                navigation.openDrawer ();
              }}
            >
              <View style={{width: 23, height: 25}}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    resizeMode: 'contain',
                  }}
                  source={Menu}
                  tintColor="#F6783B"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.HeaderOuterWraperInputinput}>
            <Text style={{fontSize:25}}>Translator</Text>
          </View>
          <TouchableOpacity
            underlayColor="none"
            onPress={() => {
              navigation.navigate ('Settings', {
                name: 'Settings',
              });
            }}
          >
            <View>
              <View style={{width: 25, height: 25}}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    resizeMode: 'contain',
                  }}
                  source={img}
                  tintColor="#F6783B"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.OutercontainerHeader}>
          <View
            style={{display: 'flex', flexDirection: 'row', paddingVertical: 3}}
          >
            <View
              style={{
                marginRight: 10,
                marginLeft: 7,
                marginRight: 10,
              }}
            >
              <TouchableOpacity
                underlayColor="none"
                onPress={() => {
                  navigation.goBack ();
                }}
              >
                <View style={{width: 25, height: 25, zIndex: 1}}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      flex: 1,
                      resizeMode: 'contain',
                    }}
                    source={LeftArrow}
                    tintColor="#F6783B"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 290,
              }}
            >
              {props.Searchbarinputfield
                ? <SafeAreaView>
                    <View
                    >
                      <Text>TranslatorApp</Text>
                    </View>
                  </SafeAreaView>
                : <Text
                    style={{
                      // marginTop: 10,
                      fontSize: 20,
                      width: 190,
                    }}
                    numberOfLines={1}
                  >
                    {props.name}
                  </Text>}
              <View style={{display: 'flex', flexDirection: 'row'}}>
                {props.ScreenName &&
                  <TouchableOpacity
                  >
                    <View style={{ marginRight: 13}}>
                      <View style={{width: 25, height: 25}}>
                      </View>
                    </View>
                  </TouchableOpacity>}
                {props.ScreenName &&
                  <View style={{ marginRight: 13}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate ('SearchScreen', {
                          name: '',
                        });
                      }}
                    >
                      <View style={{width: 20, height: 20}}>
                        <Image
                          style={{
                            width: '100%',
                            height: '100%',
                            flex: 1,
                            resizeMode: 'contain',
                          }}
                          source={Ioupe}
                          tintColor="#F6783B"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>}
                {props.EditButton &&
                  <TouchableOpacity
                    underlayColor="none"
                    onPress={() => dispatch (TOGGLEEDITBUTTON (true))}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        // marginTop: 14,
                        marginRight: 10,
                      }}
                    >
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          flex: 1,
                          resizeMode: 'contain',
                        }}
                        source={EditIcon}
                        tintColor="#F6783B"
                      />
                    </View>

                  </TouchableOpacity>}
                {props.ScreenName
                  ? <View>
                      <TouchableOpacity
                        underlayColor="none"
                        onPress={() => {
                          navigation.navigate ('Settings', {
                            name: 'Settings',
                          });
                        }}
                      >
                        <View style={{}}>
                          <View style={{width: 25, height: 25}}>
                            <Image
                              style={{
                                width: '100%',
                                height: '100%',
                                flex: 1,
                                resizeMode: 'contain',
                              }}
                              source={img}
                              tintColor="#F6783B"
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  : <View>
                      <TouchableOpacity
                        underlayColor="none"
                        onPress={() => {
                          navigation.navigate ('Settings', {
                            name: 'Settings',
                          });
                        }}
                      >
                        <View style={{}}>
                          <View style={{width: 25, height: 25}}>
                            <Image
                              style={{
                                width: '100%',
                                height: '100%',
                                flex: 1,
                                resizeMode: 'contain',
                              }}
                              source={img}
                              tintColor="#F6783B"
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Header;
