import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR } from '../../constants/theme';

interface Props {
  label: string;
}

const AngleRightDisplay = (props: Props) => {
  const { label } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <Icon style={styles.icon} name="chevron-right" size={32} color={COLOR.BLACK_MAIN_TEXT} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
    height: 80,
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  icon: {
    width: 32,
  },
  text: {
    color: COLOR.BLACK_MAIN_TEXT,
    fontSize: 16,
    marginRight: 16,
    width: 280,
  },
});

export default AngleRightDisplay;
