import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Pdf from 'react-native-pdf';
export default function PDFExample (props) {
  const source = {
    uri: props.uri,
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log (`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log (`Current page: ${page}`);
        }}
        onError={error => {
          console.log (error);
        }}
        onPressLink={uri => {
          console.log (`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
      <View style={styles.OuterWrapperButton}>
        <Text
          style={styles.Button}
          onPress={() => {
            props.setPDF_URI (null);
          }}
        >
          OK
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get ('window').width,
    height: Dimensions.get ('window').height,
  },
  OuterWrapperButton: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  Button: {
    width: '100%',
    backgroundColor: '#FF783E',
    color: 'white',
    padding: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 12,
  },
});
