import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const icon1 = (
  <FontAwesome5 style={{fontSize: 21}} name={'chevron-down'} solid />
);
export default function AnimetedArrowIcon() {
  const [ballAnimation, setballAnimation] = useState(new Animated.Value(0));
  const [ToggleArrow, setToggleArrow] = useState(false);

  const animateBall = () => {
    if (ToggleArrow) {
      Animated.timing(ballAnimation, {
        toValue: 180,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(ballAnimation, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }
  };
  
  const ballInterpolateStyle = ballAnimation.interpolate({
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
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setToggleArrow(!ToggleArrow);
          animateBall();
        }}>
        <Animated.View style={[styles.box, ballAnimationFun]}>
          <Text style={styles.Icon}>{icon1}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    fontSize: 21,
  },
  Icon: {
    color: '#F28029',
  },
});
