import { Linking } from 'react-native';

export const openURL = (url: string) => {
  return async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };
};

// https://sodocumentation.net/ja/react-native/topic/9687/%E3%83%8D%E3%82%A4%E3%83%86%E3%82%A3%E3%83%96api%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF
// https://ogutzcyan.doorblog.jp/archives/55161342.html
// twitter: https://egpt.me/blog/archives/616
const schemeList = [
  { type: 'youtube', domain: 'youtube.com', scheme: 'youtube://' },
  { type: 'twitter', domain: 'twitter.com', scheme: 'twitter://' },
];

export const changeScheme = (url: string) => {};
