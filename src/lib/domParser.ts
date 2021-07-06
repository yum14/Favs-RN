import DOMParser from 'react-native-html-parser';

export const createParser = () => {
  return new DOMParser.DOMParser();
};
