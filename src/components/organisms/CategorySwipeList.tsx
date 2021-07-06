import React from 'react';
import { StyleSheet, View, ListRenderItemInfo } from 'react-native';
import { SwipeListView, RowMap, SwipeRow } from 'react-native-swipe-list-view';
import { Text } from 'react-native-paper';
import { COLOR } from '../../constants/theme';
import { DeleteButton } from '../atoms';
import { AngleRightDisplay } from '../molecules';
import { createTwoButtonAlert } from '../../lib/alert';
import { getMessages } from '../../locales/i18n';

type State = {
  id: string;
  name: string;
  order: number;
  backgroundColor: string;
};

type ListRow = State & {
  key: string;
};

interface Props {
  data: Array<State>;
  onDeletePress: (id: string) => void;
  onRowPress: (id: string) => void;
}

const createInitialData = (data: State[]) => {
  return data.map(value => ({
    ...value,
    key: value.id,
  }));
};

const CategorySwipeList = (props: Props) => {
  const { data, onDeletePress, onRowPress } = props;
  const messages = getMessages();

  const closeAllRow = React.useCallback((rowMap: RowMap<ListRow>, rowKey: string) => {
    Object.keys(rowMap).forEach(key => {
      if (rowMap[key]) {
        rowMap[key].closeRow();
      }
    });
  }, []);

  const deleteRow = React.useCallback(
    (rowMap: RowMap<ListRow>, rowKey: string) => {
      closeAllRow(rowMap, rowKey);
      onDeletePress(rowKey);
    },
    [closeAllRow, onDeletePress],
  );

  const onRowFrontPress = React.useCallback(
    (rowMap: RowMap<ListRow>, rowKey: string) => {
      onRowPress(rowKey);
      closeAllRow(rowMap, rowKey);
    },
    [closeAllRow, onRowPress],
  );

  const onDeleteButtonPress = React.useCallback(
    (rowMap: RowMap<ListRow>, rowKey: string) => {
      createTwoButtonAlert(
        messages.category_delete_dialog_title,
        messages.category_delete_dialog_desc,
        {
          text: messages.category_delete_dialog_cancel,
          onPress: () => {
            closeAllRow(rowMap, rowKey);
          },
        },
        {
          text: messages.category_delete_dialog_delete,
          onPress: () => {
            deleteRow(rowMap, rowKey);
          },
        },
        {
          cancelable: false,
        },
      );
    },
    [closeAllRow, deleteRow, messages],
  );

  const renderItem = (rowData: ListRenderItemInfo<ListRow>, rowMap: RowMap<ListRow>) => {
    const tileStyle = {
      ...styles.tile,
      backgroundColor: rowData.item.backgroundColor,
    };

    return (
      <SwipeRow
        // style={styles.rowFront}
        onRowPress={() => {
          onRowFrontPress(rowMap, rowData.item.key);
        }}
      >
        <></>
        <View style={styles.rowFront}>
          <View style={tileStyle} />
          <AngleRightDisplay label={rowData.item.name} />
        </View>
      </SwipeRow>
    );
  };

  const renderHiddenItem = (rowData: ListRenderItemInfo<ListRow>, rowMap: RowMap<ListRow>) => (
    <View style={styles.rowBack}>
      <DeleteButton
        onPress={() => {
          onDeleteButtonPress(rowMap, rowData.item.key);
        }}
      />
    </View>
  );

  return (
    <SwipeListView
      data={data.map(value => ({ ...value, key: value.id }))}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      ListEmptyComponent={
        <>
          <Text>No Items</Text>
        </>
      }
      rightOpenValue={-80}
      leftOpenValue={0}
    />
  );
};

const styles = StyleSheet.create({
  rowFront: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBack: {
    backgroundColor: COLOR.BACKGROUND,
    // height: 96,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tile: {
    marginHorizontal: 16,
    borderRadius: 50,
    width: 24,
    height: 24,
  },
});

export default CategorySwipeList;
