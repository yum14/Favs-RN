import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView as ReactWebView } from 'react-native-webview';
import { useRoute, RouteProp } from '@react-navigation/native';
import { PaperHeader } from '../../../routes/Header';
import { getDomain } from '../../../lib/urlParser';

const DEFAULT_URI = 'https://google.com';

interface Params {
  uri: string;
}

interface Props {
  uri: string;
}

// TODO: インジケータのカスタム

const WebView = (props: Props) => {
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const domain = getDomain(params.uri);

  return (
    <View style={styles.container}>
      <PaperHeader
        title={domain}
        leftButtonVisible={true}
        leftButtonOptions={{ icon: 'back' }}
        rightButtonVisible={false}
      />
      <ReactWebView
        source={{ uri: props.uri || params.uri || DEFAULT_URI }}
        startInLoadingState={true}
        // javaScriptEnabled={false}
        allowsBackForwardNavigationGestures={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebView;
