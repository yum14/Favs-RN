import React from 'react';
import Storage from 'react-native-storage';
import { add as addFav } from '../domain/repositories/favs';
import { add as addCategory } from '../domain/repositories/categories';
import { StorageContext } from '../contexts';
import * as Favs from '../usecase/favs';
import * as Categories from '../usecase/categories';
import { Category, Fav } from '../domain/models';

const CATEGORY_KEY = 'categories';
const FAVS_KEY = 'favs';

export const createTestData = async (storage: Storage) => {
  // const storageContext = React.useContext(StorageContext);
  await storage.clearMapForKey(CATEGORY_KEY);
  await storage.clearMapForKey(FAVS_KEY);

  createTestCategories(
    [
      { name: 'recipe', order: 1, backgroundColor: '#0168b3' },
      { name: 'technology', order: 2, backgroundColor: '#d06da3' },
      { name: 'hoby', order: 3, backgroundColor: '#88b83e' },
      { name: 'No Category', order: 0, backgroundColor: '#000' },
    ],
    storage,
  );

  await new Promise(resolve => setTimeout(() => resolve(), 500));

  const getCategories = Categories.getAsync(storage)();
  const categories = await getCategories;
  const cats = Object.keys(categories).map(key => categories[key]);

  createTestFavs(
    [
      { uri: 'https://eng-entrance.com/linux-command-nohup', order: 0, category: cats[0].id },
      { uri: 'https://www.youtube.com/embed/1RIcdpwPSlA', order: 1, category: cats[0].id },
      { uri: 'https://qiita.com/ysk24ok/items/57daed08592f7f8d1bea', order: 2, category: cats[0].id },
      { uri: 'https://qiita.com/jnchito/items/42193d066bd61c740612', order: 0, category: cats[1].id },
    ],
    storage,
  );
  await new Promise(resolve => setTimeout(() => resolve(), 500));
};

const createTestCategories = async (values: Category.Values[], storage: Storage) => {
  values.forEach(async element => {
    await addCategory(Category.factory(element), storage);
  });
};

const createTestFavs = async (values: Fav.Values[], storage: Storage) => {
  values.forEach(async element => {
    await addFav(Fav.factory(element), storage);
  });
};
