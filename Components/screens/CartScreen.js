import React, {useState, useEffect, useContext} from 'react';
import {Context} from '../Context/Context';
// import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Header from '../Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({route, navigation}) => {
  const [IsDark, setIsDark] = useState (false);
  const [isEnabled, setIsEnabled] = useState (false);
  const contextData = useContext (Context);
  let {name} = route.params;
  let HeaderName = JSON.stringify (name);
  HeaderName = HeaderName.replace ('"', '').replace ('"', '');

  const toggleSwitch = () => {
    setIsEnabled (previousState => !previousState);
    setIsDark (isEnabled);
    AsyncStorage.setItem ('IsDark', JSON.stringify (isEnabled));

    contextData.HandleIsDark ();
  };

  useEffect (async () => {
    const value = await AsyncStorage.getItem ('IsDark');
    if (value !== null) {
      let data = JSON.parse (value);
      setIsDark (data);
      setIsEnabled (!data);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: IsDark ? 'black' : 'white',
      }}
    >
      <Header name={HeaderName} EditButton={false} ScreenName={false} />
      <View style={{paddingHorizontal: 15, marginTop: 32}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlignVertical: 'center',
              color: IsDark ? 'white' : 'black',
            }}
          >
            Dark Mode
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate ('Favourite', {
              name: 'Favourite',
            });
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlignVertical: 'center',
                marginTop: 20,
                color: IsDark ? 'white' : 'black',
              }}
            >
              Favourite List
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
