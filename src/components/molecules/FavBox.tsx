import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  default as LinkCard,
  State as LinkCardState,
  Option as LinkCardOption,
  Action as LinkCardAction,
} from './LinkCard';
import {
  default as VideoCard,
  State as VideoCardState,
  Option as VideoCardOption,
  Action as VideoCardAction,
} from './VideoCard';
import { getDomain } from '../../lib/urlParser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',
    // overflow: 'hidden',
    // padding: 24,
  },
});

export type State = {
  id: string;
  uri: string;
  // order: number;
  comment?: string;
  category?: string;
  title: string;
  desc?: string;
  imageSource?: string;
};

export type Action = LinkCardAction;
export type Option = LinkCardOption;
export type Style = {
  paddingHorizontal?: number;
  paddingVertical?: number;
};

export type Props = State & Action & Option & Style;

const FavBox = (props: Props) => {
  const { paddingHorizontal, paddingVertical } = props;

  const containerStyle = {
    ...styles.container,
    paddingHorizontal,
    paddingVertical,
  };

  const domain = React.useMemo(() => {
    return getDomain(props.uri);
  }, [props.uri]);

  return (
    <View style={containerStyle}>
      {domain === 'www.youtube.com' ? (
        <VideoCard {...props} domain={domain} />
      ) : (
        <LinkCard {...props} domain={domain} />
      )}
    </View>
  );
};

export default FavBox;
