import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Colors } from 'react-native-paper';
import { COLOR } from '../../constants/theme';

interface Props {
  tileColor: string;
  label: string;
}

const CategorySelectField = (props: Props) => {
  const { label, tileColor } = props;
  const tileStyle = {
    ...styles.tile,
    backgroundColor: tileColor,
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <View style={tileStyle} />
        <Text style={styles.selectedCategory}>{label}</Text>
      </View>
      <Icon style={styles.icon} name="chevron-down" size={24} color={COLOR.BLACK_MAIN_TEXT} />
      {/* <Icon name="menu-down" size={28} color={COLOR.BLACK_MAIN_TEXT} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.grey400,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tile: {
    marginLeft: 4,
    borderRadius: 50,
    width: 18,
    height: 18,
    backgroundColor: 'red',
  },
  selectedCategory: {
    marginLeft: 16,
    color: Colors.grey700,
    fontSize: 16,
  },
  icon: {
    marginRight: 2,
  },
});

export default CategorySelectField;
