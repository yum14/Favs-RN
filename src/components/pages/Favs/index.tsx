import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScrollableTabView, { ChangeTabProperties } from 'react-native-scrollable-tab-view';
import Clipboard from '@react-native-community/clipboard';
import SafeAreaView from 'react-native-safe-area-view';
import { Colors, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import { WEBVIEW } from '../../../constants/path';
import { FavList } from '../../organisms';
// import { State as FavBoxState } from '../../molecules/FavBox';
import { State as FavListState } from '../../organisms/FavList';
import { AddButton } from '../../atoms';
import { Fav, PageInfo } from '../../../domain/models';
import FavOperationMenu from '../../organisms/FavOperationMenu';
import { default as ScrollableTabBar, TabStylesForEachTabLabel } from '../../molecules/ScrollableTabBar';
import { default as NewFav, State as NewFavState } from './New';
import FavEditInfo from './EditInfo';
import { createTwoButtonAlert } from '../../../lib/alert';
import { sortAscCompare } from '../../../lib/collection';
import { getMessages } from '../../../locales/i18n';

// export type FavState = FavListState;
export type FavState = PageInfo.Model;
export type CategoryState = {
  id: string;
  name: string;
  order: number;
  backgroundColor: string;
};

interface Props {
  favs: Array<FavState>;
  categories: Array<CategoryState>;
  actions: {
    setFavs: () => Promise<void>;
    addFav: (values: Fav.Values) => void;
    removeFav: (id: string) => void;
    editFav: (id: string, values: PageInfo.Model, newValues: PageInfo.Values) => void;
  };
}

const initialFav: FavState = {
  id: '',
  uri: '',
  title: '',
  order: 0,
  createdAt: '',
  updatedAt: '',
};

const initialTab = (categories: Array<CategoryState>) => {
  return {
    backgroundColor: categories[0].backgroundColor,
    categoryId: categories[0].id,
  };
};

const Favs = (props: Props) => {
  const { favs, categories } = props;
  const { setFavs, addFav, removeFav, editFav } = props.actions;
  const { navigate } = useNavigation();

  const [newFavDialogVisible, setNewFavDialogVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [operationMenuVisible, setOperationMenuVisible] = React.useState(false);
  const [selectFav, setSelectFav] = React.useState(initialFav);
  const [editInfoVisible, setEditInfoVisible] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(initialTab(categories));

  const messages = getMessages();

  const showNewFav = React.useCallback(() => {
    setNewFavDialogVisible(true);
  }, [setNewFavDialogVisible]);

  const newFavSubmit = React.useCallback(
    (state: NewFavState) => {
      setNewFavDialogVisible(false);
      addFav({ uri: state.uri, category: state.categoryId, order: Math.max(...favs.map(p => p.order)) + 1 });
    },
    [addFav, setNewFavDialogVisible, favs],
  );

  const newFavDismiss = React.useCallback(() => {
    setNewFavDialogVisible(false);
  }, [setNewFavDialogVisible]);

  const onCardPress = React.useCallback(
    (state: FavListState) => {
      setOperationMenuVisible(false);
      navigate(WEBVIEW, { uri: state.uri });
    },
    [navigate, setOperationMenuVisible],
  );

  const onCardLongPress = React.useCallback(
    (state: FavListState) => {
      const fav = favs.find(item => item.id === state.id);
      if (fav) {
        setSelectFav(fav);
      }
      setOperationMenuVisible(true);
    },
    [favs, setSelectFav, setOperationMenuVisible],
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setFavs().then(() => {
      setRefreshing(false);
    });
  }, [setRefreshing, setFavs]);

  const onOperationMenuClosed = React.useCallback(() => {
    // setSelectFav(initialFav);
    setOperationMenuVisible(false);
  }, [setOperationMenuVisible]);

  const onEditInfoClosed = React.useCallback(() => {
    setEditInfoVisible(false);
  }, [setEditInfoVisible]);

  const onDelete = React.useCallback(() => {
    setOperationMenuVisible(false);

    if (selectFav) {
      const remove = () => {
        removeFav(selectFav.id);
      };

      createTwoButtonAlert(
        messages.favs_delete_dialog_title,
        messages.favs_delete_dialog_desc,
        {
          text: messages.favs_delete_dialog_cancel,
          onPress: () => {},
        },
        {
          text: messages.favs_delete_dialog_delete,
          onPress: remove,
        },
        {
          cancelable: false,
        },
      );
    }
    setSelectFav(initialFav);
  }, [selectFav, messages, removeFav, setOperationMenuVisible, setSelectFav]);

  const onCopy = React.useCallback(() => {
    if (!selectFav.id) {
      return;
    }
    Clipboard.setString(selectFav.uri);
    setOperationMenuVisible(false);
    // setSelectFav(initialFav);
  }, [selectFav, setOperationMenuVisible]);

  const onShare = React.useCallback(() => {
    if (!selectFav.id) {
      return;
    }
    const options = {
      message: selectFav.uri,
      title: 'Fav',
    };
    setOperationMenuVisible(false);
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
    // setSelectFav(initialFav);
  }, [selectFav]);

  const onEdit = React.useCallback(() => {
    setOperationMenuVisible(false);
    setEditInfoVisible(true);
  }, [setOperationMenuVisible, setEditInfoVisible]);

  const onMoveDown = React.useCallback(() => {
    if (!selectFav.id) {
      setOperationMenuVisible(false);
      return;
    }
    const fav = favs.find(item => item.id === selectFav.id);
    if (!fav) {
      setOperationMenuVisible(false);
      return;
    }
    const newOrder = fav.order - 1;
    const previousValue = favs.find(item => item.order === newOrder && item.category === fav.category);
    if (!previousValue) {
      setOperationMenuVisible(false);
      return;
    }
    const newSelectedValue = { ...fav, order: newOrder };
    editFav(fav.id, fav, newSelectedValue);

    const previousNewValue = { ...previousValue, order: previousValue.order + 1 };
    editFav(previousValue.id, previousValue, previousNewValue);
    setOperationMenuVisible(false);
    setSelectFav(newSelectedValue);
  }, [selectFav, setSelectFav, favs, editFav, setOperationMenuVisible]);

  const onMoveUp = React.useCallback(() => {
    if (!selectFav.id) {
      setOperationMenuVisible(false);
      return;
    }
    const fav = favs.find(item => item.id === selectFav.id);
    if (!fav) {
      setOperationMenuVisible(false);
      return;
    }
    const newOrder = fav.order + 1;
    const previousValue = favs.find(item => item.order === newOrder && item.category === fav.category);
    if (!previousValue) {
      setOperationMenuVisible(false);
      return;
    }
    const newSelectedValue = { ...fav, order: newOrder };
    editFav(fav.id, fav, newSelectedValue);

    const previousNewValue = { ...previousValue, order: previousValue.order - 1 };
    editFav(previousValue.id, previousValue, previousNewValue);
    setOperationMenuVisible(false);
    setSelectFav(newSelectedValue);
  }, [selectFav, setSelectFav, favs, editFav, setOperationMenuVisible]);

  const updateFav = React.useCallback(
    (values: PageInfo.Model, newValues: PageInfo.Values) => {
      editFav(values.id, values, newValues);
      setEditInfoVisible(false);
    },
    [editFav, setEditInfoVisible],
  );

  const getFavsByCategory = React.useCallback((categoryId: string, values: FavListState[]) => {
    const result = values
      .filter(value => value.category === categoryId)
      .sort((a, b) => sortAscCompare(a.order, b.order));

    return result;
  }, []);

  const getStylesForEachTabLabel = (categoryStates: Array<CategoryState>): Array<TabStylesForEachTabLabel> => {
    return categoryStates.map(category => ({
      tabLabel: category.name,
      style: {
        ...styles.tab,
        backgroundColor: category.backgroundColor || undefined,
      },
    }));
  };

  const onChangeTab = React.useCallback(
    (value: ChangeTabProperties) => {
      setSelectedTab({
        backgroundColor: value.ref.props.tabColor,
        categoryId: value.ref.props.categoryId,
      });
    },
    [setSelectedTab],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollableTabView
        onChangeTab={onChangeTab}
        renderTabBar={() => <ScrollableTabBar tabStylesForEachTabLabel={getStylesForEachTabLabel(categories)} />}
      >
        {categories.map(category => {
          const favsByCategory = getFavsByCategory(category.id, favs);
          return (
            <ScrollView
              key={category.id}
              categoryId={category.id}
              tabLabel={category.name}
              tabColor={category.backgroundColor}
              // contentContainerStyle={styles.container}
              // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              {favsByCategory.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Icon style={styles.emptyIcon} size={88} color={Colors.grey500} name="tag-heart" />
                  <Text style={styles.emptyText}>Add Your Favs</Text>
                </View>
              ) : (
                <FavList
                  data={getFavsByCategory(category.id, favs)}
                  actions={{ onCardPress: onCardPress, onCardLongPress: onCardLongPress }}
                />
              )}
            </ScrollView>
          );
        })}
      </ScrollableTabView>
      <AddButton onPress={showNewFav} backgroundColor={selectedTab?.backgroundColor} />
      <FavOperationMenu
        visible={operationMenuVisible}
        onClosed={onOperationMenuClosed}
        onCopy={onCopy}
        onShare={onShare}
        onEdit={onEdit}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
      <NewFav
        visible={newFavDialogVisible}
        categories={categories}
        onDismiss={newFavDismiss}
        onSubmit={newFavSubmit}
        categoryId={selectedTab?.categoryId}
      />
      <FavEditInfo
        fav={selectFav}
        isOpen={editInfoVisible}
        update={updateFav}
        onClosed={onEditInfoClosed}
        categories={categories}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 64,
    height: 240,
    // backgroundColor: 'red',
  },
  emptyIcon: {},
  emptyText: {
    color: Colors.grey500,
    fontSize: 24,
    marginTop: 8,
  },
});

export default Favs;
