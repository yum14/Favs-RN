import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Appbar, Colors, Text } from 'react-native-paper';
import { getMessages } from '../../../../locales/i18n';

interface Props {
  onCancel?: () => void;
  onDone?: () => void;
}

const Header = (props: Props) => {
  const { onCancel, onDone } = props;
  const messages = getMessages();

  return (
    <Appbar.Header style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.action}>
            <Text style={styles.text}>{messages.fav_edit_cancel}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Appbar.Content title={messages.fav_edit_title} />
      <View style={styles.rightContainer}>
        <TouchableWithoutFeedback onPress={onDone}>
          <View style={styles.action}>
            <Text style={styles.text}>{messages.fav_edit_done}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {},
  leftContainer: {
    width: 80,
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
