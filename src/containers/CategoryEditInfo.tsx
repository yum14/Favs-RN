import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CategoryEditInfo } from '../components/pages';
import { AppState } from '../modules';
import { useRoute, RouteProp } from '@react-navigation/native';
import * as Categories from '../usecase/categories';
import { StorageContext } from '../contexts';
import { Category } from '../domain/models';

interface Params {
  id: string;
}

const ConnectedCategoryEditInfo = () => {
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const storageContext = React.useContext(StorageContext);
  const appState = useSelector((state: AppState) =>
    Object.keys(state.categories)
      .map(key => state.categories[key])
      .find(item => item.id === params.id),
  )!;

  const dispatch = useDispatch();
  const actions = React.useMemo(
    () => ({
      editCategory(id: string, values: Category.Model, newValues: Category.Values) {
        dispatch(Categories.editAndSync(id, values, newValues, storageContext.applicationState));
      },
    }),
    [dispatch, storageContext],
  );

  return <CategoryEditInfo category={appState} actions={actions} />;
};

export default ConnectedCategoryEditInfo;
