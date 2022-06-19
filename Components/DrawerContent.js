import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import Dialog from 'react-native-dialog';
import {Context} from './Context/Context';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {svg} from './Images/icon.svg';
import {useNavigation} from '@react-navigation/native';
import DrawerGifImage from './Images/DrawerAnimatedPic.gif';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
{/* <i class="fa-solid fa-house-blank"></i> */}
export const Home = (
  <FontAwesome5
    style={{fontSize: 16, color: '#84959F'}}
    name='house-user'
    solid
  />
);
export const about = (
  <FontAwesome5
    style={{fontSize: 16, color: '#84959F'}}
    name='users'
    solid
  />
);
export function DrawerListList (props) {
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
  const contextData = useContext (Context);
  const LinksArray = [
    {
      Icon: Home,
      Label: 'Home',
      Screen: 'HomPage',
      selected: true,
      selectedPricePKR: false,
      selectedCartItemNumber: false,
    },
    {
      Icon: about,
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
          <View>
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
                <Text key={index}>
                  <DrawerListList key={index} item={item} />
                </Text>
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
  },
  Headingparagraph: {
    color: '#050505',
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
    width: 220,
    fontSize: 14,
  },
  LocationFontIcon: {
    textAlignVertical: 'center',
  },
});
