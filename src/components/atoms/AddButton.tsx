import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Colors } from 'react-native-paper';

interface Props {
  onPress: () => void;
  backgroundColor?: string;
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const AddButton = (props: Props) => {
  const { onPress, backgroundColor } = props;

  const fabStyle = {
    ...styles.fab,
    backgroundColor: backgroundColor || Colors.pink600,
  };

  return <FAB style={fabStyle} icon="plus" onPress={onPress} />;
};

export default AddButton;
