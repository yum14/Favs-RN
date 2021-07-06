import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.redA700,
    paddingHorizontal: 18,
  },
});

interface Props {
  onPress: () => void;
}

const DeleteButton = (props: Props) => {
  const { onPress } = props;
  return (
    // <IconButton style={styles.container} onPress={onPress} size={32} color={Colors.white} icon="trash-can-outline" />
    <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
      <Icon size={32} color={Colors.white} name="trash-can-outline" />
    </TouchableWithoutFeedback>
  );
};

export default DeleteButton;
