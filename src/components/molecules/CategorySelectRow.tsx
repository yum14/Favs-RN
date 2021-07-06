import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
  categoryColor: string;
  label: string;
  onPress: () => void;
}

const CategorySelectRow = (props: Props) => {
  const { categoryColor, label, onPress } = props;

  const tileStyle = {
    ...styles.tile,
    backgroundColor: categoryColor,
  };

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
      <View style={tileStyle} />
      <Text style={styles.label}>{label}</Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tile: {
    marginLeft: 16,
    borderRadius: 50,
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },
  label: {
    marginLeft: 24,
  },
});

export default CategorySelectRow;
