import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../modules';
import { Favs as FavsPage } from '../components/pages';
import { Fav, PageInfo } from '../domain/models';
import * as Favs from '../usecase/favs';
import { set, remove } from '../modules/pageInfos';
import { StorageContext } from '../contexts';
import { sortAscCompare } from '../lib/collection';

const ConnectedFavs = () => {
  const storageContext = React.useContext(StorageContext);
  const appState = useSelector((state: AppState) => ({
    pageInfos: Object.keys(state.pageInfos).map(key => state.pageInfos[key]),
    categories: Object.keys(state.categories)
      .map(key => state.categories[key])
      .sort((a, b) => sortAscCompare(a.order, b.order)),
  }));

  const dispatch = useDispatch();
  const actions = React.useMemo(
    () => ({
      async setFavs() {
        // dispatch(Favs.setAndSync());
        const pageInfos = await Favs.getAsync(storageContext.applicationState)();
        dispatch(set(pageInfos));
      },
      addFav(values: Fav.Values) {
        dispatch(Favs.addAndSync(values, storageContext.applicationState));
      },
      removeFav(id: string) {
        dispatch(Favs.removeAndSync(id, storageContext.applicationState));
      },
      editFav(id: string, values: PageInfo.Model, newValues: PageInfo.Values) {
        dispatch(Favs.editAndSync(id, values, newValues, storageContext.applicationState));
      },
    }),
    [dispatch, storageContext],
  );

  return <FavsPage favs={appState.pageInfos} categories={appState.categories} actions={actions} />;
};

export default ConnectedFavs;
