import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Menu, Text } from 'react-native-paper';
import { CategorySelectRow } from '../molecules';

export type CategoryState = {
  id: string;
  name: string;
  order: number;
  backgroundColor: string;
};

interface Props {
  visible?: boolean;
  anchor: any;
  onDismiss: () => void;
  categories: Array<CategoryState>;
  onSelected: (id: string) => void;
}

const CategorySelectMenu = (props: Props) => {
  const { visible = false, anchor, onDismiss, categories, onSelected } = props;

  const getRowPressCallback = (id: string) => {
    return () => {
      onSelected(id);
    };
  };

  return (
    <View style={styles.container}>
      <Menu visible={visible} onDismiss={onDismiss} anchor={anchor}>
        <ScrollView style={{ maxHeight: 200, width: 300 }}>
          <FlatList
            data={categories}
            ListHeaderComponent={<View style={styles.header} />}
            ListFooterComponent={<View style={styles.footer} />}
            renderItem={({ item }) => (
              <CategorySelectRow
                label={item.name}
                categoryColor={item.backgroundColor}
                onPress={getRowPressCallback(item.id)}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <View>
                <Text>No Items</Text>
              </View>
            }
            // ListHeaderComponent={props.header}
          />
        </ScrollView>
      </Menu>
    </View>
    // </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 64,
    // backgroundColor: 'red',
    // padding: 50,
    // padding: 20,
    // margin:
  },
  separator: {
    height: 24,
    // backgroundColor: 'red',
  },
  header: {
    height: 12,
  },
  footer: {
    height: 12,
  },
});

export default CategorySelectMenu;
