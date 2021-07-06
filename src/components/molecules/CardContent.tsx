import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Caption } from 'react-native-paper';

const styles = StyleSheet.create({
  caption: {
    alignSelf: 'flex-end',
  },
});

export interface State {
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

type Props = State & Option;

const CardContent = (props: Props) => {
  const { title, desc, domain, options } = props;

  return (
    <Card.Content>
      <Title>{title}</Title>
      {desc && (
        <Paragraph numberOfLines={options?.numberOfLines} ellipsizeMode={options?.ellipsizeMode}>
          {desc}
        </Paragraph>
      )}
      {domain && <Caption style={styles.caption}>{domain}</Caption>}
    </Card.Content>
  );
};

export default CardContent;
