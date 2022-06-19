import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
export default class Loader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});