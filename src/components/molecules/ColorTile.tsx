import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 3,
    width: 64,
    height: 64,
  },
});

interface Props {
  width: number;
  height: number;
  backgroundColor: string;
  iconName: string;
  iconSize: number;
  iconColor: string;
  iconVisible: boolean;
  onPress: () => void;
}

const ColorTile = (props: Props) => {
  const { width, height, backgroundColor, iconName, iconSize, iconColor, iconVisible, onPress } = props;

  const containerStyle = {
    ...styles.container,
    width,
    height,
    backgroundColor,
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={containerStyle}>{iconVisible && <Icon name={iconName} size={iconSize} color={iconColor} />}</View>
    </TouchableWithoutFeedback>
  );
};

export default ColorTile;
