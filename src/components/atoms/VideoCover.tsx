import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    height: 195,
    backgroundColor: Colors.grey200,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
});

interface Props {
  source: {
    uri: string;
  };
}

const VideoCover = (props: Props) => {
  const { source } = props;
  return (
    <View style={styles.container}>
      <WebView source={source} javaScriptEnabled={true} domStorageEnabled={true} />
    </View>
  );
};

export default VideoCover;
