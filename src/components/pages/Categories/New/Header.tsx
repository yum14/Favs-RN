import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Appbar, Colors, Text } from 'react-native-paper';
import { getMessages } from '../../../../locales/i18n';

interface Props {
  onCancel?: () => void;
  onCreated?: () => void;
}

const Header = (props: Props) => {
  const { onCancel, onCreated } = props;
  const messages = getMessages();

  return (
    <Appbar.Header style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.action}>
            <Text style={styles.text}>{messages.category_new_cancel}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Appbar.Content title={messages.category_new_title} />
      <View style={styles.rightContainer}>
        <TouchableWithoutFeedback onPress={onCreated}>
          <View style={styles.action}>
            <Text style={styles.text}>{messages.category_new_create}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {},
  leftContainer: {
    width: 72,
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  action: {
    height: 40,
    justifyContent: 'center',
  },
  rightContainer: {
    width: 72,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default Header;
