import { Category, Categories } from '../models';
import Storage from 'react-native-storage';

const KEY = 'categories';

export const getAll = async (storage: Storage): Promise<Categories.Model> => {
  return await storage
    .getAllDataForKey(KEY)
    .then(categories => {
      return Categories.factory(categories);
    })
    .catch(err => {
      console.log(err);
      return Categories.factory();
    });
};

export const add = (category: Category.Model, storage: Storage): Promise<void> => {
  return storage.save({
    key: KEY,
    id: category.id,
    data: category,
  });
};

export const remove = (id: string, storage: Storage): Promise<void> => {
  return storage.remove({
    key: KEY,
    id: id,
  });
};

export const update = (id: string, category: Category.Model, storage: Storage) => {
  return storage.save({
    key: KEY,
    id: id,
    data: category,
  });
};
