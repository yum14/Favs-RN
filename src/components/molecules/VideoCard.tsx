import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Caption } from 'react-native-paper';
import CardContent from './CardContent';
import VideoCover from '../atoms/VideoCover';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export interface State {
  id: string;
  uri: string;
  title: string;
  desc?: string;
  domain?: string;
}

export interface Option {
  options?: {
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'tail' | 'middle' | 'clip';
  };
}

export interface Action {
  actions?: {
    onPress?: () => void;
    onLongPress?: () => void;
  };
}

type Props = State & Option & Action;

const LinkCard = (props: Props) => {
  const { title, desc, domain, uri, options, actions } = props;

  // TODO: 画像がなかった場合、デフォのローカル画像にする
  return (
    <View style={styles.container}>
      <Card onPress={actions?.onPress} onLongPress={actions?.onLongPress}>
        <VideoCover source={{ uri: uri }} />
        <CardContent title={title} desc={desc} domain={domain} options={options} />
      </Card>
    </View>
  );
};

export default LinkCard;
