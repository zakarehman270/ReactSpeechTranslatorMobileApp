import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Context} from '../Context/Context';
import Header from '../Header';
const AboutUs = ({route, navigation}) => {
  let {name} = route.params;
  let HeaderName = JSON.stringify (name);
  HeaderName = HeaderName.replace ('"', '').replace ('"', '');
  const contextData = useContext (Context);
  contextData.HandleIsDark ();
  return (
    <View style={{flex: 1}}>
      <Header name={HeaderName} ScreenName={false} EditButton={false} />
      <View
        style={[
          styles.Outercontainer,
          {backgroundColor: contextData.IsDark ? 'black' : '#eaeaea',borderWidth:1,paddingBottom:123},
        ]}
      >
        <View style={[styles.OutercontainerHomeContentDropDownSpeechToText, {backgroundColor: contextData.IsDark ? '#252526' : 'white'}]}>
          <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 12,color: contextData.IsDark?"white":"black"}}>
            App OverView
          </Text>
          <View style={styles.outerWrapperAppOurView}>
            <Text style={{lineHeight: 24, letterSpacing: 2,color: contextData.IsDark?"white":"black"}}>
              Nowadays, most speech-to-speech translation applications and services use a three-step
              process. The first step is the speech to text translation using speech recognition. This
              is followed by text to text language translation and finally, the text is synthesized into
              speech. As the availability of data and computing power improved, each of these individ-
              ual steps advanced over time. Although the progress was significant, there was always
              error associated with the first translation step in terms of various factors such as tone
              recognition of the speech, accent, etc.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AboutUs;
