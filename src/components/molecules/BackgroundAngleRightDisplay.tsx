import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tile: {
    borderRadius: 3,
    margin: 8,
    height: 24,
    width: 24,
    backgroundColor: COLOR.BLACK_MAIN_TEXT,
  },
  text: {
    color: COLOR.BLACK_MAIN_TEXT,
    fontSize: 16,
  },
  icon: {
    marginLeft: 4,
  },
});

interface Props {
  label: string;
  selectedColor: string;
  onPress: () => void;
}

const BackgroundAngleRightDisplay = (props: Props) => {
  const { label, selectedColor, onPress } = props;
  const tileStyle = {
    ...styles.tile,
    backgroundColor: selectedColor,
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
        <View style={styles.rightContainer}>
          <View style={tileStyle} />
          <Icon style={styles.icon} name="chevron-right" size={32} color={COLOR.BLACK_MAIN_TEXT} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BackgroundAngleRightDisplay;
