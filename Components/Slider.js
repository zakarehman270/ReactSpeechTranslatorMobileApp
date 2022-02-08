import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
const carasoleImagePic1 = require ('./Images/carasoleImg1.jpg');
const carasoleImagePic2 = require ('./Images/carasoleImg2.jpg');
const carasoleImagePic3 = require ('./Images/carasoleImg3.jpg');
const carasoleImagePic4 = require ('./Images/carasoleImg4.jpg');
export default class MyCarousel extends Component {
  constructor (props) {
    super (props);
    this.state = {
      images: [
        carasoleImagePic1,
        carasoleImagePic2,
        carasoleImagePic3,
        carasoleImagePic4,
      ],
    };
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 335,
          // borderWidth:1,
          marginTop: 7,
          height: 140,
        }}
      >
        <View style={{}}>
          <SliderBox
            circleLoop={true}
            ImageComponentStyle={{
              height: '100%',
              width: '93%',
              resizeMode: 'contain',
              borderRadius: 3,
            }}
            dotStyle={{display: 'none'}}
            autoplay={true}
            images={this.state.images}
            onCurrentImagePressed={index =>
              console.warn (`image ${index} pressed`)}
          />
        </View>
      </View>
    );
  }
}
