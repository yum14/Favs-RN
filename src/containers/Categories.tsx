import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../modules';
import { Categories as CategoriesPage } from '../components/pages';
import { StorageContext } from '../contexts';
import * as Categories from '../usecase/categories';
import { set } from '../modules/categories';
import { Category } from '../domain/models';
import { Fav, PageInfo } from '../domain/models';
import * as Favs from '../usecase/favs';

const ConnectedCategories = () => {
  const storageContext = React.useContext(StorageContext);
  // const appState = useSelector((state: AppState) => Object.keys(state.categories).map(key => state.categories[key]));
  const appState = useSelector((state: AppState) => ({
    pageInfos: Object.keys(state.pageInfos).map(key => state.pageInfos[key]),
    categories: Object.keys(state.categories).map(key => state.categories[key]),
  }));
  const dispatch = useDispatch();
  const actions = React.useMemo(
    () => ({
      async setCategories() {
        const categories = await Categories.getAsync(storageContext.applicationState)();
        dispatch(set(categories));
      },
      addCategory(values: Category.Values) {
        dispatch(Categories.addAndSync(values, storageContext.applicationState));
      },
      removeCategory(id: string) {
        dispatch(Categories.removeAndSync(id, storageContext.applicationState));
      },
      editFav(id: string, values: PageInfo.Model, newValues: PageInfo.Values) {
        dispatch(Favs.editAndSync(id, values, newValues, storageContext.applicationState));
      },
      selectFavs(categoryId: string) {
        return appState.pageInfos.filter(value => value.category === categoryId);
      },
    }),
    [dispatch, storageContext, appState],
  );

  return <CategoriesPage categories={appState.categories} actions={actions} />;
};

export default ConnectedCategories;
