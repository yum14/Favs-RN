import React from 'react';
import { useDispatch } from 'react-redux';
import { Initial } from '../components/pages';
import * as Favs from '../usecase/favs';
import * as Categories from '../usecase/categories';
import { set as setPageInfos } from '../modules/pageInfos';
import { set as setCategories } from '../modules/categories';
import { StorageContext } from '../contexts';
import { createTestData } from '../test/testData';

const ConnectedInitial = () => {
  const storageContext = React.useContext(StorageContext);
  const dispatch = useDispatch();
  const actions = React.useMemo(
    () => ({
      async setFavs() {
        await createTestData(storageContext.applicationState);

        const getCategories = Categories.getAsync(storageContext.applicationState)();
        const getFavs = Favs.getAsync(storageContext.applicationState)();
        const categories = await getCategories;
        const favs = await getFavs;

        dispatch(setPageInfos(favs));
        dispatch(setCategories(categories));
      },
    }),
    [dispatch, storageContext],
  );

  // React.useEffect(() => {
  //   createTestData(storageContext.applicationState);
  // }, []);

  return <Initial actions={actions} />;
};

export default ConnectedInitial;
