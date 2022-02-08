import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Dialog from 'react-native-dialog';
import {Context} from './Context/Context';
import {ShoppingCart,Categories} from './Icons';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {svg} from './Images/icon.svg';
import {useNavigation} from '@react-navigation/native';
import DrawerGifImage from './Images/DrawerAnimatedPic.gif';
export function DrawerListList (props) {
  const [IsSignInToggle, setIsSignInToggle] = useState (false);
  const [visible, setVisible] = useState (false);
  const navigation = useNavigation ();
  const contextData = useContext (Context);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate (props.item.Screen, {
            name: props.item.Label,
          });
        }}
      >
        <Dialog.Container visible={visible}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Button
              style={{color: 'red', marginHorizontal: 7}}
              label="No"
              onPress={() => setVisible (false)}
            />
            <Dialog.Button
              style={{color: 'red', marginHorizontal: 4}}
              label="Yes"
              onPress={() => {
                storeData ();
                props.HandleToggle ();
              }}
            />
          </View>
        </Dialog.Container>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 12,
            display: props.item.selected ? 'flex' : 'none',
          }}
        >
          <Text style={{marginRight: 30, width: 20}}>
            {props.item.Icon}
          </Text>
          <View
            style={{
              color: '#3D3D3D',
              fontSize: 15,
              width: 200,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                position: 'relative',
                color: contextData.IsDark ? 'white' : 'black',
              }}
            >
              {props.item.Label}{' '}
            </Text>
            <Text
              style={{
                backgroundColor: '#18AE43',
                color: 'white',
                padding: 13,
                marginLeft: 12,
                // borderWidth: 1,
                borderRadius: 22,
                fontSize: 16,
                position: 'absolute',
                top: -15,
                left: 33,
                display: props.item.selectedPricePKR ? 'flex' : 'none',
              }}
            >
              {props.item.pricePkr}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export function DrawerContent (props) {
  const [IsSignInToggle, setIsSignInToggle] = useState (false);
  const [isEnabled, setIsEnabled] = useState (false);
  const [IsSignIn, setIsSignIn] = useState ('Sign In');
  const [ToggleModal, setToggleModal] = useState (false);
  const toggleSwitch = () => setIsEnabled (previousState => !previousState);
  const contextData = useContext (Context);
  const GetData = async () => {
    try {
      const value = await AsyncStorage.getItem ('UpdateScreen');
      if (value !== null) {
        let data = JSON.parse (value);
        setIsSignInToggle (data);
        if (data) {
          setIsSignIn ('Sign Out');
        } else {
          setIsSignIn ('Sign In');
        }
      }
    } catch (e) {
      console.log ('read error', e);
    }
  };

  useEffect (() => {
    GetData ();
  });

  function HandleToggle () {
    GetData ();
  }

  function HandleModal (toggleScreen) {
    setToggleModal (toggleScreen);
  }

  const LinksArray = [
    {
      Icon: Categories,
      Label: 'Home',
      Screen: 'HomPage',
      selected: true,
      selectedPricePKR: false,
      selectedCartItemNumber: false,
    },
    {
      Icon: ShoppingCart,
      Label: 'About Us',
      Screen: 'AboutUs',
      selected: true,
      selectedPricePKR: false,
      selectedCartItemNumber: false,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: contextData.IsDark ? 'black' : '#eaeaea',
      }}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <View style={[styles.drawerContent]}>
          <View style={styles.OuterWraperUserInfo}>
            <View
              style={{
                height: 250,
                width: '100%',
                borderRadius: 12,
                borderWidth: 2,
                padding: 2,
              }}
            >
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  // flex: 1,
                  // resizeMode: 'contain',
                  borderRadius: 12,
                }}
                source={DrawerGifImage}
              />
            </View>
          </View>
          <Image src={svg} />
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 18,
              borderBottomWidth: 1,
              marginHorizontal: -4,
              borderColor: '#C4C4C4',
            }}
          >
            {LinksArray.map ((item, index) => {
              return (
                <DrawerListList
                  key={index}
                  item={item}
                  HandleToggle={HandleToggle}
                />
              );
            })}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 12,
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
const styles = StyleSheet.create ({
  drawerContent: {
    flex: 1,
    padding: 4,
    // borderWidth: 1,
  },
  OuterWraperDrawerLinks: {
    // borderWidth: 1,
  },
  OuterWraperUserInfo: {
    // borderWidth: 1,
    // marginVertical:12
  },
  Headingparagraph: {
    color: '#050505',
    // borderWidth: 1,
    fontSize: 17,
    marginBottom: 12,
  },
  OuterWraperLocation: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingHorizontal: 12,
    color: '#B4B4B4',
    borderColor: '#B4B4B4',
    borderRadius: 8,
  },
  LocationTextHolder: {
    // borderWidth:1,
    width: 220,
    fontSize: 14,
  },
  LocationFontIcon: {
    // borderWidth:1,
    textAlignVertical: 'center',
  },
});
