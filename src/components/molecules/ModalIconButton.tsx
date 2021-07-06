import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Text } from 'react-native-paper';
import * as window from '../../lib/window';
import { COLOR } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND,
    // backgroundColor: 'red',
    width: window.width,
    borderWidth: 0,
    // paddingVertical: 12,
    paddingLeft: 8,
  },
  icon: {
    marginLeft: 12,
  },
  text: {
    color: Colors.grey900,
    fontFamily: 'System',
    fontWeight: '500',
    letterSpacing: 1,
    marginLeft: 32,
  },
});

interface Props {
  materialCommunityIcon: string;
  label: string;
  color?: string;
  onPress: () => void;
  paddingTop?: number;
  paddingBottom?: number;
}

const ModalIconButton = (props: Props) => {
  const {
    materialCommunityIcon: icon,
    label,
    color = Colors.grey900,
    onPress,
    paddingTop = 12,
    paddingBottom = 12,
  } = props;

  const containerStyle = {
    ...styles.container,
    paddingTop,
    paddingBottom,
  };

  const textStyle = {
    ...styles.text,
    color,
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={containerStyle}>
        <Icon style={styles.icon} size={24} color={color} name={icon} />
        <Text style={textStyle}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ModalIconButton;
