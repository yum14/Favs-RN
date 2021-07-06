import React from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CategorySwipeList } from '../../organisms';
import { Category, PageInfo } from '../../../domain/models';
import { CATEGORY_EDIT } from '../../../constants/path';
import { PaperHeader } from '../../../routes/Header';
import { default as NewCategory, State as NewCategoryState } from './New';
import { getMessages } from '../../../locales/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  list: {
    flex: 1,
    // backgroundColor: 'blue',
    // justifyContent: '',
    // alignItems: 'center',
  },
});

type State = {
  id: string;
  name: string;
  order: number;
  backgroundColor: string;
};

interface Props {
  categories: Array<State>;
  actions: {
    setCategories: () => void;
    addCategory: (values: Category.Values) => void;
    removeCategory: (id: string) => void;
    editFav: (id: string, values: PageInfo.Model, newValues: PageInfo.Values) => void;
    selectFavs: (categoryId: string) => PageInfo.Model[];
  };
}

const Categories = (props: Props) => {
  const { categories } = props;
  const { addCategory, removeCategory, editFav, selectFavs } = props.actions;
  const [newCategoryVisible, setNewCategoryVisible] = React.useState(false);
  const { navigate } = useNavigation();
  const [dialogRender, setDialogRender] = React.useState(false);
  const messages = getMessages();

  const refreshing = React.useMemo(() => {
    return false;
  }, []);
  const onRefresh = () => {};

  const containerStyle = React.useMemo(() => {
    return {
      ...styles.container,
      // paddingTop: insets.top,
    };
  }, []);

  const openDetail = React.useCallback(
    (id: string) => {
      navigate(CATEGORY_EDIT, { id: id });
    },
    [navigate],
  );

  const removeCategoryAndFavs = React.useCallback(
    (id: string) => {
      const favs = selectFavs(id);
      const noCategory = categories.find(value => value.name === 'No Category');
      if (noCategory) {
        removeCategory(id);
        favs.forEach(value => {
          editFav(value.id, value, { ...value, category: noCategory.id });
        });
      }
    },
    [removeCategory, selectFavs, categories, editFav],
  );

  const openNewCategory = React.useCallback(() => {
    setNewCategoryVisible(true);
  }, [setNewCategoryVisible]);

  const closeNewCategory = React.useCallback(() => {
    setNewCategoryVisible(false);
  }, [setNewCategoryVisible]);

  const createNewCategory = React.useCallback(
    (state: NewCategoryState) => {
      const newOrder = categories
        .map(value => value.order)
        .reduce((a, b) => {
          return Math.max(a, b);
        });

      addCategory({
        name: state.category,
        order: newOrder,
        backgroundColor: state.backgroundColor,
      });

      setNewCategoryVisible(false);
    },
    [categories, addCategory, setNewCategoryVisible],
  );

  const sortedCategories = React.useMemo(() => {
    return [...categories].sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });
  }, [categories]);

  React.useEffect(() => {
    setDialogRender(true);
  }, []);

  return (
    <View style={containerStyle}>
      <PaperHeader
        title={messages.title_category}
        leftButtonVisible={false}
        rightButtonVisible={true}
        rightButtonOptions={{
          icon: 'plus',
          onPress: openNewCategory,
        }}
      />
      <ScrollView style={styles.list} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.list}>
          <CategorySwipeList data={sortedCategories} onDeletePress={removeCategoryAndFavs} onRowPress={openDetail} />
        </View>
      </ScrollView>
      <NewCategory isOpen={newCategoryVisible} onClosed={closeNewCategory} onCreatePressed={createNewCategory} />
    </View>
  );
};

export default Categories;
