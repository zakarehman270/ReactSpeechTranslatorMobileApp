import React,{useContext} from 'react';
import {View, Text} from 'react-native';
import {Context} from '../Context/Context';
import Header from '../Header';
const Favourite = ({route, navigation}) => {
  let {name} = route.params;
  let HeaderName = JSON.stringify (name);
  HeaderName = HeaderName.replace ('"', '').replace ('"', '');
  const contextData = useContext (Context);
  contextData.HandleIsDark ();
  return (
    <View style={{flex: 1,backgroundColor: contextData.IsDark ? 'black' : '#eaeaea'}}>
      <Header name={HeaderName} ScreenName={false} EditButton={false} />
      <View style={[styles.Outercontainer,{backgroundColor: contextData.IsDark ? 'black' : '#eaeaea'}]}>
        <View style={[styles.OutercontainerHomeContentDropDownSpeechToText,{backgroundColor: contextData.IsDark ? '#252526' : 'white'}]}>
          <Text
          style={{color: contextData.IsDark ? 'white' : 'black'}}
          >No Items</Text>
        </View>
      </View>
    </View>
  );
};
export default Favourite;
