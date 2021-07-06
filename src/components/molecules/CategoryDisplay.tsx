import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
    height: 120,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: COLOR.BLACK_MAIN_TEXT,
    fontSize: 16,
  },
});

interface Props {
  label: string;
  iconVisible?: boolean;
}

const CategoryDisplay = (props: Props) => {
  const { label, iconVisible = false } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      {iconVisible && <Icon name="check-bold" size={32} color={COLOR.BLACK_MAIN_TEXT} />}
    </View>
  );
};

export default CategoryDisplay;
